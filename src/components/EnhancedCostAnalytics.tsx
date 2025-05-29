import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, addDays, subDays } from 'date-fns';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Filter, Download, ChevronDown, BarChart4, PieChart as PieChartIcon, LineChart as LineChartIcon, Table as TableIcon, Brain } from 'lucide-react';

// Generate realistic cost data
const generateCostData = (days: number, baseAmount: number, variance: number, trend: number) => {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(today, days - i - 1);
    // Add some randomness but maintain overall trend
    const randomFactor = 1 + (Math.random() * variance * 2 - variance);
    const trendFactor = 1 + (trend * i / days);
    const cost = baseAmount * randomFactor * trendFactor;
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      cost: parseFloat(cost.toFixed(2)),
      formattedDate: format(date, 'MMM dd')
    };
  });
};

// Generate project cost data
const generateProjectData = () => {
  const projects = [
    { name: 'Data Warehouse', id: 'proj-1' },
    { name: 'Marketing Analytics', id: 'proj-2' },
    { name: 'Customer 360', id: 'proj-3' },
    { name: 'Financial Reporting', id: 'proj-4' },
    { name: 'Product Analytics', id: 'proj-5' }
  ];
  
  return projects.map(project => ({
    ...project,
    cost: Math.round(1000 + Math.random() * 9000),
    queries: Math.round(500 + Math.random() * 2500),
    dataProcessed: Math.round(10 + Math.random() * 90),
    growth: Math.round(Math.random() * 50) - 25
  }));
};

// Generate service breakdown data
const generateServiceData = () => {
  return [
    { name: 'Query Processing', value: 65 },
    { name: 'Storage', value: 20 },
    { name: 'Streaming Inserts', value: 10 },
    { name: 'Other Services', value: 5 }
  ];
};

// Generate user cost data
const generateUserData = () => {
  const users = [
    'john.smith@company.com',
    'sarah.johnson@company.com',
    'michael.wong@company.com',
    'lisa.miller@company.com',
    'robert.chen@company.com',
    'emma.garcia@company.com',
    'james.wilson@company.com',
    'olivia.brown@company.com',
  ];
  
  return users.map(user => ({
    user,
    cost: Math.round(100 + Math.random() * 2400),
    queries: Math.round(30 + Math.random() * 270),
    dataProcessed: Math.round(5 + Math.random() * 95),
    avgQueryBytes: Math.round(0.5 + Math.random() * 9.5)
  })).sort((a, b) => b.cost - a.cost);
};

const CHART_COLORS = ['#4F46E5', '#818CF8', '#38BDF8', '#22D3EE', '#2DD4BF', '#34D399'];

