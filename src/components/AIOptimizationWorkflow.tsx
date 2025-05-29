import { useState } from 'react';
import { CheckCircle2, Clock, ArrowRight, CalendarCheck, Zap, Bot, Database, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';

interface OptimizationStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "scheduled";
  scheduledDate?: string;
  expanded?: boolean;
  actions: string[];
  savings: string;
  effortLevel: "Low" | "Medium" | "High";
  details?: string;
}

export function AIOptimizationWorkflow() {
  const [steps, setSteps] = useState<OptimizationStep[]>([
    {
      id: "step-1",
      title: "Analyze Query Patterns",
      description: "AI analysis of your query patterns to identify optimization opportunities",
      status: "completed",
      actions: [
        "Analyzed 283 unique query patterns",
        "Identified 37 optimization opportunities",
        "Generated cost-saving recommendations"
      ],
      savings: "$0 (Analysis phase)",
      effortLevel: "Low",
      expanded: true,
      details: "Our AI has analyzed 3 months of query history to identify patterns, inefficiencies, and optimization opportunities. The analysis shows that 14% of your queries account for 72% of your total BigQuery costs."
    },
    {
      id: "step-2",
      title: "Implement Quick Wins",
      description: "Apply low-effort, high-impact optimizations to reduce immediate costs",
      status: "in-progress",
      actions: [
        "Identify and fix inefficient SELECT * queries",
        "Implement query caching strategy",
        "Optimize JOIN operations in ETL pipeline",
        "Fix non-partition-pruning friendly queries"
      ],
      savings: "$4,500/month",
      effortLevel: "Low",
      expanded: false,
      details: "These optimizations require minimal changes to your queries but can deliver significant cost savings. Our AI has already identified 23 queries that can be optimized without affecting functionality."
    },
    {
      id: "step-3",
      title: "Schema Optimization",
      description: "Implement partitioning and clustering on high-cost tables",
      status: "scheduled",
      scheduledDate: "2024-04-15",
      actions: [
        "Create partitioning strategy for 5 largest tables",
        "Implement clustering on frequently filtered columns",
        "Update queries to leverage partition pruning",
        "Validate performance improvements"
      ],
      savings: "$5,200/month",
      effortLevel: "Medium",
      expanded: false,
      details: "Our analysis shows that your 5 largest tables account for 68% of data processed. Implementing proper partitioning and clustering can reduce these costs by up to 70%."
    },
    {
      id: "step-4",
      title: "Implement Materialized Views",
      description: "Create materialized views for frequently executed analytical queries",
      status: "pending",
      actions: [
        "Identify top 10 recurring aggregation queries",
        "Design and implement materialized views",
        "Update application code to use views",
        "Set up monitoring for materialized view usage"
      ],
      savings: "$7,200/month",
      effortLevel: "Medium",
      expanded: false,
      details: "Materialized views can dramatically reduce costs for frequently run queries. Our AI has identified 8 query patterns that are executed multiple times daily and would benefit from materialized views."
    },
    {
      id: "step-5",
      title: "Implement Storage Lifecycle Policies",
      description: "Optimize storage costs through automated data lifecycle management",
      status: "pending",
      actions: [
        "Analyze data access patterns",
        "Implement partition expiration for time-series data",
        "Move cold data to long-term storage",
        "Create data retention policies"
      ],
      savings: "$1,800/month",
      effortLevel: "Low",
      expanded: false,
      details: "Our analysis shows that 65% of your stored data hasn't been queried in over 90 days. Implementing proper data lifecycle policies can significantly reduce your storage costs."
    },
    {
      id: "step-6",
      title: "Evaluate Flat-Rate Pricing Model",
      description: "Assess if switching to capacity-based pricing would be cost-effective",
      status: "pending",
      actions: [
        "Analyze current on-demand usage patterns",
        "Calculate optimal slot allocation",
        "Compare costs between pricing models",
        "Provide recommendation report"
      ],
      savings: "Up to $12,000/month",
      effortLevel: "High",
      expanded: false,
      details: "Based on your consistent query workload, switching to flat-rate pricing could provide significant cost savings. Our AI will analyze your usage patterns to determine the optimal slot allocation."
    }
  ]);
  
  const toggleExpand = (id: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, expanded: !step.expanded } : step
    ));
  };
  
  const completedSteps = steps.filter(step => step.status === "completed").length;
  const inProgressSteps = steps.filter(step => step.status === "in-progress").length;
  const totalSavings = steps.reduce((total, step) => {
    const match = step.savings.match(/\$([0-9,]+)/);
    return total + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Completed
        </span>;
      case "in-progress":
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      case "scheduled":
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <CalendarCheck className="w-3 h-3 mr-1" />
          Scheduled
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>;
    }
  };
  
  const getEffortBadge = (level: string) => {
    switch(level) {
      case "Low":
        return <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">
          Low effort
        </span>;
      case "Medium":
        return <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">
          Medium effort
        </span>;
      case "High":
        return <span className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-full">
          High effort
        </span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Clock className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">BigQuery Optimization Roadmap</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded hover:bg-indigo-700 flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            Execute Next Step
          </button>
          <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded hover:bg-gray-50 flex items-center">
            <ArrowDown className="w-4 h-4 mr-1" />
            Export Plan
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="font-medium text-indigo-900 text-sm">Plan Progress</h3>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-indigo-700">{completedSteps + inProgressSteps}/{steps.length}</p>
              <p className="text-xs text-indigo-600">Steps completed or in progress</p>
            </div>
            <div className="w-24 bg-indigo-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${((completedSteps + (inProgressSteps * 0.5)) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-medium text-green-900 text-sm">Potential Monthly Savings</h3>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-green-700">${totalSavings.toLocaleString()}</p>
              <p className="text-xs text-green-600">Estimated total savings</p>
            </div>
            <ArrowDown className="h-6 w-6 text-green-600" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-900 text-sm">AI Assistance</h3>
          <div className="mt-2 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Automated Implementation</p>
              <p className="text-xs text-blue-600 mt-1">AI can automate 70% of optimizations</p>
            </div>
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.id} className="mb-4 last:mb-0">
              <div className={`relative z-10 ${
                index !== steps.length - 1 ? 'pb-8' : ''
              }`}>
                {index !== steps.length - 1 && (
                  <div className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                    step.status === "completed" ? 'bg-green-400' : 
                    step.status === "in-progress" ? 'bg-blue-400' : 'bg-gray-300'
                  }`}></div>
                )}
                
                <div className="relative flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    step.status === "completed" ? 'bg-green-100' : 
                    step.status === "in-progress" ? 'bg-blue-100' : 
                    step.status === "scheduled" ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : step.status === "in-progress" ? (
                      <Zap className="h-5 w-5 text-blue-600" />
                    ) : step.status === "scheduled" ? (
                      <CalendarCheck className="h-5 w-5 text-purple-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1 ml-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 flex items-center">
                            {step.title}
                            <span className="ml-2">
                              {getStatusBadge(step.status)}
                            </span>
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                          {step.scheduledDate && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <CalendarCheck className="w-3 h-3 mr-1" />
                              {step.scheduledDate}
                            </span>
                          )}
                          
                          <button 
                            onClick={() => toggleExpand(step.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          >
                            {step.expanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {step.expanded && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Actions Required</h4>
                              <ul className="space-y-2">
                                {step.actions.map((action, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center mr-2">
                                      <span className="text-xs font-medium text-indigo-600">{idx + 1}</span>
                                    </span>
                                    <span className="text-sm text-gray-600">{action}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {step.details && (
                                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                                  <h4 className="text-sm font-medium text-gray-700 mb-1">AI Insights</h4>
                                  <p className="text-xs text-gray-600">{step.details}</p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <div className="bg-indigo-50 p-3 rounded-md mb-3">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-medium text-indigo-800">Estimated Impact</h4>
                                  <span className="text-sm font-bold text-indigo-700">{step.savings}</span>
                                </div>
                                <p className="mt-1 text-xs text-indigo-600">
                                  Monthly cost reduction after implementation
                                </p>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded-md mb-3">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-medium text-gray-700">Implementation Effort</h4>
                                  {getEffortBadge(step.effortLevel)}
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                  {step.effortLevel === "Low" ? 'Typically requires 1-2 hours of work' : 
                                   step.effortLevel === "Medium" ? 'Typically requires 1-2 days of work' : 
                                   'Typically requires 3-5 days of work'}
                                </p>
                              </div>
                              
                              {step.status !== "completed" && (
                                <div className="flex space-x-2">
                                  {step.status === "pending" && (
                                    <>
                                      <button className="bg-indigo-600 text-white px-3 py-1.5 text-xs rounded hover:bg-indigo-700 flex items-center">
                                        <Zap className="w-3 h-3 mr-1" />
                                        Start Now
                                      </button>
                                      <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-xs rounded hover:bg-gray-50 flex items-center">
                                        <CalendarCheck className="w-3 h-3 mr-1" />
                                        Schedule
                                      </button>
                                    </>
                                  )}
                                  
                                  {step.status === "in-progress" && (
                                    <button className="bg-green-600 text-white px-3 py-1.5 text-xs rounded hover:bg-green-700 flex items-center">
                                      <CheckCircle2 className="w-3 h-3 mr-1" />
                                      Mark Complete
                                    </button>
                                  )}
                                  
                                  {step.status === "scheduled" && (
                                    <button className="bg-blue-600 text-white px-3 py-1.5 text-xs rounded hover:bg-blue-700 flex items-center">
                                      <Zap className="w-3 h-3 mr-1" />
                                      Start Early
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-start">
          <Bot className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-800">AI Implementation Assistant</h3>
            <p className="text-sm text-gray-600 mt-1">
              Our AI assistant can help implement many of these optimizations automatically. For each step, the AI can:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-indigo-500 mr-1 mt-0.5" />
                <span>Generate optimized SQL queries based on your current patterns</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-indigo-500 mr-1 mt-0.5" />
                <span>Create partitioning and clustering schemas tailored to your data</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-indigo-500 mr-1 mt-0.5" />
                <span>Design materialized views for your most expensive queries</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-indigo-500 mr-1 mt-0.5" />
                <span>Configure optimal storage lifecycle policies</span>
              </li>
            </ul>
            <button className="mt-3 bg-indigo-100 text-indigo-700 px-3 py-1.5 text-sm rounded hover:bg-indigo-200 flex items-center inline-flex">
              <Bot className="w-4 h-4 mr-1" />
              Enable AI Implementation Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}