import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyCost, CostBreakdown } from '../types';
import { generateMockDailyCosts, generateMockCostBreakdown } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Database } from 'lucide-react';

export function CostAnalysis() {
  const [dailyCosts, setDailyCosts] = useState<DailyCost[]>([]);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown>({
    queryProcessing: 0,
    storage: 0,
    streaming: 0,
    total: 0
  });

  useEffect(() => {
    const costs = generateMockDailyCosts(30);
    const breakdown = generateMockCostBreakdown();
    breakdown.total = breakdown.queryProcessing + breakdown.storage + breakdown.streaming;
    
    setDailyCosts(costs);
    setCostBreakdown(breakdown);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Cost Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyCosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(costBreakdown).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
              {key !== 'total' && (
                <div className={`flex items-center ${
                  Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.random() > 0.5 ? (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.floor(Math.random() * 30)}%</span>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-bold text-indigo-600">${value.toFixed(2)}</p>
              {key === 'total' && (
                <div className="ml-4 flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">Projected savings: $1,200</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Cost Saving Opportunities</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-900">Query Pattern Optimization</h4>
              <p className="text-sm text-green-700 mt-1">
                Implementing suggested query optimizations could reduce processing costs by up to 35%
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Storage Optimization</h4>
              <p className="text-sm text-blue-700 mt-1">
                Moving cold data to long-term storage would save approximately $450/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}