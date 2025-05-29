import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, DollarSign, TrendingUp, Download, Sliders, FileText, CheckCircle2, Info, BarChart2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { format, addMonths } from 'date-fns';

// Generate forecast data for slot usage
const generateSlotForecastData = () => {
  const months = 12;
  const currentSlots = 500;
  const monthlyGrowthRate = 0.05; // 5% monthly growth

  return Array.from({ length: months }, (_, i) => {
    const dateObj = addMonths(new Date(), i);
    const month = format(dateObj, 'MMM');
    const year = format(dateObj, 'yy');
    
    // Add some randomness to make data look realistic
    const randomFactor = 1 + (Math.random() * 0.1 - 0.05); // ±5%
    
    // Calculate projected growth
    const growthFactor = Math.pow(1 + monthlyGrowthRate, i);
    const projectedSlots = Math.round(currentSlots * growthFactor * randomFactor);
    
    // Calculate optimal slots with AI optimization
    const optimizationFactor = 0.9 - (i * 0.01); // Optimization improves over time
    const optimalSlots = Math.round(projectedSlots * optimizationFactor);

    return {
      month: `${month} ${year}`,
      projectedSlots,
      optimalSlots,
      costSavings: (projectedSlots - optimalSlots) * 20 // $20 per slot for estimation
    };
  });
};

// Generate slot utilization data
const generateUtilizationData = () => {
  const hours = 24;
  
  return Array.from({ length: hours }, (_, i) => {
    // Create a pattern that looks like typical business hours
    let baseUtilization = 30; // Base utilization
    
    // Higher during business hours (9 AM to 6 PM)
    if (i >= 9 && i <= 18) {
      baseUtilization = 75;
      // Peak at around 11 AM and 3 PM
      if (i === 11 || i === 15) {
        baseUtilization = 90;
      }
    }
    
    // Add some randomness
    const utilization = Math.min(100, Math.max(10, baseUtilization + (Math.random() * 20 - 10)));
    
    return {
      hour: i,
      utilization: Math.round(utilization),
      formattedHour: i === 0 ? '12 AM' : i === 12 ? '12 PM' : i < 12 ? `${i} AM` : `${i - 12} PM`
    };
  });
};

// Generate data for different pricing tiers
const generatePricingTiers = () => {
  return [
    { name: '100 slots', annualCommitment: 24000, annualOnDemand: 32500, savings: 8500 },
    { name: '500 slots', annualCommitment: 96000, annualOnDemand: 156000, savings: 60000 },
    { name: '1000 slots', annualCommitment: 192000, annualOnDemand: 340000, savings: 148000 },
    { name: '2000 slots', annualCommitment: 384000, annualOnDemand: 695000, savings: 311000 }
  ];
};

