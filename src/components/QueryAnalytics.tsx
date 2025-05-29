import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QueryPerformance } from '../types';
import { generateMockPerformanceData, generateMockQueries, generateOptimizationSuggestions } from '../data/mockData';
import { Search, Filter, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { QueryOptimizer } from './QueryOptimizer';

export function QueryAnalytics() {
  const [performanceData, setPerformanceData] = useState<QueryPerformance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  useEffect(() => {
    setPerformanceData(generateMockPerformanceData(10));
  }, []);

  const handleOptimize = (queryId: string) => {
    setSelectedQuery(queryId);
    setShowOptimizer(true);
    toast.success('Query optimization suggestions generated!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Query Performance</h2>
        <button
          onClick={() => handleOptimize('batch-optimize')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Batch Optimize All Queries
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
          >
            <option value="all">All Queries</option>
            <option value="high-cost">High Cost</option>
            <option value="low-efficiency">Low Efficiency</option>
            <option value="long-running">Long Running</option>
            <option value="unoptimized">Unoptimized</option>
            <option value="redundant">Redundant Queries</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-indigo-900">Average Cost</h3>
            <span className="text-sm text-indigo-600">Last 24h</span>
          </div>
          <p className="text-2xl font-bold text-indigo-700 mt-2">$245.32</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-green-900">Optimization Score</h3>
            <span className="text-sm text-green-600">85/100</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2.5 mt-2">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-amber-900">Potential Savings</h3>
            <span className="text-sm text-amber-600">Monthly</span>
          </div>
          <p className="text-2xl font-bold text-amber-700 mt-2">$1,890.00</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 space-y-4">
        {performanceData.map(query => (
          <div key={query.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center">
              <span className="font-medium">{query.id}</span>
              <span className={`font-medium ${
                query.efficiency > 80 ? 'text-green-600 flex items-center' :
                query.efficiency > 50 ? 'text-amber-600 flex items-center' : 'text-red-600 flex items-center'
              }`}>
                {query.efficiency < 50 && <Zap className="w-4 h-4 mr-1" />}
                {query.efficiency.toFixed(1)}% efficient
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <p>Bytes Processed: {(query.bytesProcessed / 1000000).toFixed(2)} MB</p>
              <p>Execution Time: {(query.executionTime / 1000).toFixed(2)}s</p>
            </div>
            <button
              onClick={() => handleOptimize(query.id)}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Optimization Suggestions
            </button>
          </div>
        ))}
      </div>
      
      <QueryOptimizer
        open={showOptimizer}
        onClose={() => setShowOptimizer(false)}
        queryId={selectedQuery}
      />
    </div>
  );
}