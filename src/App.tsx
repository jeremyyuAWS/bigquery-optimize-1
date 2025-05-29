import { CostAnalysis } from './components/CostAnalysis';
import { QueryAnalytics } from './components/QueryAnalytics';
import { StorageInsights } from './components/StorageInsights';
import { AlertTriangle, BarChart3, Bell, Database, DollarSign, Settings, Info, TrendingUp, Brain, Zap, Calendar, Moon, Sun, FileText, MessageCircle, BookOpen, Wrench, Code, Download, Play, Pause, Lock, Table, AlertCircle, Users, Shield, MoveRight, HelpCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { CostAlert } from './components/CostAlert';
import { SettingsPanel } from './components/SettingsPanel';
import { PricingModelInsights } from './components/PricingModelInsights';
import { ROICalculator } from './components/ROICalculator';
import { OptimizationStrategies } from './components/OptimizationStrategies';
import { PricingComparison } from './components/PricingComparison';
import { AIQueryOptimizer } from './components/AIQueryOptimizer';
import { AIRecommendationEngine } from './components/AIRecommendationEngine';
import { AIRecommendationsPipeline } from './components/AIRecommendationsPipeline';
import { NaturalLanguageQueryInterface } from './components/NaturalLanguageQueryInterface';
import { OptimizationScriptGenerator } from './components/OptimizationScriptGenerator';
import { SQLOptimizationPlayground } from './components/SQLOptimizationPlayground';
import { CustomAlertRules } from './components/CustomAlertRules';
import { KnowledgeBase } from './components/KnowledgeBase';
import { DataExportImport } from './components/DataExportImport';
import { EnhancedCostAnalytics } from './components/EnhancedCostAnalytics';
import { CostComparisonAnalytics } from './components/CostComparisonAnalytics';
import { MLCapacityPlanning } from './components/MLCapacityPlanning';
import { ContinuousLearningFramework } from './components/ContinuousLearningFramework';
import { MultiDatabaseComparison } from './components/MultiDatabaseComparison';
import { AIDataGovernance } from './components/AIDataGovernance';
import { IntelligentMigrationAssistant } from './components/IntelligentMigrationAssistant';
import { WelcomeModal } from './components/WelcomeModal';
import { AICostForecasting } from './components/AICostForecasting';
import { AIOptimizationWorkflow } from './components/AIOptimizationWorkflow';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'strategy' | 'roi' | 'ai' | 'tools' | 'learn'>('dashboard');
  const [showAIQueryOptimizer, setShowAIQueryOptimizer] = useState(false);
  const [selectedAIQuery, setSelectedAIQuery] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleOpenAIOptimizer = (queryId: string = 'query-0') => {
    setSelectedAIQuery(queryId);
    setShowAIQueryOptimizer(true);
  };

  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('querycraft-visited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('querycraft-visited', 'true');
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Toaster position="top-right" />
      <nav className={`${darkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Zap className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`ml-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>QueryCraft</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">|</span>
              <span className="ml-2 text-sm text-gray-500">BigQuery Optimizer</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowWelcomeModal(true)}
                className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-indigo-600'} relative`}
                title="Help & Features"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-indigo-600'} relative`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowAlerts(true)}
                className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-indigo-600'} relative`}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`${darkMode ? 'bg-indigo-900' : 'bg-indigo-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              <span className="font-medium">BigQuery Cost Optimization Platform</span>
            </div>
            <div className="mt-2 md:mt-0">
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`py-1 px-3 rounded text-sm ${activeTab === 'dashboard' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
                <button 
                  className={`py-1 px-3 rounded text-sm ${activeTab === 'strategy' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('strategy')}
                >
                  Strategies
                </button>
                <button 
                  className={`py-1 px-3 rounded text-sm ${activeTab === 'roi' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('roi')}
                >
                  ROI Analysis
                </button>
                <button 
                  className={`py-1 px-3 rounded text-sm flex items-center ${activeTab === 'ai' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('ai')}
                >
                  <Brain className="w-3 h-3 mr-1" />
                  AI Insights
                </button>
                <button 
                  className={`py-1 px-3 rounded text-sm flex items-center ${activeTab === 'tools' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('tools')}
                >
                  <Wrench className="w-3 h-3 mr-1" />
                  Tools
                </button>
                <button 
                  className={`py-1 px-3 rounded text-sm flex items-center ${activeTab === 'learn' ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-indigo-500'}`}
                  onClick={() => setActiveTab('learn')}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  Knowledge Base
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${darkMode ? 'text-gray-100' : ''}`}>
        {activeTab === 'dashboard' && (
          <>
            <div className={`mb-8 ${darkMode ? 'bg-amber-900 border-amber-800' : 'bg-amber-50 border-amber-200'} border rounded-lg p-4 flex items-center`}>
              <AlertTriangle className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-500'} mr-3`} />
              <p className={darkMode ? 'text-amber-300' : 'text-amber-800'}>
                Projected monthly cost exceeds budget by 25%. Consider reviewing query optimization recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <section>
                <div className="flex items-center mb-6">
                  <DollarSign className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cost Overview</h2>
                </div>
                <EnhancedCostAnalytics />
              </section>
              
              <section>
                <div className="flex items-center mb-6">
                  <Calendar className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Period Comparison</h2>
                </div>
                <CostComparisonAnalytics />
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <BarChart3 className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Query Performance</h2>
                </div>
                <QueryAnalytics />
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <Database className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Storage Analysis</h2>
                </div>
                <StorageInsights />
              </section>
            </div>
          </>
        )}

        {activeTab === 'strategy' && (
          <div className="grid grid-cols-1 gap-8">
            <section>
              <div className="flex items-center mb-6">
                <DollarSign className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BigQuery Pricing Models</h2>
              </div>
              <PricingModelInsights />
            </section>

            <section>
              <div className="flex items-center mb-6">
                <BarChart3 className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pricing Comparison</h2>
              </div>
              <PricingComparison />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Optimization Strategies</h2>
              </div>
              <OptimizationStrategies />
            </section>

            <section>
              <div className="flex items-center mb-6">
                <Database className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Multi-database Comparison</h2>
              </div>
              <MultiDatabaseComparison />
            </section>
          </div>
        )}
        
        {activeTab === 'roi' && (
          <div className="grid grid-cols-1 gap-8">
            <section>
              <div className="flex items-center mb-6">
                <DollarSign className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ROI Analysis</h2>
              </div>
              <ROICalculator />
            </section>
            
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-5 ${darkMode ? 'border-green-900 bg-green-900/30 text-green-300' : 'border-green-100 bg-green-50 text-green-900'} border rounded-lg`}>
                  <h3 className="font-semibold">Cost Reduction</h3>
                  <p className="mt-2 text-opacity-90">
                    Optimize your BigQuery spend with proven strategies that reduce processing and storage costs
                  </p>
                  <p className={`mt-3 text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>35-60%</p>
                  <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Average cost reduction</p>
                </div>
                
                <div className={`p-5 ${darkMode ? 'border-blue-900 bg-blue-900/30 text-blue-300' : 'border-blue-100 bg-blue-50 text-blue-900'} border rounded-lg`}>
                  <h3 className="font-semibold">Performance Improvement</h3>
                  <p className="mt-2 text-opacity-90">
                    Faster query execution and better resource utilization for improved user experience
                  </p>
                  <p className={`mt-3 text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>40-75%</p>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Query time reduction</p>
                </div>
                
                <div className={`p-5 ${darkMode ? 'border-purple-900 bg-purple-900/30 text-purple-300' : 'border-purple-100 bg-purple-50 text-purple-900'} border rounded-lg`}>
                  <h3 className="font-semibold">Business Value</h3>
                  <p className="mt-2 text-opacity-90">
                    Translate technical optimizations into tangible business outcomes and competitive advantage
                  </p>
                  <p className={`mt-3 text-2xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>10x ROI</p>
                  <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Average 3-year return</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 gap-8">
            <section>
              <div className="flex items-center mb-6">
                <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Cost Assistant</h2>
              </div>
              <NaturalLanguageQueryInterface />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <Zap className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Query Optimization</h2>
                <button 
                  onClick={() => handleOpenAIOptimizer()}
                  className={`ml-4 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 flex items-center`}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Try it
                </button>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>AI-Powered Query Optimization</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Our AI analyzes your SQL queries and automatically suggests optimizations that can 
                      reduce costs and improve performance without changing query results.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} p-1 rounded-full mr-2 mt-0.5`}>
                          <Zap className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Intelligent SQL Rewriting</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Automatically rewrites queries to use less data while preserving results</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} p-1 rounded-full mr-2 mt-0.5`}>
                          <Database className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Schema Optimization Suggestions</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Recommends partitioning, clustering and materialized views</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} p-1 rounded-full mr-2 mt-0.5`}>
                          <Brain className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Pattern Recognition</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Identifies inefficient query patterns across your organization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${darkMode ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-50 border-indigo-100'} p-4 rounded-lg border flex-shrink-0 w-full md:w-64`}>
                    <h4 className={`font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} text-sm mb-2`}>Average Results</h4>
                    <div className="space-y-3">
                      <div>
                        <div className={`flex justify-between text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
                          <span>Cost Reduction</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-indigo-800' : 'bg-indigo-200'} rounded-full h-1.5 mt-1`}>
                          <div className={`${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} h-1.5 rounded-full`} style={{ width: '62%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className={`flex justify-between text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
                          <span>Query Speed Improvement</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-indigo-800' : 'bg-indigo-200'} rounded-full h-1.5 mt-1`}>
                          <div className={`${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} h-1.5 rounded-full`} style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className={`flex justify-between text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
                          <span>Implementation Effort</span>
                          <span className="font-medium">Low</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-indigo-800' : 'bg-indigo-200'} rounded-full h-1.5 mt-1`}>
                          <div className={`${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} h-1.5 rounded-full`} style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-6">
                <Brain className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Recommendation Engine</h2>
              </div>
              <AIRecommendationEngine />
            </section>

            <section>
              <div className="flex items-center mb-6">
                <Brain className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Recommendations Pipeline</h2>
              </div>
              <AIRecommendationsPipeline />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Cost Forecasting</h2>
              </div>
              <AICostForecasting />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <Calendar className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Optimization Workflow</h2>
              </div>
              <AIOptimizationWorkflow />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <BarChart3 className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ML-Powered Capacity Planning</h2>
              </div>
              <MLCapacityPlanning />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <Brain className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Continuous Learning Framework</h2>
              </div>
              <ContinuousLearningFramework />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <Shield className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Data Governance</h2>
              </div>
              <AIDataGovernance />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <MoveRight className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Intelligent Migration Assistant</h2>
              </div>
              <IntelligentMigrationAssistant />
            </section>
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 gap-8">
            <section>
              <div className="flex items-center mb-6">
                <Code className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>SQL Optimization Playground</h2>
              </div>
              <SQLOptimizationPlayground />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <FileText className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Optimization Scripts</h2>
              </div>
              <OptimizationScriptGenerator />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <AlertTriangle className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Custom Alert Rules</h2>
              </div>
              <CustomAlertRules />
            </section>
            
            <section>
              <div className="flex items-center mb-6">
                <Download className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Export & Import</h2>
              </div>
              <DataExportImport />
            </section>
          </div>
        )}
        
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 gap-8">
            <section>
              <div className="flex items-center mb-6">
                <BookOpen className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Knowledge Base</h2>
              </div>
              <KnowledgeBase />
            </section>
          </div>
        )}
      </main>
      
      <CostAlert open={showAlerts} onClose={() => setShowAlerts(false)} />
      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} />
      <AIQueryOptimizer 
        open={showAIQueryOptimizer} 
        onClose={() => setShowAIQueryOptimizer(false)} 
        queryId={selectedAIQuery} 
      />
      <WelcomeModal
        open={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
    </div>
  );
}

export default App;