export function EnhancedCostAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [view, setView] = useState<'overview' | 'projects' | 'services' | 'users'>('overview');
  
  // Generate data based on selected range
  const costData = generateCostData(
    timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90, 
    800, 
    0.15, 
    timeRange === '7d' ? 0.1 : timeRange === '30d' ? 0.2 : 0.4
  );
  
  const projectData = generateProjectData();
  const serviceData = generateServiceData();
  const userData = generateUserData();
  
  // Calculate totals and averages
  const totalCost = costData.reduce((sum, item) => sum + item.cost, 0);
  const avgDailyCost = totalCost / costData.length;
  
  // Cost trend calculation
  const firstHalfAvg = costData.slice(0, Math.floor(costData.length / 2)).reduce((sum, item) => sum + item.cost, 0) / Math.floor(costData.length / 2);
  const secondHalfAvg = costData.slice(Math.floor(costData.length / 2)).reduce((sum, item) => sum + item.cost, 0) / (costData.length - Math.floor(costData.length / 2));
  const costTrend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
  const costTrendPositive = costTrend >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <DollarSign className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Enhanced Cost Analytics</h2>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 text-xs rounded ${
                  timeRange === '7d' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 text-xs rounded ${
                  timeRange === '30d' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-3 py-1 text-xs rounded ${
                  timeRange === '90d' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'
                }`}
              >
                90 Days
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
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              view === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setView('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              view === 'projects' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setView('projects')}
          >
            Projects
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              view === 'services' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setView('services')}
          >
            Services
          </button>
          <button
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              view === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setView('users')}
          >
            Users
          </button>
        </div>
        
        {/* OVERVIEW VIEW */}
        {view === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <DollarSign className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Total {timeRange} Cost</h3>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      {costTrendPositive ? (
                        <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${costTrendPositive ? 'text-red-600' : 'text-green-600'}`}>
                        {Math.abs(costTrend).toFixed(1)}% {costTrendPositive ? 'increase' : 'decrease'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Daily Cost</h3>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-bold text-gray-900">${avgDailyCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Based on {costData.length} days of data</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Optimization Potential</h3>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-bold text-gray-900">$
                        {Math.round(totalCost * 0.35).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-green-600">
                      Estimated 35% savings possible
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Daily Cost Trend</h3>
                <div className="flex items-center space-x-2">
                  <button className="bg-gray-100 text-xs px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200 flex items-center">
                    <Filter className="h-3 w-3 mr-1" />
                    Filters
                  </button>
                  <div className="flex bg-gray-100 p-1 rounded-md">
                    <button className="p-1 rounded flex items-center justify-center text-indigo-600 bg-white shadow-sm">
                      <LineChartIcon className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1 rounded flex items-center justify-center text-gray-500">
                      <BarChart4 className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1 rounded flex items-center justify-center text-gray-500">
                      <TableIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="formattedDate" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Cost']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#4F46E5" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-700 font-medium">Highest Cost Day</span>
                    <span className="text-xs text-indigo-900 font-bold">
                      ${Math.max(...costData.map(item => item.cost)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600">
                    {costData.reduce((maxItem, item) => item.cost > maxItem.cost ? item : maxItem, costData[0]).formattedDate}
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-700 font-medium">Lowest Cost Day</span>
                    <span className="text-xs text-indigo-900 font-bold">
                      ${Math.min(...costData.map(item => item.cost)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600">
                    {costData.reduce((minItem, item) => item.cost < minItem.cost ? item : minItem, costData[0]).formattedDate}
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-700 font-medium">Weekday Average</span>
                    <span className="text-xs text-indigo-900 font-bold">
                      ${avgDailyCost.toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600">
                    Mon-Fri costs 35% higher than weekends
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-700 font-medium">30-Day Forecast</span>
                    <span className="text-xs text-indigo-900 font-bold">
                      ${(totalCost * 1.05).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600">
                    5% projected increase next month
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Project Distribution</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={projectData} 
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        tickFormatter={(value) => `$${value}`}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fontSize: 12 }}
                        width={120}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Cost']}
                      />
                      <Bar dataKey="cost" fill="#4F46E5" barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Cost by Service</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Cost Optimization Insights</h3>
                  <p className="text-sm text-green-800 mt-1">
                    Our AI analysis has identified several opportunities to optimize your BigQuery costs:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-green-800">
                    <li className="flex items-start">
                      <span className="h-5 w-5 text-green-600 mr-2">•</span>
                      <span>
                        <strong>Project "Data Warehouse"</strong> accounts for 32% of your total cost. 
                        Consider implementing partitioning on 5 large tables to reduce processing costs by up to 45%.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 text-green-600 mr-2">•</span>
                      <span>
                        <strong>Query caching opportunity:</strong> 28% of your queries are repeated within 24 hours 
                        but not benefitting from caching due to non-deterministic functions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 text-green-600 mr-2">•</span>
                      <span>
                        <strong>Cost spike detected on {format(subDays(new Date(), 12), 'MMM dd')}:</strong> 
                        A single user ran queries processing 28TB of data. Consider implementing query approval workflows.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* PROJECTS VIEW */}
        {view === 'projects' && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Project Cost Breakdown</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="flex items-center px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                      <Filter className="h-3.5 w-3.5 mr-1.5" />
                      Filter
                      <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                    </button>
                  </div>
                  
                  <button className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 flex items-center">
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Export
                  </button>
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
                        Cost
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data Processed (TB)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Queries
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projectData.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${project.cost.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.dataProcessed}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.queries.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center text-sm ${
                            project.growth > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {project.growth > 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(project.growth)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Cost by Project</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectData}
                        dataKey="cost"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Project Cost Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', proj1: 2400, proj2: 1800, proj3: 1200, proj4: 800, proj5: 500 },
                        { month: 'Feb', proj1: 2600, proj2: 1900, proj3: 1300, proj4: 900, proj5: 600 },
                        { month: 'Mar', proj1: 2900, proj2: 2100, proj3: 1400, proj4: 750, proj5: 700 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                      <Legend />
                      <Line type="monotone" dataKey="proj1" name="Data Warehouse" stroke="#4F46E5" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="proj2" name="Marketing Analytics" stroke="#818CF8" />
                      <Line type="monotone" dataKey="proj3" name="Customer 360" stroke="#38BDF8" />
                      <Line type="monotone" dataKey="proj4" name="Financial Reporting" stroke="#22D3EE" />
                      <Line type="monotone" dataKey="proj5" name="Product Analytics" stroke="#2DD4BF" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* SERVICES VIEW */}
        {view === 'services' && (
          <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Query Processing</h3>
                <p className="text-2xl font-bold text-gray-900">${Math.round(totalCost * 0.65).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">65% of total spend</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Storage</h3>
                <p className="text-2xl font-bold text-gray-900">${Math.round(totalCost * 0.20).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">20% of total spend</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Streaming Inserts</h3>
                <p className="text-2xl font-bold text-gray-900">${Math.round(totalCost * 0.10).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">10% of total spend</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Other Services</h3>
                <p className="text-2xl font-bold text-gray-900">${Math.round(totalCost * 0.05).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">5% of total spend</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Service Cost Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Service Cost Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', query: 15600, storage: 4800, streaming: 3200, other: 1200 },
                        { month: 'Feb', query: 18200, storage: 5400, streaming: 3600, other: 1400 },
                        { month: 'Mar', query: 20800, storage: 6000, streaming: 4000, other: 1600 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                      <Legend />
                      <Bar dataKey="query" name="Query Processing" stackId="a" fill="#4F46E5" />
                      <Bar dataKey="storage" name="Storage" stackId="a" fill="#818CF8" />
                      <Bar dataKey="streaming" name="Streaming Inserts" stackId="a" fill="#38BDF8" />
                      <Bar dataKey="other" name="Other Services" stackId="a" fill="#22D3EE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                  <Brain className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">AI Service Optimization Insights</h3>
                  <div className="mt-2 space-y-2">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Query Processing Optimization</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Implementing query caching strategies could reduce query processing costs by 25-40%.
                        Consider standardizing query patterns across your organization to increase cache hit rates.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Storage Optimization</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        35% of your stored data hasn't been accessed in over a month. Consider implementing
                        lifecycle policies to move cold data to long-term storage, potentially saving 30% on storage costs.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Streaming Cost Reduction</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Consider batching small streaming inserts to reduce costs. Your current pattern shows
                        multiple small streaming jobs that could be combined for better efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* USERS VIEW */}
        {view === 'users' && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">User Cost Analysis</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="flex items-center px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                      <Filter className="h-3.5 w-3.5 mr-1.5" />
                      Filter
                      <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                    </button>
                  </div>
                  
                  <button className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 flex items-center">
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data Processed (TB)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Queries
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Query Size (GB)
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.slice(0, 5).map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.user}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${user.cost.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.dataProcessed}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.queries.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.avgQueryBytes.toFixed(1)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {userData.length > 5 && (
                <div className="mt-2 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all {userData.length} users
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Cost by User (Top 5)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userData.slice(0, 5)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        tickFormatter={(value) => `$${value}`}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        dataKey="user" 
                        type="category" 
                        tick={{ fontSize: 12 }}
                        width={160}
                        tickFormatter={(value) => value.split('@')[0]}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Cost']}
                        labelFormatter={(label) => label}
                      />
                      <Bar dataKey="cost" name="Cost" fill="#4F46E5" barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Optimization Opportunities by User</h3>
                <div className="space-y-3">
                  {userData.slice(0, 4).map((user, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{user.user.split('@')[0]}</h4>
                          <div className="flex items-center mt-1">
                            <div className="text-xs text-gray-500">
                              ${user.cost.toLocaleString()} ({user.queries} queries)
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            ${Math.round(user.cost * 0.4).toLocaleString()} potential savings
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs">
                        {index === 0 && (
                          <p className="text-gray-600">45 SELECT * queries could be optimized to reduce data processed by 78%</p>
                        )}
                        {index === 1 && (
                          <p className="text-gray-600">Frequent JOIN operations without filters processing 3.5x more data than needed</p>
                        )}
                        {index === 2 && (
                          <p className="text-gray-600">Custom views could provide 62% more efficient data access with correct column selection</p>
                        )}
                        {index === 3 && (
                          <p className="text-gray-600">Materialized views could save 85% on 6 repeated daily analytical queries</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}