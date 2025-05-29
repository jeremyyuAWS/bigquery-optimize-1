import { useState } from 'react';
import { Brain, TrendingDown, DollarSign, Database, Zap, Clock, ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  savings: string;
  difficulty: 'Low' | 'Medium' | 'High';
  category: 'query' | 'storage' | 'pricing' | 'schema';
  details: string;
  aiConfidence: number;
}

export function AIRecommendationEngine() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'query' | 'storage' | 'pricing' | 'schema'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const recommendations: Recommendation[] = [
    {
      id: 'rec-1',
      title: "Implement Materialized Views for Analytics Queries",
      description: "Frequent analytical queries are processing the same data repeatedly. Materialized views can precompute these results.",
      impact: "High Impact",
      savings: "$4,200/month",
      difficulty: "Medium",
      category: "query",
      details: `## AI Analysis

Our AI system has identified 12 query patterns that are run multiple times daily against the same dataset, processing over 50TB of data monthly. These queries perform aggregations that could be precomputed with materialized views.

### Implementation Steps:

1. Create materialized views for the top 5 most expensive aggregation queries:
   - Daily sales by region
   - User engagement metrics
   - Inventory movement analysis
   - Revenue by product category
   - Customer conversion rates

2. Update application code to query these views instead of the base tables

### Cost Analysis:
- Current processing: ~50TB/month = $312.50/month
- With materialized views: ~3.2TB/month = $20/month
- Monthly savings: $292.50 per query pattern

**Total projected savings across all patterns: $4,200/month**`,
      aiConfidence: 95
    },
    {
      id: 'rec-2',
      title: "Implement Partitioning and Clustering on Large Tables",
      description: "5 large tables (>1TB each) are not partitioned, causing full table scans on every query.",
      impact: "High Impact",
      savings: "$3,780/month",
      difficulty: "Low",
      category: "storage",
      details: `## AI Analysis

The AI has identified 5 large tables that are frequently queried with time-based filters, but lack proper partitioning. These tables account for approximately 65% of your total BigQuery processing costs.

### Recommended Schema Changes:

\`\`\`sql
-- Example for largest table (transaction_history)
CREATE OR REPLACE TABLE \`project.dataset.transaction_history_partitioned\`
PARTITION BY DATE(transaction_timestamp)
CLUSTER BY user_id, product_category
AS SELECT * FROM \`project.dataset.transaction_history\`;
\`\`\`

### Similar changes recommended for:
- user_events (partition by event_date, cluster by user_id, event_type)
- product_analytics (partition by date, cluster by product_id)
- marketing_attribution (partition by date, cluster by campaign_id)
- system_logs (partition by log_date, cluster by service_id, severity)

### Cost Impact:
- Current queries process ~630TB/month = $3,937.50
- With partitioning: ~25TB/month = $156.25
- Monthly savings: $3,781.25

**Implementation effort: Approximately 1 day of engineering work**`,
      aiConfidence: 98
    },
    {
      id: 'rec-3',
      title: "Transition to Flat-Rate Pricing Model",
      description: "Based on your stable, high-volume workload pattern, switching from on-demand to flat-rate pricing would be cost-effective.",
      impact: "High Impact",
      savings: "$8,500/month",
      difficulty: "Medium",
      category: "pricing",
      details: `## AI Cost Model Analysis

Our AI has analyzed your BigQuery usage patterns over the past 6 months and detected a consistent, predictable workload that would benefit from flat-rate pricing.

### Current On-Demand Costs:
- Average monthly data processed: 4,800 TB
- Current monthly cost: ~$30,000 ($6.25/TB)

### Recommended Flat-Rate Plan:
- 1,000 dedicated slots with annual commitment
- Monthly cost: $21,500
- Projected monthly savings: $8,500 (28%)

### Additional Benefits:
- Predictable billing
- Unlimited queries with no additional cost
- Ability to prioritize critical workloads using workload management

### Implementation Considerations:
- Requires annual commitment
- May need to implement workload management for optimal slot utilization
- Consider starting with 500 slots and scaling up as needed

**AI confidence: 92% based on your consistent workload patterns**`,
      aiConfidence: 92
    },
    {
      id: 'rec-4',
      title: "Optimize JOIN Operations in ETL Pipeline",
      description: "Daily ETL processes contain inefficient JOINs that process excessive data. Restructuring these operations would reduce costs.",
      impact: "Medium Impact",
      savings: "$1,850/month",
      difficulty: "Medium",
      category: "query",
      details: `## AI Query Analysis

The AI has identified inefficient JOIN patterns in your ETL pipeline that process significantly more data than necessary. The most critical issues are in the following jobs:

1. **Daily Customer Data Integration**
   - Current query processes 2.3TB daily
   - Joins all historical data unnecessarily
   
2. **Product Inventory Reconciliation**
   - Currently uses multiple sequential JOINs
   - Could be optimized with denormalization and pre-filtering

### Recommended Query Pattern Changes:

\`\`\`sql
-- Original Query
SELECT t1.*, t2.*, t3.*
FROM \`large_table_1\` t1
JOIN \`large_table_2\` t2 ON t1.id = t2.id
JOIN \`large_table_3\` t3 ON t1.id = t3.id
WHERE t1.date = CURRENT_DATE()

-- Optimized Query
WITH filtered_data AS (
  SELECT id, field1, field2
  FROM \`large_table_1\`
  WHERE date = CURRENT_DATE()
)
SELECT fd.*, t2.needed_field1, t3.needed_field2
FROM filtered_data fd
JOIN \`large_table_2\` t2 ON fd.id = t2.id
JOIN \`large_table_3\` t3 ON fd.id = t3.id
\`\`\`

### Cost Impact:
- Current processing: ~295TB/month = $1,843.75
- Optimized queries: ~8TB/month = $50
- Monthly savings: ~$1,793.75

**Implementation time estimate: 3-4 developer days**`,
      aiConfidence: 86
    },
    {
      id: 'rec-5',
      title: "Implement Automated Storage Lifecycle Management",
      description: "Historical data older than 90 days is frequently accessed but rarely modified. Moving to long-term storage would reduce costs.",
      impact: "Medium Impact",
      savings: "$750/month",
      difficulty: "Low",
      category: "storage",
      details: `## AI Storage Analysis

The AI has analyzed your data access patterns and identified 15TB of data that hasn't been modified in over 90 days but is still stored as active storage.

### Recommended Actions:

1. **Allow automatic transition to long-term storage:**
   BigQuery automatically moves data that hasn't been modified in 90 days to long-term storage at half the cost. No action is needed except to ensure you're not unnecessarily modifying this data.

2. **Implement table partitioning with expiration for transient data:**
   \`\`\`sql
   CREATE OR REPLACE TABLE \`project.dataset.events_with_expiration\`
   PARTITION BY DATE(event_timestamp)
   OPTIONS(
     partition_expiration_days = 90
   )
   AS SELECT * FROM \`project.dataset.events\`;
   \`\`\`

3. **Create dedicated datasets for different data lifecycles:**
   - hot_data: Frequently accessed and modified
   - warm_data: Frequently accessed, rarely modified
   - cold_data: Rarely accessed, never modified

### Cost Impact:
- Current storage costs: ~$1,500/month
- Optimized storage approach: ~$750/month
- Monthly savings: $750 (50% reduction in storage costs)

**Note: This recommendation has minimal impact on query performance while providing significant cost savings.**`,
      aiConfidence: 94
    },
    {
      id: 'rec-6',
      title: "Implement Query Results Cache Strategy",
      description: "Many identical queries are run multiple times per day. Standardizing query patterns would increase cache hit rates.",
      impact: "Medium Impact",
      savings: "$2,100/month",
      difficulty: "Low",
      category: "query",
      details: `## AI Query Pattern Analysis

The AI has analyzed your query patterns and found that approximately 30% of your daily queries are duplicates but aren't benefiting from BigQuery's automatic 24-hour results cache due to minor text differences or non-deterministic functions.

### Recommended Changes:

1. **Standardize query formatting across applications:**
   - Use consistent capitalization and spacing
   - Format queries using a standard library/tool
   - Consider implementing stored procedures for common queries

2. **Replace non-deterministic functions with deterministic alternatives:**
   - Replace \`CURRENT_TIMESTAMP()\` with explicit timestamps
   - Replace \`CURRENT_DATE()\` with explicit dates
   - Example:
     \`\`\`sql
     -- Instead of:
     WHERE timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
     
     -- Use:
     WHERE timestamp > TIMESTAMP('2024-03-15')
     \`\`\`

3. **Implement query templating system in application code**

### Cost Impact:
- Current duplicate query costs: ~$2,100/month
- With proper cache utilization: ~$0/month (cached queries are free)
- Monthly savings: $2,100 (100% of duplicate query costs)

**Implementation difficulty: Low (primarily requires developer education and code standards)**`,
      aiConfidence: 89
    },
    {
      id: 'rec-7',
      title: "Implement BigQuery BI Engine for Dashboard Queries",
      description: "Dashboard queries are run frequently and could benefit from in-memory acceleration via BI Engine.",
      impact: "Medium Impact",
      savings: "$950/month",
      difficulty: "Low",
      category: "query",
      details: `## AI Dashboard Analysis

The AI has identified that your business intelligence dashboards generate approximately 20% of your total BigQuery costs through frequent, repetitive queries with similar patterns. These queries would benefit from BigQuery BI Engine acceleration.

### Recommended Implementation:

1. **Reserve BI Engine capacity:**
   - Start with 2GB BI Engine reservation ($40/day)
   - Target high-impact dashboard queries first

2. **Optimize dashboard queries for BI Engine compatibility:**
   - Ensure queries use supported SQL features
   - Focus on dimension filtering and aggregation queries
   - Consider materialized views for complex aggregations

3. **Monitor and tune BI Engine performance:**
   - Track acceleration rates in INFORMATION_SCHEMA
   - Adjust reservation size based on performance metrics

### Cost Impact:
- Current dashboard query costs: ~$5,250/month
- Cost with BI Engine: ~$4,300/month (including BI Engine reservation cost)
- Monthly savings: ~$950/month

**Performance improvement: Queries typically execute 4-10x faster, significantly improving dashboard responsiveness**

**Implementation time: Less than 1 day of work**`,
      aiConfidence: 85
    },
    {
      id: 'rec-8',
      title: "Implement Column-Level Security Instead of View Duplication",
      description: "Multiple filtered views of the same data are maintained for different teams. Implementing column-level security would reduce storage and processing costs.",
      impact: "Medium Impact",
      savings: "$1,200/month",
      difficulty: "Medium",
      category: "schema",
      details: `## AI Security Pattern Analysis

The AI has detected that you're maintaining 8 separate filtered views of the same underlying data to implement data access controls for different teams. This approach creates redundant storage and processing.

### Current Implementation:
- 8 separate views with filtered data for different departments
- Each view requires separate query optimization
- Changes to the base schema must be propagated to all views
- Total storage: ~8TB of duplicated data

### Recommended Approach:

Implement column-level security and row-level security directly in BigQuery:

\`\`\`sql
-- Create authorized view
CREATE VIEW \`project.secure_dataset.secure_data\`
OPTIONS(
  security_predicate=
    (customer_region = session_user_region() OR
     session_user() IN (
       SELECT user FROM \`project.secure_dataset.data_admins\`
     ))
)
AS SELECT * FROM \`project.raw_dataset.source_data\`;

-- Grant column-level access
GRANT SELECT(customer_id, order_date, product_id, amount)
ON TABLE \`project.secure_dataset.secure_data\`
TO GROUP "analysts@company.com";

GRANT SELECT(customer_id, order_date, product_id, amount, customer_email, phone)
ON TABLE \`project.secure_dataset.secure_data\`
TO GROUP "customer_support@company.com";
\`\`\`

### Benefits:
- Reduced storage costs (eliminate duplicate views)
- Simplified schema management
- More granular access control
- Improved security governance

### Cost Impact:
- Current approach: ~$1,800/month
- With column-level security: ~$600/month
- Monthly savings: $1,200

**Implementation complexity: Medium (requires security policy updates and user training)**`,
      aiConfidence: 88
    },
  ];
  
  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeCategory);
  
  const calculateTotalSavings = (recs: Recommendation[]) => {
    return recs.reduce((total, rec) => {
      const savingsMatch = rec.savings.match(/\$([0-9,]+)/);
      return total + (savingsMatch ? parseInt(savingsMatch[1].replace(',', '')) : 0);
    }, 0);
  };
  
  const totalSavings = calculateTotalSavings(recommendations);
  const filteredSavings = calculateTotalSavings(filteredRecommendations);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Brain className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">AI Recommendation Engine</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === 'all' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Recommendations
          </button>
          <button
            onClick={() => setActiveCategory('query')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === 'query' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Query Optimization
          </button>
          <button
            onClick={() => setActiveCategory('storage')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === 'storage' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Storage Optimization
          </button>
          <button
            onClick={() => setActiveCategory('pricing')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === 'pricing' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pricing Model
          </button>
          <button
            onClick={() => setActiveCategory('schema')}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === 'schema' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Schema Design
          </button>
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-indigo-900">Total Potential Savings</h3>
            <p className="text-indigo-700 mt-1">
              Implementing {activeCategory === 'all' ? 'all' : activeCategory} recommendations could save:
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="text-2xl font-bold text-indigo-700">
              ${activeCategory === 'all' ? totalSavings.toLocaleString() : filteredSavings.toLocaleString()}/month
            </span>
            {activeCategory !== 'all' && (
              <span className="text-sm text-indigo-600 block md:inline md:ml-2">
                ({((filteredSavings / totalSavings) * 100).toFixed(0)}% of total savings)
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Query Optimization</h3>
                <p className="text-blue-700 mt-1 text-sm">
                  {recommendations.filter(r => r.category === 'query').length} recommendations
                </p>
                <p className="text-blue-800 font-medium mt-1">
                  ${calculateTotalSavings(recommendations.filter(r => r.category === 'query')).toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Storage Optimization</h3>
                <p className="text-green-700 mt-1 text-sm">
                  {recommendations.filter(r => r.category === 'storage').length} recommendations
                </p>
                <p className="text-green-800 font-medium mt-1">
                  ${calculateTotalSavings(recommendations.filter(r => r.category === 'storage')).toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Pricing Optimization</h3>
                <p className="text-purple-700 mt-1 text-sm">
                  {recommendations.filter(r => r.category === 'pricing').length} recommendations
                </p>
                <p className="text-purple-800 font-medium mt-1">
                  ${calculateTotalSavings(recommendations.filter(r => r.category === 'pricing')).toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
        </div>
      
        {filteredRecommendations.map((recommendation) => (
          <div 
            key={recommendation.id}
            className={`bg-white border rounded-lg overflow-hidden transition-all duration-200 ${
              expandedId === recommendation.id ? 'shadow-md' : 'shadow-sm hover:shadow'
            }`}
          >
            <div className="p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full flex-shrink-0 mr-3 ${
                    recommendation.category === 'query' ? 'bg-blue-100' :
                    recommendation.category === 'storage' ? 'bg-green-100' :
                    recommendation.category === 'pricing' ? 'bg-purple-100' : 'bg-amber-100'
                  }`}>
                    {recommendation.category === 'query' ? <Zap className="h-5 w-5 text-blue-600" /> :
                     recommendation.category === 'storage' ? <Database className="h-5 w-5 text-green-600" /> :
                     recommendation.category === 'pricing' ? <DollarSign className="h-5 w-5 text-purple-600" /> :
                     <Clock className="h-5 w-5 text-amber-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{recommendation.description}</p>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        recommendation.impact.includes('High') ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {recommendation.impact}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                        {recommendation.savings} savings
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        recommendation.difficulty === 'Low' ? 'bg-green-100 text-green-800' :
                        recommendation.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recommendation.difficulty} effort
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center">
                        <Brain className="w-3 h-3 mr-1" />
                        {recommendation.aiConfidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-2 flex items-center">
                  <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedId === recommendation.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            </div>
            
            {expandedId === recommendation.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="prose prose-sm max-w-none text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: recommendation.details.replace(/\n/g, '<br>').replace(/##\s(.*)/g, '<h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">$1</h3>').replace(/###\s(.*)/g, '<h4 class="text-md font-medium text-gray-800 mt-3 mb-1">$1</h4>').replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>').replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto mt-2 mb-2">$1</pre>') }} />
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded hover:bg-indigo-700 flex items-center">
                    Implement Recommendation
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded hover:bg-gray-50">
                    Schedule for Later
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded hover:bg-gray-50">
                    Generate Implementation Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">AI Cost Optimization Insights</h3>
        <p className="text-gray-600 text-sm">
          The AI engine continuously analyzes your BigQuery usage patterns to identify optimization opportunities. 
          Recommendations are ranked by potential cost savings and implementation complexity.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          <strong>Next scheduled analysis:</strong> Tomorrow at 3:00 AM
        </p>
      </div>
    </div>
  );
}