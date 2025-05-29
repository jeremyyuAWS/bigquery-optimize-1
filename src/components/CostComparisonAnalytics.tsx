import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Calendar, ArrowRight, ExternalLink, TrendingDown, Filter, Download, Zap, Info } from 'lucide-react';

// Generate comparison data sets
const generateComparisonData = () => {
  // Monthly comparison
  const currentMonthData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    current: Math.round(700 + Math.random() * 500 + (i * 10)),
    previous: Math.round(600 + Math.random() * 400 + (i * 8))
  }));

  // Service breakdown
  const serviceComparison = [
    { name: 'Query Processing', current: 65, previous: 72 },
    { name: 'Storage', current: 20, previous: 18 },
    { name: 'Streaming Inserts', current: 10, previous: 7 },
    { name: 'Other', current: 5, previous: 3 }
  ];

  // Project comparison
  const projectComparison = [
    { name: 'Data Warehouse', current: 12500, previous: 10800 },
    { name: 'Marketing Analytics', current: 8700, previous: 7200 },
    { name: 'Customer 360', current: 6900, previous: 7500 },
    { name: 'Financial Reporting', current: 5400, previous: 5800 },
    { name: 'Product Analytics', current: 4500, previous: 3200 }
  ];

  return {
    dailyCosts: currentMonthData,
    serviceBreakdown: serviceComparison,
    projectBreakdown: projectComparison
  };
};

// Key metrics calculation
const calculateKeyMetrics = (data: any) => {
  const currentTotal = data.dailyCosts.reduce((sum: number, day: any) => sum + day.current, 0);
  const previousTotal = data.dailyCosts.reduce((sum: number, day: any) => sum + day.previous, 0);
  const percentChange = ((currentTotal - previousTotal) / previousTotal) * 100;
  
  // Calculate daily averages
  const currentAvg = currentTotal / data.dailyCosts.length;
  const previousAvg = previousTotal / data.dailyCosts.length;
  const avgPercentChange = ((currentAvg - previousAvg) / previousAvg) * 100;
  
  // Calculate peak day metrics
  const currentPeak = Math.max(...data.dailyCosts.map((day: any) => day.current));
  const previousPeak = Math.max(...data.dailyCosts.map((day: any) => day.previous));
  const peakPercentChange = ((currentPeak - previousPeak) / previousPeak) * 100;
  
  return {
    currentTotal: Math.round(currentTotal),
    previousTotal: Math.round(previousTotal),
    percentChange,
    currentAvg: Math.round(currentAvg),
    previousAvg: Math.round(previousAvg),
    avgPercentChange,
    currentPeak: Math.round(currentPeak),
    previousPeak: Math.round(previousPeak),
    peakPercentChange
  };
};

const COLORS = ['#4F46E5', '#818CF8', '#38BDF8', '#22D3EE', '#2DD4BF', '#34D399'];

