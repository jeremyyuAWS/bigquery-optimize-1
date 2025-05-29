import { useState } from 'react';
import { X, Zap, ArrowRight, Clock, TrendingDown } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register the language
SyntaxHighlighter.registerLanguage('sql', sql);

interface QueryOptimizerProps {
  open: boolean;
  onClose: () => void;
  queryId: string | null;
}

interface QuerySuggestion {
  originalQuery: string;
  optimizedQuery: string;
  costReduction: number;
  bytesProcessedBefore: number;
  bytesProcessedAfter: number;
  executionTimeBefore: number;
  executionTimeAfter: number;
  improvements: Array<{
    title: string;
    description: string;
    impact?: string;
    reasoning?: string;
  }>;
}

const SAMPLE_QUERIES: Record<string, QuerySuggestion> = {
  'query-0': {
    originalQuery: `SELECT *
FROM \`project.dataset.sales_data\`
WHERE CAST(transaction_date AS DATE) >= '2024-01-01'`,
    optimizedQuery: `SELECT
  customer_id,
  product_id,
  transaction_amount,
  transaction_date
FROM \`project.dataset.sales_data\`
WHERE transaction_date >= TIMESTAMP('2024-01-01')`,
    costReduction: 72,
    bytesProcessedBefore: 5200000000,
    bytesProcessedAfter: 1456000000,
    executionTimeBefore: 15300,
    executionTimeAfter: 4200,
    improvements: [
      {
        title: "Column Selection Optimization",
        description: "Select only necessary columns instead of SELECT *",
        impact: "Reduces data scanned by 65%",
        reasoning: "BigQuery pricing is based on bytes processed. By selecting only needed columns instead of all 28 columns in the table, we significantly reduce the amount of data scanned."
      },
      {
        title: "Avoid CAST in filtering predicates",
        description: "Use native TIMESTAMP comparison instead of casting in WHERE clause",
        impact: "Enables partition pruning",
        reasoning: "Functions applied to partitioning columns prevent partition pruning. Using direct timestamp comparison allows BigQuery to skip irrelevant partitions."
      }
    ]
  },
  'query-1': {
    originalQuery: `SELECT
  user_id,
  COUNT(*) as event_count
FROM \`project.dataset.events\`
WHERE event_date BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY user_id`,
    optimizedQuery: `CREATE OR REPLACE MATERIALIZED VIEW \`project.dataset.mv_daily_events\` AS
SELECT
  event_date,
  user_id,
  COUNT(*) as event_count
FROM \`project.dataset.events\`
GROUP BY event_date, user_id;

-- Then query the materialized view
SELECT
  user_id,
  SUM(event_count) as event_count
FROM \`project.dataset.mv_daily_events\`
WHERE event_date BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY user_id`,
    costReduction: 95,
    bytesProcessedBefore: 12500000000,
    bytesProcessedAfter: 625000000,
    executionTimeBefore: 22400,
    executionTimeAfter: 1100,
    improvements: [
      {
        title: "Materialized View Implementation",
        description: "Create a materialized view for frequently queried aggregations",
        impact: "95% cost reduction for repeated queries",
        reasoning: "Materialized views precompute and store results, and are automatically maintained by BigQuery. This eliminates the need to scan the full table for each query."
      },
      {
        title: "Date-based Grouping",
        description: "Group by date for time-series analytics",
        impact: "Enables efficient time-based filtering",
        reasoning: "Grouping by date in the materialized view allows subsequent queries to efficiently filter by date ranges without scanning the entire dataset."
      }
    ]
  },
  'query-2': {
    originalQuery: `-- Multiple similar queries run throughout the day
SELECT
  product_category,
  SUM(revenue) as total_revenue
FROM \`project.dataset.sales\`
WHERE DATE(transaction_timestamp) = CURRENT_DATE()
GROUP BY product_category
ORDER BY total_revenue DESC`,
    optimizedQuery: `-- Using query results cache
SELECT
  product_category,
  SUM(revenue) as total_revenue
FROM \`project.dataset.sales\`
WHERE DATE(transaction_timestamp) = DATE('2024-03-15')  -- Use explicit date instead of CURRENT_DATE()
GROUP BY product_category
ORDER BY total_revenue DESC`,
    costReduction: 100,
    bytesProcessedBefore: 3200000000,
    bytesProcessedAfter: 0,
    executionTimeBefore: 8500,
    executionTimeAfter: 250,
    improvements: [
      {
        title: "Query Results Cache Utilization",
        description: "Use explicit date literals instead of CURRENT_DATE() to leverage BigQuery's cache",
        impact: "100% cost reduction for subsequent identical queries within 24 hours",
        reasoning: "BigQuery automatically caches query results for 24 hours. Using deterministic values instead of functions like CURRENT_DATE() ensures cache hits for identical queries."
      },
      {
        title: "Query Standardization",
        description: "Standardize query patterns across the organization",
        impact: "Increases cache hit rate",
        reasoning: "Consistent query formatting and structure increases the likelihood of cache hits across different users and applications."
      }
    ]
  },
  'query-3': {
    originalQuery: `SELECT
  DATE_TRUNC(event_timestamp, DAY) as day,
  user_region,
  device_type,
  COUNT(*) as event_count
FROM \`project.dataset.events\`
WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 90 DAY)
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC`,
    optimizedQuery: `-- Create a partitioned and clustered table
CREATE OR REPLACE TABLE \`project.dataset.events_partitioned\`
PARTITION BY DATE(event_timestamp)
CLUSTER BY user_region, device_type
AS SELECT * FROM \`project.dataset.events\`;

-- Then query the optimized table
SELECT
  DATE_TRUNC(event_timestamp, DAY) as day,
  user_region,
  device_type,
  COUNT(*) as event_count
FROM \`project.dataset.events_partitioned\`
WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 90 DAY)
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC`,
    costReduction: 68,
    bytesProcessedBefore: 18700000000,
    bytesProcessedAfter: 5984000000,
    executionTimeBefore: 25600,
    executionTimeAfter: 8200,
    improvements: [
      {
        title: "Table Partitioning",
        description: "Partition table by date to enable partition pruning",
        impact: "Reduces data scanned by ~67%",
        reasoning: "Partitioning by date allows BigQuery to scan only the relevant date partitions instead of the entire table."
      },
      {
        title: "Clustering Implementation",
        description: "Cluster the table by frequently filtered columns",
        impact: "Improves query performance by ~68%",
        reasoning: "Clustering organizes data based on column values, allowing BigQuery to scan only the clusters that match the filter conditions."
      }
    ]
  },
  'batch-optimize': {
    originalQuery: "-- Multiple queries requiring optimization",
    optimizedQuery: "-- AI batch optimization completed",
    costReduction: 62,
    bytesProcessedBefore: 85400000000,
    bytesProcessedAfter: 32452000000,
    executionTimeBefore: 145000,
    executionTimeAfter: 52000,
    improvements: [
      {
        title: "Batch Optimization Results",
        description: "AI analyzed 42 queries and found optimization opportunities in 37",
        impact: "Potential monthly savings: $9,450"
      },
      {
        title: "Top Optimization Patterns",
        description: "1. Column pruning (13 queries)\n2. Partition pruning improvements (9 queries)\n3. Materialized view candidates (8 queries)\n4. JOIN optimizations (5 queries)\n5. Query consolidation (2 queries)",
        impact: "Average cost reduction of 62% across all optimized queries"
      },
      {
        title: "Recommended Actions",
        description: "1. Implement 3 critical materialized views\n2. Create 5 new partitioned and clustered tables\n3. Standardize 12 frequently used query patterns\n4. Set up query organization policy",
        impact: "Implementation effort: Medium (estimated 3 developer days)"
      }
    ]
  }
};

