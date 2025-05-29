import { useState } from 'react';
import { MoveRight, ArrowRight, DollarSign, Calendar, Zap, AlertTriangle, CheckCircle, XCircle, Workflow, Lightbulb, ArrowUpRight, ChevronDown, ChevronUp, FileText, BarChart2, List, AlarmClock, Clock, Info, Layers, HardDrive, PlusCircle, Users, CalendarCheck } from 'lucide-react';

// Define migration phases and their steps
const migrationPhases = [
  {
    id: 'assess',
    title: 'Assessment',
    description: 'Evaluate current usage and determine optimal pricing model',
    steps: [
      {
        id: 'assess-1',
        title: 'Current Usage Analysis',
        description: 'Deep analysis of your query patterns, data volume, and current costs',
        status: 'completed',
        estimatedHours: 16
      },
      {
        id: 'assess-2',
        title: 'Workload Profiling',
        description: 'Characterize your workloads to determine slot requirements',
        status: 'completed',
        estimatedHours: 8
      },
      {
        id: 'assess-3',
        title: 'Cost Projection Modeling',
        description: 'Compare on-demand vs. flat-rate costs with future growth projections',
        status: 'completed',
        estimatedHours: 8
      }
    ]
  },
  {
    id: 'plan',
    title: 'Planning',
    description: 'Design migration strategy and resource allocation',
    steps: [
      {
        id: 'plan-1',
        title: 'Slot Allocation Planning',
        description: 'Determine optimal slot count and reservation structure',
        status: 'completed',
        estimatedHours: 8
      },
      {
        id: 'plan-2',
        title: 'Workload Assignment Design',
        description: 'Map workloads to appropriate reservations',
        status: 'in-progress',
        estimatedHours: 12
      },
      {
        id: 'plan-3',
        title: 'Migration Timeline Creation',
        description: 'Develop phased migration approach with milestones',
        status: 'not-started',
        estimatedHours: 8
      }
    ]
  },
  {
    id: 'implement',
    title: 'Implementation',
    description: 'Execute migration with minimal disruption',
    steps: [
      {
        id: 'implement-1',
        title: 'Reservation Creation',
        description: 'Set up BigQuery reservations and assignments',
        status: 'not-started',
        estimatedHours: 4
      },
      {
        id: 'implement-2',
        title: 'Workload Migration',
        description: 'Transition workloads to flat-rate pricing model',
        status: 'not-started',
        estimatedHours: 16
      },
      {
        id: 'implement-3',
        title: 'Testing & Validation',
        description: 'Verify all workloads perform as expected',
        status: 'not-started',
        estimatedHours: 20
      }
    ]
  },
  {
    id: 'optimize',
    title: 'Optimization',
    description: 'Tune and refine for optimal performance and cost',
    steps: [
      {
        id: 'optimize-1',
        title: 'Workload Monitoring',
        description: 'Track slot utilization and workload performance',
        status: 'not-started',
        estimatedHours: 8
      },
      {
        id: 'optimize-2',
        title: 'Resource Adjustment',
        description: 'Fine-tune slot allocations based on actual usage',
        status: 'not-started',
        estimatedHours: 12
      },
      {
        id: 'optimize-3',
        title: 'Cost Analysis',
        description: 'Validate actual savings against projections',
        status: 'not-started',
        estimatedHours: 8
      }
    ]
  }
];

// Risks data
const migrationRisks = [
  {
    id: 'risk-1',
    title: 'Query Concurrency Limitations',
    description: 'High-concurrency workloads may experience queuing with insufficient slots',
    severity: 'high',
    mitigation: 'Allocate buffer capacity and implement workload prioritization'
  },
  {
    id: 'risk-2',
    title: 'Cost Increase for Bursty Workloads',
    description: 'Workloads with irregular usage patterns may cost more under flat-rate',
    severity: 'medium',
    mitigation: 'Consider hybrid approach with some workloads remaining on on-demand'
  },
  {
    id: 'risk-3',
    title: 'Commitment Lock-in',
    description: 'Annual commitments may not adapt to changing business needs',
    severity: 'medium',
    mitigation: 'Use a mix of annual and monthly commitments for flexibility'
  },
  {
    id: 'risk-4',
    title: 'Migration Disruption',
    description: 'Critical workloads may experience performance impacts during transition',
    severity: 'high',
    mitigation: 'Implement phased migration during off-hours with fallback plan'
  },
  {
    id: 'risk-5',
    title: 'Slot Contention',
    description: 'Workload peaks may cause resource contention and performance degradation',
    severity: 'medium',
    mitigation: 'Implement workload management and prioritization rules'
  }
];

