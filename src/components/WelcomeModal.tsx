import { X, Zap, BookOpen, DollarSign, Database, MessageCircle, Server, TrendingDown, Info, HelpCircle, Brain, BarChart2, Settings, Code, FileText, RefreshCw, Sliders, PieChart, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'agents' | 'faq'>('overview');
  const [activeAgentSection, setActiveAgentSection] = useState<'dashboard' | 'strategy' | 'roi' | 'ai' | 'tools' | 'learn' | 'advanced'>('dashboard');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <div className="flex items-center">
            <Zap className="h-7 w-7 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Welcome to QueryCraft</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            <button
              className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'features'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Key Features
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'agents'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('agents')}
            >
              AI Agents
            </button>
            <button
              className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'faq'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered BigQuery Cost Management</h3>
                <p className="text-gray-600">
                  QueryCraft helps you optimize your BigQuery costs, improve performance, and maximize your ROI
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3">
                      <DollarSign className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900">Cost Optimization</h4>
                      <p className="text-sm text-indigo-700 mt-1">
                        Reduce your BigQuery costs by up to 60% with AI-powered optimization
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-900">Query Performance</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        Improve query performance by up to 75% with intelligent suggestions
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start mb-2">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <TrendingDown className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">ROI Analysis</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Quantify the business impact of your optimization efforts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Getting Started</h4>
                <ol className="space-y-2 text-gray-600 list-decimal pl-5">
                  <li>Explore the dashboard to understand your current BigQuery costs and usage patterns</li>
                  <li>Use the AI Query Optimizer to analyze and improve your SQL queries</li>
                  <li>Implement recommended optimization strategies to reduce costs</li>
                  <li>Track your savings and performance improvements over time</li>
                </ol>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={onClose}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <Database className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Query Analysis & Optimization</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>AI-powered SQL query analysis</li>
                    <li>Automatic detection of inefficient query patterns</li>
                    <li>Intelligent recommendations for query optimization</li>
                    <li>Schema optimization suggestions</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <DollarSign className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Cost Monitoring & Forecasting</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>Real-time cost tracking and monitoring</li>
                    <li>Cost anomaly detection</li>
                    <li>Predictive cost modeling and forecasting</li>
                    <li>Budget alerting and notifications</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <Server className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Storage Optimization</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>Data lifecycle management</li>
                    <li>Duplicate data identification</li>
                    <li>Storage cost optimization</li>
                    <li>Partitioning and clustering recommendations</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <BookOpen className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Knowledge & Best Practices</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>BigQuery best practices and guidelines</li>
                    <li>Interactive tutorials and learning resources</li>
                    <li>Optimization strategy recommendations</li>
                    <li>Custom optimization playbooks</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <MessageCircle className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Natural Language Interface</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>Ask questions about your BigQuery costs</li>
                    <li>Natural language query optimization</li>
                    <li>Conversational AI assistant</li>
                    <li>Context-aware responses and recommendations</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start mb-2">
                    <TrendingDown className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <h4 className="font-bold text-gray-900">Continuous Learning</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 pl-7 list-disc">
                    <li>Adaptive recommendations based on historical data</li>
                    <li>Pattern recognition for recurring issues</li>
                    <li>Organization-specific optimization insights</li>
                    <li>Feedback loop for continuous improvement</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button 
                  onClick={() => {
                    setActiveTab('agents');
                    setActiveAgentSection('dashboard');
                  }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore AI Agents
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'agents' && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">AI Agents in QueryCraft</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'dashboard'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'strategy'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('strategy')}
                >
                  Strategy
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'roi'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('roi')}
                >
                  ROI Analysis
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'ai'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('ai')}
                >
                  AI Insights
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'tools'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('tools')}
                >
                  Tools
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'learn'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('learn')}
                >
                  Knowledge Base
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeAgentSection === 'advanced'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveAgentSection('advanced')}
                >
                  Advanced AI
                </button>
              </div>
              
              {activeAgentSection === 'dashboard' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                        <BarChart2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Cost Analysis AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Performs comprehensive analysis of your BigQuery spending patterns.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Monitors daily, weekly, and monthly spending trends</li>
                              <li>Identifies cost spikes and anomalies</li>
                              <li>Breaks down costs by service, project, and user</li>
                              <li>Generates real-time cost insights and recommendations</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery billing data and INFORMATION_SCHEMA</li>
                              <li>Cost anomaly detection system</li>
                              <li>Alert system for budget thresholds</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Provides actionable cost insights that help identify unnecessary spending and optimization opportunities, typically resulting in 20-40% cost reduction.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                        <BarChart2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Query Performance AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes query performance metrics to identify optimization opportunities.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Monitors query execution time, bytes processed, and efficiency</li>
                              <li>Identifies inefficient queries and patterns</li>
                              <li>Generates optimization suggestions for individual queries</li>
                              <li>Offers batch optimization of multiple similar queries</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery query history and execution statistics</li>
                              <li>SQL query optimizer</li>
                              <li>Performance benchmarking system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Reduces query costs by 50-80% while improving performance, enhancing user experience and freeing up computational resources for other tasks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                        <Database className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Storage Optimization AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes storage patterns and recommends optimization strategies.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes storage distribution (active vs. long-term)</li>
                              <li>Tracks data growth trends</li>
                              <li>Identifies redundant or infrequently accessed data</li>
                              <li>Recommends storage lifecycle policies</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery storage metadata and access patterns</li>
                              <li>Data lifecycle management system</li>
                              <li>Table usage statistics</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Reduces storage costs by 30-60% through better data lifecycle management and identification of redundant or unnecessary data.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'strategy' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-3 flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Pricing Model AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes usage patterns to recommend the optimal pricing model.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Compares on-demand vs. flat-rate pricing based on your usage</li>
                              <li>Analyzes query patterns to determine predictability</li>
                              <li>Calculates break-even points for different commitment levels</li>
                              <li>Recommends optimal slot capacity for flat-rate pricing</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery pricing models and historical spending</li>
                              <li>Query volume and pattern analysis</li>
                              <li>Capacity planning system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Saves 25-40% on BigQuery costs by identifying the most cost-effective pricing model for your specific usage patterns.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                        <Zap className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Optimization Strategy AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Provides comprehensive optimization strategies tailored to your environment.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes your query and storage patterns</li>
                              <li>Recommends customized optimization strategies</li>
                              <li>Prioritizes strategies based on impact and difficulty</li>
                              <li>Provides detailed implementation guides</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery schema and query patterns</li>
                              <li>Best practices knowledge base</li>
                              <li>ROI estimation system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Provides a structured approach to BigQuery optimization with clear steps and expected outcomes, making it easier to implement cost-saving measures.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Multi-Database Comparison AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Compares BigQuery with other database systems for various workloads.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes workload characteristics</li>
                              <li>Compares performance and cost across database platforms</li>
                              <li>Recommends optimal database choice for specific workloads</li>
                              <li>Provides migration path guidance</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Multi-database performance benchmarks</li>
                              <li>Pricing comparison system</li>
                              <li>Workload classification system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Ensures you're using the most cost-effective database solution for each workload, potentially saving 30-50% on specific workloads.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'roi' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">ROI Analysis AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantifies the business impact of optimization efforts.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Calculates potential cost savings from optimization strategies</li>
                              <li>Estimates implementation effort and time to value</li>
                              <li>Computes return on investment for optimization initiatives</li>
                              <li>Prioritizes optimization efforts based on ROI</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery cost data and usage patterns</li>
                              <li>Optimization strategy database</li>
                              <li>Implementation effort estimation system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Helps prioritize optimization efforts based on business impact, ensuring resources are focused on high-ROI initiatives with typical 3-year ROI of 10x.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'ai' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Natural Language Query AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Enables conversational interaction with your BigQuery cost data.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Understands natural language questions about costs</li>
                              <li>Converts questions into analytics queries</li>
                              <li>Provides conversational responses with insights</li>
                              <li>Offers follow-up suggestions and recommendations</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Large language model for natural language understanding</li>
                              <li>BigQuery cost data and metadata</li>
                              <li>Context-aware conversation manager</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Democratizes access to cost insights, allowing non-technical users to extract valuable information and make data-driven decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">AI Query Optimizer</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes and optimizes SQL queries for cost efficiency.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes SQL queries for inefficiencies</li>
                              <li>Generates optimized query versions</li>
                              <li>Provides detailed explanations of optimizations</li>
                              <li>Estimates cost and performance impact</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>SQL parser and optimizer</li>
                              <li>BigQuery execution plan analyzer</li>
                              <li>Cost estimation engine</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Reduces query costs by 60-80% and improves performance by 40-90%, enhancing user experience and freeing up computational resources.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-full mr-3 flex-shrink-0">
                        <Brain className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">AI Recommendation Engine</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Provides personalized optimization recommendations.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes your BigQuery usage patterns</li>
                              <li>Identifies optimization opportunities</li>
                              <li>Prioritizes recommendations by impact and difficulty</li>
                              <li>Provides implementation guidance</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>BigQuery usage pattern analyzer</li>
                              <li>Optimization recommendation database</li>
                              <li>Implementation difficulty estimator</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Provides a prioritized roadmap for optimization, helping teams focus on high-impact, low-effort improvements first.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">AI Cost Forecasting</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Predicts future costs based on historical patterns.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes historical cost patterns</li>
                              <li>Detects seasonal and growth trends</li>
                              <li>Generates cost forecasts with confidence intervals</li>
                              <li>Identifies potential cost anomalies</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Time-series forecasting models</li>
                              <li>BigQuery billing and usage data</li>
                              <li>Anomaly detection system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Enables proactive budget management and helps identify potential cost issues before they become significant problems.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-3 flex-shrink-0">
                        <Settings className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Continuous Learning Framework</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Improves recommendations based on implementation results.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Tracks implementation results of recommendations</li>
                              <li>Compares predicted vs. actual cost savings</li>
                              <li>Refines recommendation algorithms</li>
                              <li>Adapts to organization-specific patterns</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Recommendation feedback system</li>
                              <li>Machine learning improvement pipeline</li>
                              <li>Implementation tracking system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Continuously improves recommendation quality over time, leading to more accurate and effective optimization strategies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'tools' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">SQL Optimization Playground AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Interactive environment for testing and optimizing SQL queries.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes user-provided SQL queries in real-time</li>
                              <li>Identifies inefficient query patterns</li>
                              <li>Generates optimized query versions</li>
                              <li>Provides performance and cost impact estimates</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>SQL parser and analyzer</li>
                              <li>Query optimization engine</li>
                              <li>Cost estimation system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Enables interactive learning and experimentation with query optimization, helping developers build skills while reducing costs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Optimization Script Generator</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Creates ready-to-run SQL scripts for implementing optimizations.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Generates SQL scripts for various optimization types</li>
                              <li>Provides implementation instructions and best practices</li>
                              <li>Estimates cost savings and implementation difficulty</li>
                              <li>Offers customizable scripts for different scenarios</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>SQL script template database</li>
                              <li>Schema analysis system</li>
                              <li>Cost impact estimator</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Accelerates implementation of optimizations by providing ready-to-use scripts, reducing the technical barrier to realizing cost savings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-full mr-3 flex-shrink-0">
                        <Settings className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Custom Alert Rules AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Helps create and manage intelligent cost and performance alerts.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Assists in defining meaningful alert conditions</li>
                              <li>Recommends threshold settings based on historical patterns</li>
                              <li>Monitors for alert conditions</li>
                              <li>Provides context and recommendations when alerts trigger</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Alert definition and management system</li>
                              <li>Threshold recommendation engine</li>
                              <li>Notification delivery system (email, Slack)</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Enables proactive management of costs and performance issues, catching problems early before they become expensive or disruptive.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'learn' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Knowledge Base AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Provides access to comprehensive BigQuery optimization knowledge.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Maintains curated articles on BigQuery best practices</li>
                              <li>Provides searchable access to optimization knowledge</li>
                              <li>Offers categorized resources by topic</li>
                              <li>Updates content based on latest BigQuery features</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Knowledge article database</li>
                              <li>Search and recommendation system</li>
                              <li>Content freshness monitoring</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Enables self-service learning and problem-solving, empowering teams to implement best practices and optimize their BigQuery usage.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAgentSection === 'advanced' && (
                <div className="space-y-5">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                        <RefreshCw className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Smart Data Polling AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Optimizes data refresh schedules based on usage patterns.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes historical job frequencies and patterns</li>
                              <li>Optimizes refresh intervals for different time periods</li>
                              <li>Detects peak usage times for adaptive refreshes</li>
                              <li>Monitors refresh performance and anomalies</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>INFORMATION_SCHEMA.JOBS polling</li>
                              <li>Cloud Scheduler</li>
                              <li>Usage pattern analysis system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Provides near real-time usage insights with zero manual intervention, optimizing system resources and ensuring data freshness.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                        <Sliders className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Autoscaler Slot Optimization AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes and optimizes slot allocation in autoscaler mode.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Analyzes slot utilization patterns over time</li>
                              <li>Detects slot underutilization periods</li>
                              <li>Identifies ceiling hit events and query waiting</li>
                              <li>Recommends optimal floor and ceiling settings</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Cloud Monitoring slot metrics</li>
                              <li>BigQuery Reservations API</li>
                              <li>Workload pattern analysis system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Optimizes slot allocation to reduce costs while maintaining performance, typically saving 15-30% on capacity costs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-3 flex-shrink-0">
                        <PieChart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Services Decomposition AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes and categorizes costs from "Other services" category.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Identifies and classifies unlabeled jobs (dbt, Jupyter, Airflow, etc.)</li>
                              <li>Analyzes usage patterns within "Other services"</li>
                              <li>Suggests tagging strategies for better cost attribution</li>
                              <li>Provides insights into service-specific optimization</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Job metadata analysis system</li>
                              <li>Pattern recognition for job source identification</li>
                              <li>Tagging recommendation engine</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Improves cost visibility by up to 40% through better categorization, enabling more accurate cost attribution and targeted optimization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Optimization Score AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Provides a comprehensive score reflecting BigQuery usage health.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Calculates a weighted score based on multiple optimization factors</li>
                              <li>Identifies key improvement areas with highest impact</li>
                              <li>Tracks score improvement over time</li>
                              <li>Provides actionable recommendations to improve score</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Multi-factor scoring engine</li>
                              <li>Change-point detection for trend analysis</li>
                              <li>Recommendation prioritization system</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Provides a simple metric to track optimization progress and focus efforts on the most impactful improvements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-full mr-3 flex-shrink-0">
                        <Code className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Join Pattern Explorer AI Agent</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Analyzes and optimizes complex SQL join patterns.
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Functions:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>Identifies inefficient join patterns in queries</li>
                              <li>Analyzes different join types (hash, broadcast, nested loop)</li>
                              <li>Provides optimized alternatives for complex joins</li>
                              <li>Estimates cost and performance impact of join optimizations</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Integrations:</h5>
                            <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                              <li>SQL join pattern analyzer</li>
                              <li>Schema relationship analysis</li>
                              <li>Join optimization engine</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Value Proposition:</h5>
                            <p className="text-sm text-gray-600">
                              Reduces costs of complex join operations by 60-85%, significantly improving performance of analytical queries.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 mt-6">
                <div className="flex items-start">
                  <Brain className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-indigo-900">AI Agent Orchestration</h4>
                    <p className="text-sm text-indigo-700 mt-1">
                      All AI agents in QueryCraft work together in an orchestrated system to provide comprehensive optimization solutions:
                    </p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-indigo-700">
                          <strong>Data Collection:</strong> Smart Data Polling agents gather information about your BigQuery environment.
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-indigo-700">
                          <strong>Analysis:</strong> Cost Analysis, Query Performance, and Storage Optimization agents analyze the data.
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-indigo-700">
                          <strong>Recommendation:</strong> AI Recommendation Engine and Optimization Score agents generate prioritized suggestions.
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-indigo-700">
                          <strong>Implementation:</strong> SQL Optimization Playground and Optimization Script Generator help implement changes.
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-indigo-700">
                          <strong>Learning:</strong> Continuous Learning Framework improves all agents over time based on results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={onClose}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started with AI-Powered Optimization
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex items-center mb-2">
                <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 text-indigo-600 mr-2" />
                    How does this agent refresh or poll BigQuery data?
                  </h4>
                  <p className="text-gray-700">
                    The agent checks in with BigQuery on a recurring schedule, typically every few hours, though it can be customized. 
                    It uses BigQuery's INFORMATION_SCHEMA views to analyze recent query jobs — these are built-in system tables 
                    that show what's been running. Behind the scenes, we use tools like Cloud Scheduler or Prefect to automate 
                    these refreshes. So you always have near real-time insights without needing to manually trigger anything.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 text-indigo-600 mr-2" />
                    How does it handle queries running in autoscaler mode with slot floors and ceilings?
                  </h4>
                  <p className="text-gray-700">
                    When customers use autoscaler mode in BigQuery Reservations, slots are dynamically allocated within 
                    defined limits. The agent taps into Cloud Monitoring metrics and reservation usage data to understand 
                    how well these slots are being used. It looks for patterns like:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                    <li>Queries that are waiting too long because the ceiling was hit.</li>
                    <li>Periods where slots are underutilized, suggesting potential to reduce spend.</li>
                  </ul>
                  <p className="mt-2 text-gray-700">
                    This helps your team identify whether you're paying for unused capacity — or if important jobs are 
                    getting stuck in line.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 text-indigo-600 mr-2" />
                    What does "Other services" mean in the pie chart?
                  </h4>
                  <p className="text-gray-700">
                    The pie chart groups BigQuery usage by common services and tools — like Looker, Dataform, dbt, 
                    or ad hoc SQL queries. "Other services" includes:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                    <li>Unlabeled jobs (e.g., scripts or tools without tags)</li>
                    <li>One-off queries from users or notebooks</li>
                    <li>Background jobs triggered by integrations, like automated reports</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 text-indigo-600 mr-2" />
                    How is the "Optimization Score" calculated?
                  </h4>
                  <p className="text-gray-700">
                    The score gives a high-level sense of how efficiently BigQuery is being used. It combines several signals:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                    <li>How often queries scan more data than needed</li>
                    <li>Whether slot usage is aligned with query load</li>
                    <li>If costly joins or inefficient SQL patterns are common</li>
                    <li>How often jobs fail or repeat</li>
                    <li>Cost per query or per user</li>
                  </ul>
                  <p className="mt-2 text-gray-700">
                    We assign each of these a weight, roll them into a single score, and track that over time. It helps 
                    teams spot trends and measure the impact of any improvements.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 text-indigo-600 mr-2" />
                    How do the AI agents learn and improve over time?
                  </h4>
                  <p className="text-gray-700">
                    The Continuous Learning Framework provides the foundation for improvement across all agents:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                    <li>Each recommendation is tracked for implementation and actual results</li>
                    <li>The system compares predicted savings vs. actual outcomes</li>
                    <li>The difference is used to refine future recommendations</li>
                    <li>Pattern recognition identifies organization-specific optimization opportunities</li>
                    <li>The learning system adapts to your unique BigQuery usage patterns</li>
                  </ul>
                  <p className="mt-2 text-gray-700">
                    This creates a feedback loop where recommendations become more accurate and tailored to your specific environment over time.
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <button 
                  onClick={onClose}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Got It!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}