import { useState } from 'react';
import { BookOpen, FileText, BarChart, Database, Zap, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface StrategyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  difficulty: 'Low' | 'Medium' | 'High';
  saving: string;
  expanded: boolean;
  onToggle: () => void;
  details: string;
}

function StrategyCard({
  icon,
  title,
  description,
  impact,
  difficulty,
  saving,
  expanded,
  onToggle,
  details
}: StrategyCardProps) {
  const difficultyColor = 
    difficulty === 'Low' ? 'bg-green-100 text-green-800' :
    difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 
    'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="mr-3 bg-indigo-100 p-2 rounded-full">
            {icon}
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Impact: {impact}
          </span>
          <span className={`px-2 py-1 ${difficultyColor} text-xs font-medium rounded-full`}>
            Effort: {difficulty}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Saving: {saving}
          </span>
        </div>
        
        <button
          onClick={onToggle}
          className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          {expanded ? 'Hide details' : 'View details'}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <ReactMarkdown className="prose prose-sm max-w-none">
            {details}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export function OptimizationStrategies() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const strategies = [
    {
      id: "partition",
      icon: <Database className="w-5 h-5 text-indigo-600" />,
      title: "Table Partitioning & Clustering",
      description: "Organize data into partitions based on date/time fields and cluster by frequently filtered columns.",
      impact: "High",
      difficulty: "Low" as const,
      saving: "40-60%",
      details: `
## Table Partitioning Strategy

Partitioning divides tables into segments based on a column value, typically a date. This allows BigQuery to scan only relevant partitions.

### Implementation:
\`\`\`sql
CREATE OR REPLACE TABLE mydataset.partitioned_table
PARTITION BY DATE(timestamp_column)
AS SELECT * FROM mydataset.original_table;
\`\`\`

### Best practices:
- Choose columns with high cardinality
- Partition by date for time-series data
- Maximum 4,000 partitions per table

### Cost Impact:
When querying a single day of data in a year-long table, you'll pay for ~1/365 of the data processing cost.

## Clustering Strategy
After partitioning, cluster tables by frequently filtered columns.

\`\`\`sql
CREATE OR REPLACE TABLE mydataset.partitioned_clustered_table
PARTITION BY DATE(timestamp_column)
CLUSTER BY user_id, region
AS SELECT * FROM mydataset.original_table;
\`\`\`

This further reduces costs when querying specific users or regions.
`
    },
    {
      id: "materialized",
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      title: "Materialized Views",
      description: "Pre-compute and store complex query results that are frequently accessed.",
      impact: "High",
      difficulty: "Medium" as const,
      saving: "50-75%",
      details: `
## Materialized Views Strategy

Materialized views pre-compute and store query results, dramatically reducing costs for frequently run queries.

### Implementation:
\`\`\`sql
CREATE MATERIALIZED VIEW mydataset.mv_daily_summary
AS SELECT
  DATE(timestamp) as day,
  user_region,
  COUNT(*) as event_count,
  SUM(purchase_amount) as daily_revenue
FROM mydataset.events
GROUP BY 1, 2;
\`\`\`

### Key benefits:
- Automatically updated when base tables change
- Incremental maintenance (only processes new/changed data)
- Query optimizer automatically uses materialized views when applicable

### Cost Impact Analysis:
- Original query: Processes 5TB daily = $31.25/day
- With materialized view: Processes only new data (50GB) = $0.31/day
- Monthly savings: ~$930 per query pattern

### Best For:
- Aggregate queries (SUM, COUNT, AVG)
- Queries run multiple times daily
- Reports and dashboards
`
    },
    {
      id: "column",
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      title: "Column Selection & Query Tuning",
      description: "Select only needed columns and optimize WHERE clauses to minimize data scanned.",
      impact: "Medium",
      difficulty: "Low" as const,
      saving: "30-50%",
      details: `
## Column Selection Strategy

BigQuery pricing is based on bytes processed, so scanning fewer columns directly reduces costs.

### Before Optimization:
\`\`\`sql
-- DON'T DO THIS
SELECT * 
FROM mydataset.large_table
WHERE date_column > '2023-01-01'
\`\`\`

### After Optimization:
\`\`\`sql
-- DO THIS INSTEAD
SELECT 
  user_id,
  transaction_date,
  transaction_amount
FROM mydataset.large_table
WHERE date_column > '2023-01-01'
\`\`\`

### Cost Impact:
A table with 100 columns where you only need 3 = ~97% cost reduction per query.

## WHERE Clause Optimization

### Before Optimization:
\`\`\`sql
-- INEFFICIENT: Forces full table scan
SELECT user_id, transaction_amount 
FROM mydataset.transactions
WHERE CAST(transaction_date AS DATE) = '2023-03-15'
\`\`\`

### After Optimization:
\`\`\`sql
-- EFFICIENT: Uses partition pruning
SELECT user_id, transaction_amount 
FROM mydataset.transactions
WHERE transaction_date BETWEEN '2023-03-15' AND '2023-03-16'
\`\`\`

This optimization works with partitioned tables to drastically reduce data scanned.
`
    },
    {
      id: "cache",
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      title: "Query Results Caching",
      description: "Leverage BigQuery's automatic 24-hour caching to avoid redundant processing costs.",
      impact: "High",
      difficulty: "Low" as const,
      saving: "Up to 100%",
      details: `
## Query Results Caching Strategy

BigQuery automatically caches query results for 24 hours. Identical queries within this period incur zero processing costs.

### How to maximize cache utilization:

1. **Use consistent query formatting**
   - Even minor differences (spaces, capitalization) create cache misses
   - Consider using query templates or stored procedures

2. **Avoid non-deterministic functions**
   - Functions like CURRENT_TIMESTAMP() bypass cache
   - For time-based queries, use explicit timestamps instead:
   \`\`\`sql
   -- Instead of: WHERE timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
   -- Use: WHERE timestamp > TIMESTAMP('2023-06-01')
   \`\`\`

3. **Monitor cache hit rates**
   \`\`\`sql
   SELECT
     cache_hit,
     COUNT(*) as query_count,
     SUM(total_bytes_processed)/1000000000 as total_gb_processed
   FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
   WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
   GROUP BY cache_hit
   \`\`\`

### Business Impact:
An organization running the same daily reports multiple times per day can save 50-80% on query costs by implementing proper cache utilization strategies.
`
    },
    {
      id: "slot",
      icon: <BarChart className="w-5 h-5 text-indigo-600" />,
      title: "Slot Utilization (Capacity Model)",
      description: "For capacity pricing, optimize workload management to maximize slot usage efficiency.",
      impact: "High",
      difficulty: "High" as const,
      saving: "20-40%",
      details: `
## Slot Utilization Optimization

For organizations using capacity-based (flat-rate) pricing, maximizing slot utilization is key to getting the most value.

### Implementation Strategies:

1. **Workload Management with Reservations**
   \`\`\`sql
   -- Create assignment for critical workloads
   CREATE ASSIGNMENT \`project-id\`.region-us.critical_reservation
   OPTIONS (
     assignee = 'projects/project-id',
     job_type = 'QUERY',
     assignee_type = 'PROJECT'
   );
   \`\`\`

2. **Job Scheduling**
   - Schedule non-urgent jobs during off-peak hours
   - Use INFORMATION_SCHEMA.JOBS to identify peak usage periods:
   \`\`\`sql
   SELECT
     EXTRACT(HOUR FROM creation_time) as hour_of_day,
     COUNT(*) as query_count,
     AVG(total_slot_ms)/1000 as avg_slot_seconds
   FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
   WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
   GROUP BY 1
   ORDER BY 1
   \`\`\`

3. **Slot Monitoring Dashboard**
   - Create real-time monitoring of slot usage
   - Set alerts for underutilization periods

### Business Impact:
Organizations typically over-provision slots by 30-50%. Proper slot management can reduce commitment levels while maintaining performance, resulting in direct cost savings on annual commitments.

### Cost Calculation Example:
- Current: 500 slots at $20/slot/month = $10,000/month
- Optimized: 350 slots at $20/slot/month = $7,000/month
- Annual savings: $36,000
`
    },
    {
      id: "storage",
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      title: "Storage Optimization",
      description: "Implement lifecycle policies and use appropriate storage models to reduce storage costs.",
      impact: "Medium",
      difficulty: "Medium" as const,
      saving: "30-60%",
      details: `
## Storage Optimization Strategy

BigQuery charges differently for active vs long-term storage, with significant cost differences.

### Storage Pricing:
- Active storage: $0.02/GB/month (data modified in last 90 days)
- Long-term storage: $0.01/GB/month (data not modified in 90+ days)

### Implementation Strategies:

1. **Table Expiration Policies**
   \`\`\`sql
   -- Set table to expire after 30 days
   CREATE OR REPLACE TABLE mydataset.temporary_analysis
   OPTIONS(
     expiration_timestamp = TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
   )
   AS SELECT * FROM mydataset.source_data;
   \`\`\`

2. **Partition Expiration**
   \`\`\`sql
   -- Automatically delete partitions older than 90 days
   CREATE OR REPLACE TABLE mydataset.events
   PARTITION BY DATE(timestamp)
   OPTIONS(
     partition_expiration_days = 90
   )
   AS SELECT * FROM mydataset.raw_events;
   \`\`\`

3. **Data Compression Strategy**
   - Use appropriate column types (INT64 vs STRING)
   - Consider nested and repeated fields for structured data
   - Avoid redundant denormalized data where possible

### Cost Analysis Example:
- Organization with 100TB total storage
- Before: 80TB active ($1,600/month), 20TB long-term ($200/month)
- After optimization: 40TB active ($800/month), 40TB long-term ($400/month), 20TB deleted
- Monthly savings: $600 (30% reduction)
`
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">BigQuery Cost Optimization Strategies</h2>
        <p className="text-gray-600 mt-1">
          Implement these techniques to significantly reduce your BigQuery costs while maintaining performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map(strategy => (
          <StrategyCard
            key={strategy.id}
            {...strategy}
            expanded={expandedId === strategy.id}
            onToggle={() => setExpandedId(expandedId === strategy.id ? null : strategy.id)}
          />
        ))}
      </div>
    </div>
  );
}