export function AIQueryOptimizer({ open, onClose, queryId }: QueryOptimizerProps) {
  const [activeTab, setActiveTab] = useState<'optimized' | 'explanation' | 'metrics'>('optimized');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  
  if (!open || !queryId) return null;

  const suggestion = SAMPLE_QUERIES[queryId] || SAMPLE_QUERIES['query-0'];
  
  // Simulate AI analyzing the query
  setTimeout(() => {
    setIsAnalyzing(false);
  }, 1500);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold">AI Query Optimizer</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-indigo-700">AI analyzing query patterns...</p>
            <p className="text-sm text-gray-500 mt-2">Identifying optimization opportunities and generating improvements</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg flex items-start space-x-4">
                <div className="mt-1">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">AI Optimization Summary</h3>
                  <p className="text-indigo-700 mt-1">
                    This query could be optimized to reduce processing costs by <span className="font-bold text-green-600">{suggestion.costReduction}%</span>
                  </p>
                  <p className="text-indigo-700 mt-1">
                    Data processed: <span className="line-through text-red-500">{(suggestion.bytesProcessedBefore / 1000000000).toFixed(1)} GB</span> → <span className="font-bold text-green-600">{(suggestion.bytesProcessedAfter / 1000000000).toFixed(1)} GB</span>
                  </p>
                  <p className="text-indigo-700 mt-1">
                    Execution time: <span className="line-through text-red-500">{(suggestion.executionTimeBefore / 1000).toFixed(1)}s</span> → <span className="font-bold text-green-600">{(suggestion.executionTimeAfter / 1000).toFixed(1)}s</span>
                  </p>
                </div>
              </div>
            </div>
        
            <div className="border-b border-gray-200 mb-4">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('optimized')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'optimized'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Optimized Query
                </button>
                <button
                  onClick={() => setActiveTab('explanation')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'explanation'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  AI Explanation
                </button>
                <button
                  onClick={() => setActiveTab('metrics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'metrics'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Performance Metrics
                </button>
              </nav>
            </div>
            
            {activeTab === 'optimized' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Original Query</h3>
                    <SyntaxHighlighter
                      language="sql"
                      style={dracula}
                      customStyle={{ borderRadius: '0.375rem', fontSize: '0.8rem' }}
                    >
                      {suggestion.originalQuery}
                    </SyntaxHighlighter>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                      <div className="bg-indigo-100 rounded-full p-2">
                        <ArrowRight className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg relative">
                      <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        AI Optimized
                      </div>
                      <h3 className="text-md font-semibold mb-2 text-gray-700">Optimized Query</h3>
                      <SyntaxHighlighter
                        language="sql"
                        style={dracula}
                        customStyle={{ borderRadius: '0.375rem', fontSize: '0.8rem' }}
                      >
                        {suggestion.optimizedQuery}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                    <span className="mr-2">Apply Optimization</span>
                    <Zap className="w-4 h-4" />
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                    Schedule Implementation
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'explanation' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Generated Optimization Insights</h3>
                    <p className="text-gray-600">Our AI has analyzed your query patterns and identified the following opportunities:</p>
                  </div>
                  
                  <div className="border-t border-gray-200">
                    {suggestion.improvements.map((improvement, index) => (
                      <div key={index} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
                        <h4 className="font-medium text-indigo-700">{improvement.title}</h4>
                        <p className="mt-1 text-gray-600">{improvement.description}</p>
                        
                        {improvement.impact && (
                          <div className="mt-2 flex items-center">
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              {improvement.impact}
                            </span>
                          </div>
                        )}
                        
                        {improvement.reasoning && (
                          <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-md">
                            <span className="font-medium">AI reasoning:</span> {improvement.reasoning}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-medium text-amber-800 mb-2">Additional Optimization Potential</h3>
                  <p className="text-amber-700 text-sm">
                    Our AI has identified 7 similar query patterns across your organization. 
                    Implementing these optimizations across all similar queries could save an additional 
                    <span className="font-bold"> $3,200/month</span>.
                  </p>
                  <button className="mt-2 text-amber-700 text-sm font-medium hover:text-amber-800 underline">
                    View similar queries
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-1">Data Processed</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        {(suggestion.bytesProcessedAfter / 1000000000).toFixed(1)} GB
                      </span>
                      <span className="ml-2 text-sm text-green-600">
                        -{(suggestion.bytesProcessedBefore - suggestion.bytesProcessedAfter) / suggestion.bytesProcessedBefore * 100}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${100 - suggestion.costReduction}%` }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Before: {(suggestion.bytesProcessedBefore / 1000000000).toFixed(1)} GB
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-1">Query Cost</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        ${(suggestion.bytesProcessedAfter / 1000000000 * 5).toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-green-600">
                        -{suggestion.costReduction}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${100 - suggestion.costReduction}%` }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Before: ${(suggestion.bytesProcessedBefore / 1000000000 * 5).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-1">Execution Time</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        {(suggestion.executionTimeAfter / 1000).toFixed(1)}s
                      </span>
                      <span className="ml-2 text-sm text-green-600">
                        -{((suggestion.executionTimeBefore - suggestion.executionTimeAfter) / suggestion.executionTimeBefore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(suggestion.executionTimeAfter / suggestion.executionTimeBefore * 100).toFixed(0)}%` }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Before: {(suggestion.executionTimeBefore / 1000).toFixed(1)}s
                    </p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-3">Monthly Impact Projection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-600">Current Monthly Cost</h4>
                      <p className="text-xl font-bold text-gray-800 mt-1">${(suggestion.bytesProcessedBefore * 30 / 1000000000 * 5).toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">Based on query running 30 times daily</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-600">Optimized Monthly Cost</h4>
                      <p className="text-xl font-bold text-green-600 mt-1">${(suggestion.bytesProcessedAfter * 30 / 1000000000 * 5).toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">Based on query running 30 times daily</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-700">Projected Monthly Savings</h4>
                      <p className="text-xl font-bold text-green-600 mt-1">
                        ${((suggestion.bytesProcessedBefore - suggestion.bytesProcessedAfter) * 30 / 1000000000 * 5).toFixed(2)}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {(suggestion.costReduction).toFixed(0)}% reduction in processing costs
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <h3 className="font-medium text-indigo-800 mb-2">Optimization ROI Analysis</h3>
                  <p className="text-indigo-700 text-sm">
                    Implementation effort: <span className="font-medium">Low</span> (Estimated 2 hours of developer time)
                  </p>
                  <p className="text-indigo-700 text-sm mt-1">
                    Time to value: <span className="font-medium">Immediate</span> after implementation
                  </p>
                  <p className="text-indigo-700 text-sm mt-1">
                    Annual savings: <span className="font-medium">${((suggestion.bytesProcessedBefore - suggestion.bytesProcessedAfter) * 365 / 1000000000 * 5).toFixed(2)}</span>
                  </p>
                  <div className="mt-3">
                    <button className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700">
                      Generate Implementation Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}