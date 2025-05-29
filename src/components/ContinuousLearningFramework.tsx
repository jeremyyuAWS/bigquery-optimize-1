import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, ArrowRight, Clock, TrendingUp, BarChart2, CheckCircle2, BookOpen, History, Sparkles, Activity, Star, Info, Database, CalendarDays } from 'lucide-react';

// Generate model performance data
const generateAccuracyData = () => {
  const points = 12; // 12 months
  let baseAccuracy = 75; // Starting accuracy
  
  return Array.from({ length: points }, (_, i) => {
    // Simulate learning curve - quick initial improvements that slow over time
    const improvements = 23 * (1 - Math.exp(-0.3 * i));
    const accuracy = Math.min(98, baseAccuracy + improvements);
    
    // Add small random fluctuations
    const randomFactor = 1 + (Math.random() * 0.06 - 0.03); // ±3%
    const adjustedAccuracy = Math.round(accuracy * randomFactor * 10) / 10;
    
    return {
      month: i + 1,
      accuracy: adjustedAccuracy,
      label: `M${i + 1}`
    };
  });
};

// Generate recommendation feedback data
const generateFeedbackData = () => {
  return [
    { name: 'Implemented & Successful', value: 64 },
    { name: 'Implemented & Partial Success', value: 18 },
    { name: 'Implemented & Limited Impact', value: 8 },
    { name: 'Not Implemented', value: 10 }
  ];
};

// Generate learning categories data
const generateLearningData = () => {
  return [
    { category: 'Query Patterns', learned: 87, samples: 1240 },
    { category: 'Usage Patterns', learned: 92, samples: 845 },
    { category: 'Schema Optimization', learned: 78, samples: 320 },
    { category: 'Storage Patterns', learned: 85, samples: 560 },
    { category: 'Cost Anomalies', learned: 94, samples: 175 }
  ];
};

interface LearningExample {
  id: string;
  category: string;
  initialRecommendation: string;
  actualResult: string;
  improvement: string;
  learnedPattern: string;
  confidence: number;
  date: string;
}

const learningExamples: LearningExample[] = [
  {
    id: 'learn-1',
    category: 'Query Optimization',
    initialRecommendation: 'Implement partitioning on sales_data table by transaction_date',
    actualResult: 'Cost reduction of 72% vs predicted 65%',
    improvement: 'AI now recommends both partitioning AND clustering by product_category',
    learnedPattern: 'Your specific query patterns show product_category is commonly used with date filters',
    confidence: 92,
    date: '2024-03-12'
  },
  {
    id: 'learn-2',
    category: 'Storage Patterns',
    initialRecommendation: 'Move historical data older than 90 days to long-term storage',
    actualResult: 'Limited benefit due to frequent access to historical data',
    improvement: 'AI now analyzes actual data access patterns before storage recommendations',
    learnedPattern: 'Your organization frequently accesses 2+ year old data for analytics',
    confidence: 89,
    date: '2024-02-25'
  },
  {
    id: 'learn-3',
    category: 'Materialized Views',
    initialRecommendation: 'Create materialized view for daily user metrics',
    actualResult: 'Cost reduction of 85% and query latency improvement of 92%',
    improvement: 'AI now prioritizes materialized view recommendations higher',
    learnedPattern: 'Identified 12 more query patterns that would benefit from similar views',
    confidence: 96,
    date: '2024-03-05'
  },
  {
    id: 'learn-4',
    category: 'Capacity Planning',
    initialRecommendation: '650 slots based on historical patterns',
    actualResult: '580 slots were sufficient after implementing query optimizations',
    improvement: 'AI now factors in planned optimizations when recommending slot capacity',
    learnedPattern: 'Your capacity needs are more closely tied to query efficiency than data volume',
    confidence: 87,
    date: '2024-02-10'
  }
];