export function CostComparisonAnalytics() {
  const [comparisonType, setComparisonType] = useState<'month-over-month' | 'year-over-year' | 'custom'>('month-over-month');
  const [currentPeriodLabel, setCurrentPeriodLabel] = useState('Current Month');
  const [previousPeriodLabel, setPreviousPeriodLabel] = useState('Previous Month');
  const [activeView, setActiveView] = useState<'daily' | 'service' | 'project'>('daily');
  
  // Generate data based on selection
  const data = generateComparisonData();
  const metrics = calculateKeyMetrics(data);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Cost Comparison Analytics</h2>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => {
                  setComparisonType('month-over-month');
                  setCurrentPeriodLabel('Current Month');
                  setPreviousPeriodLabel('Previous Month');
                }}
                className={`px-3 py-1 text-xs rounded ${
                  comparisonType === 'month-over-month' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                Month/Month
              </button>
              <button
                onClick={() => {
                  setComparisonType('year-over-year');
                  setCurrentPeriodLabel('Current Year');
                  setPreviousPeriodLabel('Previous Year');
                }}
                className={`px-3 py-1 text-xs rounded ${
                  comparisonType === 'year-over-year' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                Year/Year
              </button>
              <button
                onClick={() => {
                  setComparisonType('custom');
                  setCurrentPeriodLabel('Current Period');
                  setPreviousPeriodLabel('Previous Period');
                }}
                className={`px-3 py-1 text-xs rounded ${
                  comparisonType === 'custom' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                Custom
              </button>
            </div>
            
            <button className="flex items-center px-3 py-1 text-xs bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
              <Download className="h-3 w-3 mr-1" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <div className="flex items-baseline">
                <h3 className="text-lg font-bold text-indigo-900">${metrics.currentTotal.toLocaleString()}</h3>
                <span className="text-sm text-indigo-800 ml-2">{currentPeriodLabel}</span>
                <span className="text-sm mx-2">vs</span>
                <h3 className="text-lg font-bold text-indigo-700">${metrics.previousTotal.toLocaleString()}</h3>
                <span className="text-sm text-indigo-600 ml-2">{previousPeriodLabel}</span>
              </div>
              
              <div className="flex items-center mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  metrics.percentChange > 0 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {metrics.percentChange > 0 ? '+' : ''}{metrics.percentChange.toFixed(1)}% change
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => setActiveView('daily')}
                className={`px-3 py-1 text-xs rounded ${
                  activeView === 'daily' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Daily Trend
              </button>
              <button
                onClick={() => setActiveView('service')}
                className={`px-3 py-1 text-xs rounded ${
                  activeView === 'service' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                By Service
              </button>
              <button
                onClick={() => setActiveView('project')}
                className={`px-3 py-1 text-xs rounded ${
                  activeView === 'project' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                By Project
              </button>
            </div>
          </div>
        </div>
        
        {activeView === 'daily' && (
          <>
            <div className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Daily Cost Comparison</h3>
              </div>
              
              <div className="h-80 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.dailyCosts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="current"
                      name={currentPeriodLabel}
                      stroke="#4F46E5" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous"
                      name={previousPeriodLabel} 
                      stroke="#818CF8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Average Daily Cost</h3>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{currentPeriodLabel}</span>
                    <span className="text-sm font-medium text-gray-900">${metrics.currentAvg.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{previousPeriodLabel}</span>
                    <span className="text-sm font-medium text-gray-700">${metrics.previousAvg.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Change</span>
                    <span className={`text-xs font-medium ${
                      metrics.avgPercentChange > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {metrics.avgPercentChange > 0 ? '+' : ''}{metrics.avgPercentChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Peak Daily Cost</h3>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{currentPeriodLabel}</span>
                    <span className="text-sm font-medium text-gray-900">${metrics.currentPeak.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{previousPeriodLabel}</span>
                    <span className="text-sm font-medium text-gray-700">${metrics.previousPeak.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Change</span>
                    <span className={`text-xs font-medium ${
                      metrics.peakPercentChange > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {metrics.peakPercentChange > 0 ? '+' : ''}{metrics.peakPercentChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Weekend vs Weekday</h3>
                <div className="mt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Weekday Avg ({currentPeriodLabel})</span>
                    <span className="text-sm font-medium text-gray-900">${Math.round(metrics.currentAvg * 1.25).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Weekend Avg ({currentPeriodLabel})</span>
                    <span className="text-sm font-medium text-gray-700">${Math.round(metrics.currentAvg * 0.5).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Difference</span>
                    <span className="text-xs font-medium text-indigo-600">
                      Weekdays cost 150% more than weekends
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Cost Trend Analysis</h3>
                  <p className="text-sm text-green-800 mt-1">
                    Our AI analysis has identified the following patterns in your cost data:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-green-800">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Weekly pattern:</strong> Costs peak on Wednesdays (35% higher than weekly average) 
                        and are lowest on weekends (50% lower than weekday average).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Monthly pattern:</strong> Costs increase by ~15% during the last week of each month, 
                        likely due to end-of-month reporting.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>
                        <strong>Growth trend:</strong> Your costs are increasing at approximately 4.2% month-over-month,
                        which is 2.1% higher than your data volume growth (2.1%).
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3">
                    <button className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 flex items-center inline-flex">
                      <Zap className="h-3.5 w-3.5 mr-1.5" />
                      View Cost Optimization Opportunities
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeView === 'service' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Service Breakdown Comparison</h3>
              </div>
              
              <div className="h-80 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.serviceBreakdown.map(item => ({
                      name: item.name,
                      [currentPeriodLabel]: Math.round(metrics.currentTotal * (item.current / 100)),
                      [previousPeriodLabel]: Math.round(metrics.previousTotal * (item.previous / 100))
                    }))}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                    <Legend />
                    <Bar dataKey={currentPeriodLabel} fill="#4F46E5" barSize={20} />
                    <Bar dataKey={previousPeriodLabel} fill="#818CF8" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Service Distribution Comparison</h3>
              </div>
              
              <div className="h-80 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.serviceBreakdown}
                      cx="30%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="current"
                      nameKey="name"
                      label={({ name }) => name}
                    >
                      {data.serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-current-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Pie
                      data={data.serviceBreakdown}
                      cx="70%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="previous"
                      nameKey="name"
                      label={({ name }) => name}
                    >
                      {data.serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-previous-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Current Period</div>
                  <div className="text-sm text-gray-500">Previous Period</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                  <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Service Cost Analysis</h3>
                  <div className="mt-2 space-y-2">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Key Changes</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        <strong>Query Processing:</strong> Decreased from 72% to 65% of total costs, suggesting your optimization efforts are working.
                        <br />
                        <strong>Storage Costs:</strong> Increased from 18% to 20%, indicating potential growth in data volume.
                        <br />
                        <strong>Streaming Inserts:</strong> Increased from 7% to 10%, possibly due to new streaming pipelines.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Optimization Recommendations</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        1. Consider implementing table expiration policies for staging tables to control storage growth.
                        <br />
                        2. Review new streaming workloads for potential batch alternatives where real-time isn't critical.
                        <br />
                        3. Continue query optimization efforts, focusing on the Financial Reporting project where query costs increased by 22%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeView === 'project' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Project Cost Comparison</h3>
              </div>
              
              <div className="h-80 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.projectBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                    <Legend />
                    <Bar dataKey="current" name={currentPeriodLabel} fill="#4F46E5" />
                    <Bar dataKey="previous" name={previousPeriodLabel} fill="#818CF8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentPeriodLabel}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {previousPeriodLabel}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.projectBreakdown.map((project, index) => {
                    const change = ((project.current - project.previous) / project.previous) * 100;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${project.current.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${project.previous.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {change > 0 ? '+' : ''}{change.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${change > 0 ? 'bg-red-600' : 'bg-green-600'}`}
                              style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">Notable Project Insights</h3>
                  <div className="mt-2 space-y-2">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Project "Customer 360" Decreased by 8%</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        This project shows a significant cost reduction after implementing partitioning and query caching optimizations last month.
                        Consider applying similar strategies to other projects.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Project "Product Analytics" Increased by 41%</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        This significant increase coincides with the launch of new analytical dashboards. Consider implementing materialized views for 
                        frequently accessed aggregations to reduce recurring query costs.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Overall Growth Analysis</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Total costs have grown by {metrics.percentChange.toFixed(1)}%, while data volume has increased by approximately 12%. 
                        This suggests opportunities for further cost optimization to align cost growth more closely with data growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}