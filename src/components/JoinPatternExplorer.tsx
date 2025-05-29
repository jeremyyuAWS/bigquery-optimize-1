import { useState } from 'react';
import { Code, Filter, Search, Play, Download, Info, AlertCircle, ChevronDown, ChevronUp, Database, ArrowRight, Cpu, Zap, Copy } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register the language
SyntaxHighlighter.registerLanguage('sql', sql);

interface JoinPattern {
  id: string;
  name: string;
  description: string;
  type: 'hash' | 'broadcast' | 'nested-loop';
  impact: 'high' | 'medium' | 'low';
  costImpact: number;
  latencyImpact: number;
  originalQuery: string;
  optimizedQuery: string;
  tableSize1: string;
  tableSize2: string;
  expanded?: boolean;
  optimizationNotes: string;
}

export function JoinPatternExplorer() {
  const [activePattern, setActivePattern] = useState<string>('large-to-large');
  const [showOptimized, setShowOptimized] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  // Define join pattern examples
  const joinPatterns: Record<string, JoinPattern[]> = {
    'large-to-large': [
      {
        id: 'users-events',
        name: 'Users to Events Join',
        description: 'Joining large users table with events table without partitioning',
        type: 'hash',
        impact: 'high',
        costImpact: 78,
        latencyImpact: 65,
        tableSize1: '5.2 GB (users)',
        tableSize2: '120 GB (events)',
        originalQuery: `-- Inefficient large-to-large table join
SELECT
  u.user_id,
  u.name,
  u.email,
  COUNT(e.event_id) as event_count
FROM \`project.dataset.users\` u
JOIN \`project.dataset.events\` e
  ON u.user_id = e.user_id
WHERE e.event_date >= '2024-01-01'
GROUP BY 1, 2, 3`,
        optimizedQuery: `-- Optimized with partitioning and filtering before join
WITH filtered_events AS (
  SELECT
    user_id,
    event_id
  FROM \`project.dataset.events\`
  WHERE event_date >= '2024-01-01'
)

SELECT
  u.user_id,
  u.name,
  u.email,
  COUNT(e.event_id) as event_count
FROM \`project.dataset.users\` u
JOIN filtered_events e
  ON u.user_id = e.user_id
GROUP BY 1, 2, 3`,
        optimizationNotes: `This is a classic large-to-large table join optimization. The key improvements are:

1. **Pre-filtering**: We filter the larger events table before joining, drastically reducing the data that needs to be joined.

2. **Column Pruning**: We only select the columns we actually need from the events table (user_id and event_id).

3. **Materialization Consideration**: For even better performance, consider creating a daily materialized view of user event counts.

The cost reduction is approximately 78% because we're processing much less data during the join operation. Query execution time is reduced by around 65%.`
      },
      {
        id: 'orders-products',
        name: 'Orders to Products Join',
        description: 'Joining large orders table with products for reporting',
        type: 'hash',
        impact: 'high',
        costImpact: 82,
        latencyImpact: 70,
        tableSize1: '85 GB (orders)',
        tableSize2: '2.8 GB (products)',
        originalQuery: `-- Inefficient join with date casting that prevents partition pruning
SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  p.product_id,
  p.name as product_name,
  p.category,
  p.price
FROM \`project.dataset.orders\` o
JOIN \`project.dataset.products\` p
  ON o.product_id = p.product_id
WHERE CAST(o.order_date AS DATE) BETWEEN '2024-01-01' AND '2024-01-31'`,
        optimizedQuery: `-- Optimized with proper date filtering and column selection
WITH filtered_orders AS (
  SELECT
    order_id,
    customer_id,
    order_date,
    product_id
  FROM \`project.dataset.orders\`
  WHERE order_date BETWEEN '2024-01-01' AND '2024-02-01'
)

SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  p.product_id,
  p.name as product_name,
  p.category,
  p.price
FROM filtered_orders o
JOIN \`project.dataset.products\` p
  ON o.product_id = p.product_id`,
        optimizationNotes: `This query optimization focuses on several key improvements:

1. **Proper Date Filtering**: Removed CAST() function on the partitioned column which was preventing partition pruning. 
   Using direct comparison allows BigQuery to scan only the relevant partitions.

2. **Pre-filtering**: The filtered_orders CTE reduces the amount of data before the join operation.

3. **Column Selection**: We only select the necessary columns from the orders table in the CTE.

4. **Date Range Correction**: Using BETWEEN with dates requires careful handling of the end date. 
   We've adjusted to '2024-02-01' to correctly include all of January.

The cost reduction is significant at 82% primarily due to enabling partition pruning.`
      }
    ],
    'small-to-large': [
      {
        id: 'dim-fact',
        name: 'Dimension to Fact Table Join',
        description: 'Joining small dimension table with large fact table',
        type: 'broadcast',
        impact: 'medium',
        costImpact: 45,
        latencyImpact: 55,
        tableSize1: '500 MB (dimension)',
        tableSize2: '250 GB (fact)',
        originalQuery: `-- Suboptimal dimension to fact table join
SELECT
  f.transaction_id,
  f.transaction_date,
  f.amount,
  d.region_id,
  d.region_name,
  d.country
FROM \`project.dataset.fact_transactions\` f
JOIN \`project.dataset.dim_regions\` d
  ON f.region_id = d.region_id
WHERE f.transaction_date >= '2024-01-01'`,
        optimizedQuery: `-- Optimized with broadcast join approach
SELECT
  f.transaction_id,
  f.transaction_date,
  f.amount,
  d.region_id,
  d.region_name,
  d.country
FROM \`project.dataset.fact_transactions\` f
JOIN \`project.dataset.dim_regions\` d
  ON f.region_id = d.region_id
WHERE f.transaction_date >= '2024-01-01'

-- Note: No syntax change needed! BigQuery automatically 
-- uses broadcast join for small-to-large table joins.
-- The optimization is achieved through proper table design:
-- 1. Keep dimension tables small and well-indexed
-- 2. Partition the fact table by date
-- 3. Ensure statistics are up-to-date`,
        optimizationNotes: `For small-to-large table joins, BigQuery automatically uses a broadcast join strategy when appropriate. This means the smaller table (dimension table) is sent to all nodes processing the larger table (fact table).

The most important optimization for this pattern is proper table design:

1. **Table Design**: Keep dimension tables small and focused.

2. **Partitioning**: Partition the fact table by date to reduce data scanned.

3. **Clustering**: Consider clustering the fact table by region_id to improve join performance.

4. **Order of Tables**: Although BigQuery will optimize automatically, it's good practice to list the larger table first in the FROM clause.

The cost and performance improvements here come primarily from proper table design rather than query syntax changes.`
      },
      {
        id: 'lookup-events',
        name: 'Lookup Table to Events Join',
        description: 'Joining small lookup table with large events table',
        type: 'broadcast',
        impact: 'medium',
        costImpact: 35,
        latencyImpact: 40,
        tableSize1: '50 KB (lookup)',
        tableSize2: '180 GB (events)',
        originalQuery: `-- Suboptimal lookup to events join
SELECT
  e.event_id,
  e.user_id,
  e.event_type,
  e.event_timestamp,
  t.category,
  t.description
FROM \`project.dataset.events\` e
LEFT JOIN \`project.dataset.event_types\` t
  ON e.event_type = t.event_type
WHERE DATE(e.event_timestamp) BETWEEN '2024-01-01' AND '2024-01-31'`,
        optimizedQuery: `-- Optimized with proper timestamp comparison and ordering
SELECT
  e.event_id,
  e.user_id,
  e.event_type,
  e.event_timestamp,
  t.category,
  t.description
FROM \`project.dataset.events\` e
LEFT JOIN \`project.dataset.event_types\` t
  ON e.event_type = t.event_type
WHERE e.event_timestamp >= '2024-01-01'
  AND e.event_timestamp < '2024-02-01'`,
        optimizationNotes: `This optimization focuses on the date filtering rather than the join itself:

1. **Date Filtering**: Removed the DATE() function on the event_timestamp column, which would prevent partition pruning.

2. **Timestamp Comparison**: Used direct timestamp comparison with >= and < operators for more efficient filtering.

3. **Broadcast Join**: BigQuery automatically uses a broadcast join strategy for the small lookup table, so no explicit syntax changes are needed for the join itself.

The cost savings come primarily from better partition pruning due to the improved timestamp comparison. Even though the JOIN syntax is unchanged, the reduced data volume from better filtering makes the join operation more efficient.`
      }
    ],
    'nested-structures': [
      {
        id: 'nested-json',
        name: 'Nested JSON Structure',
        description: 'Working with nested arrays and structs in BigQuery',
        type: 'nested-loop',
        impact: 'low',
        costImpact: 30,
        latencyImpact: 25,
        tableSize1: '75 GB (nested)',
        tableSize2: 'N/A',
        originalQuery: `-- Inefficient query with nested structures flattening
WITH flattened AS (
  SELECT
    user_id,
    session_id,
    timestamp,
    event.name as event_name,
    event.value as event_value
  FROM \`project.dataset.user_sessions\`,
  UNNEST(events) as event
)

SELECT
  user_id,
  COUNT(DISTINCT session_id) as session_count,
  COUNT(*) as event_count
FROM flattened
WHERE timestamp >= '2024-01-01'
GROUP BY 1`,
        optimizedQuery: `-- Optimized with UNNEST after filtering
SELECT
  user_id,
  COUNT(DISTINCT session_id) as session_count,
  (SELECT COUNT(*) FROM UNNEST(events)) as event_count
FROM \`project.dataset.user_sessions\`
WHERE timestamp >= '2024-01-01'
GROUP BY 1`,
        optimizationNotes: `This optimization shows how to work efficiently with BigQuery's nested and repeated fields:

1. **Filter Before Unnesting**: The original query flattened the data first, then filtered. The optimized query filters first, then unnests only the rows we need.

2. **Correlated Subquery**: We use a correlated subquery with UNNEST to count events, avoiding the need to create a flattened CTE.

3. **Structural Advantages**: By keeping the nested structure and not flattening it until necessary, we take advantage of BigQuery's columnar storage.

For nested structures, the key principle is to avoid unnecessary flattening and leverage BigQuery's native support for arrays and structs. This reduces both processing and storage costs.`
      },
      {
        id: 'array-agg',
        name: 'Using ARRAY_AGG Instead of JOINs',
        description: 'Creating nested results instead of flattened join results',
        type: 'nested-loop',
        impact: 'medium',
        costImpact: 65,
        latencyImpact: 70,
        tableSize1: '50 GB (orders)',
        tableSize2: '120 GB (items)',
        originalQuery: `-- Inefficient flattened approach with join
SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  i.item_id,
  i.product_id,
  i.quantity,
  i.price
FROM \`project.dataset.orders\` o
JOIN \`project.dataset.order_items\` i
  ON o.order_id = i.order_id
WHERE o.order_date >= '2024-01-01'`,
        optimizedQuery: `-- Optimized with array aggregation
SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  ARRAY_AGG(STRUCT(
    i.item_id,
    i.product_id,
    i.quantity,
    i.price
  )) AS items
FROM \`project.dataset.orders\` o
JOIN \`project.dataset.order_items\` i
  ON o.order_id = i.order_id
WHERE o.order_date >= '2024-01-01'
GROUP BY 1, 2, 3`,
        optimizationNotes: `This pattern demonstrates how to use BigQuery's ARRAY_AGG with STRUCT to create nested results instead of flattened join results:

1. **Nested Results**: Instead of returning a separate row for each order-item combination, we create a nested structure where each order contains an array of items.

2. **Data Reduction**: This can dramatically reduce the amount of data returned, especially for orders with many items.

3. **Application Side**: This approach shifts some work to the application side, which now needs to process the nested structure, but significantly reduces data transfer.

4. **Grouping**: Note the GROUP BY clause that's required when using ARRAY_AGG.

This technique is particularly valuable when:
- Orders can have many items (1:many relationship)
- You need to preserve the hierarchical relationship
- You want to reduce result set size for large queries

The cost savings can be substantial (65% in this example) because much less data is transferred and processed.`
      }
    ]
  };
  
  // Get current pattern's data
  const currentPatterns = joinPatterns[activePattern] || [];
  
  // Filter patterns based on search
  const filteredPatterns = searchTerm
    ? currentPatterns.filter(
        pattern => 
          pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentPatterns;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white">
        <div className="flex items-center mb-2">
          <Code className="h-6 w-6 text-indigo-200 mr-2" />
          <h2 className="text-xl font-bold">AI-Powered Join Pattern Explorer</h2>
        </div>
        <p className="text-indigo-200">
          Analyze and optimize complex join patterns to reduce query costs and improve performance
        </p>
      </div>
      
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex p-4 overflow-x-auto">
          <button
            onClick={() => setActivePattern('large-to-large')}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activePattern === 'large-to-large'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Large-to-Large Joins
          </button>
          <button
            onClick={() => setActivePattern('small-to-large')}
            className={`ml-2 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activePattern === 'small-to-large'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Small-to-Large Joins
          </button>
          <button
            onClick={() => setActivePattern('nested-structures')}
            className={`ml-2 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activePattern === 'nested-structures'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Nested Structures
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search join patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <button 
              onClick={() => setShowOptimized(!showOptimized)}
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center ${
                showOptimized ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {showOptimized ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Show Optimized
                </>
              ) : (
                <>
                  <Code className="h-4 w-4 mr-1" />
                  Show Original
                </>
              )}
            </button>
          </div>
        </div>
        
        {activePattern === 'large-to-large' && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium text-blue-900">Large-to-Large Join Patterns</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Joining large tables can be computationally expensive. The key optimization techniques include:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
                  <li>Filter tables before joining to reduce data volume</li>
                  <li>Use partitioning and clustering on join columns</li>
                  <li>Select only necessary columns</li>
                  <li>Consider materialized views for frequently joined data</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activePattern === 'small-to-large' && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium text-blue-900">Small-to-Large Join Patterns</h3>
                <p className="text-sm text-blue-700 mt-1">
                  When joining a small table (like a dimension table) with a large fact table, BigQuery typically uses broadcast joins:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
                  <li>The smaller table is sent to all nodes processing the larger table</li>
                  <li>This is usually efficient, but proper table design is still important</li>
                  <li>Filtering the larger table first is still beneficial</li>
                  <li>No special syntax is required - BigQuery chooses this strategy automatically</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activePattern === 'nested-structures' && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium text-blue-900">Nested Structure Patterns</h3>
                <p className="text-sm text-blue-700 mt-1">
                  BigQuery natively supports nested and repeated fields, which can be more efficient than normalized structures:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
                  <li>Use ARRAY_AGG with STRUCT to create nested results</li>
                  <li>Filter before UNNESTing arrays to improve performance</li>
                  <li>Nested structures can reduce data duplication and improve query performance</li>
                  <li>Useful for parent-child relationships like orders and line items</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {filteredPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{pattern.name}</h3>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      pattern.impact === 'high' ? 'bg-red-100 text-red-700' :
                      pattern.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {pattern.impact === 'high' ? 'High Impact' :
                       pattern.impact === 'medium' ? 'Medium Impact' :
                       'Low Impact'}
                    </span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700`}>
                      {pattern.type === 'hash' ? 'Hash Join' :
                       pattern.type === 'broadcast' ? 'Broadcast Join' :
                       'Nested Loop Join'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Cost Reduction:</span>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600">{pattern.costImpact}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Performance Improvement:</span>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600">{pattern.latencyImpact}%</span>
                      </div>
                    </div>
                    {pattern.tableSize1 && (
                      <div>
                        <span className="text-xs text-gray-500">Table Sizes:</span>
                        <div className="text-sm font-medium text-gray-900">{pattern.tableSize1} {pattern.tableSize2 !== 'N/A' && `| ${pattern.tableSize2}`}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => toggleSection(pattern.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedSection === pattern.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {expandedSection === pattern.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {showOptimized ? 'Optimized Query' : 'Original Query'}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setShowOptimized(!showOptimized)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm"
                          >
                            Show {showOptimized ? 'Original' : 'Optimized'}
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <SyntaxHighlighter
                          language="sql"
                          style={dracula}
                          customStyle={{ margin: 0, padding: '16px', maxHeight: '350px', overflow: 'auto' }}
                        >
                          {showOptimized ? pattern.optimizedQuery : pattern.originalQuery}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <div className="flex items-start">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-indigo-800">AI Optimization Analysis</h4>
                          <div className="prose prose-sm prose-indigo mt-2">
                            <p className="text-indigo-700 whitespace-pre-line">{pattern.optimizationNotes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Database className="h-4 w-4 text-gray-600 mr-1" />
                          Schema Recommendation
                        </h4>
                        <p className="text-sm text-gray-600">
                          {pattern.type === 'hash' && 'Consider partitioning both tables on join key fields if possible. Adding clustering will further improve join performance.'}
                          {pattern.type === 'broadcast' && 'Keep the smaller table under 10 GB for efficient broadcast joins. Consider denormalizing very small lookup tables.'}
                          {pattern.type === 'nested-loop' && 'Use nested and repeated fields (ARRAY and STRUCT types) to maintain relationships while reducing JOIN operations.'}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Cpu className="h-4 w-4 text-gray-600 mr-1" />
                          Performance Impact
                        </h4>
                        <p className="text-sm text-gray-600">
                          {pattern.type === 'hash' && `Hash joins between large tables can be resource-intensive. The optimization reduces data processed by ${pattern.costImpact}% and improves query execution time by ${pattern.latencyImpact}%.`}
                          {pattern.type === 'broadcast' && `Broadcast joins work well when one table is much smaller. This optimization improves performance by ${pattern.latencyImpact}% by ensuring BigQuery uses an efficient join strategy.`}
                          {pattern.type === 'nested-loop' && `Using nested structures can reduce the need for expensive JOINs. This approach reduces cost by ${pattern.costImpact}% and improves data access patterns.`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button className="px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Optimized Query
                      </button>
                      <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center">
                        <Play className="h-4 w-4 mr-1" />
                        Test Performance
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-900">Detected Join Patterns in Your Environment</h3>
              <p className="text-sm text-green-700 mt-1">
                Our AI has analyzed your query patterns and found {activePattern === 'large-to-large' ? '8' : activePattern === 'small-to-large' ? '12' : '5'} instances of 
                {' '}{activePattern === 'large-to-large' ? 'large-to-large joins' : activePattern === 'small-to-large' ? 'small-to-large joins' : 'queries with nested structures'} that could be optimized.
              </p>
              
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-green-200">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                    <h4 className="text-sm font-medium text-green-800">Potential Monthly Savings</h4>
                  </div>
                  <p className="text-xl font-bold text-green-700 mt-1">
                    ${activePattern === 'large-to-large' ? '3,800' : activePattern === 'small-to-large' ? '1,650' : '2,200'}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                    <h4 className="text-sm font-medium text-green-800">Implementation Effort</h4>
                  </div>
                  <p className="text-sm font-medium text-green-700 mt-1">
                    {activePattern === 'large-to-large' ? 'Medium (1-2 days)' : activePattern === 'small-to-large' ? 'Low (2-4 hours)' : 'Medium (1-2 days)'}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                    <h4 className="text-sm font-medium text-green-800">Most Common Pattern</h4>
                  </div>
                  <p className="text-sm font-medium text-green-700 mt-1">
                    {activePattern === 'large-to-large' ? 'Event analytics joins' : activePattern === 'small-to-large' ? 'Dimension lookups' : 'Order-items nesting'}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Generate Optimization Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}