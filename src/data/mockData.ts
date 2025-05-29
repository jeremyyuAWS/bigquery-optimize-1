import { QueryData, CostBreakdown, DailyCost, StorageData, QueryPerformance } from '../types';
import { format, subDays } from 'date-fns';

interface OptimizationSuggestion {
  originalQuery: string;
  optimizedQuery: string;
  costReduction: number;
  improvements: Array<{
    title: string;
    description: string;
    impact?: string;
  }>;
}

// Generate mock query data
export const generateMockQueries = (count: number): QueryData[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `query-${i}`,
    sql: `SELECT * FROM dataset.table${i} WHERE date > '2024-01-01'`,
    bytesProcessed: Math.floor(Math.random() * 1000000000),
    executionTime: Math.floor(Math.random() * 60000),
    timestamp: format(subDays(new Date(), i), 'yyyy-MM-dd HH:mm:ss'),
    cost: Math.random() * 100,
    user: `user${Math.floor(Math.random() * 5) + 1}@company.com`
  }));
};

// Generate mock cost data
export const generateMockCostBreakdown = (): CostBreakdown => ({
  queryProcessing: Math.random() * 1000,
  storage: Math.random() * 200,
  streaming: Math.random() * 100,
  total: 0, // Calculated in component
});

// Generate mock daily costs
export const generateMockDailyCosts = (days: number): DailyCost[] => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
    cost: Math.random() * 200 + 50
  }));
};

// Generate mock storage data
export const generateMockStorageData = (): StorageData => ({
  activeStorage: Math.floor(Math.random() * 10000),
  longTermStorage: Math.floor(Math.random() * 50000),
  totalTables: Math.floor(Math.random() * 100) + 20,
  avgDailyGrowth: Math.random() * 50
});

// Generate mock performance data
export const generateMockPerformanceData = (count: number): QueryPerformance[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `query-${i}`,
    bytesProcessed: Math.floor(Math.random() * 1000000000),
    executionTime: Math.floor(Math.random() * 60000),
    efficiency: Math.random() * 100
  }));
};

// Generate mock optimization suggestions
export const generateOptimizationSuggestions = (queryId: string): OptimizationSuggestion => {
  return {
    originalQuery: `SELECT *
FROM \`project.dataset.large_table\`
WHERE DATE(timestamp) >= '2024-01-01'`,
    optimizedQuery: `SELECT
  user_id,
  transaction_amount,
  timestamp
FROM \`project.dataset.large_table\`
WHERE timestamp >= TIMESTAMP('2024-01-01')
  AND transaction_amount > 1000`,
    costReduction: 65,
    improvements: [
      {
        title: "Column Selection Optimization",
        description: "Replace SELECT * with specific columns to reduce data processed.",
        impact: "Reduces data scanned by 70%"
      },
      {
        title: "Timestamp Function Optimization",
        description: "Use TIMESTAMP instead of DATE function to leverage partitioning.",
        impact: "Improves partition pruning efficiency"
      },
      {
        title: "Additional Filter Recommendation",
        description: "Add transaction_amount filter based on historical patterns.",
        impact: "Further reduces data processed by 25%"
      }
    ]
  };
};