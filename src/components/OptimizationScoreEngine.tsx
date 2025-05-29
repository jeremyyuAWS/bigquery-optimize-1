import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award, TrendingUp, AlertCircle, Info, ArrowUp, ArrowDown, CheckCircle, HelpCircle, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';

export function OptimizationScoreEngine() {
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'history'>('overview');
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);
  
  const toggleFactor = (factor: string) => {
    if (expandedFactor === factor) {
      setExpandedFactor(null);
    } else {
      setExpandedFactor(factor);
    }
  };
  
  // Generate score history data
  const generateScoreHistory = () => {
    const data = [];
    let score = 72;
    
    for (let i = 0; i < 12; i++) {
      // Add some random variation but with a general upward trend
      const change = Math.random() * 3 - 0.5; // Mostly positive changes
      score = Math.min(98, Math.max(0, score + change));
      
      // Format date as month
      const date = new Date();
      date.setMonth(date.getMonth() - 11 + i);
      const month = date.toLocaleString('default', { month: 'short' });
      
      data.push({
        month,
        score: Math.round(score * 10) / 10
      });
    }
    
    return data;
  };
  
  const scoreHistory = generateScoreHistory();
  const currentScore = scoreHistory[scoreHistory.length - 1].score;
  const previousScore = scoreHistory[scoreHistory.length - 2].score;
  const scoreDifference = currentScore - previousScore;
  
  // Score components data
  const scoreComponents = [
    { name: 'Query Efficiency', value: 78, description: 'Measures how efficiently queries scan data' },
    { name: 'Slot Utilization', value: 92, description: 'Evaluates how effectively slot capacity is used' },
    { name: 'Join Patterns', value: 65, description: 'Analyzes the efficiency of JOIN operations' },
    { name: 'Job Success Rate', value: 98, description: 'Percentage of jobs that complete successfully' },
    { name: 'Cost per Query', value: 82, description: 'Average cost relative to data processed' }
  ];
  
  // Score factors with impact analysis
  const scoreFactors = [
    {
      name: 'SELECT * Queries',
      status: 'high-impact',
      current: '32% of queries',
      target: '< 10% of queries',
      impact: 'Reducing by 50% would improve score by +7 points',
      details: 'Queries using SELECT * process all columns in a table, even if only a few are needed. This increases the amount of data scanned and processed, leading to higher costs and slower performance. Specifying only required columns can reduce data processing by up to 80% in many cases.'
    },
    {
      name: 'Inefficient JOINs',
      status: 'medium-impact',
      current: '28% of joins',
      target: '< 15% of joins',
      impact: 'Optimizing top 5 JOIN patterns would improve score by +5 points',
      details: 'Your current JOIN patterns often process large tables before filtering, resulting in unnecessary data processing. Implementing filters before JOINs, especially in your ETL pipelines, would significantly reduce costs. The most inefficient patterns are in the daily_analytics and user_behavior_analysis queries.'
    },
    {
      name: 'Slot Usage Patterns',
      status: 'low-impact',
      current: '68% utilization',
      target: '> 85% utilization',
      impact: 'Better slot allocation would improve score by +3 points',
      details: 'Your current slot utilization shows significant variations throughout the day. During business hours, utilization averages 85%, while dropping to 35% during nights and weekends. Implementing auto-scaling or scheduled capacity changes could optimize resource usage and costs.'
    },
    {
      name: 'Query Failures',
      status: 'positive',
      current: '< 2% failure rate',
      target: '< 3% failure rate',
      impact: 'Your failure rate is already better than target',
      details: 'Your query failure rate is excellent at under 2%, which is better than the industry average of 3-5%. This indicates well-structured queries and appropriate resource allocation. Continue monitoring for any changes in this metric.'
    },
    {
      name: 'Data Retention',
      status: 'medium-impact',
      current: '40% of tables without expiration',
      target: '< 15% of tables without expiration',
      impact: 'Implementing expiration policies would improve score by +4 points',
      details: `Many temporary or analytical tables don't have expiration policies, leading to unnecessary storage costs and potentially higher query costs when these tables are queried. Implementing appropriate table expiration policies based on data access patterns could reduce storage costs by up to 30%.`
    }
  ];
  
  // Generate radar data for score components
  const radarData = scoreComponents.map(component => ({
    subject: component.name,
    A: component.value,
    fullMark: 100
  }));
  
  // Custom tooltip for score history
  const ScoreTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
          <p className="text-gray-700">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high-impact':
        return 'text-red-600 bg-red-100';
      case 'medium-impact':
        return 'text-amber-600 bg-amber-100';
      case 'low-impact':
        return 'text-blue-600 bg-blue-100';
      case 'positive':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Award className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Optimization Score Engine</h2>
        </div>
        <p className="text-gray-600">
          Comprehensive score reflecting BigQuery usage health and efficiency based on multiple factors
        </p>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex px-6">
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'overview'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Score Overview
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'components'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('components')}
          >
            Score Components
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'history'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Score History
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && (
          <>
            <div className="mb-6 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-3xl font-bold text-indigo-700">{currentScore}</span>
                    </div>
                    <div className={`absolute -top-1 -right-1 rounded-full p-1 ${
                      scoreDifference >= 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {scoreDifference >= 0 ? (
                        <ArrowUp className="h-3 w-3 text-white" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="ml-5">
                    <h3 className="font-bold text-xl text-indigo-900">Optimization Score</h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-medium ${scoreDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {scoreDifference >= 0 ? '+' : ''}{scoreDifference.toFixed(1)} pts
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        since last month
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm text-indigo-800">Score Range:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      currentScore >= 90 ? 'bg-green-100 text-green-800' : 
                      currentScore >= 75 ? 'bg-blue-100 text-blue-800' :
                      currentScore >= 60 ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentScore >= 90 ? 'Excellent' : 
                       currentScore >= 75 ? 'Good' :
                       currentScore >= 60 ? 'Fair' :
                       'Needs Improvement'}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-700">
                    {currentScore >= 90 ? 'Your optimization is industry-leading' : 
                     currentScore >= 75 ? 'Good optimization with some room for improvement' :
                     currentScore >= 60 ? 'Several optimization opportunities exist' :
                     'Significant optimization potential available'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Key Improvement Factors</h3>
                <button className="text-indigo-600 text-sm hover:text-indigo-800 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  How is this calculated?
                </button>
              </div>
              
              <div className="space-y-4">
                {scoreFactors.map((factor) => (
                  <div key={factor.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            factor.status === 'high-impact' ? 'bg-red-500' :
                            factor.status === 'medium-impact' ? 'bg-amber-500' :
                            factor.status === 'low-impact' ? 'bg-blue-500' :
                            'bg-green-500'
                          }`}></span>
                          <h4 className="font-medium text-gray-900">{factor.name}</h4>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(factor.status)}`}>
                            {factor.status === 'high-impact' ? 'High Impact' :
                             factor.status === 'medium-impact' ? 'Medium Impact' :
                             factor.status === 'low-impact' ? 'Low Impact' :
                             'Optimized'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <span className="text-xs text-gray-500">Current:</span>
                            <p className="text-sm font-medium text-gray-900">{factor.current}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Target:</span>
                            <p className="text-sm font-medium text-gray-900">{factor.target}</p>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm text-indigo-700">
                          <strong>Impact:</strong> {factor.impact}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => toggleFactor(factor.name)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {expandedFactor === factor.name ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    {expandedFactor === factor.name && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">{factor.details}</p>
                        <div className="mt-3 flex justify-end">
                          <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                            View Optimization Plan
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">AI-Powered Recommendations</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Based on your current score and usage patterns, here are the top recommendations to improve your optimization score:
                  </p>
                  
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-indigo-800">1</span>
                      </span>
                      <div className="bg-white p-2 rounded border border-indigo-200 flex-1">
                        <p className="text-sm font-medium text-indigo-800">Replace SELECT * with specific column selection</p>
                        <p className="text-xs text-indigo-700 mt-0.5">
                          Potential score improvement: +7 points
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-indigo-800">2</span>
                      </span>
                      <div className="bg-white p-2 rounded border border-indigo-200 flex-1">
                        <p className="text-sm font-medium text-indigo-800">Optimize JOIN operations in ETL pipelines</p>
                        <p className="text-xs text-indigo-700 mt-0.5">
                          Potential score improvement: +5 points
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-indigo-800">3</span>
                      </span>
                      <div className="bg-white p-2 rounded border border-indigo-200 flex-1">
                        <p className="text-sm font-medium text-indigo-800">Implement table expiration policies</p>
                        <p className="text-xs text-indigo-700 mt-0.5">
                          Potential score improvement: +4 points
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-center">
                      <button className="text-indigo-700 font-medium hover:text-indigo-900">
                        View Complete Optimization Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'components' && (
          <>
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Score Component Breakdown</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={120} width={400} height={400} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#4F46E5"
                        fill="#818CF8"
                        fillOpacity={0.5}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 mb-2">Score Components Explained</h3>
                
                {scoreComponents.map((component, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{component.name}</h4>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${
                          component.value >= 90 ? 'text-green-600' :
                          component.value >= 75 ? 'text-blue-600' :
                          component.value >= 60 ? 'text-amber-600' :
                          'text-red-600'
                        }`}>
                          {component.value}/100
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          component.value >= 90 ? 'bg-green-600' :
                          component.value >= 75 ? 'bg-blue-600' :
                          component.value >= 60 ? 'bg-amber-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${component.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900">How We Calculate Your Score</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        The optimization score is a weighted average of multiple components that reflect different aspects of BigQuery usage efficiency.
                        Each component has specific metrics and thresholds that contribute to its score.
                      </p>
                      <div className="mt-2 text-xs text-blue-700">
                        <p className="font-medium">Scoring Formula:</p>
                        <p>Optimization Score = (QueryEfficiency × 0.3) + (SlotUtilization × 0.25) + (JoinPatterns × 0.2) + (JobSuccessRate × 0.15) + (CostPerQuery × 0.1)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Score Impact Analysis</h3>
              <p className="text-gray-600 mb-4">
                This chart shows how specific improvements would affect your overall optimization score
              </p>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Current Score', value: currentScore },
                      { name: 'Fix SELECT *', value: currentScore + 7 },
                      { name: 'Optimize JOINs', value: currentScore + 5 },
                      { name: 'Set Expirations', value: currentScore + 4 },
                      { name: 'Optimize Slots', value: currentScore + 3 },
                      { name: 'All Combined', value: Math.min(100, currentScore + 19) }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'history' && (
          <>
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Score Trend (Last 12 Months)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ScoreTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">12-Month Improvement</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      +{(scoreHistory[scoreHistory.length - 1].score - scoreHistory[0].score).toFixed(1)} pts
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {(
                        ((scoreHistory[scoreHistory.length - 1].score - scoreHistory[0].score) / 
                        scoreHistory[0].score) * 100
                      ).toFixed(1)}% increase
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Most Improved Component</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">Query Efficiency</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Improved from 54 to 78 points (+24)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Next Focus Area</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">Join Patterns</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Current score: 65/100
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <BarChart2 className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">Score Impact Analysis</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our time series analysis has identified these key trends and change points in your optimization journey:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">February 2024</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        <span className="text-green-600 font-medium">+3.2 points</span> improvement 
                        after implementing column selection in analytics queries
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">December 2023</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        <span className="text-green-600 font-medium">+5.6 points</span> improvement 
                        after implementing partitioning on large tables
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">October 2023</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        <span className="text-green-600 font-medium">+4.8 points</span> improvement 
                        after optimizing ETL job query patterns
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800">Cost Impact of Score Improvements</h4>
                    <p className="text-xs text-indigo-700 mt-1">
                      Your optimization score has improved from 72.3 to 83.5 over the past 12 months, 
                      corresponding to an estimated cost reduction of $5,250/month (21% savings).
                      Each point improvement in your score has translated to approximately $470 in monthly savings.
                    </p>
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