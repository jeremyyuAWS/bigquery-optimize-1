import { useState, useEffect } from 'react';
import { X, Zap, Database, DollarSign, Brain, BarChart3, Code, Calendar, CheckCircle, ChevronRight, PieChart, TrendingDown, LineChart as LineChartIcon, PieChart as PieChartIcon, Sparkles, BarChart2, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'getting-started' | 'whats-new' | 'savings'>('features');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  
  // Animated cost savings counter
  useEffect(() => {
    if (open && activeTab === 'savings') {
      const targetSavings = 18750;
      const duration = 2000; // 2 seconds
      const interval = 20; // Update every 20ms
      const steps = duration / interval;
      const increment = targetSavings / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetSavings) {
          clearInterval(timer);
          setAnimatedSavings(targetSavings);
        } else {
          setAnimatedSavings(Math.floor(current));
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [open, activeTab]);

  // List of key features to highlight
  const features = [
    {
      title: "AI-Powered Query Optimization",
      description: "Automatically analyze and optimize your BigQuery SQL for maximum cost efficiency and performance. Our AI detects inefficient patterns and rewrites them to reduce data scanned by up to 85%.",
      icon: <Code className="h-14 w-14 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-200",
      stats: [
        { label: "Average cost reduction", value: "62%" },
        { label: "Implementation time", value: "Minutes" },
        { label: "Performance improvement", value: "3.8x" }
      ]
    },
    {
      title: "Advanced Cost Analysis & Forecasting",
      description: "Gain deep insights into your BigQuery spending with multi-dimensional analysis by project, service, and user. ML-based forecasting predicts future costs with 92% accuracy.",
      icon: <DollarSign className="h-14 w-14 text-green-600" />,
      color: "bg-green-50 border-green-200",
      stats: [
        { label: "Forecast accuracy", value: "92%" },
        { label: "Cost visibility", value: "100%" },
        { label: "Anomaly detection", value: "Real-time" }
      ]
    },
    {
      title: "Intelligent Recommendations Engine",
      description: "Receive tailored, context-aware recommendations that learn from implementation results. Our AI adapts to your specific usage patterns, continuously improving recommendation quality.",
      icon: <Brain className="h-14 w-14 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
      stats: [
        { label: "Recommendation accuracy", value: "94.8%" },
        { label: "Implementation success rate", value: "82%" },
        { label: "Average monthly savings", value: "$8,450" }
      ]
    },
    {
      title: "ML-Powered Capacity Planning",
      description: "Optimize your slot allocation with AI that forecasts capacity needs and prevents overprovisioning. Ideal for flat-rate pricing models to maximize your investment.",
      icon: <BarChart3 className="h-14 w-14 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      stats: [
        { label: "Slot utilization improvement", value: "37%" },
        { label: "Capacity prediction accuracy", value: "91%" },
        { label: "Annual commitment savings", value: "$60,000+" }
      ]
    },
    {
      title: "Comprehensive Optimization Platform",
      description: "A complete suite of tools for every aspect of BigQuery optimization, from SQL tuning to storage lifecycle management, schema design, and pricing model selection.",
      icon: <Zap className="h-14 w-14 text-amber-600" />,
      color: "bg-amber-50 border-amber-200",
      stats: [
        { label: "Total cost reduction potential", value: "35-60%" },
        { label: "ROI", value: "10x+" },
        { label: "Time to value", value: "Immediate" }
      ]
    }
  ];

  // Auto-rotate through features every 5 seconds
  useEffect(() => {
    if (!open) return;
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [open, features.length]);

  if (!open) return null;

  // Sample data for visualizations
  const pieChartData = [
    { name: 'Query Processing', value: 65, color: '#4F46E5' },
    { name: 'Storage', value: 20, color: '#818CF8' },
    { name: 'Streaming', value: 10, color: '#A5B4FC' },
    { name: 'Other', value: 5, color: '#C7D2FE' }
  ];

  const lineChartData = [
    { month: 'Jan', before: 25000, after: 15000 },
    { month: 'Feb', before: 27500, after: 14300 },
    { month: 'Mar', before: 30000, after: 13500 },
    { month: 'Apr', before: 32500, after: 12200 },
    { month: 'May', before: 35000, after: 11000 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-4">
                <Zap className="h-10 w-10 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Welcome to QueryCraft</h2>
                <p className="text-indigo-200 mt-1 text-lg">Your AI-powered BigQuery cost optimization platform</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-indigo-100 hover:text-white rounded-full p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex px-6">
            <button
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'features' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Key Features
            </button>
            <button
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'savings' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('savings')}
            >
              ROI & Cost Savings
            </button>
            <button
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'getting-started' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('getting-started')}
            >
              Getting Started
            </button>
            <button
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'whats-new' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('whats-new')}
            >
              What's New
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {activeTab === 'features' && (
            <div className="space-y-8">
              {/* Feature Carousel */}
              <div className={`p-6 rounded-xl border ${features[currentFeatureIndex].color}`}>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex justify-center md:w-1/3 md:pr-8">
                    <div className="bg-white p-4 rounded-full shadow-lg mb-4 md:mb-0">
                      {features[currentFeatureIndex].icon}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{features[currentFeatureIndex].title}</h3>
                    <p className="text-gray-600 text-lg">{features[currentFeatureIndex].description}</p>
                    
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {features[currentFeatureIndex].stats.map((stat, idx) => (
                        <div key={idx} className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-200">
                          <h4 className="text-sm text-gray-500 font-medium">{stat.label}</h4>
                          <p className="text-xl font-bold text-indigo-700 mt-1">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-6 space-x-2">
                      {features.map((_, index) => (
                        <button 
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            index === currentFeatureIndex ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                          onClick={() => setCurrentFeatureIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Database className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Insights</h3>
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Multi-dimensional analytics across projects, services, and users</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Real-time anomaly detection for cost spikes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Customizable dashboards and reports</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center mb-3">
                    <TrendingDown className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Cost Optimization</h3>
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">AI-generated SQL optimizations with 1-click implementation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Intelligent pricing model recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Storage optimization with lifecycle management</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Sparkles className="h-6 w-6 text-amber-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">AI Capabilities</h3>
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Natural language interface for cost analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Self-improving recommendations engine</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">ML-powered workload forecasting and planning</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">Why QueryCraft?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
                        <ChevronRight className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-800">Immediate Value</h4>
                        <p className="text-sm text-indigo-700 mt-0.5">
                          Start seeing cost savings within days of implementation, with no lengthy setup process
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
                        <ChevronRight className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-800">Continuous Improvement</h4>
                        <p className="text-sm text-indigo-700 mt-0.5">
                          AI that learns from your specific usage patterns and optimization results
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
                        <ChevronRight className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-800">End-to-End Solution</h4>
                        <p className="text-sm text-indigo-700 mt-0.5">
                          Comprehensive platform covering all aspects of BigQuery cost management
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2 bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">Average Customer Results</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                      <p className="text-sm text-green-800 font-medium">Monthly Savings</p>
                      <p className="text-2xl font-bold text-green-700 mt-1">$18,750</p>
                      <p className="text-xs text-green-600 mt-1">42% cost reduction</p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                      <p className="text-sm text-blue-800 font-medium">Implementation Time</p>
                      <p className="text-2xl font-bold text-blue-700 mt-1">3 Days</p>
                      <p className="text-xs text-blue-600 mt-1">to initial savings</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-100">
                      <p className="text-sm text-purple-800 font-medium">Query Performance</p>
                      <p className="text-2xl font-bold text-purple-700 mt-1">+168%</p>
                      <p className="text-xs text-purple-600 mt-1">average improvement</p>
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-lg text-center border border-amber-100">
                      <p className="text-sm text-amber-800 font-medium">Annual ROI</p>
                      <p className="text-2xl font-bold text-amber-700 mt-1">10.4x</p>
                      <p className="text-xs text-amber-600 mt-1">return on investment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'savings' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="mb-6 md:mb-0 md:w-1/2 md:pr-8 text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-2">Average Monthly Savings</h3>
                    <div className="text-6xl font-bold text-green-700 mb-4">
                      ${animatedSavings.toLocaleString()}
                    </div>
                    <div className="inline-block bg-white px-3 py-1 rounded-full text-green-800 font-semibold border border-green-300">
                      42% cost reduction
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3">Cost Reduction Breakdown</h4>
                    
                    {/* Simulated Pie Chart */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-r-indigo-500 border-b-indigo-500 border-l-indigo-500" style={{transform: 'rotate(45deg)'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-t-blue-400 border-r-blue-400" style={{transform: 'rotate(45deg)'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-t-teal-400" style={{transform: 'rotate(45deg)'}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PieChartIcon className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      
                      <div className="ml-4 space-y-1">
                        {pieChartData.map((item) => (
                          <div key={item.name} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-gray-700">{item.name}: {item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Query Optimization</span>
                          <span className="font-medium">$12,500/month</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '66%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Storage Optimization</span>
                          <span className="font-medium">$3,750/month</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Pricing Model Optimization</span>
                          <span className="font-medium">$2,500/month</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Trajectory Comparison</h3>
                
                {/* Simulated Line Chart */}
                <div className="h-64 relative bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end px-10">
                    {lineChartData.map((item, index) => (
                      <div key={index} className="flex-1 flex space-x-1 items-end mx-1" style={{height: '90%'}}>
                        <div 
                          className="w-5 bg-red-400 rounded-t" 
                          style={{height: `${(item.before / 35000) * 100}%`}}
                        ></div>
                        <div 
                          className="w-5 bg-green-500 rounded-t" 
                          style={{height: `${(item.after / 35000) * 100}%`}}
                        ></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 px-6 flex justify-between border-t border-gray-300 pt-1">
                    {lineChartData.map((item, index) => (
                      <div key={index} className="flex-1 text-center">
                        <span className="text-xs text-gray-600">{item.month}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                      <span className="text-xs text-gray-600">Without QueryCraft</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                      <span className="text-xs text-gray-600">With QueryCraft</span>
                    </div>
                  </div>
                  
                  {/* Y-axis */}
                  <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4">
                    <span className="text-xs text-gray-500">$35K</span>
                    <span className="text-xs text-gray-500">$17.5K</span>
                    <span className="text-xs text-gray-500">$0</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <h4 className="font-medium text-indigo-800 mb-2">5-Month Cost Projection</h4>
                    <p className="text-indigo-700 mb-3">
                      By implementing QueryCraft optimization strategies, the average customer reduces their costs by <span className="font-bold">$74,500</span> over 5 months compared to their previous trajectory.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-xs text-indigo-700 mb-1">Without Optimization</div>
                        <div className="text-xl font-bold text-red-600">$150,000</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-indigo-700 mb-1">With QueryCraft</div>
                        <div className="text-xl font-bold text-green-600">$75,500</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">ROI Analysis</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-green-700">Implementation Cost</span>
                      <span className="text-sm font-medium text-green-800">$7,500</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-green-700">First Year Savings</span>
                      <span className="text-sm font-medium text-green-800">$225,000</span>
                    </div>
                    <div className="flex items-center justify-between mb-3 pt-2 border-t border-green-200">
                      <span className="text-sm font-medium text-green-800">First Year ROI</span>
                      <span className="text-lg font-bold text-green-700">30x</span>
                    </div>
                    <p className="text-xs text-green-600 italic">Based on average customer results</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Case Study: Tech Company</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Monthly BigQuery Spend</span>
                      <div className="flex items-baseline">
                        <span className="text-sm line-through text-gray-400 mr-1">$42K</span>
                        <span className="text-base font-semibold text-green-600">$22K</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Cost Reduction</span>
                      <span className="text-base font-semibold text-indigo-600">48%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Implementation Time</span>
                      <span className="text-base font-semibold text-indigo-600">4 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Case Study: E-commerce</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Monthly BigQuery Spend</span>
                      <div className="flex items-baseline">
                        <span className="text-sm line-through text-gray-400 mr-1">$78K</span>
                        <span className="text-base font-semibold text-green-600">$36K</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Cost Reduction</span>
                      <span className="text-base font-semibold text-indigo-600">54%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Implementation Time</span>
                      <span className="text-base font-semibold text-indigo-600">2 weeks</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Case Study: Healthcare</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Monthly BigQuery Spend</span>
                      <div className="flex items-baseline">
                        <span className="text-sm line-through text-gray-400 mr-1">$134K</span>
                        <span className="text-base font-semibold text-green-600">$67K</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Cost Reduction</span>
                      <span className="text-base font-semibold text-indigo-600">50%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-600">Implementation Time</span>
                      <span className="text-base font-semibold text-indigo-600">3 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'getting-started' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
                <p className="text-blue-700 text-sm">
                  Get up and running with QueryCraft in 4 simple steps:
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mr-4">
                    1
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Connect to BigQuery</h4>
                    <p className="text-gray-600">
                      Start by connecting QueryCraft to your BigQuery instance by providing the necessary credentials. This allows the platform to analyze your queries and costs.
                    </p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-1 rounded-md mr-2">
                          <Code className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-indigo-700">Supported authentication methods:</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-600 space-y-1 ml-7">
                        <p>• OAuth 2.0 (recommended)</p>
                        <p>• Service account keys</p>
                        <p>• Application Default Credentials (ADC)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mr-4">
                    2
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Explore the Dashboard</h4>
                    <p className="text-gray-600">
                      Navigate through the Analytics dashboard to get an immediate overview of your BigQuery costs and usage patterns. This gives you a baseline understanding of your current situation.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <LineChartIcon className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700">Cost Trends</span>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <PieChartIcon className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700">Usage Breakdown</span>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <BarChart2 className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                        <span className="text-xs font-medium text-gray-700">Project Analysis</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mr-4">
                    3
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Try the AI Optimization Tools</h4>
                    <p className="text-gray-600">
                      Use the SQL Optimization Playground to optimize your most expensive queries, or let the AI Recommendation Engine suggest optimization opportunities across your entire BigQuery usage.
                    </p>
                    <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 text-indigo-600 mr-2" />
                        <span className="text-sm font-medium text-indigo-800">Most popular tools:</span>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-indigo-700">SQL Optimization Playground</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-indigo-700">AI Recommendations Engine</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-indigo-700">Cost Assistant Chat Interface</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg mr-4">
                    4
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm flex-grow">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Implement and Monitor</h4>
                    <p className="text-gray-600">
                      Apply the recommended optimizations and use QueryCraft's monitoring tools to track the impact and savings. The AI will continuously learn from the results to improve future recommendations.
                    </p>
                    <div className="mt-3 bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-start">
                        <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                        <div>
                          <span className="text-sm font-medium text-green-800">Cost Impact Monitoring</span>
                          <p className="text-xs text-green-700 mt-1">
                            QueryCraft automatically tracks cost changes before and after optimization, providing clear ROI metrics for every implemented suggestion.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-3/4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-xl font-semibold text-green-900">Expected Results</h3>
                        <p className="text-green-700 mt-1">
                          Most QueryCraft users see <span className="font-bold">30-60% cost reduction</span> in their BigQuery spend within the first 3 months, with the average ROI exceeding 10x the investment.
                        </p>
                        <p className="text-green-700 mt-2">
                          Our continuous learning AI ensures that optimization benefits <span className="font-bold">increase over time</span> as the system adapts to your specific environment.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-1/4 md:pl-4">
                    <button 
                      className="w-full py-2.5 px-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg flex items-center justify-center"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Start Optimizing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'whats-new' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-indigo-900">Latest Updates (v2.4.0)</h3>
                  <span className="text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">Released: April 2025</span>
                </div>
                <p className="text-indigo-700 text-lg mt-2">
                  This release brings several powerful new features and improvements to enhance your BigQuery cost optimization experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 rounded-full p-3 mr-3">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Enhanced AI Recommendation Engine</h4>
                      <p className="text-sm text-indigo-600">Continuous learning framework</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Our AI recommendation system now features a continuous learning framework that improves over time based on the success of implemented optimizations.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Self-improving recommendation accuracy, now reaching 94.8% precision</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Personalized optimization paths based on your specific usage patterns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>18.6% improvement in cost prediction accuracy through adaptive modeling</span>
                    </li>
                  </ul>
                  <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">Learn more →</button>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-3">
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">ML-Powered Capacity Planning</h4>
                      <p className="text-sm text-indigo-600">Optimized slot allocation</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    New ML-driven capacity planning tools help you optimize slot allocation for flat-rate pricing models, ensuring you never overpay for unused capacity.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Slot usage forecasting with 91% accuracy to prevent overprovisioning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Automated capacity recommendations based on workload patterns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Pricing model comparison tools to determine optimal commitment levels</span>
                    </li>
                  </ul>
                  <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">Learn more →</button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-3">
                    <Code className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Advanced SQL Optimization Playground</h4>
                    <p className="text-sm text-indigo-600">Intelligent query rewriting</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">
                  The SQL Optimization Playground now features more advanced optimization techniques and better performance metrics, with significant improvements to the AI-powered query rewriting engine.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-2">Before Optimization</h5>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded text-xs font-mono overflow-x-auto">
                      SELECT *<br />
                      FROM `project.dataset.large_table`<br />
                      WHERE CAST(timestamp_column AS DATE) = '2025-04-01'
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="block">Data processed: <span className="text-red-500">5.2 TB</span></span>
                      <span className="block">Estimated cost: <span className="text-red-500">$32.50</span></span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2">After AI Optimization</h5>
                    <div className="bg-gray-800 text-gray-300 p-3 rounded text-xs font-mono overflow-x-auto">
                      SELECT id, name, timestamp_column<br />
                      FROM `project.dataset.large_table`<br />
                      WHERE timestamp_column BETWEEN '2025-04-01' AND '2025-04-02'
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="block">Data processed: <span className="text-green-500">0.8 TB</span></span>
                      <span className="block">Estimated cost: <span className="text-green-500">$5.00</span></span>
                      <span className="block font-medium text-green-600">85% cost reduction</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
                  <div className="md:w-1/3 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Improved query analysis with context-aware suggestions</span>
                  </div>
                  <div className="md:w-1/3 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Schema optimization recommendations with table-level insights</span>
                  </div>
                  <div className="md:w-1/3 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">One-click implementation scripts for immediate value</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-amber-50 p-5 rounded-lg border border-amber-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-amber-900">Coming Soon</h3>
                    <p className="text-amber-700 text-base mt-2">
                      Our roadmap includes exciting new features to further enhance your cost optimization experience:
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-800">Multi-Cloud Support</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Support for Snowflake, Redshift, and other cloud data warehouses
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-800">Intelligent Agents</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Autonomous optimization agents that implement changes with minimal human input
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-800">Team Collaboration</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Enhanced team features with role-based optimization suggestions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            <p className="text-sm"><span className="font-medium">QueryCraft</span> - Version 2.4.0</p>
            <p className="text-xs mt-1">The intelligent BigQuery cost optimization platform</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center transition-colors"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Optimizing Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}