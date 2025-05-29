import { useState } from 'react';
import { Brain, Zap, TrendingUp, Filter, Layers, CheckCircle2, BarChart4, ChevronRight, PlayCircle, Lightbulb, Settings, RefreshCw, ArrowRight, Plus, Pause, Calendar, Clock, AlertTriangle, CheckCircle, List, Search, DollarSign, X, Database, HardDrive, Code, ExternalLink } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  lastRun: string;
  nextRun: string | null;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'on-demand';
  enabledStages: string[];
  insightCount: number;
  implementedCount: number;
  stage: 'data-collection' | 'analysis' | 'recommendation' | 'implementation' | 'monitoring';
  performance: number;
}

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'disabled';
  icon: React.ReactNode;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
  status: 'new' | 'in-progress' | 'implemented' | 'dismissed';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  category: 'query' | 'schema' | 'storage' | 'pricing';
  estimatedSavings: number;
  dateGenerated: string;
  dateImplemented?: string;
  queryPattern?: string;
}

export function AIRecommendationsPipeline() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: 'pipe-1',
      name: 'Query Optimization Pipeline',
      description: 'Continuously analyzes query patterns and provides optimization recommendations',
      status: 'active',
      lastRun: '2024-03-28 15:30',
      nextRun: '2024-03-29 00:00',
      frequency: 'daily',
      enabledStages: ['data-collection', 'analysis', 'recommendation', 'monitoring'],
      insightCount: 24,
      implementedCount: 18,
      stage: 'monitoring',
      performance: 92
    },
    {
      id: 'pipe-2',
      name: 'Storage Optimization Pipeline',
      description: 'Identifies storage optimization opportunities and suggests partitioning/clustering strategies',
      status: 'active',
      lastRun: '2024-03-27 12:45',
      nextRun: '2024-04-03 12:00',
      frequency: 'weekly',
      enabledStages: ['data-collection', 'analysis', 'recommendation'],
      insightCount: 12,
      implementedCount: 8,
      stage: 'recommendation',
      performance: 85
    },
    {
      id: 'pipe-3',
      name: 'Schema Evolution Analyzer',
      description: 'Tracks schema changes and recommends optimizations for improved query performance',
      status: 'paused',
      lastRun: '2024-03-20 09:15',
      nextRun: null,
      frequency: 'on-demand',
      enabledStages: ['data-collection', 'analysis'],
      insightCount: 7,
      implementedCount: 3,
      stage: 'analysis',
      performance: 78
    },
    {
      id: 'pipe-4',
      name: 'Cost Anomaly Detection',
      description: 'Automatically detects unusual spending patterns and identifies potential issues',
      status: 'active',
      lastRun: '2024-03-28 10:00',
      nextRun: '2024-03-28 22:00',
      frequency: 'hourly',
      enabledStages: ['data-collection', 'analysis', 'recommendation', 'implementation', 'monitoring'],
      insightCount: 32,
      implementedCount: 29,
      stage: 'monitoring',
      performance: 96
    }
  ]);
  
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-1');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const stages: PipelineStage[] = [
    {
      id: 'data-collection',
      name: 'Data Collection',
      description: 'Gathers query metrics, usage patterns, and performance data',
      status: 'active',
      icon: <Layers className="h-5 w-5 text-blue-600" />
    },
    {
      id: 'analysis',
      name: 'AI Analysis',
      description: 'Applies machine learning to identify optimization opportunities',
      status: 'active',
      icon: <Brain className="h-5 w-5 text-purple-600" />
    },
    {
      id: 'recommendation',
      name: 'Recommendation Generation',
      description: 'Creates actionable recommendations with predicted impact',
      status: 'active',
      icon: <Lightbulb className="h-5 w-5 text-amber-600" />
    },
    {
      id: 'implementation',
      name: 'Automated Implementation',
      description: 'Applies approved recommendations automatically',
      status: 'paused',
      icon: <Zap className="h-5 w-5 text-green-600" />
    },
    {
      id: 'monitoring',
      name: 'Results Monitoring',
      description: 'Tracks the impact of applied recommendations',
      status: 'active',
      icon: <BarChart4 className="h-5 w-5 text-indigo-600" />
    }
  ];
  
  const recommendations: Recommendation[] = [
    {
      id: 'rec-001',
      title: 'Implement Partitioning on events_table',
      description: 'Create a date-based partitioning strategy for high-volume events table to reduce query costs',
      score: 92,
      status: 'implemented',
      impact: 'high',
      effort: 'low',
      category: 'schema',
      estimatedSavings: 1250.00,
      dateGenerated: '2024-03-12',
      dateImplemented: '2024-03-15',
      queryPattern: 'SELECT * FROM events_table WHERE date BETWEEN X AND Y'
    },
    {
      id: 'rec-002',
      title: 'Create Materialized View for Daily Metrics',
      description: 'Replace frequently executed aggregation queries with a materialized view to reduce processing costs',
      score: 87,
      status: 'in-progress',
      impact: 'high',
      effort: 'medium',
      category: 'query',
      estimatedSavings: 2100.00,
      dateGenerated: '2024-03-18',
      queryPattern: 'SELECT date, COUNT(*) FROM events GROUP BY date'
    },
    {
      id: 'rec-003',
      title: 'Optimize JOIN Operations in ETL Pipeline',
      description: 'Refactor ETL queries to filter data before JOIN operations to reduce data processed',
      score: 85,
      status: 'new',
      impact: 'medium',
      effort: 'medium',
      category: 'query',
      estimatedSavings: 950.00,
      dateGenerated: '2024-03-22',
      queryPattern: 'SELECT * FROM table1 JOIN table2 ON x = y WHERE date > Z'
    },
    {
      id: 'rec-004',
      title: 'Implement Column Selection Instead of SELECT *',
      description: 'Replace SELECT * with specific column selection in high-volume queries',
      score: 92,
      status: 'implemented',
      impact: 'high',
      effort: 'low',
      category: 'query',
      estimatedSavings: 1850.00,
      dateGenerated: '2024-03-10',
      dateImplemented: '2024-03-14',
      queryPattern: 'SELECT * FROM large_table WHERE condition = true'
    },
    {
      id: 'rec-005',
      title: 'Migrate Cold Data to Long-term Storage',
      description: 'Move historical data older than 90 days to long-term storage to reduce storage costs',
      score: 78,
      status: 'new',
      impact: 'medium',
      effort: 'low',
      category: 'storage',
      estimatedSavings: 720.00,
      dateGenerated: '2024-03-25',
      queryPattern: 'Tables with historical data accessed infrequently'
    },
    {
      id: 'rec-006',
      title: 'Implement Query Caching Strategy',
      description: 'Modify queries to use deterministic date references instead of CURRENT_DATE() for better cache utilization',
      score: 95,
      status: 'implemented',
      impact: 'high',
      effort: 'low',
      category: 'query',
      estimatedSavings: 1570.00,
      dateGenerated: '2024-03-05',
      dateImplemented: '2024-03-08',
      queryPattern: 'SELECT * FROM tables WHERE date = CURRENT_DATE()'
    },
    {
      id: 'rec-007',
      title: 'Review Flat-Rate Pricing Option',
      description: 'Based on current usage patterns, switching to flat-rate pricing could provide cost savings',
      score: 75,
      status: 'in-progress',
      impact: 'high',
      effort: 'high',
      category: 'pricing',
      estimatedSavings: 4500.00,
      dateGenerated: '2024-03-15',
      queryPattern: 'Overall usage analysis'
    },
    {
      id: 'rec-008',
      title: 'Optimize Customer 360 Dashboard Queries',
      description: 'Refactor dashboard queries to use pre-computed aggregates and improve filtering efficiency',
      score: 88,
      status: 'new',
      impact: 'medium',
      effort: 'medium',
      category: 'query',
      estimatedSavings: 950.00,
      dateGenerated: '2024-03-26',
      queryPattern: 'Multiple dashboard queries with redundant computation'
    },
    {
      id: 'rec-009',
      title: 'Implement Clustering on user_events Table',
      description: 'Add clustering by user_id and event_type to improve query performance on commonly filtered columns',
      score: 83,
      status: 'new',
      impact: 'medium',
      effort: 'low',
      category: 'schema',
      estimatedSavings: 780.00,
      dateGenerated: '2024-03-27',
      queryPattern: 'SELECT * FROM user_events WHERE user_id = X AND event_type = Y'
    },
    {
      id: 'rec-010',
      title: 'Schedule Resource-intensive Queries',
      description: 'Move batch reporting queries to off-peak hours to optimize resource utilization',
      score: 68,
      status: 'dismissed',
      impact: 'low',
      effort: 'medium',
      category: 'query',
      estimatedSavings: 350.00,
      dateGenerated: '2024-03-20',
      queryPattern: 'Monthly reporting batch queries'
    }
  ];
  
  // Filter recommendations based on search and filter status
  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = searchTerm === '' || 
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const selectedPipeline = pipelines.find(p => p.id === selectedPipelineId) || pipelines[0];
  
  // Function to get class based on pipeline status
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get icon based on stage status
  const getStageStatusIcon = (stage: string, enabledStages: string[]) => {
    if (enabledStages.includes(stage)) {
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    }
    return <PlayCircle className="h-4 w-4 text-gray-400" />;
  };
  
  // Recently generated insights for the selected pipeline
  const recentInsights = [
    {
      id: 'insight-1',
      title: 'Materialized View Opportunity',
      description: 'Create a materialized view for daily sales aggregations to reduce processing by 85%',
      impact: 'high',
      category: 'query',
      date: '2024-03-28'
    },
    {
      id: 'insight-2',
      title: 'Partitioning Recommendation',
      description: 'Partition the events table by date to improve query performance by 65%',
      impact: 'high',
      category: 'storage',
      date: '2024-03-27'
    },
    {
      id: 'insight-3',
      title: 'Query Pattern Optimization',
      description: 'Standardize JOIN patterns in ETL queries to increase cache hit rate by 40%',
      impact: 'medium',
      category: 'query',
      date: '2024-03-26'
    },
    {
      id: 'insight-4',
      title: 'Storage Lifecycle Improvement',
      description: 'Implement table expiration for temp_analysis tables to reduce storage costs',
      impact: 'low',
      category: 'storage',
      date: '2024-03-25'
    },
  ];
  
  // Performance metrics for each pipeline
  const pipelineMetrics = [
    {
      id: 'metric-1',
      name: 'Cost Reduction',
      value: 32,
      unit: '%'
    },
    {
      id: 'metric-2',
      name: 'Performance Improvement',
      value: 47,
      unit: '%'
    },
    {
      id: 'metric-3',
      name: 'Avg Implementation Time',
      value: 2.3,
      unit: 'days'
    },
    {
      id: 'metric-4',
      name: 'Insight Accuracy',
      value: 94,
      unit: '%'
    }
  ];
  
  // Scheduled analyses
  const scheduledAnalyses = [
    {
      id: 'schedule-1',
      name: 'Daily Query Pattern Analysis',
      frequency: 'Daily at 12:00 AM',
      lastRun: '2024-03-28 00:00',
      status: 'active',
      description: 'Analyzes the previous day\'s query patterns to identify optimization opportunities'
    },
    {
      id: 'schedule-2',
      name: 'Weekly Schema Analysis',
      frequency: 'Weekly on Mondays',
      lastRun: '2024-03-25 00:00',
      status: 'active',
      description: 'Examines schema design and data access patterns to recommend partitioning and clustering'
    },
    {
      id: 'schedule-3',
      name: 'Monthly Cost Trend Analysis',
      frequency: 'Monthly on the 1st',
      lastRun: '2024-03-01 00:00',
      status: 'active',
      description: 'Analyzes month-over-month cost trends to identify systematic optimization opportunities'
    },
    {
      id: 'schedule-4',
      name: 'Quarterly Pricing Model Analysis',
      frequency: 'Quarterly',
      lastRun: '2024-01-01 00:00',
      status: 'upcoming',
      description: 'Evaluates on-demand vs. flat-rate pricing to determine the most cost-effective option'
    }
  ];
  
  // Recommendation scoring factors
  const scoringFactors = [
    {
      name: 'Potential Cost Savings',
      description: 'Estimated monthly cost reduction',
      weight: 40,
      icon: <DollarSign className="w-4 h-4 text-green-600" />
    },
    {
      name: 'Implementation Effort',
      description: 'Complexity and time required',
      weight: 20,
      icon: <Clock className="w-4 h-4 text-amber-600" />
    },
    {
      name: 'Performance Impact',
      description: 'Improvement to query performance',
      weight: 25,
      icon: <Zap className="w-4 h-4 text-indigo-600" />
    },
    {
      name: 'Risk Assessment',
      description: 'Potential risks to existing operations',
      weight: 15,
      icon: <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  ];
  
  // Calculated effectiveness of the selected pipeline
  const calculatePipelineEffectiveness = (pipeline: Pipeline) => {
    return {
      value: (pipeline.implementedCount / (pipeline.insightCount || 1)) * 100,
      label: `${pipeline.implementedCount}/${pipeline.insightCount} insights implemented`
    };
  };
  
  const effectiveness = calculatePipelineEffectiveness(selectedPipeline);
  
  // Stats for recommendations
  const recommendationStats = {
    total: recommendations.length,
    implemented: recommendations.filter(r => r.status === 'implemented').length,
    inProgress: recommendations.filter(r => r.status === 'in-progress').length,
    new: recommendations.filter(r => r.status === 'new').length,
    dismissed: recommendations.filter(r => r.status === 'dismissed').length,
    potentialSavings: recommendations.reduce((total, rec) => total + rec.estimatedSavings, 0),
    actualSavings: recommendations.filter(r => r.status === 'implemented').reduce((total, rec) => total + rec.estimatedSavings, 0)
  };
  
  // Get status badge for a recommendation
  const getRecommendationStatusBadge = (status: string) => {
    switch(status) {
      case 'implemented':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
          <CheckCircle className="w-3 h-3 mr-1" />
          Implemented
        </span>;
      case 'in-progress':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      case 'new':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 flex items-center">
          <Lightbulb className="w-3 h-3 mr-1" />
          New
        </span>;
      case 'dismissed':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800 flex items-center">
          <X className="w-3 h-3 mr-1" />
          Dismissed
        </span>;
      default:
        return null;
    }
  };
  
  // Get impact badge for a recommendation
  const getImpactBadge = (impact: string) => {
    switch(impact) {
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
          High Impact
        </span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          Medium Impact
        </span>;
      case 'low':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          Low Impact
        </span>;
      default:
        return null;
    }
  };
  
  // Get effort badge for a recommendation
  const getEffortBadge = (effort: string) => {
    switch(effort) {
      case 'low':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Low Effort
        </span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
          Medium Effort
        </span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
          High Effort
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Zap className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">AI Recommendations Pipeline</h2>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Pipeline
            </button>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </button>
          </div>
        </div>
        
        <p className="mt-2 text-gray-600">
          AI-powered analytics pipelines automatically analyze BigQuery usage patterns and provide continuous optimization recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        <div className="lg:col-span-1 border-r border-gray-200">
          <div className="p-4">
            <div className="text-sm text-gray-500 font-medium mb-2 flex justify-between items-center">
              <span>Active Pipelines</span>
              <button className="text-indigo-600 hover:text-indigo-800">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {pipelines.map(pipeline => (
                <div 
                  key={pipeline.id}
                  onClick={() => setSelectedPipelineId(pipeline.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPipelineId === pipeline.id 
                      ? 'border-indigo-300 bg-indigo-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{pipeline.name}</h3>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusClass(pipeline.status)}`}>
                          {pipeline.status === 'active' ? 'Active' : 
                           pipeline.status === 'paused' ? 'Paused' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">{pipeline.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Brain className="h-3 w-3 mr-1" />
                          {pipeline.insightCount} insights
                        </span>
                        <span className="mx-2">•</span>
                        <span>{pipeline.frequency}</span>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-gray-400 ml-2 ${
                      selectedPipelineId === pipeline.id ? 'text-indigo-500' : ''
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-900">{selectedPipeline.name}</h2>
                  <span className={`ml-3 px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusClass(selectedPipeline.status)}`}>
                    {selectedPipeline.status === 'active' ? 'Active' : 
                     selectedPipeline.status === 'paused' ? 'Paused' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{selectedPipeline.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-2">
                {selectedPipeline.status === 'paused' ? (
                  <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Resume Pipeline
                  </button>
                ) : (
                  <button className="px-3 py-1.5 bg-amber-100 text-amber-800 text-sm rounded-md hover:bg-amber-200 flex items-center">
                    <Pause className="h-4 w-4 mr-1" />
                    Pause Pipeline
                  </button>
                )}
                <button className="px-3 py-1.5 bg-indigo-100 text-indigo-800 text-sm rounded-md hover:bg-indigo-200 flex items-center">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Run Now
                </button>
              </div>
            </div>
            
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pipeline Overview
                </button>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'recommendations'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Recommendations
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pipeline Settings
                </button>
              </nav>
            </div>
            
            {activeTab === 'overview' && (
              <>
                <div className="mb-8">
                  <h3 className="text-gray-700 font-medium mb-3">Pipeline Stages</h3>
                  <div className="relative">
                    <div className="absolute top-5 left-7 right-7 h-0.5 bg-gray-200">
                      <div 
                        className="absolute top-0 left-0 h-0.5 bg-indigo-500" 
                        style={{ 
                          width: `${
                            selectedPipeline.stage === 'data-collection' ? '10%' :
                            selectedPipeline.stage === 'analysis' ? '30%' :
                            selectedPipeline.stage === 'recommendation' ? '50%' :
                            selectedPipeline.stage === 'implementation' ? '75%' :
                            '100%'
                          }`
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="relative flex flex-col items-center text-center px-4">
                          <div className={`z-10 w-10 h-10 flex items-center justify-center rounded-full mb-2 ${
                            selectedPipeline.enabledStages.includes(stage.id) ? (
                              selectedPipeline.stage === stage.id ? 
                              'bg-indigo-600' : 'bg-green-100 border-2 border-green-500'
                            ) : 'bg-gray-100'
                          }`}>
                            {selectedPipeline.stage === stage.id ? (
                              <div className="text-white">{stage.icon}</div>
                            ) : (
                              <div className={selectedPipeline.enabledStages.includes(stage.id) ? 'text-green-600' : 'text-gray-400'}>
                                {stage.icon}
                              </div>
                            )}
                          </div>
                          <h4 className={`text-xs font-medium ${
                            selectedPipeline.stage === stage.id ? 'text-indigo-600' : 
                            selectedPipeline.enabledStages.includes(stage.id) ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {stage.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 hidden md:block">{stage.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-700 font-medium mb-3">Pipeline Performance</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        {pipelineMetrics.map((metric) => (
                          <div key={metric.id} className="p-3 bg-white rounded-lg border border-gray-100">
                            <h4 className="text-sm text-gray-500">{metric.name}</h4>
                            <div className="flex items-baseline mt-1">
                              <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                              <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm text-gray-700 mb-2">Implementation Effectiveness</h4>
                        <div className="relative pt-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-indigo-700">{effectiveness.label}</span>
                            <span className="text-xs font-medium text-indigo-700">{Math.round(effectiveness.value)}%</span>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                            <div
                              style={{ width: `${effectiveness.value}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm text-gray-700 mb-2">Pipeline Activity</h4>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Last Run</span>
                            <span className="text-gray-900 font-medium">{selectedPipeline.lastRun}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Next Scheduled Run</span>
                            <span className="text-gray-900 font-medium">{selectedPipeline.nextRun || 'Not scheduled'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Frequency</span>
                            <span className="text-gray-900 font-medium capitalize">{selectedPipeline.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-700 font-medium mb-3">Recently Generated Insights</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
                      <div className="space-y-3">
                        {recentInsights.map((insight) => (
                          <div key={insight.id} className="p-3 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                insight.impact === 'high' ? 'bg-green-100 text-green-800' :
                                insight.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {insight.impact} impact
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{insight.date}</span>
                              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                                Apply Insight
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <Brain className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-indigo-900">Analytics Pipeline Intelligence</h3>
                      <p className="text-sm text-indigo-700 mt-1">
                        This AI-powered pipeline continuously learns from your BigQuery usage patterns and automatically 
                        generates optimization recommendations. Over time, it becomes more accurate as it analyzes the 
                        effectiveness of implemented suggestions.
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button className="text-sm px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 mr-1.5" />
                          View Pipeline Analytics
                        </button>
                        <button className="text-sm px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 flex items-center justify-center">
                          <Filter className="h-4 w-4 mr-1.5" />
                          Configure Pipeline Rules
                        </button>
                        <button className="text-sm px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 flex items-center justify-center">
                          <Settings className="h-4 w-4 mr-1.5" />
                          Advanced Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'recommendations' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">Recommendations & Implementation Tracking</h3>
                    <p className="text-gray-600 mt-1">Track and manage AI-generated optimization recommendations</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search recommendations..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="implemented">Implemented</option>
                      <option value="dismissed">Dismissed</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500">Total Recommendations</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{recommendationStats.total}</p>
                    <div className="text-xs text-gray-500 mt-1">Across all pipelines</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500">Implementation Rate</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round((recommendationStats.implemented / recommendationStats.total) * 100)}%</p>
                    <div className="text-xs text-gray-500 mt-1">{recommendationStats.implemented} implemented</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500">Potential Savings</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">${recommendationStats.potentialSavings.toLocaleString()}</p>
                    <div className="text-xs text-gray-500 mt-1">Per month if all implemented</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500">Actual Savings</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">${recommendationStats.actualSavings.toLocaleString()}</p>
                    <div className="text-xs text-green-500 mt-1">From implemented recommendations</div>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Savings</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRecommendations.map(recommendation => (
                        <tr key={recommendation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                recommendation.category === 'query' ? 'bg-blue-100' :
                                recommendation.category === 'schema' ? 'bg-purple-100' :
                                recommendation.category === 'storage' ? 'bg-green-100' :
                                'bg-amber-100'
                              }`}>
                                {recommendation.category === 'query' && <Code className="h-4 w-4 text-blue-600" />}
                                {recommendation.category === 'schema' && <Database className="h-4 w-4 text-purple-600" />}
                                {recommendation.category === 'storage' && <HardDrive className="h-4 w-4 text-green-600" />}
                                {recommendation.category === 'pricing' && <DollarSign className="h-4 w-4 text-amber-600" />}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{recommendation.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{recommendation.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${
                                recommendation.score >= 90 ? 'text-green-600' :
                                recommendation.score >= 75 ? 'text-blue-600' :
                                'text-amber-600'
                              }`}>
                                {recommendation.score}
                              </span>
                              <div className="ml-2 w-12 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    recommendation.score >= 90 ? 'bg-green-600' :
                                    recommendation.score >= 75 ? 'bg-blue-600' :
                                    'bg-amber-600'
                                  }`}
                                  style={{ width: `${recommendation.score}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getRecommendationStatusBadge(recommendation.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              {getImpactBadge(recommendation.impact)}
                              {getEffortBadge(recommendation.effort)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${recommendation.estimatedSavings.toLocaleString()}/mo
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {recommendation.dateGenerated}
                            {recommendation.dateImplemented && (
                              <div className="text-xs text-green-600">
                                Implemented: {recommendation.dateImplemented}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {recommendation.status === 'new' && (
                              <div className="flex justify-end space-x-2">
                                <button className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs">
                                  Implement
                                </button>
                                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs">
                                  Dismiss
                                </button>
                              </div>
                            )}
                            {recommendation.status === 'in-progress' && (
                              <button className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs">
                                Mark Complete
                              </button>
                            )}
                            <button className="ml-2 text-indigo-600 hover:text-indigo-800">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <Brain className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-900">Recommendation Scoring Algorithm</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Our AI scores recommendations based on multiple factors to help prioritize implementation efforts.
                        Higher scores indicate higher ROI opportunities.
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {scoringFactors.map((factor, index) => (
                          <div key={index} className="bg-white p-3 rounded border border-blue-100">
                            <div className="flex items-center">
                              {factor.icon}
                              <h4 className="ml-2 text-sm font-medium text-blue-800">{factor.name}</h4>
                            </div>
                            <p className="mt-1 text-xs text-blue-600">{factor.description}</p>
                            <div className="mt-2 flex items-center">
                              <div className="w-full bg-blue-100 rounded-full h-1">
                                <div
                                  className="bg-blue-600 h-1 rounded-full"
                                  style={{ width: `${factor.weight}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-blue-700">{factor.weight}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Scheduled Analyses</h3>
                  <p className="text-gray-600 mb-4">Configure when and how the AI pipeline analyzes your BigQuery usage patterns</p>
                  
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Analysis</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scheduledAnalyses.map((analysis) => (
                          <tr key={analysis.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <Calendar className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{analysis.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">{analysis.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {analysis.frequency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {analysis.lastRun}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {analysis.status === 'active' ? (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  Upcoming
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                              <button className="text-indigo-600 hover:text-indigo-900">Run Now</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center">
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add Scheduled Analysis
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Implementation Tracking</h3>
                  <p className="text-gray-600 mb-4">Configure how the system tracks implementations and measures success</p>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Implementation Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-sm text-gray-600">Cost Verification Period</label>
                              <select className="text-sm border border-gray-300 rounded p-1">
                                <option>7 days</option>
                                <option selected>14 days</option>
                                <option>30 days</option>
                              </select>
                            </div>
                            <p className="text-xs text-gray-500">Time period to measure actual savings after implementation</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-sm text-gray-600">Success Threshold</label>
                              <select className="text-sm border border-gray-300 rounded p-1">
                                <option>50% of estimated</option>
                                <option selected>75% of estimated</option>
                                <option>90% of estimated</option>
                              </select>
                            </div>
                            <p className="text-xs text-gray-500">Minimum percentage of estimated savings to consider implementation successful</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-sm text-gray-600">Auto-verification</label>
                              <div className="relative inline-block w-10 mr-2 align-middle">
                                <input type="checkbox" name="toggle" id="toggle" className="sr-only" defaultChecked />
                                <div className="w-10 h-4 bg-gray-400 rounded-full"></div>
                                <div className="absolute w-6 h-6 bg-white rounded-full -top-1 left-0 transition-transform transform translate-x-4 border border-gray-400"></div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Automatically verify implementations based on cost data</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Implementation Status Flow</h4>
                        <div className="space-y-2">
                          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center">
                            <Lightbulb className="h-5 w-5 text-indigo-600 mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-indigo-900">New</p>
                              <p className="text-xs text-indigo-700">AI-generated recommendation</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-indigo-400" />
                          </div>
                          
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-900">In Progress</p>
                              <p className="text-xs text-blue-700">Implementation has started</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-blue-400" />
                          </div>
                          
                          <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-900">Implemented</p>
                              <p className="text-xs text-green-700">Changes applied successfully</p>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-600 mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-amber-900">Verification</p>
                              <p className="text-xs text-amber-700">Measuring actual impact</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-amber-400" />
                          </div>
                          
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Verified</p>
                              <p className="text-xs text-gray-700">Cost impact confirmed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <List className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-indigo-900">Query Pattern Analysis Configuration</h3>
                      <p className="text-sm text-indigo-700 mt-1">
                        The AI pipeline analyzes BigQuery query patterns to identify optimization opportunities.
                        Configure which patterns to look for and how they should be evaluated.
                      </p>
                      
                      <div className="mt-3 bg-white p-3 rounded border border-indigo-200">
                        <h4 className="text-sm font-medium text-indigo-800 mb-2">Monitored Query Patterns</h4>
                        <div className="space-y-2 text-xs text-indigo-700">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Unoptimized column selection (SELECT *)</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Functions on partitioning columns</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Filter after JOIN operations</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Non-deterministic functions (CURRENT_DATE(), etc.)</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Repeated aggregation patterns</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked />
                            <label className="ml-2">Inefficient JOINs on large tables</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked />
                            <label className="ml-2">Queries with high CPU utilization</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
                            <label className="ml-2">Tables that could benefit from partitioning</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-right">
                        <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                          Save Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}