// Generate optimization recommendations
const optimizationRecommendations = [
  {
    id: 'opt-1',
    title: 'Implement Query Scheduling',
    description: 'Schedule large analytical queries during off-peak hours to optimize slot usage and prevent contention',
    impact: 'high',
    effort: 'medium',
    savings: '15-20% slot utilization improvement'
  },
  {
    id: 'opt-2',
    title: 'Create Workload-Specific Reservations',
    description: 'Separate interactive (BI dashboards) and batch (ETL) workloads into different reservations',
    impact: 'high',
    effort: 'low',
    savings: '25-30% query performance improvement'
  },
  {
    id: 'opt-3',
    title: 'Implement Query Optimization Before Migration',
    description: 'Optimize top 20 most expensive queries to reduce slot requirements',
    impact: 'high',
    effort: 'high',
    savings: '15-25% reduction in slot requirements'
  },
  {
    id: 'opt-4',
    title: 'Implement Autoscaling for Flexible Slots',
    description: 'Use flex slots for handling unpredictable workload spikes',
    impact: 'medium',
    effort: 'low',
    savings: '10-15% cost reduction during peak periods'
  }
];

export function IntelligentMigrationAssistant() {
  const [selectedPhase, setSelectedPhase] = useState('assess');
  const [activeTab, setActiveTab] = useState<'plan' | 'risks' | 'optimization'>('plan');
  const [expandedRisk, setExpandedRisk] = useState<string | null>('risk-1');
  
  // Calculate migration progress
  const totalSteps = migrationPhases.flatMap(phase => phase.steps).length;
  const completedSteps = migrationPhases.flatMap(phase => phase.steps).filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // Get current phase
  const currentPhase = migrationPhases.find(phase => phase.id === selectedPhase);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Workflow className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Intelligent Migration Assistant</h2>
        </div>
        <p className="text-gray-600">
          AI-powered guidance for migrating from on-demand to flat-rate pricing with step-by-step implementation assistance.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Migration Progress</h3>
              <p className="text-gray-600 text-sm mt-1">
                From on-demand to flat-rate pricing model
              </p>
            </div>
            <div className="mt-3 md:mt-0 flex items-center">
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span className="font-medium">Phase 2 of 4</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 relative">
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <div className="flex justify-between relative z-10">
              {migrationPhases.map((phase, index) => (
                <div 
                  key={phase.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedPhase(phase.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    phase.id === selectedPhase 
                      ? 'bg-indigo-600 text-white'
                      : index < migrationPhases.findIndex(p => p.id === selectedPhase)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < migrationPhases.findIndex(p => p.id === selectedPhase) || (phase.id === selectedPhase && completedSteps > 0) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${phase.id === selectedPhase ? 'text-indigo-700' : 'text-gray-700'}`}>
                      {phase.title}
                    </p>
                    <p className="text-xs text-gray-500 hidden md:block mt-1 max-w-[120px]">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('plan')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'plan'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Migration Plan
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'risks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Analysis
            </button>
            <button
              onClick={() => setActiveTab('optimization')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'optimization'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Optimization Recommendations
            </button>
          </nav>
        </div>
        
        {activeTab === 'plan' && (
          <>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">AI Migration Insights</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Based on your current usage patterns and business requirements, our AI recommends:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Pricing Model
                      </h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Enterprise flat-rate with 500 slots on annual commitment
                      </p>
                      <div className="mt-1.5 flex items-center text-xs">
                        <span className="font-medium text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          35% cost reduction
                        </span>
                        <span className="mx-1.5 text-gray-400">|</span>
                        <span className="text-indigo-600">$156K/year savings</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Timeline
                      </h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        6-week phased migration approach
                      </p>
                      <div className="mt-1.5 flex items-center text-xs">
                        <span className="font-medium text-indigo-600">Recommended start:</span>
                        <span className="ml-1 text-gray-700">April 15, 2024</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800 flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Approach
                      </h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Hybrid transition with critical workloads first
                      </p>
                      <div className="mt-1.5 flex items-center text-xs text-indigo-600">
                        <span>Low-risk migration path</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {currentPhase && (
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{currentPhase.title} Phase</h3>
                    <p className="text-gray-600 text-sm">{currentPhase.description}</p>
                  </div>
                  
                  {currentPhase.id === 'assess' && (
                    <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Complete
                    </span>
                  )}
                  
                  {currentPhase.id === 'plan' && (
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      In Progress
                    </span>
                  )}
                  
                  {(currentPhase.id === 'implement' || currentPhase.id === 'optimize') && (
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center">
                      <AlarmClock className="h-3.5 w-3.5 mr-1" />
                      Upcoming
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  {currentPhase.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border ${
                        step.status === 'completed' ? 'bg-green-50 border-green-100' :
                        step.status === 'in-progress' ? 'bg-blue-50 border-blue-100' :
                        'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.status === 'completed' ? 'bg-green-100 text-green-600' :
                          step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.status === 'in-progress' ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              step.status === 'completed' ? 'text-green-900' :
                              step.status === 'in-progress' ? 'text-blue-900' :
                              'text-gray-900'
                            }`}>
                              {step.title}
                            </h4>
                            <div className="flex items-center">
                              <Clock className={`h-4 w-4 mr-1 ${
                                step.status === 'completed' ? 'text-green-500' :
                                step.status === 'in-progress' ? 'text-blue-500' :
                                'text-gray-400'
                              }`} />
                              <span className={`text-xs ${
                                step.status === 'completed' ? 'text-green-600' :
                                step.status === 'in-progress' ? 'text-blue-600' :
                                'text-gray-500'
                              }`}>
                                {step.estimatedHours} hours
                              </span>
                            </div>
                          </div>
                          
                          <p className={`mt-1 text-sm ${
                            step.status === 'completed' ? 'text-green-700' :
                            step.status === 'in-progress' ? 'text-blue-700' :
                            'text-gray-600'
                          }`}>
                            {step.description}
                          </p>
                          
                          {step.status === 'completed' && (
                            <div className="mt-2 flex items-center">
                              <span className="text-xs text-green-600 font-medium flex items-center">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Completed
                              </span>
                              <button className="ml-3 text-xs text-indigo-600 hover:text-indigo-800">
                                View Results
                              </button>
                            </div>
                          )}
                          
                          {step.status === 'in-progress' && (
                            <div className="mt-2">
                              <div className="w-full bg-blue-200 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                              </div>
                              <div className="flex justify-between mt-1 text-xs">
                                <span className="text-blue-600">60% complete</span>
                                <span className="text-blue-800">Est. completion: Tomorrow</span>
                              </div>
                            </div>
                          )}
                          
                          {step.status === 'not-started' && (
                            <button className="mt-2 px-3 py-1 text-xs text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50">
                              Start Step
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Migration Requirements</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-1.5 bg-indigo-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <HardDrive className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Resource Requirements</h4>
                      <ul className="mt-1 space-y-1">
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>500 BigQuery slots (Enterprise Tier)</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>Annual commitment for optimal pricing</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>3 separate reservations for workload isolation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-indigo-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Layers className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Technical Requirements</h4>
                      <ul className="mt-1 space-y-1">
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>BigQuery Administrator IAM role</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>Organization policy modifications</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>Billing account administrator access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-indigo-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Team Requirements</h4>
                      <ul className="mt-1 space-y-1">
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>BigQuery Administrator (2-4 hours/week)</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>Data Engineer (8-12 hours/week)</span>
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></span>
                          <span>Finance Approver (2-4 hours total)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Migration Impact</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-green-800">Cost Impact</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-green-700">Current Monthly Cost</span>
                              <span className="text-xs font-medium text-green-800">$38,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-green-700">Projected Monthly Cost</span>
                              <span className="text-xs font-medium text-green-800">$25,000</span>
                            </div>
                          </div>
                          <div className="ml-4 text-sm font-bold text-green-700">
                            -35%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Performance Impact</h4>
                        <p className="text-xs text-blue-700 mt-1">
                          With proper reservation design and workload management:
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-start">
                            <ArrowUpRight className="h-3.5 w-3.5 text-green-600 mt-0.5 mr-1.5" />
                            <span className="text-xs text-blue-700">
                              <span className="font-medium">Interactive queries:</span> 30-40% faster average response time
                            </span>
                          </div>
                          <div className="flex items-start">
                            <ArrowUpRight className="h-3.5 w-3.5 text-green-600 mt-0.5 mr-1.5" />
                            <span className="text-xs text-blue-700">
                              <span className="font-medium">Batch jobs:</span> More predictable completion times
                            </span>
                          </div>
                          <div className="flex items-start">
                            <ArrowUpRight className="h-3.5 w-3.5 text-green-600 mt-0.5 mr-1.5" />
                            <span className="text-xs text-blue-700">
                              <span className="font-medium">Peak periods:</span> Reduced query queueing with dedicated capacity
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-start">
                      <CalendarCheck className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-purple-800">Timeline Impact</h4>
                        <div className="mt-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-purple-700">Estimated total duration:</span>
                            <span className="text-xs font-medium text-purple-800">6 weeks</span>
                          </div>
                          <div className="mt-2 relative pt-1">
                            <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-purple-200">
                              <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                            </div>
                            <div className="flex text-xs text-purple-700 justify-between">
                              <span>Start: April 15</span>
                              <span>Today</span>
                              <span>End: May 30</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'risks' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-start">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-red-900">High Risk Factors</h3>
                    <p className="text-2xl font-bold text-red-700 mt-1">2</p>
                    <p className="text-xs text-red-600 mt-1">
                      Require mitigation strategies
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Medium Risk Factors</h3>
                    <p className="text-2xl font-bold text-amber-700 mt-1">3</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Require monitoring during migration
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Overall Risk Level</h3>
                    <p className="text-2xl font-bold text-green-700 mt-1">Medium</p>
                    <p className="text-xs text-green-600 mt-1">
                      With proper planning and mitigation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Migration Risk Analysis</h3>
              
              <div className="space-y-3">
                {migrationRisks.map(risk => (
                  <div 
                    key={risk.id}
                    className={`p-4 rounded-lg border ${
                      risk.severity === 'high' 
                        ? 'border-red-200' 
                        : risk.severity === 'medium'
                          ? 'border-amber-200'
                          : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="flex justify-between items-start cursor-pointer"
                      onClick={() => setExpandedRisk(expandedRisk === risk.id ? null : risk.id)}
                    >
                      <div className="flex items-start">
                        <div className={`p-1.5 rounded-full mr-3 flex-shrink-0 ${
                          risk.severity === 'high' ? 'bg-red-100' :
                          risk.severity === 'medium' ? 'bg-amber-100' :
                          'bg-gray-100'
                        }`}>
                          <AlertTriangle className={`h-4 w-4 ${
                            risk.severity === 'high' ? 'text-red-600' :
                            risk.severity === 'medium' ? 'text-amber-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">{risk.title}</h4>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                              risk.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {risk.severity} risk
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                        </div>
                      </div>
                      
                      <button className="text-gray-400 hover:text-gray-600">
                        {expandedRisk === risk.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    {expandedRisk === risk.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-700">Mitigation Strategy</h5>
                        <p className="text-sm text-gray-600 mt-1">{risk.mitigation}</p>
                        
                        {risk.id === 'risk-1' && (
                          <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                            <h5 className="text-xs font-medium text-indigo-800">AI Implementation Guidance</h5>
                            <p className="text-xs text-indigo-700 mt-1">
                              Implement a 3-tier reservation structure with priority workloads given higher share of resources during peak hours:
                            </p>
                            <div className="mt-2 text-xs font-mono bg-white p-2 rounded border border-indigo-200 text-gray-700 overflow-x-auto">
                              # Create Reservations with appropriate slots<br/>
                              bq mk --project_id=your-project-id \ <br/>
                              --location=US \ <br/>
                              --reservation \ <br/>
                              --slots=300 \ <br/>
                              priority-reservation<br/><br/>

                              # Create Assignment for critical workloads<br/>
                              bq mk --project_id=your-project-id \ <br/>
                              --location=US \ <br/>
                              --reservation_assignment \ <br/>
                              --reservation_id=priority-reservation \ <br/>
                              --assignee_id=critical-project-id \ <br/>
                              --assignee_type=PROJECT \ <br/>
                              --job_type=QUERY
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">Risk Management Plan</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI has developed a comprehensive risk management strategy for your migration:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Pre-Migration Testing</h4>
                      <ul className="mt-1 space-y-1 text-xs text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Create test reservation with 10% of planned slots</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Run representative workloads to validate performance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Monitor and adjust assignment policies</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Phased Rollout</h4>
                      <ul className="mt-1 space-y-1 text-xs text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Start with non-critical batch workloads</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Progress to analytics workloads during low-usage period</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Finally migrate interactive dashboards with careful monitoring</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Rollback Plan</h4>
                      <ul className="mt-1 space-y-1 text-xs text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Keep on-demand billing enabled during transition</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Document rollback procedure for each workload</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-1.5">•</span>
                          <span>Establish performance and cost thresholds for rollback decision</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <button className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center">
                      <FileText className="h-4 w-4 mr-1.5" />
                      Generate Detailed Risk Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'optimization' && (
          <>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">AI-Powered Optimization Insights</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI has analyzed your current workloads and identified several opportunities to optimize
                    your migration to flat-rate pricing and maximize ROI.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Current Slot Utilization</h3>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Average Utilization</span>
                      <span className="text-xs text-gray-800 font-medium">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Peak Utilization</span>
                      <span className="text-xs text-gray-800 font-medium">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Off-hours Utilization</span>
                      <span className="text-xs text-gray-800 font-medium">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Significant opportunity to improve utilization efficiency
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <List className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Workload Distribution</h3>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Interactive (BI Dashboards)</span>
                      <span className="text-xs text-gray-800 font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Batch Processing (ETL)</span>
                      <span className="text-xs text-gray-800 font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Ad-hoc Analysis</span>
                      <span className="text-xs text-gray-800 font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Recommended: Separate reservations by workload type
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Usage Time Patterns</h3>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Business Hours (9am-5pm)</span>
                      <span className="text-xs text-gray-800 font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Evening (5pm-12am)</span>
                      <span className="text-xs text-gray-800 font-medium">27%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '27%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Night/Early Morning (12am-9am)</span>
                      <span className="text-xs text-gray-800 font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Opportunity: Schedule more processing during off-hours
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Optimization Recommendations</h3>
              
              <div className="space-y-3">
                {optimizationRecommendations.map(recommendation => (
                  <div 
                    key={recommendation.id}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-indigo-100 rounded-full">
                          <Lightbulb className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{recommendation.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                          </div>
                          
                          <div className="ml-2 flex items-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              recommendation.impact === 'high' ? 'bg-green-100 text-green-800' :
                              recommendation.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {recommendation.impact} impact
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className={`px-2 py-0.5 rounded-full ${
                              recommendation.effort === 'low' ? 'bg-green-100 text-green-800' :
                              recommendation.effort === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            } mr-2`}>
                              {recommendation.effort} effort
                            </span>
                            <span className="text-green-600 font-medium flex items-center">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              {recommendation.savings}
                            </span>
                          </div>
                          
                          <button className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 flex items-center">
                            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                            Add to Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-900">Implementation Guidance</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Our AI systems can generate detailed implementation plans for each optimization recommendation:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Implementation Scripts</h4>
                      <p className="text-xs text-green-700 mt-1">
                        Get ready-to-use scripts for creating reservations, assignments, and workload management policies
                      </p>
                      <button className="mt-2 text-xs text-green-700 hover:text-green-900 font-medium">
                        Generate Implementation Scripts
                      </button>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-200">
                      <h4 className="text-sm font-medium text-green-800">Step-by-Step Guides</h4>
                      <p className="text-xs text-green-700 mt-1">
                        Detailed procedural documentation for your team to follow during implementation
                      </p>
                      <button className="mt-2 text-xs text-green-700 hover:text-green-900 font-medium">
                        Generate Implementation Guide
                      </button>
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