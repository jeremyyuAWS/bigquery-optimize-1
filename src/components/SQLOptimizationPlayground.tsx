import { useState, useEffect } from 'react';
import { Play, Sparkles, TrendingDown, Copy, Download, Zap, Database, DollarSign, BarChart2 } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sql } from '@codemirror/lang-sql';
import toast from 'react-hot-toast';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sqlLang from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { saveAs } from 'file-saver';

// Register language
SyntaxHighlighter.registerLanguage('sql', sqlLang);

interface OptimizationResult {
  originalBytes: number;
  optimizedBytes: number;
  originalCost: number;
  optimizedCost: number;
  originalTime: number;
  optimizedTime: number;
  recommendations: string[];
  issues: {
    severity: 'high' | 'medium' | 'low';
    message: string;
    fix: string;
  }[];
  optimizedQuery: string;
}

export function SQLOptimizationPlayground() {
  const [query, setQuery] = useState<string>(
`-- Enter your BigQuery SQL to optimize
SELECT *
FROM \`project.dataset.large_table\`
WHERE CAST(timestamp_column AS DATE) = '2024-03-15'
  AND user_id = 12345`
  );
  
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'optimization' | 'explanation' | 'history'>('optimization');
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);
  const [optimizationHistory, setOptimizationHistory] = useState<{
    date: Date;
    originalBytes: number;
    optimizedBytes: number;
    savingsPercent: number;
    queryPreview: string;
  }[]>([
    {
      date: new Date(2024, 2, 10),
      originalBytes: 2500000000000,
      optimizedBytes: 750000000000,
      savingsPercent: 70,
      queryPreview: 'SELECT * FROM sales WHERE...'
    },
    {
      date: new Date(2024, 2, 5),
      originalBytes: 1200000000000,
      optimizedBytes: 360000000000,
      savingsPercent: 70,
      queryPreview: 'SELECT * FROM events WHERE...'
    },
    {
      date: new Date(2024, 1, 28),
      originalBytes: 3800000000000,
      optimizedBytes: 950000000000,
      savingsPercent: 75,
      queryPreview: 'SELECT * FROM users JOIN orders...'
    }
  ]);
  
  const sampleQueries = [
    {
      name: 'Table Scan',
      query: `SELECT *
FROM \`project.dataset.large_table\`
WHERE CAST(timestamp_column AS DATE) = '2024-03-15'
  AND user_id = 12345`
    },
    {
      name: 'Inefficient JOIN',
      query: `SELECT t1.*, t2.*
FROM \`project.dataset.transactions\` t1
JOIN \`project.dataset.customer_data\` t2
ON t1.customer_id = t2.customer_id
WHERE t1.transaction_date >= '2024-01-01'`
    },
    {
      name: 'Date Function',
      query: `SELECT 
  user_id,
  event_type,
  COUNT(*) as event_count
FROM \`project.dataset.events\`
WHERE DATE(event_timestamp) BETWEEN '2024-02-01' AND '2024-02-28'
GROUP BY 1, 2
ORDER BY 3 DESC`
    },
    {
      name: 'Complex Aggregation',
      query: `-- This query calculates daily user metrics
SELECT
  DATE(event_timestamp) as day,
  COUNT(DISTINCT user_id) as daily_active_users,
  SUM(CASE WHEN event_type = 'purchase' THEN transaction_amount ELSE 0 END) as daily_revenue,
  COUNT(CASE WHEN event_type = 'purchase' THEN 1 ELSE NULL END) as purchase_count,
  AVG(CASE WHEN event_type = 'session_end' THEN session_duration ELSE NULL END) as avg_session_duration
FROM \`project.dataset.user_events\`
WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY 1
ORDER BY 1 DESC`
    }
  ];
  
  const handleOptimize = () => {
    if (!query.trim()) {
      toast.error('Please enter a SQL query to optimize');
      return;
    }
    
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      const optimizedResult = generateOptimizationResult(query);
      setOptimizationResult(optimizedResult);
      
      // Add to history
      setOptimizationHistory(prev => [
        {
          date: new Date(),
          originalBytes: optimizedResult.originalBytes,
          optimizedBytes: optimizedResult.optimizedBytes,
          savingsPercent: Math.round((optimizedResult.originalBytes - optimizedResult.optimizedBytes) / optimizedResult.originalBytes * 100),
          queryPreview: query.substring(0, 40) + '...'
        },
        ...prev
      ]);
      
      setIsOptimizing(false);
      toast.success('Query optimization complete!');
    }, 2000);
  };
  
  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuery(type);
    setTimeout(() => setCopiedQuery(null), 2000);
    toast.success(`${type} copied to clipboard`);
  };
  
  const downloadQuery = (query: string, filename: string) => {
    const blob = new Blob([query], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${filename}.sql`);
  };
  
  const generateOptimizationResult = (userQuery: string): OptimizationResult => {
    // This function simulates AI optimization of queries
    // In a real implementation, this would call a backend service
    
    let optimizedQuery = '';
    const issues = [];
    const recommendations = [];
    
    // Check for SELECT *
    if (userQuery.includes('SELECT *')) {
      optimizedQuery = userQuery.replace('SELECT *', 'SELECT id, name, timestamp_column, user_id');
      issues.push({
        severity: 'high',
        message: 'Using SELECT * processes all columns, increasing data scanned',
        fix: 'Select only the columns you need instead of using SELECT *'
      });
      recommendations.push('Replace SELECT * with specific column selection');
    } else {
      optimizedQuery = userQuery;
    }
    
    // Check for CAST in WHERE clause
    if (userQuery.includes('CAST(timestamp_column AS DATE)')) {
      optimizedQuery = optimizedQuery.replace(
        'CAST(timestamp_column AS DATE) = \'2024-03-15\'',
        'timestamp_column >= \'2024-03-15\' AND timestamp_column < \'2024-03-16\''
      );
      issues.push({
        severity: 'high',
        message: 'Using CAST on partitioned columns prevents partition pruning',
        fix: 'Use direct timestamp comparison instead of casting to DATE'
      });
      recommendations.push('Avoid using functions on partitioned columns in WHERE clauses');
    }
    
    // Check for inefficient JOINs
    if (userQuery.includes('JOIN') && !userQuery.toLowerCase().includes('with')) {
      const withClause = `WITH filtered_base AS (
  SELECT customer_id
  FROM \`project.dataset.transactions\`
  WHERE transaction_date >= '2024-01-01'
)

SELECT t1.customer_id, t1.transaction_date, t1.amount, t2.name, t2.email
FROM filtered_base fb
JOIN \`project.dataset.transactions\` t1 ON fb.customer_id = t1.customer_id
JOIN \`project.dataset.customer_data\` t2 ON t1.customer_id = t2.customer_id`;

      if (userQuery.includes('JOIN') && userQuery.includes('transaction_date')) {
        optimizedQuery = withClause;
        issues.push({
          severity: 'medium',
          message: 'Joining tables before filtering can process unnecessary data',
          fix: 'Filter tables before joining to reduce processed data'
        });
        recommendations.push('Use WITH clauses to filter tables before JOINs');
      }
    }
    
    // Check for non-deterministic functions
    if (userQuery.includes('CURRENT_TIMESTAMP()')) {
      optimizedQuery = optimizedQuery.replace(
        'TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)',
        'TIMESTAMP("2024-02-15")'
      );
      issues.push({
        severity: 'low',
        message: 'Non-deterministic functions prevent query result caching',
        fix: 'Use fixed timestamp values instead of CURRENT_TIMESTAMP() for better cache utilization'
      });
      recommendations.push('Use explicit timestamps for better cache utilization');
    }
    
    // Calculate simulated performance data
    const originalBytes = Math.round(500000000000 + Math.random() * 3000000000000);
    const optimizedBytes = Math.round(originalBytes * (0.25 + Math.random() * 0.25));
    const originalCost = originalBytes / 1000000000000 * 5;
    const optimizedCost = optimizedBytes / 1000000000000 * 5;
    const originalTime = Math.round(5000 + Math.random() * 20000);
    const optimizedTime = Math.round(originalTime * (0.3 + Math.random() * 0.3));
    
    // Add general recommendations
    if (recommendations.length === 0) {
      recommendations.push('Query is already well-optimized');
    }
    
    if (!userQuery.toLowerCase().includes('partition')) {
      recommendations.push('Consider using partitioned tables for time-series data');
    }
    
    if (userQuery.toLowerCase().includes('group by')) {
      recommendations.push('Consider using materialized views for frequent aggregation queries');
    }
    
    return {
      originalBytes,
      optimizedBytes,
      originalCost,
      optimizedCost,
      originalTime,
      optimizedTime,
      issues,
      recommendations,
      optimizedQuery
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-900 p-6 text-white">
        <div className="flex items-center mb-2">
          <Sparkles className="h-6 w-6 text-indigo-400 mr-2" />
          <h2 className="text-xl font-bold">SQL Optimization Playground</h2>
        </div>
        <p className="text-gray-300">
          Test and optimize your BigQuery SQL queries to reduce costs and improve performance
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your SQL Query</h3>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <CodeMirror
                value={query}
                height="200px"
                theme={vscodeDark}
                extensions={[sql()]}
                onChange={(value) => setQuery(value)}
                style={{ fontSize: '14px' }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="space-x-2">
                <button 
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isOptimizing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Optimize Query
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setQuery('')}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Try sample query:</span>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => {
                    const selected = sampleQueries.find(q => q.name === e.target.value);
                    if (selected) setQuery(selected.query);
                  }}
                >
                  <option value="">Select sample</option>
                  {sampleQueries.map(sample => (
                    <option key={sample.name} value={sample.name}>{sample.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {optimizationResult && (
            <div className="space-y-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                  <button
                    onClick={() => setActiveTab('optimization')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'optimization'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Optimization Result
                  </button>
                  <button
                    onClick={() => setActiveTab('explanation')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'explanation'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Explanation & Issues
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'history'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Optimization History
                  </button>
                </nav>
              </div>
              
              {activeTab === 'optimization' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Data Processed</h3>
                          <div className="flex items-baseline mt-1">
                            <span className="text-xl font-bold text-blue-600">{formatBytes(optimizationResult.optimizedBytes)}</span>
                            <span className="ml-2 text-sm text-green-600">
                              -{Math.round((optimizationResult.originalBytes - optimizationResult.optimizedBytes) / optimizationResult.originalBytes * 100)}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Original: {formatBytes(optimizationResult.originalBytes)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 rounded-full mr-3">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Query Cost</h3>
                          <div className="flex items-baseline mt-1">
                            <span className="text-xl font-bold text-green-600">${optimizationResult.optimizedCost.toFixed(2)}</span>
                            <span className="ml-2 text-sm text-green-600">
                              -{Math.round((optimizationResult.originalCost - optimizationResult.optimizedCost) / optimizationResult.originalCost * 100)}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Original: ${optimizationResult.originalCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <div className="p-2 bg-purple-100 rounded-full mr-3">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Execution Time</h3>
                          <div className="flex items-baseline mt-1">
                            <span className="text-xl font-bold text-purple-600">{(optimizationResult.optimizedTime / 1000).toFixed(1)}s</span>
                            <span className="ml-2 text-sm text-green-600">
                              -{Math.round((optimizationResult.originalTime - optimizationResult.optimizedTime) / optimizationResult.originalTime * 100)}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Original: {(optimizationResult.originalTime / 1000).toFixed(1)}s</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">Original Query</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(query, 'Original query')}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            {copiedQuery === 'Original query' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => downloadQuery(query, 'original_query')}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <SyntaxHighlighter
                          language="sql"
                          style={dracula}
                          customStyle={{ margin: 0, paddingTop: '12px', maxHeight: '300px', overflowY: 'auto' }}
                        >
                          {query}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">Optimized Query</h3>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            AI Optimized
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(optimizationResult.optimizedQuery, 'Optimized query')}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            {copiedQuery === 'Optimized query' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => downloadQuery(optimizationResult.optimizedQuery, 'optimized_query')}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden relative">
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                          Optimized
                        </div>
                        <SyntaxHighlighter
                          language="sql"
                          style={dracula}
                          customStyle={{ margin: 0, paddingTop: '12px', maxHeight: '300px', overflowY: 'auto' }}
                        >
                          {optimizationResult.optimizedQuery}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'explanation' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Optimization Recommendations</h3>
                    <div className="space-y-2">
                      {optimizationResult.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-indigo-50 rounded-lg">
                          <Zap className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                          <p className="text-indigo-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Identified Issues</h3>
                    <div className="space-y-3">
                      {optimizationResult.issues.length > 0 ? (
                        optimizationResult.issues.map((issue, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            issue.severity === 'high' ? 'border-red-200 bg-red-50' : 
                            issue.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                            'border-blue-200 bg-blue-50'
                          }`}>
                            <div className="flex items-start">
                              <div className={`p-1 rounded-full mr-2 ${
                                issue.severity === 'high' ? 'bg-red-100' : 
                                issue.severity === 'medium' ? 'bg-amber-100' :
                                'bg-blue-100'
                              }`}>
                                <AlertTriangle className={`h-4 w-4 ${
                                  issue.severity === 'high' ? 'text-red-600' : 
                                  issue.severity === 'medium' ? 'text-amber-600' :
                                  'text-blue-600'
                                }`} />
                              </div>
                              <div>
                                <p className={`font-medium ${
                                  issue.severity === 'high' ? 'text-red-800' : 
                                  issue.severity === 'medium' ? 'text-amber-800' :
                                  'text-blue-800'
                                }`}>
                                  {issue.severity === 'high' ? 'High' : 
                                   issue.severity === 'medium' ? 'Medium' :
                                   'Low'} Impact Issue: {issue.message}
                                </p>
                                <p className={`mt-1 text-sm ${
                                  issue.severity === 'high' ? 'text-red-700' : 
                                  issue.severity === 'medium' ? 'text-amber-700' :
                                  'text-blue-700'
                                }`}>
                                  Fix: {issue.fix}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700">No significant issues found in your query!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h3 className="font-medium text-indigo-900 mb-2">AI Insights</h3>
                    <p className="text-indigo-700">
                      {optimizationResult.issues.length > 0 ? (
                        `Our AI analysis shows your query has ${optimizationResult.issues.length} optimization opportunities, with a potential ${Math.round((optimizationResult.originalBytes - optimizationResult.optimizedBytes) / optimizationResult.originalBytes * 100)}% reduction in data processed. This translates to approximately $${(optimizationResult.originalCost - optimizationResult.optimizedCost).toFixed(2)} in savings per query execution.`
                      ) : (
                        `Your query is already well optimized. Our AI analysis indicates you're following most BigQuery best practices. For queries run frequently, consider investigating if materialized views would be beneficial.`
                      )}
                    </p>
                    <p className="text-indigo-700 mt-2">
                      {optimizationResult.issues.length > 0 ? (
                        `If this query runs 100 times per month, you could save approximately $${((optimizationResult.originalCost - optimizationResult.optimizedCost) * 100).toFixed(2)} monthly by implementing these optimizations.`
                      ) : (
                        `Continue monitoring this query's performance as your data volume grows to ensure it maintains its efficiency.`
                      )}
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Your Optimization History</h3>
                  
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Size</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized Size</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {optimizationHistory.map((entry, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {entry.queryPreview}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatBytes(entry.originalBytes)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatBytes(entry.optimizedBytes)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {entry.savingsPercent}% reduction
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <h3 className="font-medium text-blue-900">Optimization Stats</h3>
                        <p className="mt-1 text-blue-700">
                          You've optimized {optimizationHistory.length} queries with an average data reduction of 
                          {' '}{optimizationHistory.reduce((acc, curr) => acc + curr.savingsPercent, 0) / optimizationHistory.length}%.
                        </p>
                        <p className="mt-1 text-blue-700">
                          Total estimated savings: ${optimizationHistory.reduce((acc, curr) => {
                            const queryCost = curr.originalBytes / 1000000000000 * 5;
                            const optimizedCost = curr.optimizedBytes / 1000000000000 * 5;
                            return acc + (queryCost - optimizedCost);
                          }, 0).toFixed(2)} per query execution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}