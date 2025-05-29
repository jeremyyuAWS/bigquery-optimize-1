import { useState } from 'react';
import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function ROICalculator() {
  const [optimizationLevel, setOptimizationLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  const optimizationData = {
    low: {
      costReduction: 15,
      timeToValue: '3-4 weeks',
      implementationEffort: 'Low',
      savingsEstimate: 3750
    },
    medium: {
      costReduction: 35,
      timeToValue: '1-2 months',
      implementationEffort: 'Medium',
      savingsEstimate: 8750
    },
    high: {
      costReduction: 55,
      timeToValue: '2-3 months',
      implementationEffort: 'High',
      savingsEstimate: 13750
    }
  };

  const selectedData = optimizationData[optimizationLevel];
  
  const pieData = [
    { name: 'Current Cost', value: 25000 },
    { name: 'Potential Savings', value: selectedData.savingsEstimate }
  ];
  
  const COLORS = ['#6366F1', '#34D399'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">BigQuery Optimization ROI Calculator</h2>
        <p className="text-gray-600 mt-1">Estimate potential cost savings from optimization strategies</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Level</label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              optimizationLevel === 'low'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => setOptimizationLevel('low')}
          >
            Conservative
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              optimizationLevel === 'medium'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => setOptimizationLevel('medium')}
          >
            Balanced
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              optimizationLevel === 'high'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => setOptimizationLevel('high')}
          >
            Aggressive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-indigo-700 font-medium">Monthly Savings</span>
            </div>
            <span className="text-xl font-bold text-indigo-600">${selectedData.savingsEstimate.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">Cost Reduction</span>
            </div>
            <span className="text-xl font-bold text-green-600">{selectedData.costReduction}%</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center">
              <BarChart2 className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-700 font-medium">Annual Savings</span>
            </div>
            <span className="text-xl font-bold text-amber-600">${(selectedData.savingsEstimate * 12).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900">Implementation Effort</h3>
          <p className="mt-1 text-gray-600">{selectedData.implementationEffort}</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900">Time to Value</h3>
          <p className="mt-1 text-gray-600">{selectedData.timeToValue}</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900">3-Year ROI</h3>
          <p className="mt-1 text-gray-600 font-bold text-indigo-600">{(selectedData.costReduction * 10).toFixed(1)}x</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900">Business Impact</h3>
        <p className="mt-2 text-blue-700">
          Based on your current monthly BigQuery spend of approximately $25,000, implementing 
          <span className="font-medium"> {optimizationLevel} </span> 
          optimization strategies could save your organization
          <span className="font-bold"> ${(selectedData.savingsEstimate * 12).toLocaleString()} </span>
          annually, with a break-even point in 
          <span className="font-medium"> {optimizationLevel === 'low' ? '3 weeks' : optimizationLevel === 'medium' ? '6 weeks' : '10 weeks'}</span>.
        </p>
      </div>
    </div>
  );
}