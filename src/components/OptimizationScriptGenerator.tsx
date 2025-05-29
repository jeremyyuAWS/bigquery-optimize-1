import { useState } from 'react';
import { Database, Code, Copy, Check, Zap, Download, Trash } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { saveAs } from 'file-saver';

// Register the language
SyntaxHighlighter.registerLanguage('sql', sql);

interface OptimizationCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  count: number;
  scripts: OptimizationScript[];
}

interface OptimizationScript {
  id: string;
  name: string;
  description: string;
  savings: string;
  savingsAmount: number;
  difficulty: 'Low' | 'Medium' | 'High';
  script: string;
}

export function OptimizationScriptGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('partition');
  const [selectedScriptId, setSelectedScriptId] = useState<string>('partition-sales');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const categories: OptimizationCategory[] = [
    {
      id: 'partition',
      name: 'Table Partitioning',
      icon: <Database className="h-5 w-5 text-blue-600" />,
      description: 'Create partitioned tables to improve performance and reduce costs',
      count: 5,
      scripts: [
        {
          id: 'partition-sales',
          name: 'Partition Sales Table by Date',
          description: 'Create a date-partitioned version of the sales_data table to reduce query costs',
          savings: '67% cost reduction',
          savingsAmount: 7800,
          difficulty: 'Low',
          script: `-- Create a partitioned version of sales_data table
CREATE OR REPLACE TABLE \`project_id.dataset.sales_data_partitioned\`
PARTITION BY DATE(transaction_date)
CLUSTER BY customer_id, product_id
AS SELECT * FROM \`project_id.dataset.sales_data\`;

-- Validate the new partitioned table
SELECT
  table_name,
  partition_id,
  total_rows,
  total_logical_bytes / POW(1024, 3) as total_gb
FROM
  \`project_id.dataset.INFORMATION_SCHEMA.PARTITIONS\`
WHERE
  table_name = 'sales_data_partitioned'
ORDER BY
  partition_id DESC
LIMIT 10;

-- Update queries to use the partitioned table (example)
-- Before: 
-- SELECT * FROM \`project_id.dataset.sales_data\` 
-- WHERE DATE(transaction_date) = '2024-03-15'

-- After:
SELECT * FROM \`project_id.dataset.sales_data_partitioned\` 
WHERE transaction_date >= '2024-03-15' 
  AND transaction_date < '2024-03-16'`
        },
        {
          id: 'partition-events',
          name: 'Partition Events Table with Expiration',
          description: 'Create a date-partitioned events table with automatic partition expiration',
          savings: '71% cost reduction',
          savingsAmount: 5200,
          difficulty: 'Low',
          script: `-- Create a partitioned events table with 90-day partition expiration
CREATE OR REPLACE TABLE \`project_id.dataset.events_partitioned\`
PARTITION BY DATE(event_timestamp)
OPTIONS(
  partition_expiration_days = 90
)
CLUSTER BY user_id, event_type
AS SELECT * FROM \`project_id.dataset.events\`;

-- Verify partition expiration settings
SELECT
  schema_name,
  table_name,
  option_name,
  option_value
FROM
  \`project_id.dataset.INFORMATION_SCHEMA.TABLE_OPTIONS\`
WHERE
  table_name = 'events_partitioned'
  AND option_name = 'partition_expiration_days';

-- Update application queries (example)
-- Before: 
-- SELECT * FROM \`project_id.dataset.events\` 
-- WHERE TIMESTAMP_TRUNC(event_timestamp, DAY) = '2024-03-01'

-- After:
SELECT * FROM \`project_id.dataset.events_partitioned\` 
WHERE DATE(event_timestamp) = '2024-03-01'`
        },
        {
          id: 'partition-analytics',
          name: 'Partition Analytics Tables',
          description: 'Create partitioned analytics tables from daily batch processing',
          savings: '65% cost reduction',
          savingsAmount: 3500,
          difficulty: 'Medium',
          script: `-- Create a partitioned analytics table
CREATE OR REPLACE TABLE \`project_id.dataset.analytics_data_partitioned\`
PARTITION BY DATE(report_date)
CLUSTER BY region, product_category
AS SELECT * FROM \`project_id.dataset.analytics_data\`;

-- Create a scheduled query to populate daily partitions
CREATE OR REPLACE TABLE \`project_id.dataset.analytics_data_partitioned$20240315\` AS
SELECT * FROM \`project_id.dataset.analytics_raw\` 
WHERE DATE(report_date) = '2024-03-15';

-- Create a stored procedure to automate daily partition loading
CREATE OR REPLACE PROCEDURE \`project_id.dataset.load_analytics_partition\`(load_date DATE)
BEGIN
  DECLARE partition_id STRING;
  SET partition_id = FORMAT_DATE('%Y%m%d', load_date);
  
  EXECUTE IMMEDIATE FORMAT("""
    CREATE OR REPLACE TABLE \`project_id.dataset.analytics_data_partitioned$%s\` AS
    SELECT * FROM \`project_id.dataset.analytics_raw\` 
    WHERE DATE(report_date) = '%t'
  """, partition_id, load_date);
END;`
        },
      ]
    },
    {
      id: 'materialize',
      name: 'Materialized Views',
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      description: 'Create materialized views for frequently run queries',
      count: 3,
      scripts: [
        {
          id: 'mv-daily-sales',
          name: 'Daily Sales Aggregation View',
          description: 'Create a materialized view for daily sales metrics',
          savings: '94% cost reduction',
          savingsAmount: 4200,
          difficulty: 'Low',
          script: `-- Create materialized view for daily sales aggregations
CREATE MATERIALIZED VIEW \`project_id.dataset.mv_daily_sales\`
AS SELECT
  DATE(transaction_date) AS day,
  product_category,
  store_id,
  COUNT(*) AS transaction_count,
  SUM(amount) AS total_sales,
  AVG(amount) AS avg_sale_amount
FROM \`project_id.dataset.transactions\`
GROUP BY 1, 2, 3;

-- Query the materialized view instead of the raw table
SELECT 
  day,
  product_category,
  SUM(total_sales) AS category_sales
FROM \`project_id.dataset.mv_daily_sales\`
WHERE day BETWEEN '2024-01-01' AND '2024-03-31'
GROUP BY 1, 2
ORDER BY 1, 2;

-- Check materialized view refreshes
SELECT
  table_name,
  refresh_time,
  last_refresh_time,
  refresh_watermark
FROM
  \`project_id.dataset.INFORMATION_SCHEMA.MATERIALIZED_VIEWS\`
WHERE
  table_name = 'mv_daily_sales';`
        },
        {
          id: 'mv-user-metrics',
          name: 'User Engagement Metrics View',
          description: 'Create a materialized view for user engagement metrics',
          savings: '87% cost reduction',
          savingsAmount: 3800,
          difficulty: 'Medium',
          script: `-- Create materialized view for user engagement metrics
CREATE MATERIALIZED VIEW \`project_id.dataset.mv_user_engagement\`
AS SELECT
  DATE(event_timestamp) AS day,
  user_id,
  COUNT(DISTINCT session_id) AS session_count,
  SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
  SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) AS clicks,
  SUM(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS purchases,
  MAX(timestamp_diff(
    MAX(event_timestamp) OVER (PARTITION BY user_id, session_id),
    MIN(event_timestamp) OVER (PARTITION BY user_id, session_id),
    SECOND
  )) AS max_session_duration_seconds
FROM \`project_id.dataset.user_events\`
GROUP BY 1, 2;

-- Query the materialized view for daily active users
SELECT
  day,
  COUNT(DISTINCT user_id) AS daily_active_users,
  SUM(session_count) AS total_sessions,
  SUM(page_views) AS total_page_views
FROM \`project_id.dataset.mv_user_engagement\`
WHERE day BETWEEN '2024-02-01' AND '2024-02-29'
GROUP BY 1
ORDER BY 1;`
        },
      ]
    },
    {
      id: 'cleanup',
      name: 'Storage Optimization',
      icon: <Trash className="h-5 w-5 text-green-600" />,
      description: 'Optimize storage for cost reduction',
      count: 2,
      scripts: [
        {
          id: 'cleanup-expiration',
          name: 'Table Expiration Policy',
          description: 'Set up automatic cleanup for temporary tables',
          savings: '15% storage reduction',
          savingsAmount: 850,
          difficulty: 'Low',
          script: `-- Set expiration policy on temporary analysis tables
ALTER TABLE \`project_id.dataset.temp_analysis_results\`
SET OPTIONS (
  expiration_timestamp = TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
);

-- Create a procedure to set expiration on tables matching a pattern
CREATE OR REPLACE PROCEDURE \`project_id.admin.set_temp_table_expiration\`()
BEGIN
  DECLARE table_name STRING;
  DECLARE temp_tables ARRAY<STRING>;
  
  -- Find temporary tables based on naming convention (temp_ prefix)
  EXECUTE IMMEDIATE 'SELECT ARRAY_AGG(table_name) FROM \`project_id.dataset.INFORMATION_SCHEMA.TABLES\` WHERE table_name LIKE "temp_%"'
  INTO temp_tables;
  
  -- Loop through each table and set expiration
  FOR i IN 0 TO ARRAY_LENGTH(temp_tables) - 1 DO
    SET table_name = temp_tables[ORDINAL(i+1)];
    
    EXECUTE IMMEDIATE FORMAT("""
      ALTER TABLE \`project_id.dataset.%s\`
      SET OPTIONS (
        expiration_timestamp = TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
      )
    """, table_name);
  END FOR;
END;

-- Schedule the procedure to run daily
-- This requires the Cloud Scheduler to trigger a Cloud Function that calls this procedure`
        },
        {
          id: 'cleanup-long-term',
          name: 'Long-term Storage Migration',
          description: 'Move cold data to long-term storage bucket',
          savings: '50% storage cost reduction',
          savingsAmount: 1200,
          difficulty: 'Medium',
          script: `-- Create a dataset for cold data (BigQuery automatically moves inactive data to long-term storage)
CREATE SCHEMA IF NOT EXISTS \`project_id.cold_storage\`;

-- Move cold table to the long-term storage dataset
CREATE OR REPLACE TABLE \`project_id.cold_storage.historical_events_2022\` AS
SELECT * FROM \`project_id.dataset.events\`
WHERE DATE(event_timestamp) BETWEEN '2022-01-01' AND '2022-12-31';

-- Verify the data was copied correctly
SELECT COUNT(*) AS copied_rows 
FROM \`project_id.cold_storage.historical_events_2022\`;

-- After verification, delete the data from the original table
DELETE FROM \`project_id.dataset.events\`
WHERE DATE(event_timestamp) BETWEEN '2022-01-01' AND '2022-12-31';

-- Create a view to access all data transparently
CREATE OR REPLACE VIEW \`project_id.dataset.events_all\` AS
SELECT * FROM \`project_id.dataset.events\`
UNION ALL
SELECT * FROM \`project_id.cold_storage.historical_events_2022\`;

-- Update queries to use the view instead of the raw table`
        }
      ]
    },
    {
      id: 'query',
      name: 'Query Optimization',
      icon: <Code className="h-5 w-5 text-amber-600" />,
      description: 'Optimize queries to reduce processing costs',
      count: 3,
      scripts: [
        {
          id: 'query-select-columns',
          name: 'Replace SELECT * with Column Selection',
          description: 'Optimize queries to select only needed columns',
          savings: '64% cost reduction',
          savingsAmount: 3200,
          difficulty: 'Low',
          script: `-- Original query
-- SELECT * 
-- FROM \`project_id.dataset.large_table\`
-- WHERE event_date = '2024-03-15'

-- Optimized query - only select required columns
SELECT
  user_id,
  event_timestamp,
  event_type,
  page_url,
  device_type,
  country_code
FROM \`project_id.dataset.large_table\`
WHERE event_date = '2024-03-15';

-- Create helper view with common columns for standardization
CREATE OR REPLACE VIEW \`project_id.dataset.events_standard\` AS
SELECT
  user_id,
  event_timestamp,
  event_type,
  page_url,
  device_type,
  country_code,
  referrer_url,
  session_id
FROM \`project_id.dataset.large_table\`;

-- Update application queries to use this view
SELECT * FROM \`project_id.dataset.events_standard\`
WHERE DATE(event_timestamp) = '2024-03-15';`
        },
        {
          id: 'query-cache',
          name: 'Query Caching Optimization',
          description: 'Standardize queries to improve cache hit rate',
          savings: '100% cost for repeated queries',
          savingsAmount: 2800,
          difficulty: 'Low',
          script: `-- Original query - uses non-deterministic functions
-- SELECT
--   user_id,
--   COUNT(*) as event_count
-- FROM \`project_id.dataset.events\`
-- WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
-- GROUP BY 1

-- Optimized query - uses explicit timestamps for cache hits
SELECT
  user_id,
  COUNT(*) as event_count
FROM \`project_id.dataset.events\`
WHERE event_timestamp >= TIMESTAMP('2024-03-08')
  AND event_timestamp < TIMESTAMP('2024-03-15')
GROUP BY 1;

-- Create a stored procedure to standardize timestamp ranges
CREATE OR REPLACE PROCEDURE \`project_id.dataset.query_with_date_range\`(start_date DATE, end_date DATE)
BEGIN
  EXECUTE IMMEDIATE FORMAT("""
    SELECT
      user_id,
      COUNT(*) as event_count
    FROM \`project_id.dataset.events\`
    WHERE event_timestamp >= TIMESTAMP('%t')
      AND event_timestamp < TIMESTAMP('%t')
    GROUP BY 1
  """, start_date, end_date);
END;

-- Call the procedure with explicit dates
CALL \`project_id.dataset.query_with_date_range\`('2024-03-08', '2024-03-15');`
        },
        {
          id: 'query-join',
          name: 'Optimize JOIN Operations',
          description: 'Improve JOIN performance and reduce data processed',
          savings: '76% cost reduction',
          savingsAmount: 4100,
          difficulty: 'Medium',
          script: `-- Original query - inefficient JOIN
-- SELECT
--   t1.*,
--   t2.product_name,
--   t2.category,
--   t2.price
-- FROM \`project_id.dataset.transactions\` t1
-- JOIN \`project_id.dataset.products\` t2
-- ON t1.product_id = t2.product_id
-- WHERE t1.transaction_date >= '2024-01-01'

-- Optimized query - filter before JOIN and select specific columns
WITH filtered_transactions AS (
  SELECT
    transaction_id,
    customer_id,
    product_id,
    quantity,
    amount,
    transaction_date
  FROM \`project_id.dataset.transactions\`
  WHERE transaction_date >= '2024-01-01'
)

SELECT
  t.transaction_id,
  t.customer_id,
  t.product_id,
  t.quantity,
  t.amount,
  t.transaction_date,
  p.product_name,
  p.category,
  p.price
FROM filtered_transactions t
JOIN \`project_id.dataset.products\` p
ON t.product_id = p.product_id;

-- Create a helper function for generating optimized JOINs
CREATE OR REPLACE FUNCTION \`project_id.dataset.get_transaction_with_product\`(date_filter DATE)
RETURNS TABLE<
  transaction_id STRING,
  customer_id STRING,
  product_id STRING,
  quantity INT64,
  amount FLOAT64,
  transaction_date TIMESTAMP,
  product_name STRING,
  category STRING,
  price FLOAT64
>
AS (
  WITH filtered_transactions AS (
    SELECT
      transaction_id,
      customer_id,
      product_id,
      quantity,
      amount,
      transaction_date
    FROM \`project_id.dataset.transactions\`
    WHERE transaction_date >= date_filter
  )
  
  SELECT
    t.transaction_id,
    t.customer_id,
    t.product_id,
    t.quantity,
    t.amount,
    t.transaction_date,
    p.product_name,
    p.category,
    p.price
  FROM filtered_transactions t
  JOIN \`project_id.dataset.products\` p
  ON t.product_id = p.product_id
);

-- Call the function
SELECT * FROM \`project_id.dataset.get_transaction_with_product\`('2024-01-01');`
        }
      ]
    }
  ];
  
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];
  const selectedScript = selectedCategoryData.scripts.find(script => script.id === selectedScriptId) || selectedCategoryData.scripts[0];
  
  const copyToClipboard = (script: string, id: string) => {
    navigator.clipboard.writeText(script);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const downloadScript = (script: string, filename: string) => {
    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${filename}.sql`);
  };
  
  // Calculate total potential savings
  const totalSavings = categories.reduce((total, category) => {
    return total + category.scripts.reduce((catTotal, script) => catTotal + script.savingsAmount, 0);
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-indigo-600">
        <div className="flex items-center mb-2">
          <Code className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">SQL Optimization Scripts Generator</h2>
        </div>
        <p className="text-indigo-100">
          Generate ready-to-run SQL scripts to optimize your BigQuery costs
        </p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Available Optimization Scripts</h3>
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            <span className="font-medium">Total potential savings:</span>
            <span className="ml-1 font-bold">${totalSavings.toLocaleString()}/month</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-indigo-50 border border-indigo-200' 
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedScriptId(category.scripts[0].id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-2 font-medium">{category.name}</span>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {category.count} scripts
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{selectedScript.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      Savings: {selectedScript.savings}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedScript.difficulty === 'Low' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedScript.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedScript.difficulty} effort
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{selectedScript.description}</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(selectedScript.script, selectedScript.id)}
                      className="text-gray-300 hover:text-white p-1"
                    >
                      {copiedId === selectedScript.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => downloadScript(selectedScript.script, selectedScript.id)}
                      className="text-gray-300 hover:text-white p-1"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <SyntaxHighlighter
                  language="sql"
                  style={dracula}
                  customStyle={{ margin: 0, padding: '16px', maxHeight: '400px', overflowY: 'auto' }}
                >
                  {selectedScript.script}
                </SyntaxHighlighter>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Available Scripts in {selectedCategoryData.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCategoryData.scripts.map(script => (
                    <div
                      key={script.id}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedScriptId === script.id
                          ? 'border-indigo-300 bg-indigo-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedScriptId(script.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{script.name}</span>
                        <span className="text-green-600 text-sm font-medium">${script.savingsAmount.toLocaleString()}/mo</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 truncate">{script.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}