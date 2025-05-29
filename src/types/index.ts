// Query Types
export interface QueryData {
  id: string;
  sql: string;
  bytesProcessed: number;
  executionTime: number;
  timestamp: string;
  cost: number;
  user: string;
}

// Cost Analysis Types
export interface CostBreakdown {
  queryProcessing: number;
  storage: number;
  streaming: number;
  total: number;
}

export interface DailyCost {
  date: string;
  cost: number;
}

// Storage Types
export interface StorageData {
  activeStorage: number;
  longTermStorage: number;
  totalTables: number;
  avgDailyGrowth: number;
}

// Performance Types
export interface QueryPerformance {
  id: string;
  bytesProcessed: number;
  executionTime: number;
  efficiency: number;
}