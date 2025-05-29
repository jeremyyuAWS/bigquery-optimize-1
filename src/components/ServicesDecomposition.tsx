import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { PieChart as PieChartIcon, Layers, Tag, Plus, ArrowRight, ChevronDown, ChevronUp, Play, Pause, Info, BarChart2, Zap, Database, FileText } from 'lucide-react';

interface ServiceData {
  name: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

export function ServicesDecomposition() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showUnlabeled, setShowUnlabeled] = useState(false);
  
  const mainServiceData: ServiceData[] = [
    { name: 'Query Processing', value: 58, color: '#4F46E5', icon: <Database className="h-5 w-5 text-indigo-600" /> },
    { name: 'Storage', value: 18, color: '#818CF8', icon: <Database className="h-5 w-5 text-blue-600" /> },
    { name: 'Streaming Inserts', value: 9, color: '#38BDF8', icon: <Zap className="h-5 w-5 text-cyan-600" /> },
    { name: 'Other Services', value: 15, color: '#A78BFA', icon: <Layers className="h-5 w-5 text-purple-600" /> }
  ];
  
  // Detailed breakdown of "Other Services" category
  const otherServicesData: ServiceData[] = [
    { name: 'dbt Jobs', value: 4.2, color: '#F472B6' },
    { name: 'Jupyter Notebooks', value: 3.1, color: '#FB7185' },
    { name: 'Airflow Tasks', value: 2.7, color: '#FCD34D' },
    { name: 'Looker Embedded', value: 2.5, color: '#10B981' },
    { name: 'Unlabeled Jobs', value: 2.5, color: '#9CA3AF' }
  ];
  
  // Further breakdown of unlabeled jobs
  const unlabeledJobsData: {name: string, value: number, type: string, suggestedTag: string, lastRun: string, costTrend: string}[] = [
    { 
      name: 'quarterly_financial_report.sql', 
      value: 0.7, 
      type: 'SQL Script',
      suggestedTag: 'Finance',
      lastRun: '2024-03-15',
      costTrend: 'stable'
    },
    { 
      name: 'customer_segmentation_etl', 
      value: 0.6, 
      type: 'Python Script',
      suggestedTag: 'Marketing',
      lastRun: '2024-03-14',
      costTrend: 'increasing'
    },
    { 
      name: 'inventory_reconciliation', 
      value: 0.5, 
      type: 'Scheduled Query',
      suggestedTag: 'Operations',
      lastRun: '2024-03-14',
      costTrend: 'stable'
    },
    { 
      name: 'anomaly_detection_pipeline', 
      value: 0.4, 
      type: 'ML Pipeline',
      suggestedTag: 'Data Science',
      lastRun: '2024-03-13',
      costTrend: 'decreasing'
    },
    { 
      name: 'sales_territory_analysis', 
      value: 0.3, 
      type: 'BI Dashboard',
      suggestedTag: 'Sales',
      lastRun: '2024-03-10',
      costTrend: 'stable'
    }
  ];
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  const toggleExpand = (serviceName: string) => {
    if (expandedService === serviceName) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceName);
    }
  };
  
  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <PieChartIcon className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">"Other Services" Decomposition Engine</h2>
        </div>
        <p className="text-gray-600">
          AI-powered breakdown and classification of costs categorized as "Other services" in your usage
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm h-full">
              <h3 className="font-medium text-gray-900 mb-4">Cost Distribution by Service</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex !== null ? [activeIndex] : undefined}
                      activeShape={renderActiveShape}
                      data={mainServiceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={handlePieEnter}
                      onMouseLeave={handlePieLeave}
                    >
                      {mainServiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                {mainServiceData.map((service, index) => (
                  <div key={index} className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: service.color }}></div>
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{service.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Other Services Breakdown</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {mainServiceData.find(s => s.name === 'Other Services')?.value}% of total cost
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={otherServicesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {otherServicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}% of total cost`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {otherServicesData.map((service, index) => (
                    <div key={index} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: service.color }}></div>
                          <span className="text-sm font-medium text-gray-800">{service.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">${(service.value * 250).toFixed(0)}/month</span>
                          {service.name !== 'Unlabeled Jobs' && (
                            <button
                              onClick={() => toggleExpand(service.name)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              {expandedService === service.name ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          {service.name === 'Unlabeled Jobs' && (
                            <button
                              onClick={() => setShowUnlabeled(!showUnlabeled)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {expandedService === service.name && (
                        <div className="mt-2 p-2 bg-white rounded border border-gray-200 text-xs text-gray-600">
                          <p>
                            Comprises {service.value}% of your total BigQuery costs, or approximately ${(service.value * 250).toFixed(0)}/month.
                            {service.name === 'dbt Jobs' && ' These are transformation jobs run through dbt Cloud or dbt Core.'}
                            {service.name === 'Jupyter Notebooks' && ' These are queries executed from Jupyter notebooks through the BigQuery API.'}
                            {service.name === 'Airflow Tasks' && ' These are queries triggered by Airflow DAGs as part of automated workflows.'}
                            {service.name === 'Looker Embedded' && ' These are queries generated by embedded Looker dashboards and visualizations.'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {showUnlabeled && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">AI Analysis of Unlabeled Jobs</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    ${(otherServicesData.find(s => s.name === 'Unlabeled Jobs')?.value ?? 0 * 250).toFixed(0)}/month
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Our AI has analyzed your unlabeled jobs and suggests these classifications for better cost attribution:
                </p>
                
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Tag</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {unlabeledJobsData.map((job, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{job.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            ${(job.value * 250).toFixed(0)}/mo
                            <span className={`ml-1 text-xs ${
                              job.costTrend === 'increasing' ? 'text-red-600' : 
                              job.costTrend === 'decreasing' ? 'text-green-600' : 
                              'text-gray-500'
                            }`}>
                              {job.costTrend === 'increasing' ? '↑' : 
                               job.costTrend === 'decreasing' ? '↓' : 
                               '→'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                              {job.suggestedTag}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Tag className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Info className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-end space-x-3">
                  <button className="px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                    <Play className="h-4 w-4 mr-1" />
                    Create Tagging Job
                  </button>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Apply Suggested Tags
                  </button>
                </div>
              </div>
            )}
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                  <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">AI-Powered Insights</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI system has analyzed your "Other services" category and identified these key insights:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <div className="flex items-center">
                        <BarChart2 className="h-4 w-4 text-indigo-600 mr-2" />
                        <h4 className="text-sm font-medium text-indigo-800">Usage Patterns</h4>
                      </div>
                      <p className="text-xs text-indigo-700 mt-1">
                        dbt and Airflow jobs show regular, predictable patterns, while Jupyter notebook usage is more 
                        sporadic. Scheduling intensive notebook operations during off-peak hours could improve overall 
                        resource utilization.
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-indigo-600 mr-2" />
                        <h4 className="text-sm font-medium text-indigo-800">Tagging Recommendations</h4>
                      </div>
                      <p className="text-xs text-indigo-700 mt-1">
                        Implementing a consistent tagging strategy could improve cost visibility by up to 40%.
                        Our AI has automatically identified potential department and project tags for your unlabeled jobs.
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-indigo-600 mr-2" />
                        <h4 className="text-sm font-medium text-indigo-800">Query Pattern Analysis</h4>
                      </div>
                      <p className="text-xs text-indigo-700 mt-1">
                        Jupyter notebooks tend to run similar queries repeatedly with minor variations. Standardizing these
                        queries could increase cache hit rates by approximately 35%, reducing compute costs.
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-indigo-600 mr-2" />
                        <h4 className="text-sm font-medium text-indigo-800">Optimization Opportunity</h4>
                      </div>
                      <p className="text-xs text-indigo-700 mt-1">
                        Converting the top 3 Jupyter notebook workflows to scheduled dbt jobs could reduce processing costs
                        by approximately 25% and improve reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}