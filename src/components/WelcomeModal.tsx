import { X, Zap, BookOpen, DollarSign, Database, MessageCircle, Server, TrendingDown, Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'faq'>('overview');

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
                  onClick={onClose}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore QueryCraft
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
                    Can we see more complex query examples, especially with joins?
                  </h4>
                  <p className="text-gray-700">
                    Absolutely. Right now the agent shows representative examples, but we're expanding this to include 
                    realistic enterprise scenarios like:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                    <li>Joining small reference tables (hash joins) to large event logs</li>
                    <li>Large-to-large joins that benefit from partitioning, clustering, or materialized views</li>
                    <li>Cost and latency differences between nested vs. flattened structures</li>
                  </ul>
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