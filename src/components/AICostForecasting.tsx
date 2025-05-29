import { useState } from 'react';
import { TrendingUp, AlertCircle, Calendar, ArrowDown, ArrowUp, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ForecastDataPoint {
  date: string;
  actualCost?: number;
  predictedCost?: number;
  lowerBound?: number;
  upperBound?: number;
}

interface AnomalyAlert {
  id: string;
  date: string;
  query: string;
  expected: number;
  actual: number;
  impact: number;
  description: string;
  recommendation: string;
}

export function AICostForecasting() {
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '12m'>('3m');
  const [selectedChart, setSelectedChart] = useState<'forecast' | 'anomalies'>('forecast');
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>('anom-1');
  
  // Generate historical and forecast data
  const generateForecastData = (): ForecastDataPoint[] => {
    const data: ForecastDataPoint[] = [];
    const now = new Date();
    const monthsBack = timeRange === '1m' ? 1 : timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    const daysBack = monthsBack * 30;
    
    // Historical data
    for (let i = daysBack; i >= 1; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Create some patterns and anomalies in the data
      let baseCost = 800 + Math.sin(i / 10) * 100;
      
      // Add weekly pattern (higher on weekdays)
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        baseCost += 200;
      }
      
      // Add monthly pattern (higher at month end)
      const dayOfMonth = date.getDate();
      if (dayOfMonth >= 25) {
        baseCost += 300;
      }
      
      // Add some random variations
      baseCost += (Math.random() - 0.5) * 200;
      
      // Add specific anomalies
      if (i === 15) baseCost += 1200; // Big spike 15 days ago
      if (i === 45) baseCost += 800;  // Medium spike 45 days ago
      
      data.push({
        date: date.toISOString().split('T')[0],
        actualCost: Math.round(baseCost),
      });
    }
    
    // Add future forecast
    const baseLastDay = data[data.length - 1].actualCost || 1000;
    for (let i = 1; i <= 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      // Create forecast with increasing uncertainty
      const predictedCost = baseLastDay + (Math.sin(i / 10) * 50) + (i * 15);
      const uncertainty = i * 20;
      
      data.push({
        date: date.toISOString().split('T')[0],
        predictedCost: Math.round(predictedCost),
        lowerBound: Math.round(predictedCost - uncertainty),
        upperBound: Math.round(predictedCost + uncertainty),
      });
    }
    
    return data;
  };
  
  const forecastData = generateForecastData();
  
  // Extract recent actual costs for summary
  const recentActualCosts = forecastData
    .filter(d => d.actualCost !== undefined)
    .slice(-30)
    .map(d => d.actualCost as number);
  
  const lastMonthTotal = recentActualCosts.reduce((sum, cost) => sum + cost, 0);
  const avgDailyCost = Math.round(lastMonthTotal / recentActualCosts.length);
  
  // Calculate trend percentage (positive means increasing costs)
  const firstHalf = recentActualCosts.slice(0, 15).reduce((sum, cost) => sum + cost, 0) / 15;
  const secondHalf = recentActualCosts.slice(-15).reduce((sum, cost) => sum + cost, 0) / 15;
  const trendPercentage = Math.round(((secondHalf - firstHalf) / firstHalf) * 100);
  
  // Forecast next 30 days
  const forecastTotal = forecastData
    .filter(d => d.predictedCost !== undefined)
    .slice(0, 30)
    .reduce((sum, d) => sum + (d.predictedCost as number), 0);
  
  // Generate anomaly data
  const anomalies: AnomalyAlert[] = [
    {
      id: 'anom-1',
      date: '2024-03-15',
      query: 'Daily Sales Analysis Query',
      expected: 450,
      actual: 1650,
      impact: 1200,
      description: "Unusually high data processing detected. Query processed 256TB of data instead of typical 70TB.",
      recommendation: "Implement partitioning on sales_data table to reduce data scanned by the query."
    },
    {
      id: 'anom-2',
      date: '2024-02-15',
      query: 'User Analytics Pipeline',
      expected: 380,
      actual: 980,
      impact: 600,
      description: "Query performed a full table scan on unpartitioned user_events table.",
      recommendation: "Add DATE partition on timestamp column and update query to leverage partition pruning."
    },
    {
      id: 'anom-3',
      date: '2024-01-28',
      query: 'Monthly Financial Report',
      expected: 520,
      actual: 1100,
      impact: 580,
      description: "Query contained SELECT * instead of selecting only required columns.",
      recommendation: "Modify query to select only the 8 columns needed instead of all 42 columns."
    },
    {
      id: 'anom-4',
      date: '2024-01-10',
      query: 'Marketing Attribution Calculation',
      expected: 300,
      actual: 780,
      impact: 480,
      description: "JOIN operation without filtering resulted in processing entire tables.",
      recommendation: "Apply filters before performing JOINs to reduce data processed."
    }
  ];
  
  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId);
  
  // Format for tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium text-gray-900">{label}</p>
          {data.actualCost !== undefined && (
            <p className="text-blue-600">Actual: ${data.actualCost.toLocaleString()}</p>
          )}
          {data.predictedCost !== undefined && (
            <p className="text-indigo-600">Forecast: ${data.predictedCost.toLocaleString()}</p>
          )}
          {data.upperBound !== undefined && (
            <p className="text-gray-500 text-xs">Range: ${data.lowerBound?.toLocaleString()} - ${data.upperBound?.toLocaleString()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">AI Cost Forecasting</h2>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedChart('forecast')}
            className={`px-3 py-1 text-sm rounded-md ${
              selectedChart === 'forecast' 
                ? 'bg-indigo-100 text-indigo-800 font-medium' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cost Forecast
          </button>
          <button
            onClick={() => setSelectedChart('anomalies')}
            className={`px-3 py-1 text-sm rounded-md flex items-center ${
              selectedChart === 'anomalies' 
                ? 'bg-amber-100 text-amber-800 font-medium' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            Anomaly Detection
          </button>
        </div>
      </div>
      
      {selectedChart === 'forecast' && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Cost Trend & Forecast</h3>
            
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setTimeRange('1m')}
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '1m' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                }`}
              >
                1M
              </button>
              <button
                onClick={() => setTimeRange('3m')}
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '3m' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => setTimeRange('6m')}
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '6m' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('12m')}
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '12m' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                }`}
              >
                12M
              </button>
            </div>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">30-Day Spending</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">${lastMonthTotal.toLocaleString()}</p>
                  <div className="mt-1 flex items-center">
                    {trendPercentage > 0 ? (
                      <>
                        <ArrowUp className="w-3 h-3 text-red-500 mr-1" />
                        <span className="text-xs text-red-600">{trendPercentage}% vs previous</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">{Math.abs(trendPercentage)}% vs previous</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Daily Average</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">${avgDailyCost.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Based on last 30 days</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">30-Day Forecast</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">${Math.round(forecastTotal).toLocaleString()}</p>
                  <div className="mt-1 flex items-center">
                    {forecastTotal > lastMonthTotal ? (
                      <>
                        <ArrowUp className="w-3 h-3 text-amber-500 mr-1" />
                        <span className="text-xs text-amber-600">
                          {Math.round((forecastTotal - lastMonthTotal) / lastMonthTotal * 100)}% increase expected
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">
                          {Math.round((lastMonthTotal - forecastTotal) / lastMonthTotal * 100)}% decrease expected
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth()+1}/${d.getDate()}`;
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="actualCost" 
                  stroke="#4F46E5" 
                  fill="#818CF8" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="predictedCost" 
                  stroke="#4F46E5" 
                  strokeDasharray="5 5"
                  fill="none"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="upperBound" 
                  stroke="none" 
                  fill="#EEF2FF" 
                  fillOpacity={0.8}
                />
                <Area 
                  type="monotone" 
                  dataKey="lowerBound" 
                  stroke="none" 
                  fill="#EEF2FF" 
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">AI Cost Analysis Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                <p className="text-indigo-700 text-sm">
                  <span className="font-medium">Monthly pattern detected:</span> Costs typically increase by 30-40% during the last week of each month, coinciding with financial reporting cycles.
                </p>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                <p className="text-indigo-700 text-sm">
                  <span className="font-medium">Weekly pattern detected:</span> Weekday costs average 25% higher than weekend costs, suggesting opportunity for workload scheduling optimization.
                </p>
              </div>
              
              <div className="flex items-start">
                <TrendingUp className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                <p className="text-indigo-700 text-sm">
                  <span className="font-medium">Growth trend analysis:</span> Monthly costs are increasing at approximately 12% month-over-month. At this rate, you'll exceed your annual budget by September.
                </p>
              </div>
              
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 mr-2" />
                <p className="text-amber-700 text-sm">
                  <span className="font-medium">Budget alert:</span> Based on current trends and forecast, you're projected to exceed your monthly budget by 15% next month. Consider implementing optimization recommendations.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedChart === 'anomalies' && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Anomaly Detection</h3>
            <p className="text-gray-600">
              Our AI system continuously monitors your BigQuery usage to detect unusual spending patterns that may indicate inefficient queries or opportunities for optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Detected Anomalies</h3>
                <p className="text-sm text-gray-500 mt-1">Last 90 days</p>
              </div>
              
              <div className="overflow-y-auto max-h-80">
                {anomalies.map(anomaly => (
                  <div 
                    key={anomaly.id}
                    className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                      selectedAnomalyId === anomaly.id ? 'bg-amber-50' : ''
                    }`}
                    onClick={() => setSelectedAnomalyId(anomaly.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {new Date(anomaly.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </h4>
                      <span className="text-red-600 font-medium text-sm">+${anomaly.impact}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1 truncate">{anomaly.query}</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-gray-500">Expected: ${anomaly.expected}</span>
                      <span className="mx-1 text-xs text-gray-400">•</span>
                      <span className="text-xs text-red-500">Actual: ${anomaly.actual}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedAnomaly && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Anomaly Details: {new Date(selectedAnomaly.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{selectedAnomaly.query}</p>
                    </div>
                    <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      ${selectedAnomaly.impact} cost impact
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Expected Cost</span>
                      <span className="text-sm font-medium text-gray-800">${selectedAnomaly.expected}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                      <div className="bg-green-500 h-2 rounded-full" style={{ 
                        width: `${(selectedAnomaly.expected / selectedAnomaly.actual) * 100}%` 
                      }}></div>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Actual Cost</span>
                      <span className="text-sm font-medium text-red-600">${selectedAnomaly.actual}</span>
                    </div>
                    <div className="w-full bg-red-100 h-2 rounded-full">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="mt-3 text-right">
                      <span className="text-sm text-red-600 font-medium">
                        {Math.round((selectedAnomaly.actual / selectedAnomaly.expected - 1) * 100)}% higher than expected
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">AI Analysis</h4>
                    <p className="text-gray-600 text-sm">{selectedAnomaly.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Recommended Action</h4>
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                      <p className="text-green-800 text-sm">{selectedAnomaly.recommendation}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded hover:bg-indigo-700">
                      Apply Fix Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded hover:bg-gray-50">
                      View Similar Queries
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded hover:bg-gray-50">
                      Ignore Anomaly
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Anomaly Detection System</h3>
            <p className="text-amber-700 text-sm">
              Our AI continuously monitors your BigQuery usage patterns and learns your typical spending behavior. 
              It uses statistical methods and machine learning to identify unusual spikes or patterns that deviate 
              from your established baselines.
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded border border-amber-200">
                <h4 className="text-sm font-medium text-amber-800">Detection Methods</h4>
                <ul className="mt-1 text-xs text-amber-700 space-y-1">
                  <li>• Pattern recognition algorithms</li>
                  <li>• Time-series anomaly detection</li>
                  <li>• Automated baseline calculation</li>
                  <li>• Multi-dimensional analysis</li>
                </ul>
              </div>
              
              <div className="p-3 bg-white rounded border border-amber-200">
                <h4 className="text-sm font-medium text-amber-800">Monitored Metrics</h4>
                <ul className="mt-1 text-xs text-amber-700 space-y-1">
                  <li>• Data processed per query</li>
                  <li>• Query execution time</li>
                  <li>• Cost per project/user</li>
                  <li>• Slot utilization patterns</li>
                </ul>
              </div>
              
              <div className="p-3 bg-white rounded border border-amber-200">
                <h4 className="text-sm font-medium text-amber-800">Alert Settings</h4>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-amber-700">Sensitivity</span>
                  <span className="text-xs font-medium text-amber-800">Medium</span>
                </div>
                <div className="w-full bg-amber-200 h-1.5 rounded-full mt-1">
                  <div className="bg-amber-500 h-1.5 rounded-full w-1/2"></div>
                </div>
                <button className="mt-2 text-xs text-amber-800 font-medium underline">
                  Adjust settings
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}