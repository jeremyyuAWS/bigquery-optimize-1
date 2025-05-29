import { useState } from 'react';
import { Search, BookOpen, FileText, CheckCircle, ArrowRight, ExternalLink, Clock, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Article {
  id: string;
  title: string;
  category: 'query' | 'storage' | 'pricing' | 'schema' | 'performance' | 'general';
  tags: string[];
  excerpt: string;
  content: string;
  readingTime: number;
  lastUpdated: string;
}

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'query' | 'storage' | 'pricing' | 'schema' | 'performance' | 'general'>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  const articles: Article[] = [
    {
      id: 'article-1',
      title: 'BigQuery Query Optimization Best Practices',
      category: 'query',
      tags: ['performance', 'cost', 'optimization'],
      excerpt: 'Learn essential techniques for optimizing BigQuery queries to reduce processing costs and improve performance.',
      content: `# BigQuery Query Optimization Best Practices

## Introduction
BigQuery pricing is based primarily on the amount of data processed by your queries. Optimizing your queries can significantly reduce costs while improving performance.

## Key Optimization Techniques

### 1. Select Only Necessary Columns
Avoid using \`SELECT *\` and explicitly specify only the columns you need.

\`\`\`sql
-- Instead of this:
SELECT * FROM \`project.dataset.table\`

-- Do this:
SELECT id, name, created_at FROM \`project.dataset.table\`
\`\`\`

This can reduce the data scanned by 50-90%, depending on your table structure.

### 2. Filter Early and Effectively
Apply filters as early as possible in your query, especially on partitioned columns.

\`\`\`sql
-- Efficient - will use partition pruning
SELECT * FROM \`project.dataset.events\`
WHERE event_date = '2024-03-01'

-- Inefficient - prevents partition pruning
SELECT * FROM \`project.dataset.events\`
WHERE CAST(event_timestamp AS DATE) = '2024-03-01'
\`\`\`

### 3. Optimize JOINs
Filter data before JOINs, not after. Use subqueries or CTEs to pre-filter your data.

\`\`\`sql
-- Inefficient approach
SELECT a.*, b.*
FROM large_table_a a
JOIN large_table_b b ON a.id = b.id
WHERE a.date = '2024-03-01'

-- Efficient approach
WITH filtered_a AS (
  SELECT * FROM large_table_a
  WHERE date = '2024-03-01'
)
SELECT a.*, b.*
FROM filtered_a a
JOIN large_table_b b ON a.id = b.id
\`\`\`

### 4. Leverage BigQuery's Automatic Cache
BigQuery automatically caches query results for 24 hours. Use deterministic functions to increase cache hits.

\`\`\`sql
-- Won't use cache (non-deterministic)
SELECT * FROM table
WHERE timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)

-- Will use cache (deterministic)
SELECT * FROM table
WHERE timestamp > TIMESTAMP('2024-03-01')
\`\`\`

### 5. Use Approximate Functions
For analytical queries where 100% precision isn't required, use approximate functions.

\`\`\`sql
-- Instead of this:
SELECT COUNT(DISTINCT user_id) FROM events

-- Consider this:
SELECT APPROX_COUNT_DISTINCT(user_id) FROM events
\`\`\`

## Advanced Techniques

### Using Materialized Views
Materialized views can pre-compute expensive operations and automatically stay up-to-date.

\`\`\`sql
CREATE MATERIALIZED VIEW dataset.mv_daily_stats AS
SELECT 
  DATE(timestamp) as day,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users
FROM dataset.events
GROUP BY 1
\`\`\`

### Query Cost Estimation
Before running large queries, estimate the data processing using \`--dry_run\`:

\`\`\`
bq query --use_legacy_sql=false --dry_run 'SELECT * FROM dataset.large_table'
\`\`\`

## Conclusion
By applying these optimization techniques, you can reduce your BigQuery costs by 30-70% while improving query performance.

## Further Resources
- [Official BigQuery Documentation](https://cloud.google.com/bigquery/docs/best-practices-performance-overview)
- [BigQuery Pricing Calculator](https://cloud.google.com/products/calculator)
- [Query Optimization Webinar](https://www.youtube.com/watch?v=yxK3c4IXgHs)`,
      readingTime: 8,
      lastUpdated: '2024-03-10'
    },
    {
      id: 'article-2',
      title: 'BigQuery Storage Optimization Guide',
      category: 'storage',
      tags: ['storage', 'cost', 'optimization'],
      excerpt: 'Discover strategies to optimize BigQuery storage costs through partitioning, clustering, and lifecycle management.',
      content: `# BigQuery Storage Optimization Guide

## Introduction
While BigQuery separates storage and computation costs, optimizing storage can significantly reduce overall costs and improve query performance.

## Storage Pricing Tiers

BigQuery offers two storage pricing tiers:
- **Active Storage**: $0.02 per GB per month (data modified in the past 90 days)
- **Long-term Storage**: $0.01 per GB per month (data not modified for 90+ days)

## Key Optimization Techniques

### 1. Table Partitioning
Partitioning divides your tables into segments based on a column value, typically a date.

\`\`\`sql
-- Create a partitioned table
CREATE OR REPLACE TABLE dataset.events_partitioned
PARTITION BY DATE(timestamp)
AS SELECT * FROM dataset.events
\`\`\`

Benefits:
- Enables efficient query pruning (only scans relevant partitions)
- Makes it easier to manage data lifecycle
- Improves query performance and reduces costs

### 2. Partition Expiration
Automatically delete old partitions to save storage and enforce data retention policies.

\`\`\`sql
-- Create a partitioned table with 90-day expiration
CREATE OR REPLACE TABLE dataset.events_with_expiration
PARTITION BY DATE(timestamp)
OPTIONS(
  partition_expiration_days = 90
)
AS SELECT * FROM dataset.events
\`\`\`

### 3. Clustering
Clustering organizes data based on the content of one or more columns.

\`\`\`sql
-- Create a partitioned and clustered table
CREATE OR REPLACE TABLE dataset.events_optimized
PARTITION BY DATE(timestamp)
CLUSTER BY user_id, event_type
AS SELECT * FROM dataset.events
\`\`\`

Benefits:
- Further reduces data scanned when filtering on clustered columns
- Complements partitioning for improved performance
- No additional storage cost

### 4. Compression and Column Types
Use appropriate data types to minimize storage requirements.

- Use INT64 instead of STRING for numeric values
- Use BYTES instead of STRING for binary data
- Consider nested and repeated fields for structured data

### 5. Materialized Views
Materialized views store results of queries, but count towards storage costs.

\`\`\`sql
CREATE MATERIALIZED VIEW dataset.mv_daily_aggregations
AS SELECT
  DATE(timestamp) as day,
  COUNT(*) as count,
  SUM(value) as total
FROM dataset.events
GROUP BY 1
\`\`\`

## Storage Management Strategies

### Regular Cleanup
Identify and remove unnecessary tables and views:

\`\`\`sql
-- Find tables older than 6 months with no recent queries
SELECT
  table_schema,
  table_name,
  creation_time,
  last_modified_time,
  size_bytes / 1000000000 as size_gb
FROM region-us.INFORMATION_SCHEMA.TABLE_STORAGE
WHERE last_modified_time < TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 180 DAY)
ORDER BY size_bytes DESC
\`\`\`

### Monitoring Storage Growth
Track your storage growth to identify unexpected increases:

\`\`\`sql
SELECT
  DATE_TRUNC(creation_time, MONTH) as month,
  SUM(size_bytes) / 1000000000 as total_gb
FROM region-us.INFORMATION_SCHEMA.TABLE_STORAGE
GROUP BY 1
ORDER BY 1
\`\`\`

## Conclusion
By implementing these storage optimization techniques, you can reduce your BigQuery storage costs by 30-60% while improving query performance.

## Further Resources
- [BigQuery Storage Best Practices](https://cloud.google.com/bigquery/docs/best-practices-storage)
- [Partitioning and Clustering Documentation](https://cloud.google.com/bigquery/docs/partitioned-tables)
- [Storage Management Webinar](https://www.youtube.com/watch?v=lVRYbKBQUH0)`,
      readingTime: 7,
      lastUpdated: '2024-03-05'
    },
    {
      id: 'article-3',
      title: 'Understanding BigQuery Pricing Models',
      category: 'pricing',
      tags: ['cost', 'pricing', 'on-demand', 'flat-rate'],
      excerpt: 'A comprehensive comparison of BigQuery on-demand and flat-rate pricing models to help you choose the right option.',
      content: `# Understanding BigQuery Pricing Models

## Introduction
BigQuery offers two main pricing models: on-demand (pay per query) and flat-rate (capacity-based). Understanding the differences helps you choose the right model for your workload.

## On-Demand Pricing Model

On-demand pricing charges you based on the amount of data processed by your queries.

### Key Characteristics
- **Cost**: $6.25 per TB of data processed
- **No Minimum Commitment**: Pay only for what you use
- **First 1TB Free**: Each month, your first 1TB of query data is free
- **Storage Costs**: Separate from query costs ($0.02/GB/month for active storage)

### Ideal For
- Sporadic, unpredictable workloads
- Small to medium-sized organizations just starting with BigQuery
- Development and testing environments
- Organizations processing less than 250TB per month

## Flat-Rate (Capacity) Pricing Model

Flat-rate pricing provides dedicated query processing capacity (slots) for a fixed monthly price.

### Key Characteristics
- **Slots**: Processing capacity units purchased in 100-slot increments
- **Pricing**: Starting at approximately $2,000 per month for 100 slots (annual commitment)
- **Unlimited Queries**: Run any number of queries without additional costs
- **Commitment Required**: Available as monthly or annual commitments
- **Storage Costs**: Still charged separately, same as on-demand

### Ideal For
- Consistent, predictable query workloads
- Large organizations with high data processing needs
- Production environments requiring reliable performance
- Organizations processing more than 500TB per month
- Multi-project environments that can share slot capacity

## Decision Framework

### When to Choose On-Demand
- Processing less than 250TB per month
- Highly variable workloads
- Budget constraints preventing upfront commitment
- Starting with BigQuery or proof-of-concept projects

### When to Choose Flat-Rate
- Processing more than 500TB per month
- Stable, predictable query workloads
- Need for predictable billing
- Large organization with multiple teams/projects
- SLA requirements for query performance

### Break-Even Analysis
The break-even point between on-demand and flat-rate is approximately:
- 100 slots ($2,000/month) ≈ 320TB per month
- 500 slots ($8,000/month) ≈ 1,280TB per month
- 1,000 slots ($12,000/month) ≈ 1,920TB per month

## Hybrid Approach
Some organizations adopt a hybrid approach:
- Use flat-rate for production workloads
- Use on-demand for development/testing environments
- Separate projects for different billing models

## Monitoring and Optimization

Regardless of your chosen pricing model, monitor and optimize:

\`\`\`sql
-- For on-demand pricing, track data processed
SELECT
  project_id,
  SUM(total_bytes_processed)/1000000000000 as TB_processed,
  SUM(total_bytes_processed)/1000000000000 * 6.25 as estimated_cost_usd
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
  AND statement_type != 'SCRIPT'
  AND cache_hit = FALSE
GROUP BY 1
ORDER BY 2 DESC
\`\`\`

\`\`\`sql
-- For flat-rate pricing, track slot utilization
SELECT
  project_id,
  AVG(total_slot_ms)/1000/60/60 as avg_slot_hours
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
GROUP BY 1
ORDER BY 2 DESC
\`\`\`

## Conclusion
Choose your pricing model carefully based on your workload characteristics and budget constraints. Monitor usage regularly and re-evaluate as your needs evolve.

## Further Resources
- [Official BigQuery Pricing Page](https://cloud.google.com/bigquery/pricing)
- [Flat-Rate vs On-Demand Pricing Calculator](https://cloud.google.com/blog/products/data-analytics/understanding-bigquery-reservation-model-for-scaling-analytics)
- [BigQuery Pricing Webinar](https://www.youtube.com/watch?v=97JW6_tKmvY)`,
      readingTime: 9,
      lastUpdated: '2024-02-28'
    },
    {
      id: 'article-4',
      title: 'BigQuery Schema Design Optimization',
      category: 'schema',
      tags: ['schema', 'optimization', 'performance'],
      excerpt: 'Learn how to design optimal BigQuery schemas for performance and cost efficiency.',
      content: `# BigQuery Schema Design Optimization

## Introduction
Effective schema design in BigQuery is crucial for both query performance and cost efficiency. This guide covers best practices for designing optimized BigQuery schemas.

## Core Schema Design Principles

### 1. Denormalization is Often Preferred
Unlike traditional databases, BigQuery often performs better with denormalized schemas.

Benefits:
- Reduces expensive JOIN operations
- Simplifies queries
- Often improves performance

Example:
\`\`\`sql
-- Instead of separate tables that require JOINs:
CREATE OR REPLACE TABLE dataset.orders_denormalized AS
SELECT
  o.order_id,
  o.order_date,
  o.customer_id,
  c.name as customer_name,
  c.email as customer_email,
  p.product_id,
  p.name as product_name,
  p.category as product_category,
  p.price as product_price
FROM dataset.orders o
JOIN dataset.customers c ON o.customer_id = c.customer_id
JOIN dataset.order_items oi ON o.order_id = oi.order_id
JOIN dataset.products p ON oi.product_id = p.product_id
\`\`\`

### 2. Partitioning Strategy
Choose partitioning columns based on how data is commonly filtered:

\`\`\`sql
-- Partition by date for time-series data
CREATE OR REPLACE TABLE dataset.events
PARTITION BY DATE(timestamp)
AS SELECT * FROM dataset.events_raw
\`\`\`

Partitioning Options:
- **Time-unit column**: Most common, partition by day/month/year
- **Integer range**: For numeric partitioning (e.g., user_id ranges)
- **Ingestion time**: When data doesn't have a natural time dimension

### 3. Clustering Strategy
Cluster by columns frequently used in filters and aggregations:

\`\`\`sql
-- Partition by date and cluster by commonly filtered columns
CREATE OR REPLACE TABLE dataset.events
PARTITION BY DATE(timestamp)
CLUSTER BY user_id, event_type
AS SELECT * FROM dataset.events_raw
\`\`\`

Best Clustering Columns:
- High-cardinality columns used in WHERE clauses
- Columns used in GROUP BY statements
- Columns used in JOIN conditions
- Up to 4 clustering columns per table

### 4. Nested and Repeated Fields
Use nested and repeated fields for complex data structures:

\`\`\`sql
-- Table with nested and repeated fields
CREATE OR REPLACE TABLE dataset.user_sessions (
  user_id STRING,
  session_id STRING,
  session_start TIMESTAMP,
  session_end TIMESTAMP,
  device STRUCT<
    type STRING,
    os STRING,
    browser STRING
  >,
  events ARRAY<STRUCT<
    event_type STRING,
    timestamp TIMESTAMP,
    properties STRING
  >>
)
\`\`\`

Benefits:
- Reduces storage by avoiding duplication
- Maintains logical data relationships
- Simplifies queries with UNNEST for repeated fields

## Schema Evolution Best Practices

### Adding Columns
BigQuery allows adding columns without table recreation:

\`\`\`sql
ALTER TABLE dataset.table
ADD COLUMN new_field STRING
\`\`\`

### Handling Schema Changes
For major changes:

\`\`\`sql
-- Create new table with desired schema
CREATE OR REPLACE TABLE dataset.table_new
AS SELECT 
  existing_field1,
  existing_field2,
  CAST(existing_field3 AS STRING) as renamed_field
FROM dataset.table_old
\`\`\`

## Performance Optimization Techniques

### 1. Use Appropriate Data Types
- Use INT64 instead of STRING for numeric IDs
- Use BYTES instead of STRING for binary data
- Use DATE instead of TIMESTAMP when time is not needed

### 2. Column Ordering
Order columns by frequency of use:
- Most frequently accessed columns first
- Large string/binary columns last

### 3. Default Values and NOT NULL Constraints
Add constraints to maintain data quality:

\`\`\`sql
CREATE OR REPLACE TABLE dataset.events (
  event_id STRING NOT NULL,
  user_id STRING NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  event_type STRING NOT NULL,
  value FLOAT64 DEFAULT 0.0,
  properties STRING
)
\`\`\`

## Monitoring Schema Effectiveness

Track query performance against your schema:

\`\`\`sql
SELECT
  table_name,
  total_rows,
  total_logical_bytes / POW(1024, 3) as size_gb,
  total_partitions
FROM
  \`project.region-us.INFORMATION_SCHEMA.TABLE_STORAGE\`
WHERE
  table_schema = 'dataset'
ORDER BY
  size_gb DESC
\`\`\`

## Conclusion
Effective schema design in BigQuery balances data organization, query performance, and cost efficiency. Regular monitoring and refinement of schemas based on actual usage patterns can lead to significant performance improvements and cost savings.

## Further Resources
- [BigQuery Schema Design Documentation](https://cloud.google.com/bigquery/docs/schemas)
- [Schema Design for Time-Series Data](https://cloud.google.com/architecture/bigquery-time-series-data)
- [Advanced Schema Design Webinar](https://www.youtube.com/watch?v=gSqVf37AvWo)`,
      readingTime: 12,
      lastUpdated: '2024-02-15'
    },
    {
      id: 'article-5',
      title: 'Maximizing BigQuery Performance',
      category: 'performance',
      tags: ['performance', 'optimization', 'slots'],
      excerpt: 'Advanced techniques for improving BigQuery query performance and reducing execution times.',
      content: `# Maximizing BigQuery Performance

## Introduction
While BigQuery automatically optimizes query execution, there are several techniques you can implement to further enhance performance and reduce execution times.

## Understanding BigQuery's Execution Model

BigQuery uses a distributed architecture where:
- Queries are broken into execution stages
- Each stage is processed by multiple workers (slots)
- Slots are units of computational capacity

## Performance Optimization Techniques

### 1. Query Structure Optimization

#### Use CTEs Instead of Subqueries
Common Table Expressions (CTEs) often perform better than nested subqueries.

\`\`\`sql
-- Prefer this:
WITH filtered_data AS (
  SELECT * FROM large_table
  WHERE date = '2024-03-01'
)
SELECT
  field1,
  field2,
  COUNT(*) as count
FROM filtered_data
GROUP BY 1, 2

-- Over this:
SELECT
  field1,
  field2,
  COUNT(*) as count
FROM (
  SELECT * FROM large_table
  WHERE date = '2024-03-01'
)
GROUP BY 1, 2
\`\`\`

#### Filter Early
Apply filters as early as possible in the query execution flow.

\`\`\`sql
-- Filter before JOIN
WITH filtered_users AS (
  SELECT * FROM users
  WHERE country = 'US'
)
SELECT * 
FROM filtered_users u
JOIN orders o ON u.user_id = o.user_id
\`\`\`

#### Optimize JOIN Order
Join smaller tables first, then to larger ones.

### 2. Partitioning and Clustering

Leverage partitioning and clustering for performance:

\`\`\`sql
-- Query that efficiently uses partitioning and clustering
SELECT
  user_id,
  COUNT(*) as event_count
FROM dataset.events
WHERE event_date BETWEEN '2024-01-01' AND '2024-01-31'
  AND user_id BETWEEN 1000 AND 2000
GROUP BY 1
\`\`\`

### 3. Materialized Views
For frequently executed complex queries:

\`\`\`sql
-- Create materialized view for common aggregations
CREATE MATERIALIZED VIEW dataset.mv_daily_metrics
AS SELECT
  DATE(timestamp) as day,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users
FROM dataset.events
GROUP BY 1
\`\`\`

### 4. Approximate Functions

For large-scale analytics where absolute precision isn't required:

\`\`\`sql
-- Instead of exact count distinct
SELECT COUNT(DISTINCT user_id) FROM events

-- Use approximate function (much faster)
SELECT APPROX_COUNT_DISTINCT(user_id) FROM events
\`\`\`

Other approximate functions:
- HLL_COUNT.INIT()
- APPROX_QUANTILES()
- APPROX_TOP_COUNT()

### 5. Workload Management (for Flat-Rate/Enterprise)

#### Reservations and Assignment
Set up workload management for different query types:

\`\`\`sql
-- Create a reservation
CREATE RESERVATION \`project.region-us.admin-reservation\`
    OPTIONS (slot_capacity = 100,
              ignore_idle_slots = false);

-- Create assignment
CREATE ASSIGNMENT \`project.region-us.admin-reservation.assignment\`
    OPTIONS (
      assignee = 'projects/project-id',
      job_type = 'QUERY'
    );
\`\`\`

#### Query Priority
Set specific queries as higher priority:

\`\`\`sql
-- Run an important interactive query
SELECT
  *
FROM dataset.important_table
WHERE date = '2024-03-01'
OPTIONS (
  priority = 'INTERACTIVE'
)
\`\`\`

### 6. Query Tuning Techniques

#### Avoid SELECT *
Always specify only needed columns.

#### Minimize Shuffles
Reduce data redistribution across nodes:

\`\`\`sql
-- May cause excessive shuffling
SELECT
  user_id,
  COUNT(*) as event_count
FROM dataset.events
GROUP BY user_id
HAVING COUNT(*) > 100
ORDER BY event_count DESC
\`\`\`

#### Use Approximate Aggregations
For large datasets where estimates are sufficient:

\`\`\`sql
SELECT
  DATE(timestamp) as day,
  APPROX_QUANTILES(duration, 100)[OFFSET(50)] as median_duration,
  APPROX_QUANTILES(duration, 100)[OFFSET(90)] as p90_duration
FROM dataset.sessions
GROUP BY 1
\`\`\`

## Performance Monitoring

### Query Execution Details
Examine execution details for bottlenecks:

\`\`\`sql
SELECT
  job_id,
  user_email,
  query,
  total_bytes_processed / POW(1024, 3) as gb_processed,
  total_slot_ms / 1000 / 60 as slot_minutes,
  creation_time,
  end_time
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
  AND job_type = 'QUERY'
  AND state = 'DONE'
ORDER BY total_slot_ms DESC
LIMIT 10
\`\`\`

### Slot Utilization Patterns
Identify peak usage times:

\`\`\`sql
SELECT
  EXTRACT(HOUR FROM creation_time) as hour_of_day,
  EXTRACT(DAYOFWEEK FROM creation_time) as day_of_week,
  COUNT(*) as job_count,
  AVG(total_slot_ms)/1000 as avg_slot_seconds
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
GROUP BY 1, 2
ORDER BY 1, 2
\`\`\`

## Conclusion
BigQuery performance optimization is an iterative process. Monitor query execution, identify bottlenecks, and apply these techniques to continually improve performance.

## Further Resources
- [BigQuery Performance Documentation](https://cloud.google.com/bigquery/docs/best-practices-performance-overview)
- [BigQuery Execution Plans Explained](https://cloud.google.com/bigquery/query-plan-explanation)
- [Workload Management Guide](https://cloud.google.com/bigquery/docs/reservations-intro)`,
      readingTime: 10,
      lastUpdated: '2024-03-12'
    },
    {
      id: 'article-6',
      title: 'BigQuery Cost Monitoring and Governance',
      category: 'general',
      tags: ['governance', 'cost', 'monitoring'],
      excerpt: 'Establish effective cost monitoring and governance practices for BigQuery to prevent unexpected expenses.',
      content: `# BigQuery Cost Monitoring and Governance

## Introduction
Effective cost monitoring and governance are essential for managing BigQuery expenses and preventing unexpected bills. This guide outlines best practices for establishing cost controls and governance policies.

## Setting Up Cost Controls

### 1. Custom Quotas
Set custom quotas to limit resource usage:

\`\`\`sql
-- Create custom quota for a project
bq set-quota --project_id=project-id --ingestion_rate=5000000 --storage=500
\`\`\`

### 2. Budget Alerts
Configure budget alerts in Google Cloud Console to receive notifications when spend reaches certain thresholds.

Steps:
1. Navigate to Billing > Budgets & alerts
2. Create a budget for your BigQuery usage
3. Set thresholds at 50%, 75%, 90%, and 100% of your budget
4. Configure email notifications for these thresholds

### 3. Query Validators
Implement query validation before execution:

\`\`\`python
# Example Python function to validate query cost
def validate_query_cost(query_text, max_bytes_threshold=1000000000000):
    """Validates that a query won't process too much data"""
    from google.cloud import bigquery
    
    client = bigquery.Client()
    job_config = bigquery.QueryJobConfig(dry_run=True)
    query_job = client.query(query_text, job_config=job_config)
    
    bytes_processed = query_job.total_bytes_processed
    
    if bytes_processed > max_bytes_threshold:
        return False, f"Query would process {bytes_processed/1000000000} GB, exceeding the limit of {max_bytes_threshold/1000000000} GB"
    
    return True, f"Query will process {bytes_processed/1000000000} GB of data"
\`\`\`

## Cost Monitoring and Analysis

### 1. Project-Level Monitoring
Track costs by project and user:

\`\`\`sql
SELECT
  project_id,
  user_email,
  SUM(total_bytes_processed) / POW(1024, 4) as TiB_processed,
  SUM(total_bytes_processed) / POW(1024, 4) * 6.25 as estimated_cost_usd
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
  AND state = 'DONE'
  AND cache_hit = FALSE
GROUP BY 1, 2
ORDER BY 3 DESC
\`\`\`

### 2. Daily Cost Trends
Monitor daily spending patterns:

\`\`\`sql
SELECT
  DATE(creation_time) as day,
  SUM(total_bytes_processed) / POW(1024, 4) as TiB_processed,
  SUM(total_bytes_processed) / POW(1024, 4) * 6.25 as estimated_cost_usd
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
  AND state = 'DONE'
  AND cache_hit = FALSE
GROUP BY 1
ORDER BY 1
\`\`\`

### 3. Storage Cost Analysis
Monitor storage costs and growth:

\`\`\`sql
SELECT
  table_catalog,
  table_schema,
  table_name,
  total_rows,
  total_logical_bytes / POW(1024, 3) as storage_gb,
  (total_logical_bytes / POW(1024, 3)) * 0.02 as monthly_cost_usd,
  creation_time,
  last_modified_time
FROM \`region-us\`.INFORMATION_SCHEMA.TABLE_STORAGE
ORDER BY storage_gb DESC
LIMIT 20
\`\`\`

## Governance Policies

### 1. Access Control and IAM

Implement least privilege access:

- Use predefined roles like &#x60;roles/bigquery.user&#x60; instead of &#x60;roles/bigquery.admin&#x60;
- Create custom roles for specific permissions
- Use VPC Service Controls for network-level isolation

### 2. Query Governance

Implement organization policies:

\`\`\`
# Example terraform configuration for a BigQuery governance policy
resource "google_organization_policy" "bq_query_cost_control" {
  org_id     = "123456789"
  constraint = "constraints/compute.vmExternalIpAccess"

  list_policy {
    deny {
      values = ["TRUE"]
    }
  }
}
\`\`\`

### 3. Data Access Audit Logs
Enable comprehensive audit logging:

1. Navigate to IAM & Admin > Audit Logs
2. Select BigQuery services
3. Enable Data Access logging for BigQuery

### 4. Custom Cost Attribution

Create a custom cost attribution system:

\`\`\`sql
-- Create a view for cost attribution
CREATE OR REPLACE VIEW \`admin.cost_attribution\` AS
SELECT
  DATE(creation_time) as day,
  project_id,
  user_email,
  REGEXP_EXTRACT(labels.value, r'department:(.*)') as department,
  COUNT(*) as query_count,
  SUM(total_bytes_processed) / POW(1024, 4) as TiB_processed,
  SUM(total_bytes_processed) / POW(1024, 4) * 6.25 as estimated_cost_usd
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS
LEFT JOIN UNNEST(labels) as labels
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND job_type = 'QUERY'
  AND state = 'DONE'
  AND cache_hit = FALSE
  AND labels.key = 'department'
GROUP BY 1, 2, 3, 4
ORDER BY 1, 7 DESC
\`\`\`

## Cost Control Best Practices

1. **Implement Charge-Back Models**: Allocate costs to departments based on usage
2. **Create Cost Centers**: Organize projects into cost centers for better tracking
3. **Regular Cost Reviews**: Schedule monthly cost review meetings
4. **Optimization Bounties**: Reward team members who identify cost-saving opportunities
5. **Query Approval Workflows**: Require approval for queries that exceed certain thresholds

## Conclusion
Effective cost governance is an ongoing process. By implementing monitoring, controls, and policies, you can maintain predictable BigQuery costs while still enabling your teams to derive value from your data.

## Further Resources
- [BigQuery Cost Controls Documentation](https://cloud.google.com/bigquery/docs/cost-controls)
- [BigQuery IAM Documentation](https://cloud.google.com/bigquery/docs/access-control)
- [Cloud Billing Reports](https://cloud.google.com/billing/docs/how-to/reports)`,
      readingTime: 11,
      lastUpdated: '2024-02-20'
    }
  ];
  
  const filteredArticles = articles.filter(article => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const selectedArticle = selectedArticleId 
    ? articles.find(article => article.id === selectedArticleId)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">BigQuery Optimization Knowledge Base</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
            >
              <option value="all">All Categories</option>
              <option value="query">Query Optimization</option>
              <option value="storage">Storage Optimization</option>
              <option value="pricing">Pricing Models</option>
              <option value="schema">Schema Design</option>
              <option value="performance">Performance</option>
              <option value="general">General Guidance</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="col-span-1 border-r border-gray-200 overflow-auto">
          <div className="p-4">
            <h3 className="font-medium text-gray-700 mb-3">
              {filteredArticles.length} Article{filteredArticles.length !== 1 ? 's' : ''}
            </h3>
            
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <div 
                  key={article.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedArticleId === article.id 
                      ? 'bg-indigo-50 border border-indigo-200' 
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setSelectedArticleId(article.id)}
                >
                  <div className="flex items-start">
                    <FileText className={`h-5 w-5 mt-0.5 mr-2 ${
                      article.category === 'query' ? 'text-blue-600' :
                      article.category === 'storage' ? 'text-green-600' :
                      article.category === 'pricing' ? 'text-amber-600' :
                      article.category === 'schema' ? 'text-purple-600' :
                      article.category === 'performance' ? 'text-orange-600' :
                      'text-gray-600'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{article.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readingTime} min read</span>
                        <span className="mx-2">•</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-gray-500 font-medium">No articles found</h3>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-2 overflow-auto">
          {selectedArticle ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{selectedArticle.readingTime} min read</span>
                  <span className="mx-2">•</span>
                  <span>Updated {selectedArticle.lastUpdated}</span>
                </div>
              </div>
              
              <div className="prose prose-indigo max-w-none">
                <ReactMarkdown>
                  {selectedArticle.content}
                </ReactMarkdown>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {selectedArticle.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Share Article
                  </button>
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Was this article helpful?</h4>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">Yes, it helped</button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Not really</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <BookOpen className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
                <h3 className="text-gray-700 font-medium text-lg">Select an article to start reading</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Browse our knowledge base to learn best practices and techniques for optimizing your BigQuery costs and performance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-indigo-50 border-t border-indigo-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-medium text-indigo-900">Need more help?</h3>
            <p className="text-indigo-700 text-sm mt-1">
              Can't find what you're looking for or have specific questions?
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-md border border-indigo-200 shadow-sm hover:bg-indigo-50 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 text-indigo-600 mr-2" />
            <a href="#" className="text-indigo-700 hover:text-indigo-900">
              BigQuery Official Documentation
            </a>
          </div>
          
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 text-indigo-600 mr-2" />
            <a href="#" className="text-indigo-700 hover:text-indigo-900">
              Cost Optimization Webinars
            </a>
          </div>
          
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 text-indigo-600 mr-2" />
            <a href="#" className="text-indigo-700 hover:text-indigo-900">
              Community Forums
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}