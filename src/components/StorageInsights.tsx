import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StorageData } from '../types';
import { generateMockStorageData } from '../data/mockData';
import { Database, HardDrive } from 'lucide-react';

const COLORS = ['#4F46E5', '#818CF8'];

export function StorageInsights() {
  const [storageData, setStorageData] = useState<StorageData>({
    activeStorage: 0,
    longTermStorage: 0,
    totalTables: 0,
    avgDailyGrowth: 0
  });

  useEffect(() => {
    setStorageData(generateMockStorageData());
  }, []);

  const pieData = [
    { name: 'Active Storage', value: storageData.activeStorage },
    { name: 'Long-term Storage', value: storageData.longTermStorage }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Storage Distribution</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Total Tables</p>
              <p className="text-xl font-bold">{storageData.totalTables}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <HardDrive className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Average Daily Growth</p>
              <p className="text-xl font-bold">{storageData.avgDailyGrowth.toFixed(2)} GB</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-900">Storage Distribution</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-indigo-700">Active Storage</span>
                <span className="font-medium">{storageData.activeStorage} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700">Long-term Storage</span>
                <span className="font-medium">{storageData.longTermStorage} GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}