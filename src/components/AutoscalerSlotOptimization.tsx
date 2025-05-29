import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sliders, ArrowUp, ArrowDown, Clock, AlertCircle, Settings, Info, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';

export function AutoscalerSlotOptimization() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [viewMode, setViewMode] = useState<'overview' | 'hourly' | 'patterns'>('overview');
  
  // Generate mock data for slot utilization
  const generateSlotData = () => {
    const hourlyData = [];
    const now = new Date();
    const hoursToGenerate = timeRange === '24h' ? 24 : timeRange === '7d' ? 24 * 7 : 30;
    
    for (let i = 0; i < hoursToGenerate; i++) {
      const date = new Date(now.getTime() - (i * 60 * 60 * 1000));
      
      // Create a pattern with business hours having higher utilization
      const hour = date.getHours();
      const isBusinessHour = hour >= 9 && hour <= 17;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      // Base utilization depends on time of day and weekday/weekend
      let baseUtilization = isBusinessHour ? 65 : 25;
      if (isWeekend) baseUtilization *= 0.5;
      
      // Add some randomness
      const randomFactor = 1 + (Math.random() * 0.4 - 0.2); // ±20%
      const utilization = Math.min(100, Math.round(baseUtilization * randomFactor));
      
      // Generate slot allocation values
      const floor = 200;
      const ceiling = 800;
      const allocated = Math.round(floor + ((ceiling - floor) * utilization / 100));
      const used = Math.round(allocated * (0.7 + Math.random() * 0.2)); // 70-90% of allocated
      
      // Sometimes simulate hitting the ceiling
      const hitCeiling = utilization > 85 && Math.random() > 0.7;
      const waitingQueries = hitCeiling ? Math.round(Math.random() * 12) : 0;
      
      hourlyData.push({
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: date.toISOString(),
        utilization,
        allocated,
        used,
        floor,
        ceiling,
        hitCeiling,
        waitingQueries
      });
    }
    
    // Reverse to get chronological order
    return hourlyData.reverse();
  };
  
  const slotData = generateSlotData();
  
  // Calculate metrics
  const calculateMetrics = (data: any[]) => {
    return {
      avgUtilization: Math.round(data.reduce((acc, item) => acc + item.utilization, 0) / data.length),
      maxUtilization: Math.max(...data.map(item => item.utilization)),
      avgWaitingQueries: Math.round(data.reduce((acc, item) => acc + item.waitingQueries, 0) / data.length * 10) / 10,
      ceilingHitCount: data.filter(item => item.hitCeiling).length,
      wastedCapacity: Math.round(data.reduce((acc, item) => acc + (item.allocated - item.used), 0) / data.length)
    };
  };
  
  const metrics = calculateMetrics(slotData);
  
  // Generate daily patterns data
  const generateDailyPatterns = () => {
    return [
      { day: 'Monday', morningAvg: 80, afternoonAvg: 70, eveningAvg: 40, nightAvg: 20 },
      { day: 'Tuesday', morningAvg: 85, afternoonAvg: 75, eveningAvg: 45, nightAvg: 25 },
      { day: 'Wednesday', morningAvg: 90, afternoonAvg: 80, eveningAvg: 50, nightAvg: 30 },
      { day: 'Thursday', morningAvg: 75, afternoonAvg: 85, eveningAvg: 45, nightAvg: 25 },
      { day: 'Friday', morningAvg: 70, afternoonAvg: 60, eveningAvg: 35, nightAvg: 15 },
      { day: 'Saturday', morningAvg: 30, afternoonAvg: 25, eveningAvg: 20, nightAvg: 15 },
      { day: 'Sunday', morningAvg: 20, afternoonAvg: 25, eveningAvg: 30, nightAvg: 20 }
    ];
  };
  
  const dailyPatterns = generateDailyPatterns();
  
  // Custom tooltip for slot data
  const SlotTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded border border-gray-200 shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-gray-700">Utilization: <span className="font-medium">{data.utilization}%</span></p>
          <p className="text-gray-700">Allocated Slots: <span className="font-medium">{data.allocated}</span></p>
          <p className="text-gray-700">Used Slots: <span className="font-medium">{data.used}</span></p>
          {data.hitCeiling && (
            <p className="text-red-600 font-medium">
              Ceiling hit! {data.waitingQueries} queries waiting
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Sliders className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Autoscaler-Aware Slot Optimization</h2>
        </div>
        <p className="text-gray-600">
          Intelligent analysis of slot allocation efficiency in autoscaler mode for optimal cost and performance
        </p>
      </div>
      
      <div className="flex p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-1 space-x-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'overview' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('hourly')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'hourly' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Hourly Analysis
          </button>
          <button
            onClick={() => setViewMode('patterns')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'patterns' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Usage Patterns
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Time Range:</span>
          <div className="flex bg-white border border-gray-300 rounded-md p-0.5">
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-2 py-0.5 text-xs rounded ${
                timeRange === '24h' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-2 py-0.5 text-xs rounded ${
                timeRange === '7d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              7d
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-2 py-0.5 text-xs rounded ${
                timeRange === '30d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
              }`}
            >
              30d
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {viewMode === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <Sliders className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Autoscaler Settings</h3>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Floor:</span>
                        <span className="font-medium text-gray-900">200 slots</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">Ceiling:</span>
                        <span className="font-medium text-gray-900">800 slots</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Avg. Utilization</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.avgUtilization}%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Peak: {metrics.maxUtilization}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Ceiling Hit Events</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.ceilingHitCount}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Avg. waiting queries: {metrics.avgWaitingQueries}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Wasted Capacity</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.wastedCapacity} slots</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Average unused allocated slots
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Slot Utilization with Autoscaler Boundaries</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Ceiling Hit</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">Autoscaler Range</span>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={slotData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      interval={timeRange === '24h' ? 2 : 'preserveStartEnd'}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<SlotTooltip />} />
                    <Legend />
                    
                    {/* Ceiling area */}
                    <Area 
                      type="monotone" 
                      dataKey="ceiling" 
                      fill="#f3f4f6" 
                      stroke="#d1d5db" 
                      fillOpacity={0.3}
                    />
                    
                    {/* Floor area */}
                    <Area 
                      type="monotone" 
                      dataKey="floor" 
                      fill="transparent" 
                      stroke="#d1d5db" 
                      fillOpacity={0.1}
                    />
                    
                    {/* Allocated slots line */}
                    <Line 
                      type="monotone" 
                      dataKey="allocated" 
                      stroke="#4F46E5" 
                      strokeWidth={2} 
                      dot={false}
                      name="Allocated Slots"
                    />
                    
                    {/* Used slots line */}
                    <Line 
                      type="monotone" 
                      dataKey="used" 
                      stroke="#818CF8" 
                      strokeWidth={2} 
                      dot={false}
                      name="Used Slots"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                  <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">AI-Powered Optimization Insights</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Based on your slot utilization patterns, our AI has identified the following optimization opportunities:
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <TrendingDown className="h-4 w-4 text-green-600 mr-2" />
                          <h4 className="font-medium text-indigo-900">Floor Reduction Opportunity</h4>
                        </div>
                        <p className="text-xs text-indigo-700">
                          Current floor (200 slots) is rarely fully utilized during non-business hours. 
                          Reducing to 125 slots during nights and weekends could save approximately $1,500/month.
                        </p>
                        <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                          View implementation plan
                        </button>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <ArrowUp className="h-4 w-4 text-amber-600 mr-2" />
                          <h4 className="font-medium text-indigo-900">Ceiling Adjustment Needed</h4>
                        </div>
                        <p className="text-xs text-indigo-700">
                          The current ceiling (800 slots) was hit {metrics.ceilingHitCount} times, causing query delays.
                          Consider increasing to 1,000 slots during peak hours (Tues-Thurs 10am-2pm).
                        </p>
                        <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                          View performance impact
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-indigo-200">
                      <div className="flex items-center mb-2">
                        <Settings className="h-4 w-4 text-indigo-600 mr-2" />
                        <h4 className="font-medium text-indigo-900">Optimal Autoscaler Configuration</h4>
                      </div>
                      <div className="text-xs text-indigo-700">
                        <p>Based on your workload patterns, our AI recommends these autoscaler settings:</p>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-2 bg-indigo-50 rounded">
                            <p className="font-medium">Business Hours (9am-6pm)</p>
                            <p>Floor: 250 slots</p>
                            <p>Ceiling: 1,000 slots</p>
                          </div>
                          <div className="p-2 bg-indigo-50 rounded">
                            <p className="font-medium">Non-Business Hours</p>
                            <p>Floor: 125 slots</p>
                            <p>Ceiling: 500 slots</p>
                          </div>
                          <div className="p-2 bg-indigo-50 rounded">
                            <p className="font-medium">Weekends</p>
                            <p>Floor: 100 slots</p>
                            <p>Ceiling: 400 slots</p>
                          </div>
                        </div>
                        <p className="mt-2">
                          <strong>Projected monthly savings:</strong> $3,800 (15% reduction)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {viewMode === 'hourly' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Hourly Slot Utilization Breakdown</h3>
              <div className="flex space-x-2">
                <button className="text-sm px-3 py-1 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </button>
                <button className="text-sm px-3 py-1 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
                  <Calendar className="h-4 w-4 mr-1" />
                  Change Date
                </button>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slotData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    interval={timeRange === '24h' ? 1 : 'preserveStartEnd'}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Slots', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Utilization %', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 12 } }}
                  />
                  <Tooltip content={<SlotTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="used" name="Used Slots" fill="#4F46E5" barSize={30} />
                  <Bar yAxisId="left" dataKey="allocated" name="Allocated Slots" fill="#818CF8" barSize={30} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="utilization"
                    name="Utilization %"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Ceiling Hit Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={slotData.filter(d => d.waitingQueries > 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="waitingQueries" name="Waiting Queries" fill="#F87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Wasted Capacity Analysis</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={slotData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={5} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="allocated" 
                        name="Allocated" 
                        stroke="#818CF8" 
                        fill="#818CF8" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="used" 
                        name="Used" 
                        stroke="#4F46E5" 
                        fill="#4F46E5" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-medium text-amber-900 mb-3">Cost Impact Analysis</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-800">Current Monthly Cost</span>
                      <span className="font-medium text-amber-900">$16,000</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2 mt-1">
                      <div className="bg-amber-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-800">Optimized Monthly Cost</span>
                      <span className="font-medium text-amber-900">$12,200</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2 mt-1">
                      <div className="bg-amber-500 h-2 rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 mt-2 border-t border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-amber-800">Potential Monthly Savings</span>
                      <span className="text-lg font-bold text-green-600">$3,800</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {viewMode === 'patterns' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Weekly Slot Utilization Patterns</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                    <Legend />
                    <Bar dataKey="morningAvg" name="Morning (6am-12pm)" fill="#4F46E5" />
                    <Bar dataKey="afternoonAvg" name="Afternoon (12pm-6pm)" fill="#818CF8" />
                    <Bar dataKey="eveningAvg" name="Evening (6pm-12am)" fill="#38BDF8" />
                    <Bar dataKey="nightAvg" name="Night (12am-6am)" fill="#22D3EE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Clear patterns show higher slot utilization on weekdays, particularly mid-week, with mornings and afternoons showing peak usage.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-medium text-indigo-900 mb-3">Predictable Patterns</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                      <h4 className="text-sm font-medium text-indigo-800">Daily Patterns</h4>
                    </div>
                    <p className="mt-1 text-xs text-indigo-700">
                      Highest utilization occurs between 10am-2pm, with a secondary peak around 4pm.
                      Night hours (11pm-5am) consistently show utilization below 30%.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                      <h4 className="text-sm font-medium text-indigo-800">Weekly Patterns</h4>
                    </div>
                    <p className="mt-1 text-xs text-indigo-700">
                      Tuesday through Thursday show highest utilization (~85%), with Monday and Friday slightly lower.
                      Weekend utilization drops to ~25% of weekday levels.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-indigo-600 mr-2" />
                      <h4 className="text-sm font-medium text-indigo-800">Special Events</h4>
                    </div>
                    <p className="mt-1 text-xs text-indigo-700">
                      Monthly peak occurs on the last business day of each month, coinciding with month-end reporting.
                      Quarterly peaks are even higher, with 95%+ utilization common.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-900 mb-3">AI-Generated Recommendations</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 text-green-600 mr-2" />
                      <h4 className="text-sm font-medium text-green-800">Optimized Floor Settings</h4>
                    </div>
                    <ul className="mt-1 space-y-1">
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Weekdays (8am-6pm): 250 slots</span>
                      </li>
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Weekday evenings (6pm-8am): 125 slots</span>
                      </li>
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Weekends: 100 slots</span>
                      </li>
                    </ul>
                    <p className="mt-1 text-xs text-green-800 font-medium">
                      Estimated monthly savings: $2,200
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-green-200">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 text-green-600 mr-2" />
                      <h4 className="text-sm font-medium text-green-800">Optimized Ceiling Settings</h4>
                    </div>
                    <ul className="mt-1 space-y-1">
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Weekdays (9am-3pm): 1,000 slots</span>
                      </li>
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Month-end reporting days: 1,200 slots</span>
                      </li>
                      <li className="text-xs text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>All other times: 600 slots</span>
                      </li>
                    </ul>
                    <p className="mt-1 text-xs text-green-800 font-medium">
                      Estimated performance improvement: 25% faster completion times
                    </p>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Generate Implementation Plan
                    </button>
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