export function ContinuousLearningFramework() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'improvements' | 'metrics'>('overview');
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  
  const accuracyData = generateAccuracyData();
  const feedbackData = generateFeedbackData();
  const learningData = generateLearningData();
  
  const toggleExample = (id: string) => {
    if (expandedExample === id) {
      setExpandedExample(null);
    } else {
      setExpandedExample(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Continuous Learning Framework</h2>
        </div>
        <p className="text-gray-600">
          AI system that learns from implementation successes and failures, adapts recommendations, and improves accuracy over time.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Learning Overview
            </button>
            <button
              onClick={() => setSelectedTab('improvements')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'improvements'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommendation Improvements
            </button>
            <button
              onClick={() => setSelectedTab('metrics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'metrics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Learning Metrics
            </button>
          </nav>
        </div>
        
        {selectedTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <Brain className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">AI Recommendation Accuracy</h3>
                    <p className="text-3xl font-bold text-indigo-700 mt-1">94.8%</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      <span className="text-green-600">↑ 18.6%</span> improvement since implementation
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <History className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900">Learned Patterns</h3>
                    <p className="text-3xl font-bold text-purple-700 mt-1">283</p>
                    <p className="text-xs text-purple-600 mt-1">
                      Across query, storage and schema optimizations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Cost Prediction Accuracy</h3>
                    <p className="text-3xl font-bold text-green-700 mt-1">92.3%</p>
                    <p className="text-xs text-green-600 mt-1">
                      <span className="text-green-600">↑ 8.7%</span> improvement in last 30 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Accuracy Improvement Over Time</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Model Accuracy']} />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#4F46E5" 
                      strokeWidth={2}
                      dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Continuous learning model accuracy over the last 12 months
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Recommendation Feedback Loop</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feedbackData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" name="Result" fill="#4F46E5" barSize={40} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Based on 128 recommendations from the last 3 months
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Learning Categories</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={learningData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="category" type="category" width={120} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Learning Score']} />
                      <Bar dataKey="learned" name="Learning Score" fill="#4F46E5" barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">How the Continuous Learning System Works</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI system implements a feedback loop that continuously improves recommendations based on real-world results:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">1</span>
                        </div>
                        <h4 className="text-sm font-medium text-indigo-900">Initial Recommendation</h4>
                      </div>
                      <p className="text-xs text-indigo-700">AI generates optimization recommendations based on current understanding</p>
                      <ArrowRight className="h-4 w-4 text-indigo-400 self-end mt-2 md:rotate-90 md:mt-auto md:self-center md:mb-0 md:mr-auto" />
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">2</span>
                        </div>
                        <h4 className="text-sm font-medium text-indigo-900">Implementation</h4>
                      </div>
                      <p className="text-xs text-indigo-700">Users implement recommendations in their environment</p>
                      <ArrowRight className="h-4 w-4 text-indigo-400 self-end mt-2 md:rotate-90 md:mt-auto md:self-center md:mb-0 md:mr-auto" />
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">3</span>
                        </div>
                        <h4 className="text-sm font-medium text-indigo-900">Result Analysis</h4>
                      </div>
                      <p className="text-xs text-indigo-700">System tracks actual savings and performance impact</p>
                      <ArrowRight className="h-4 w-4 text-indigo-400 self-end mt-2 md:rotate-90 md:mt-auto md:self-center md:mb-0 md:mr-auto" />
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 flex flex-col">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-indigo-700">4</span>
                        </div>
                        <h4 className="text-sm font-medium text-indigo-900">Model Update</h4>
                      </div>
                      <p className="text-xs text-indigo-700">AI adjusts models based on actual outcomes to improve future recommendations</p>
                      <ArrowRight className="h-0 w-0 invisible" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {selectedTab === 'improvements' && (
          <>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start md:items-center">
                  <Sparkles className="h-5 w-5 text-purple-600 mt-0.5 md:mt-0 mr-2" />
                  <div>
                    <h3 className="text-lg font-medium text-purple-900">Learning-Driven Improvements</h3>
                    <p className="text-sm text-purple-700 md:mt-1">
                      Our AI system has evolved its recommendations based on real implementation results
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-0 flex items-center">
                  <span className="text-sm text-purple-800 font-medium">Last system update:</span>
                  <span className="ml-2 text-sm text-purple-700">Yesterday at 03:15 AM</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {learningExamples.map(example => (
                <div key={example.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExample(example.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                          example.category === 'Query Optimization' ? 'bg-blue-100' :
                          example.category === 'Storage Patterns' ? 'bg-green-100' :
                          example.category === 'Materialized Views' ? 'bg-amber-100' :
                          'bg-purple-100'
                        }`}>
                          {example.category === 'Query Optimization' ? <Database className="h-4 w-4 text-blue-600" /> :
                           example.category === 'Storage Patterns' ? <Database className="h-4 w-4 text-green-600" /> :
                           example.category === 'Materialized Views' ? <Database className="h-4 w-4 text-amber-600" /> :
                           <BarChart2 className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900">{example.category} Learning</h3>
                            <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                              {example.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{example.initialRecommendation}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        {expandedExample === example.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {expandedExample === example.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Learning Process</h4>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-xs font-semibold text-gray-700">1</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">Initial Recommendation</p>
                                <p className="text-xs text-gray-600 mt-0.5">{example.initialRecommendation}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-xs font-semibold text-gray-700">2</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">Actual Result</p>
                                <p className="text-xs text-gray-600 mt-0.5">{example.actualResult}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-xs font-semibold text-indigo-700">3</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-indigo-800">AI Learning</p>
                                <p className="text-xs text-indigo-600 mt-0.5">{example.learnedPattern}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendation Improvement</h4>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start">
                              <Sparkles className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-medium text-green-800">Improved Recommendation</p>
                                <p className="text-xs text-green-700 mt-1">{example.improvement}</p>
                                <div className="flex items-center mt-2">
                                  <CalendarDays className="h-3.5 w-3.5 text-green-600 mr-1" />
                                  <span className="text-xs text-green-600">Updated on {example.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex space-x-2">
                            <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
                              <Activity className="h-3.5 w-3.5 mr-1" />
                              View Related Patterns
                            </button>
                            <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center">
                              <Star className="h-3.5 w-3.5 mr-1" />
                              Apply Learnings
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">AI Learning Impact</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    The continuous learning system has significantly improved recommendation accuracy and business impact:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Accuracy Improvement</h4>
                      <p className="text-2xl font-bold text-blue-700 mt-1">+18.6<span className="text-lg">%</span></p>
                      <p className="text-xs text-blue-600 mt-1">
                        Overall recommendation accuracy improvement
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Cost Prediction</h4>
                      <p className="text-2xl font-bold text-blue-700 mt-1">±8.2<span className="text-lg">%</span></p>
                      <p className="text-xs text-blue-600 mt-1">
                        Average cost prediction error margin
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800">Implementation Rate</h4>
                      <p className="text-2xl font-bold text-blue-700 mt-1">82<span className="text-lg">%</span></p>
                      <p className="text-xs text-blue-600 mt-1">
                        Recommendation implementation rate (↑ 35%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {selectedTab === 'metrics' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Model Training Sessions</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">142</p>
                <p className="text-xs text-gray-500 mt-1">Incremental training runs</p>
                <div className="mt-2 text-xs text-gray-600 flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>Last training: 6 hours ago</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Learning Data Points</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">8,475</p>
                <p className="text-xs text-gray-500 mt-1">Feedback data points collected</p>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  <span>+325 in last 7 days</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Implementation Rate</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">82%</p>
                <p className="text-xs text-gray-500 mt-1">Recommendations implemented</p>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  <span>↑ from 55% initially</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Success Rate</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">91%</p>
                <p className="text-xs text-gray-500 mt-1">Successful optimization results</p>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  <span>↑ from 72% initially</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Model Performance by Category</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: 'Query Optimization', initial: 68, current: 94 },
                      { category: 'Storage Strategies', initial: 72, current: 88 },
                      { category: 'Schema Design', initial: 65, current: 84 },
                      { category: 'Capacity Planning', initial: 82, current: 96 },
                      { category: 'Cost Anomalies', initial: 79, current: 98 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                    <Legend />
                    <Bar dataKey="initial" name="Initial Accuracy" fill="#818CF8" barSize={20} />
                    <Bar dataKey="current" name="Current Accuracy" fill="#4F46E5" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Learning Data Sources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700">Implementation Results</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">4,250 samples</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-green-100 rounded-full mr-2">
                        <Activity className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Performance Metrics</span>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">3,845 samples</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-purple-100 rounded-full mr-2">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-700">User Feedback</span>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">1,750 samples</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-amber-100 rounded-full mr-2">
                        <Database className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-700">Query Patterns</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">2,340 samples</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Learning Impact</h3>
                <div className="h-40 mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', saving: 54 },
                        { month: 'Feb', saving: 67 },
                        { month: 'Mar', saving: 78 },
                        { month: 'Apr', saving: 85 },
                        { month: 'May', saving: 92 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Cost Savings Accuracy']} />
                      <Line 
                        type="monotone" 
                        dataKey="saving" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h4 className="text-sm font-medium text-indigo-900">Business Impact</h4>
                  <p className="text-xs text-indigo-700 mt-1">
                    AI learning has improved cost savings predictions by 38%, resulting in more accurate business planning and higher user trust in the system's recommendations.
                  </p>
                  <p className="text-xs text-indigo-700 mt-1">
                    Implementation success rate has increased from 72% to 91% as recommendations have become more tailored to your specific environment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <Brain className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-900">Continuous Learning Impact on Cost Savings</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Our AI system's learning has directly translated into increased cost savings:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Initial Savings</h4>
                      <p className="text-xl font-bold text-green-700 mt-1">$12,450<span className="text-sm font-normal">/month</span></p>
                      <p className="text-xs text-green-600 mt-1">
                        First 3 months after implementation
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Current Savings</h4>
                      <p className="text-xl font-bold text-green-700 mt-1">$24,850<span className="text-sm font-normal">/month</span></p>
                      <p className="text-xs text-green-600 mt-1">
                        Based on last 3 months of optimizations
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Improvement Factor</h4>
                      <p className="text-xl font-bold text-green-700 mt-1">1.99<span className="text-sm font-normal">x</span></p>
                      <p className="text-xs text-green-600 mt-1">
                        Increase in savings through AI learning
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