export function MLCapacityPlanning() {
  const [showRecommendationDetails, setShowRecommendationDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'forecast' | 'utilization' | 'comparison'>('forecast');

  const slotForecastData = generateSlotForecastData();
  const utilizationData = generateUtilizationData();
  const pricingTiers = generatePricingTiers();

  const currentMonth = slotForecastData[0];
  const sixMonthRecommendation = slotForecastData[5];
  const yearEndRecommendation = slotForecastData[11];

  // Calculate potential savings
  const totalPotentialSavings = slotForecastData.reduce((sum, month) => sum + month.costSavings, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <BarChart2 className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">ML-Powered Capacity Planning</h2>
        </div>
        <p className="text-gray-600">
          AI-powered forecasting and optimization of BigQuery slot requirements based on historical usage patterns and growth projections.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('forecast')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forecast'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Slot Forecasting
            </button>
            <button
              onClick={() => setActiveTab('utilization')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'utilization'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Utilization Analysis
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comparison'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pricing Comparison
            </button>
          </nav>
        </div>
        
        {activeTab === 'forecast' && (
          <>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">AI-Generated Capacity Recommendation</h3>
                  <p className="text-indigo-700 text-sm mt-1">
                    Based on your historical usage patterns and projected growth, our AI recommends:
                  </p>
                </div>
                
                <div className="mt-3 md:mt-0 bg-white p-3 rounded-lg border border-indigo-200">
                  <div className="flex items-center">
                    <span className="font-bold text-2xl text-indigo-700">{currentMonth.optimalSlots} slots</span>
                    <span className="text-sm text-indigo-600 ml-2">current optimal capacity</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-indigo-800">
                      Increasing to <span className="font-semibold">{yearEndRecommendation.optimalSlots} slots</span> by year end
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowRecommendationDetails(!showRecommendationDetails)}
                className="mt-3 flex items-center text-sm text-indigo-700 hover:text-indigo-900"
              >
                {showRecommendationDetails ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                {showRecommendationDetails ? 'Hide details' : 'View recommendation details'}
              </button>
              
              {showRecommendationDetails && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800">Current Recommendation</h4>
                    <p className="text-2xl font-bold text-indigo-700">{currentMonth.optimalSlots} slots</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      Based on current utilization of ~{Math.round(currentMonth.projectedSlots * 0.75)} slots at peak with 25% headroom
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800">6-Month Projection</h4>
                    <p className="text-2xl font-bold text-indigo-700">{sixMonthRecommendation.optimalSlots} slots</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      Accounts for 5% monthly growth and seasonal patterns
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800">12-Month Projection</h4>
                    <p className="text-2xl font-bold text-indigo-700">{yearEndRecommendation.optimalSlots} slots</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      Consider reserving capacity at this level if making annual commitment
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Slot Requirement Forecast</h3>
                <button className="flex items-center px-3 py-1 text-xs bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </button>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={slotForecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                      if (name === 'projectedSlots') return [`${value} slots`, 'Projected Need'];
                      if (name === 'optimalSlots') return [`${value} slots`, 'AI Optimized'];
                      return [value, name];
                    }} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="projectedSlots" 
                      name="Projected Need" 
                      stackId="1" 
                      stroke="#818CF8" 
                      fill="#818CF8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="optimalSlots" 
                      name="AI Optimized" 
                      stackId="2" 
                      stroke="#4F46E5" 
                      fill="#4F46E5" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <span className="text-sm font-medium text-green-800">Potential 12-Month Savings:</span>
                    <span className="text-lg font-bold text-green-700 ml-2">${totalPotentialSavings.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  AI optimization can help you avoid overprovisioning while ensuring performance reliability
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Factors Influencing AI Forecast</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-800">Historical Trends</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Analysis of 6-month usage history shows consistent growth at 5% per month and 25% higher usage during end-of-quarter periods.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="h-4 w-4 text-indigo-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-800">Project Growth</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your data volume is growing at 3.5% monthly, while query complexity is increasing at 1.5% monthly, contributing to slot demand.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Sliders className="h-4 w-4 text-indigo-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-800">Usage Patterns</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Weekday usage is 65% higher than weekends, with Tuesday and Wednesday showing highest peak demand.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-900">ML Forecast Confidence Analysis</h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Our model has high confidence (95%) in short-term forecasts (1-3 months), while long-term forecasts (6-12 months) have moderate confidence (78%) due to potential changes in:
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-2 rounded border border-amber-200">
                      <span className="text-xs font-medium text-amber-800">Business Growth Variables</span>
                      <p className="text-xs text-amber-700 mt-1">
                        Potential new analytics initiatives and business expansion may accelerate usage beyond current growth patterns.
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded border border-amber-200">
                      <span className="text-xs font-medium text-amber-800">Optimization Implementation</span>
                      <p className="text-xs text-amber-700 mt-1">
                        Implementation of recommended query optimizations could reduce slot requirements beyond predictions.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700 mt-2">
                    We recommend reviewing these forecasts quarterly and adjusting capacity as needed based on actual usage.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'utilization' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Average Slot Utilization</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-indigo-600">62<span className="text-lg">%</span></p>
                  <p className="text-xs text-gray-500 ml-2">over past 30 days</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Peak Slot Usage</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-indigo-600">87<span className="text-lg">%</span></p>
                  <p className="text-xs text-gray-500 ml-2">highest utilization</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Utilization Efficiency</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-indigo-600">71<span className="text-lg">%</span></p>
                  <p className="text-xs text-gray-500 ml-2">optimization score</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Hourly Slot Utilization (24h)</h3>
                <button className="flex items-center px-3 py-1 text-xs bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
                  <Calendar className="h-3 w-3 mr-1" />
                  Change Date
                </button>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formattedHour" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                    <Bar dataKey="utilization" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    {/* Add a reference line for optimal utilization */}
                    <div className="custom-reference-line" style={{ position: 'absolute', width: '100%', height: '1px', background: '#EF4444', top: '15%' }}>
                      <div style={{ position: 'absolute', right: '10px', top: '-10px', fontSize: '12px', color: '#EF4444' }}>Target: 80%</div>
                    </div>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-start">
                  <Sliders className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-900">AI Workload Analysis</h4>
                    <p className="text-xs text-purple-800 mt-1">
                      Peak utilization occurs between 10am-3pm, while nights and weekends show significantly lower usage. Consider implementing a workload management strategy:
                    </p>
                    <ul className="mt-1 text-xs text-purple-700 list-disc list-inside space-y-1">
                      <li>Schedule non-critical batch jobs during off-peak hours (8pm-6am)</li>
                      <li>Allocate more slots to interactive queries during peak hours</li>
                      <li>Consider reducing capacity during consistent low-utilization periods</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Slot Allocation by Project</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Data Warehouse</span>
                      <span className="text-xs font-medium text-gray-800">240 slots (48%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Marketing Analytics</span>
                      <span className="text-xs font-medium text-gray-800">125 slots (25%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Customer 360</span>
                      <span className="text-xs font-medium text-gray-800">80 slots (16%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Financial Reporting</span>
                      <span className="text-xs font-medium text-gray-800">35 slots (7%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Product Analytics</span>
                      <span className="text-xs font-medium text-gray-800">20 slots (4%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Slot Utilization Optimization</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <h4 className="text-sm font-medium text-indigo-800">Current Slot Allocation</h4>
                    <div className="flex items-baseline mt-1">
                      <span className="text-xl font-bold text-indigo-700">500</span>
                      <span className="text-xs text-indigo-600 ml-1">slots committed</span>
                    </div>
                    <div className="flex items-center text-xs text-indigo-600 mt-1">
                      <span className="bg-indigo-100 text-indigo-800 px-1 rounded">$10,000</span>
                      <span className="ml-1">monthly commitment</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800">AI-Optimized Allocation</h4>
                    <div className="flex items-baseline mt-1">
                      <span className="text-xl font-bold text-green-700">450</span>
                      <span className="text-xs text-green-600 ml-1">slots recommended</span>
                    </div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <span className="bg-green-100 text-green-800 px-1 rounded">$9,000</span>
                      <span className="ml-1">potential monthly commitment</span>
                    </div>
                    <div className="flex items-center text-xs text-green-800 mt-2">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      <span>Maintains 99.5% of query performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">Advanced Utilization Analysis</h3>
                  <p className="text-sm text-blue-800 mt-1">
                    Our ML model has analyzed your utilization patterns and identified these key insights:
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Slot Contention Periods</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Tuesdays and Wednesdays from 10am-12pm show consistent slot contention with multiple critical workloads running simultaneously.
                      </p>
                      <button className="mt-2 text-xs text-blue-700 hover:text-blue-900 font-medium">
                        View workload details
                      </button>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Slot Waste Identification</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        12.5% of your slots are consistently underutilized on weekends and between 8pm-6am, representing a potential cost optimization opportunity.
                      </p>
                      <button className="mt-2 text-xs text-blue-700 hover:text-blue-900 font-medium">
                        View optimization strategies
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'comparison' && (
          <>
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Flat-Rate vs On-Demand Comparison</h3>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pricingTiers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Cost']}
                    />
                    <Legend />
                    <Bar dataKey="annualCommitment" name="Annual Commitment" fill="#4F46E5" />
                    <Bar dataKey="annualOnDemand" name="Equivalent On-Demand" fill="#818CF8" />
                    <Bar dataKey="savings" name="Potential Savings" fill="#34D399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Cost analysis assumes current query patterns and data processing volume with 5% monthly growth.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">AI Pricing Model Recommendation</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Based on your current workload patterns and growth projections, our AI recommends:
                  </p>
                  
                  <div className="mt-3 bg-white p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <h4 className="font-medium text-gray-900">Flat-Rate Pricing - 500 Slots</h4>
                        <p className="text-sm text-gray-600 mt-1">Annual commitment with enterprise support</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-2 bg-gray-50 rounded border border-gray-200">
                        <span className="text-xs text-gray-500">Annual Cost</span>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">$96,000</p>
                      </div>
                      
                      <div className="p-2 bg-gray-50 rounded border border-gray-200">
                        <span className="text-xs text-gray-500">On-Demand Equivalent</span>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">$156,000</p>
                      </div>
                      
                      <div className="p-2 bg-green-50 rounded border border-green-200">
                        <span className="text-xs text-green-600">Annual Savings</span>
                        <p className="text-lg font-bold text-green-700 mt-0.5">$60,000</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <p>This recommendation provides the optimal balance between cost savings and capacity flexibility based on your usage patterns.</p>
                    </div>
                    
                    <div className="mt-3">
                      <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                        Generate Migration Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Break-Even Analysis</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">100 slots commitment</span>
                      <span className="text-sm font-medium text-gray-900">320 TB/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Break-even point compared to on-demand pricing
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">500 slots commitment</span>
                      <span className="text-sm font-medium text-gray-900">1,280 TB/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Break-even point compared to on-demand pricing
                    </p>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-indigo-700">Your current usage</span>
                      <span className="text-sm font-medium text-indigo-900">940 TB/month</span>
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">
                      Based on last month's processing volume
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">1,000 slots commitment</span>
                      <span className="text-sm font-medium text-gray-900">1,920 TB/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Break-even point compared to on-demand pricing
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3">Commitment Recommendation Factors</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-2 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Growth Projections</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Based on historical growth trends of 5% monthly, a 500-slot commitment will handle your needs for approximately 6-8 months.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-2 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Workload Patterns</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Your consistent workload with predictable peaks makes flat-rate pricing advantageous. Peak utilization typically reaches 80-90% of current capacity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-2 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Query Optimization Impact</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Our AI predicts that implementing recommended query optimizations could reduce peak slot requirements by approximately 15-20%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-amber-100 rounded-full mr-2 mt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Future Uncertainty</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Consider that annual commitments lock in pricing but also limit flexibility. Quarterly reassessment may be worthwhile given your growth rate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}