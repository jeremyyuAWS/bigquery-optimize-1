import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Database, DollarSign, Zap, Globe, Table, Flame, Download, BarChart2, Braces, ArrowRight, FileText, Clock, Activity, HardDrive, ArrowDown, ArrowUp, Scale, ChevronDown, CheckCircle } from 'lucide-react';

interface DatabaseComparisonData {
  category: string;
  bigquery: number;
  snowflake: number;
  redshift: number;
  databricks: number;
}

const comparisonData: DatabaseComparisonData[] = [
  {
    category: "Query Performance",
    bigquery: 85,
    snowflake: 80,
    redshift: 75,
    databricks: 90
  },
  {
    category: "Cost Efficiency",
    bigquery: 75,
    snowflake: 65,
    redshift: 70,
    databricks: 60
  },
  {
    category: "Scalability",
    bigquery: 95,
    snowflake: 90,
    redshift: 80,
    databricks: 85
  },
  {
    category: "Management Overhead",
    bigquery: 90,
    snowflake: 80,
    redshift: 60,
    databricks: 70
  },
  {
    category: "Data Loading",
    bigquery: 80,
    snowflake: 85,
    redshift: 75,
    databricks: 80
  },
  {
    category: "ML Integration",
    bigquery: 90,
    snowflake: 70,
    redshift: 65,
    databricks: 95
  }
];

const costComparisonData = [
  {
    workload: "Small Data Analytics",
    description: "5TB data, 10-20 daily users, basic reporting",
    bigquery: 650,
    snowflake: 800,
    redshift: 1200,
    databricks: 1100,
    recommended: "bigquery"
  },
  {
    workload: "Medium Business Intelligence",
    description: "20TB data, 50-100 daily users, dashboarding",
    bigquery: 2200,
    snowflake: 1900,
    redshift: 3000,
    databricks: 2800,
    recommended: "snowflake"
  },
  {
    workload: "Large Data Warehouse",
    description: "100TB data, 200+ users, complex analytics",
    bigquery: 12000,
    snowflake: 10000,
    redshift: 14000,
    databricks: 15000,
    recommended: "snowflake"
  },
  {
    workload: "Massive Enterprise DW",
    description: "1PB+ data, enterprise-wide analytics",
    bigquery: 45000,
    snowflake: 52000,
    redshift: 58000,
    databricks: 60000,
    recommended: "bigquery"
  },
  {
    workload: "Streaming Analytics",
    description: "Real-time data processing (10TB/day)",
    bigquery: 18000,
    snowflake: 22000,
    redshift: 25000,
    databricks: 16000,
    recommended: "databricks"
  }
];

const workloadPlacementData = [
  {
    name: "ELT Processing",
    bigquery: 85,
    snowflake: 90,
    redshift: 75,
    databricks: 95,
    recommended: "databricks"
  },
  {
    name: "Data Science Workloads",
    bigquery: 90,
    snowflake: 70,
    redshift: 60,
    databricks: 95,
    recommended: "databricks"
  },
  {
    name: "BI Dashboarding",
    bigquery: 95,
    snowflake: 90,
    redshift: 85,
    databricks: 75,
    recommended: "bigquery"
  },
  {
    name: "Ad-hoc Analytics",
    bigquery: 95,
    snowflake: 85,
    redshift: 80,
    databricks: 75,
    recommended: "bigquery"
  },
  {
    name: "Real-time Analytics",
    bigquery: 75,
    snowflake: 70,
    redshift: 60,
    databricks: 90,
    recommended: "databricks"
  },
  {
    name: "Large-scale Batch",
    bigquery: 85,
    snowflake: 90,
    redshift: 80,
    databricks: 85,
    recommended: "snowflake"
  }
];

const benefitsData = [
  {
    title: "Cost Optimization",
    description: "Save 25-40% by placing workloads on the most cost-effective platform",
    icon: <DollarSign className="h-5 w-5 text-green-600" />
  },
  {
    title: "Performance Improvements",
    description: "Achieve 2-3x better performance by leveraging each platform's strengths",
    icon: <Zap className="h-5 w-5 text-amber-600" />
  },
  {
    title: "Simplified Management",
    description: "Unified management interface for all your data warehouses",
    icon: <Flame className="h-5 w-5 text-red-600" />
  },
  {
    title: "Flexibility & Future-proofing",
    description: "Maintain flexibility to adapt to changing market and technology trends",
    icon: <Globe className="h-5 w-5 text-blue-600" />
  }
];

export function MultiDatabaseComparison() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'cost' | 'placement' | 'migration'>('comparison');
  const [selectedDatabase, setSelectedDatabase] = useState<'bigquery' | 'snowflake' | 'redshift' | 'databricks'>('bigquery');
  
  const formatDatabaseName = (name: string): string => {
    switch(name.toLowerCase()) {
      case 'bigquery':
        return 'BigQuery';
      case 'snowflake':
        return 'Snowflake';
      case 'redshift':
        return 'Redshift';
      case 'databricks':
        return 'Databricks';
      default:
        return name;
    }
  };
  
  const getDatabaseColor = (name: string): string => {
    switch(name.toLowerCase()) {
      case 'bigquery':
        return '#4F46E5'; // indigo-600
      case 'snowflake':
        return '#0EA5E9'; // sky-500
      case 'redshift':
        return '#DC2626'; // red-600
      case 'databricks':
        return '#EA580C'; // orange-600
      default:
        return '#6B7280'; // gray-500
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Database className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Multi-database Cost Optimization</h2>
        </div>
        <p className="text-gray-600">
          Compare costs across BigQuery, Snowflake, Redshift, and more to optimize workload placement and maximize ROI.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comparison'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Platform Comparison
            </button>
            <button
              onClick={() => setActiveTab('cost')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cost'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cost Analysis
            </button>
            <button
              onClick={() => setActiveTab('placement')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'placement'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workload Placement
            </button>
            <button
              onClick={() => setActiveTab('migration')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'migration'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Migration Strategies
            </button>
          </nav>
        </div>
        
        {activeTab === 'comparison' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div 
                className={`p-4 rounded-lg cursor-pointer border ${
                  selectedDatabase === 'bigquery' 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDatabase('bigquery')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="font-medium text-gray-900">BigQuery</h3>
                  </div>
                  {selectedDatabase === 'bigquery' && (
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Google Cloud Platform</p>
              </div>
              
              <div 
                className={`p-4 rounded-lg cursor-pointer border ${
                  selectedDatabase === 'snowflake' 
                    ? 'bg-sky-50 border-sky-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDatabase('snowflake')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-sky-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Snowflake</h3>
                  </div>
                  {selectedDatabase === 'snowflake' && (
                    <CheckCircle className="h-4 w-4 text-sky-500" />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Multi-cloud platform</p>
              </div>
              
              <div 
                className={`p-4 rounded-lg cursor-pointer border ${
                  selectedDatabase === 'redshift' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDatabase('redshift')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Redshift</h3>
                  </div>
                  {selectedDatabase === 'redshift' && (
                    <CheckCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Amazon Web Services</p>
              </div>
              
              <div 
                className={`p-4 rounded-lg cursor-pointer border ${
                  selectedDatabase === 'databricks' 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDatabase('databricks')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Databricks</h3>
                  </div>
                  {selectedDatabase === 'databricks' && (
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Multi-cloud Lakehouse</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Feature Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={comparisonData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="BigQuery"
                      dataKey="bigquery"
                      stroke="#4F46E5"
                      fill="#4F46E5"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name="Snowflake"
                      dataKey="snowflake"
                      stroke="#0EA5E9"
                      fill="#0EA5E9"
                      fillOpacity={selectedDatabase === 'snowflake' ? 0.5 : 0.2}
                      isAnimationActive={false}
                    />
                    <Radar
                      name="Redshift"
                      dataKey="redshift"
                      stroke="#DC2626"
                      fill="#DC2626"
                      fillOpacity={selectedDatabase === 'redshift' ? 0.5 : 0.2}
                      isAnimationActive={false}
                    />
                    <Radar
                      name="Databricks"
                      dataKey="databricks"
                      stroke="#EA580C"
                      fill="#EA580C"
                      fillOpacity={selectedDatabase === 'databricks' ? 0.5 : 0.2}
                      isAnimationActive={false}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">{formatDatabaseName(selectedDatabase)} Key Characteristics</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDatabase === 'bigquery' && (
                    <>
                      <div className="flex items-start">
                        <div className="p-1 bg-indigo-100 rounded-full mr-2 mt-0.5">
                          <Zap className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Serverless Architecture</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            No infrastructure management required, automatic scaling.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-indigo-100 rounded-full mr-2 mt-0.5">
                          <DollarSign className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Flexible Pricing Models</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Choose between on-demand (pay per query) or flat-rate (slot-based) pricing.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-indigo-100 rounded-full mr-2 mt-0.5">
                          <Globe className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Global Availability</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Multi-region replication and global data governance.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-indigo-100 rounded-full mr-2 mt-0.5">
                          <Table className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">ML Integration</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Run ML models directly in BigQuery with BigQuery ML.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedDatabase === 'snowflake' && (
                    <>
                      <div className="flex items-start">
                        <div className="p-1 bg-sky-100 rounded-full mr-2 mt-0.5">
                          <Braces className="h-4 w-4 text-sky-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Compute/Storage Separation</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Independent scaling of compute and storage resources.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-sky-100 rounded-full mr-2 mt-0.5">
                          <Globe className="h-4 w-4 text-sky-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Multi-cloud Support</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Run on AWS, Azure, or GCP with consistent experience.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-sky-100 rounded-full mr-2 mt-0.5">
                          <Scale className="h-4 w-4 text-sky-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Virtual Warehouses</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Different sized compute clusters for different workloads.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-sky-100 rounded-full mr-2 mt-0.5">
                          <Table className="h-4 w-4 text-sky-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Time Travel & Zero-Copy Clones</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Access historical data and create instant database copies.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedDatabase === 'redshift' && (
                    <>
                      <div className="flex items-start">
                        <div className="p-1 bg-red-100 rounded-full mr-2 mt-0.5">
                          <Database className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Columnar Storage</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Highly optimized columnar storage format for analytics.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-red-100 rounded-full mr-2 mt-0.5">
                          <HardDrive className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Cluster Management</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Provisioned clusters with node-based scaling options.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-red-100 rounded-full mr-2 mt-0.5">
                          <Braces className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">AWS Integration</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Deep integration with AWS ecosystem services.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-red-100 rounded-full mr-2 mt-0.5">
                          <Flame className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Redshift Spectrum</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Query data directly in S3 without loading into Redshift.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedDatabase === 'databricks' && (
                    <>
                      <div className="flex items-start">
                        <div className="p-1 bg-orange-100 rounded-full mr-2 mt-0.5">
                          <HardDrive className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Lakehouse Architecture</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Combines data lake storage with warehouse reliability.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-orange-100 rounded-full mr-2 mt-0.5">
                          <Zap className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Spark-Powered</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Built on Apache Spark for high-performance analytics.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-orange-100 rounded-full mr-2 mt-0.5">
                          <Braces className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Multi-Language Support</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            SQL, Python, R, Scala in unified notebooks.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-1 bg-orange-100 rounded-full mr-2 mt-0.5">
                          <Activity className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">End-to-End ML Platform</h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Advanced ML capabilities integrated into the platform.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-gray-100 rounded-full mr-2">
                      {benefit.icon}
                    </div>
                    <h3 className="font-medium text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'cost' && (
          <>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-start">
                <DollarSign className="h-6 w-6 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">Cross-Platform Cost Analysis</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI analyzes your actual workloads and simulates their cost across different platforms.
                    These estimates are tailored to your specific query patterns, data volumes, and usage characteristics.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Monthly Cost Comparison by Workload Type</h3>
                <button className="flex items-center text-xs px-3 py-1 bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export Data
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Workload Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BigQuery
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Snowflake
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Redshift
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Databricks
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommended
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {costComparisonData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.workload}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.description}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                          item.recommended === 'bigquery' ? 'font-bold text-indigo-700 bg-indigo-50' : 'text-gray-900'
                        }`}>
                          ${item.bigquery.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                          item.recommended === 'snowflake' ? 'font-bold text-sky-700 bg-sky-50' : 'text-gray-900'
                        }`}>
                          ${item.snowflake.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                          item.recommended === 'redshift' ? 'font-bold text-red-700 bg-red-50' : 'text-gray-900'
                        }`}>
                          ${item.redshift.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                          item.recommended === 'databricks' ? 'font-bold text-orange-700 bg-orange-50' : 'text-gray-900'
                        }`}>
                          ${item.databricks.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.recommended === 'bigquery' ? 'bg-indigo-100 text-indigo-800' :
                            item.recommended === 'snowflake' ? 'bg-sky-100 text-sky-800' :
                            item.recommended === 'redshift' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {formatDatabaseName(item.recommended)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Cost Comparison Chart</h3>
                <div className="space-x-1 flex">
                  <button 
                    className={`px-3 py-1 text-xs rounded ${
                      selectedDatabase === 'bigquery' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDatabase('bigquery')}
                  >
                    BigQuery
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded ${
                      selectedDatabase === 'snowflake' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDatabase('snowflake')}
                  >
                    Snowflake
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded ${
                      selectedDatabase === 'redshift' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDatabase('redshift')}
                  >
                    Redshift
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded ${
                      selectedDatabase === 'databricks' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDatabase('databricks')}
                  >
                    Databricks
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="workload" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Cost']} />
                    <Legend />
                    <Bar 
                      dataKey={selectedDatabase}
                      name={formatDatabaseName(selectedDatabase)} 
                      fill={getDatabaseColor(selectedDatabase)} 
                      barSize={35}
                    />
                    <Bar 
                      dataKey="bigquery" 
                      name="BigQuery" 
                      fill="#4F46E5" 
                      barSize={35}
                      hide={selectedDatabase === 'bigquery'}
                    />
                    <Bar 
                      dataKey="snowflake" 
                      name="Snowflake" 
                      fill="#0EA5E9" 
                      barSize={35} 
                      hide={selectedDatabase === 'snowflake'}
                    />
                    <Bar 
                      dataKey="redshift" 
                      name="Redshift" 
                      fill="#DC2626" 
                      barSize={35} 
                      hide={selectedDatabase === 'redshift'}
                    />
                    <Bar 
                      dataKey="databricks" 
                      name="Databricks" 
                      fill="#EA580C" 
                      barSize={35} 
                      hide={selectedDatabase === 'databricks'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Cost Factors Analysis</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Storage Pricing Comparison</h4>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">BigQuery</span>
                        <span className="text-xs font-medium text-gray-800">$0.02/GB active, $0.01/GB long-term</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Snowflake</span>
                        <span className="text-xs font-medium text-gray-800">$23/TB on-demand, $40/TB capacity</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Redshift</span>
                        <span className="text-xs font-medium text-gray-800">$0.024/GB managed storage</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Databricks</span>
                        <span className="text-xs font-medium text-gray-800">Base on cloud storage + optimization</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Compute Pricing Models</h4>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">BigQuery</span>
                        <span className="text-xs font-medium text-gray-800">On-demand ($6.25/TB) or Flat-rate (slots)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Snowflake</span>
                        <span className="text-xs font-medium text-gray-800">Credits per warehouse-hour</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Redshift</span>
                        <span className="text-xs font-medium text-gray-800">Node-based or Serverless (RPU)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Databricks</span>
                        <span className="text-xs font-medium text-gray-800">DBU consumption (compute units)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="text-sm font-medium text-indigo-800">Your Cost Drivers</h4>
                    <p className="text-xs text-indigo-700 mt-1">
                      Based on your current workload analysis, the main factors affecting your costs are:
                    </p>
                    <ul className="mt-1.5 space-y-1 text-xs text-indigo-700">
                      <li className="flex items-start">
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-600 mr-1 mt-0.5" />
                        <span>High volume of exploratory ad-hoc queries (favors BigQuery)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-600 mr-1 mt-0.5" />
                        <span>Moderate storage needs with frequent access (neutral)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-600 mr-1 mt-0.5" />
                        <span>Complex transformations on large datasets (favors Databricks)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Optimized Multi-Database Strategy</h3>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-100 mb-3">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Potential Annual Savings</h4>
                      <p className="text-xl font-bold text-green-700 mt-1">$145,000</p>
                      <p className="text-xs text-green-600 mt-1">
                        By optimally distributing workloads across platforms
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-1.5 bg-indigo-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Database className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-800">BigQuery</h4>
                        <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">45% of workloads</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Ideal for ad-hoc analytics, BI dashboarding, and ML workloads.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-sky-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Database className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-800">Snowflake</h4>
                        <span className="ml-2 px-2 py-0.5 bg-sky-100 text-sky-800 text-xs rounded-full">30% of workloads</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Best for enterprise data warehousing and data sharing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-orange-100 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <Database className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-800">Databricks</h4>
                        <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full">25% of workloads</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Optimal for data engineering, ETL/ELT, and streaming analytics.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                      Generate Detailed Strategy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'placement' && (
          <>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
              <div className="flex items-start">
                <Braces className="h-6 w-6 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-900">AI Workload Placement Optimization</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Our AI analyzes your workload characteristics and recommends the optimal platform for each type of analytics task.
                    Implementing these recommendations can reduce costs by up to 35% while improving performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Workload Placement Recommendations</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Workload Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BigQuery
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Snowflake
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Redshift
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Databricks
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommended
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workloadPlacementData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${
                          item.recommended === 'bigquery' ? 'bg-indigo-50' : ''
                        }`}>
                          <span className="text-sm text-gray-600">{item.bigquery}%</span>
                          {item.recommended === 'bigquery' && (
                            <div className="text-xs font-medium text-indigo-700 mt-1">RECOMMENDED</div>
                          )}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${
                          item.recommended === 'snowflake' ? 'bg-sky-50' : ''
                        }`}>
                          <span className="text-sm text-gray-600">{item.snowflake}%</span>
                          {item.recommended === 'snowflake' && (
                            <div className="text-xs font-medium text-sky-700 mt-1">RECOMMENDED</div>
                          )}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${
                          item.recommended === 'redshift' ? 'bg-red-50' : ''
                        }`}>
                          <span className="text-sm text-gray-600">{item.redshift}%</span>
                          {item.recommended === 'redshift' && (
                            <div className="text-xs font-medium text-red-700 mt-1">RECOMMENDED</div>
                          )}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center ${
                          item.recommended === 'databricks' ? 'bg-orange-50' : ''
                        }`}>
                          <span className="text-sm text-gray-600">{item.databricks}%</span>
                          {item.recommended === 'databricks' && (
                            <div className="text-xs font-medium text-orange-700 mt-1">RECOMMENDED</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.recommended === 'bigquery' ? 'bg-indigo-100 text-indigo-800' :
                            item.recommended === 'snowflake' ? 'bg-sky-100 text-sky-800' :
                            item.recommended === 'redshift' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {formatDatabaseName(item.recommended)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Cross-Platform Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Complex Joins", bigquery: 62, snowflake: 75, redshift: 55, databricks: 70 },
                        { name: "Aggregations", bigquery: 85, snowflake: 80, redshift: 70, databricks: 90 },
                        { name: "Window Functions", bigquery: 90, snowflake: 85, redshift: 75, databricks: 80 },
                        { name: "ML Scoring", bigquery: 95, snowflake: 65, redshift: 60, databricks: 90 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="bigquery" name="BigQuery" fill="#4F46E5" />
                      <Bar dataKey="snowflake" name="Snowflake" fill="#0EA5E9" />
                      <Bar dataKey="redshift" name="Redshift" fill="#DC2626" />
                      <Bar dataKey="databricks" name="Databricks" fill="#EA580C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Current Workload Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Legend />
                      <Pie
                        data={[
                          { name: 'BigQuery', value: 100 },
                          { name: 'Snowflake', value: 0 },
                          { name: 'Redshift', value: 0 },
                          { name: 'Databricks', value: 0 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#0EA5E9" />
                        <Cell fill="#DC2626" />
                        <Cell fill="#EA580C" />
                      </Pie>
                      <Pie
                        data={[
                          { name: 'BigQuery', value: 45 },
                          { name: 'Snowflake', value: 30 },
                          { name: 'Redshift', value: 0 },
                          { name: 'Databricks', value: 25 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#0EA5E9" />
                        <Cell fill="#DC2626" />
                        <Cell fill="#EA580C" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center text-sm text-gray-600 mt-2">
                  <span className="font-medium">Inner circle:</span> Current distribution
                  <span className="font-medium ml-3">Outer circle:</span> Recommended distribution
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">AI-Generated Implementation Plan</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Based on our analysis, we recommend a phased approach to implementing multi-database optimization:
                  </p>
                  
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-blue-700">1</span>
                        </div>
                        <h4 className="text-sm font-medium text-blue-800">Phase 1: Data Engineering Workloads</h4>
                      </div>
                      <p className="text-xs text-blue-700 mt-1 ml-8">
                        Migrate ETL/ELT pipelines to Databricks (estimated savings: $65,000/year)
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-blue-700">2</span>
                        </div>
                        <h4 className="text-sm font-medium text-blue-800">Phase 2: Enterprise Reporting</h4>
                      </div>
                      <p className="text-xs text-blue-700 mt-1 ml-8">
                        Move standardized reporting to Snowflake (estimated savings: $42,000/year)
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-blue-700">3</span>
                        </div>
                        <h4 className="text-sm font-medium text-blue-800">Phase 3: Optimize BigQuery Usage</h4>
                      </div>
                      <p className="text-xs text-blue-700 mt-1 ml-8">
                        Keep ad-hoc analytics and ML workloads on BigQuery (estimated savings: $38,000/year)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm font-medium text-blue-800">
                    Total Estimated Annual Savings: $145,000
                  </div>
                  
                  <div className="mt-3">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                      Generate Detailed Migration Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'migration' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Migration Timeline</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Typical timeframe for a phased multi-database strategy implementation.
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Assessment & Planning</span>
                    <span className="text-xs font-medium text-gray-700">2-4 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Initial Platform Setup</span>
                    <span className="text-xs font-medium text-gray-700">3-6 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Data Migration (Phase 1)</span>
                    <span className="text-xs font-medium text-gray-700">4-8 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Workload Migration</span>
                    <span className="text-xs font-medium text-gray-700">8-12 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Optimization & Tuning</span>
                    <span className="text-xs font-medium text-gray-700">Ongoing</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">ROI Analysis</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Financial impact of implementing a multi-database strategy.
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Implementation Cost</span>
                    <span className="text-xs font-medium text-gray-700">$120,000 - $180,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Annual Cost Savings</span>
                    <span className="text-xs font-medium text-green-600">$145,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Breakeven Point</span>
                    <span className="text-xs font-medium text-gray-700">10-15 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">3-Year ROI</span>
                    <span className="text-xs font-medium text-green-600">215%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Performance Improvement</span>
                    <span className="text-xs font-medium text-blue-600">30-45%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Scale className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Migration Complexity</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Relative complexity of migrating workloads between platforms.
                </p>
                <div className="mt-2 space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">BigQuery → Snowflake</span>
                      <span className="text-xs font-medium text-amber-600">Medium</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">BigQuery → Databricks</span>
                      <span className="text-xs font-medium text-amber-600">Medium-High</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">BigQuery → Redshift</span>
                      <span className="text-xs font-medium text-red-600">High</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Migration Strategy Framework</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">1. Assessment & Discovery</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Comprehensive analysis of your current data warehouse environment, workloads, and requirements.
                      </p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Workload Analysis</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Schema Assessment</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Usage Patterns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                      <Braces className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">2. Platform Selection & Architecture</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Design optimal architecture for integrating multiple data platforms.
                      </p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Platform Selection</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Workload Distribution</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Integration Strategy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                      <HardDrive className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">3. Data Migration & Replication</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Establish efficient data movement between platforms with minimal disruption.
                      </p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">ETL/ELT Redesign</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Data Synchronization</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Validation Testing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3 flex-shrink-0">
                      <Activity className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">4. Workload Migration & Optimization</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Migrate and optimize workloads for their target platforms.
                      </p>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Query Conversion</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">Performance Tuning</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">App Integration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">SQL Compatibility Matrix</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Key differences in SQL dialect compatibility between platforms.
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Window Functions</h4>
                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-center">
                        <ArrowUp className="h-3.5 w-3.5 text-green-600 mr-1" />
                        <span className="text-xs text-gray-600">Fully compatible across all platforms</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Geospatial Functions</h4>
                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-center">
                        <ArrowDown className="h-3.5 w-3.5 text-red-600 mr-1" />
                        <span className="text-xs text-gray-600">BigQuery has most extensive support</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-3.5 w-3.5 text-amber-600 mr-1" />
                        <span className="text-xs text-gray-600">Limited compatibility with Snowflake</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Array/Struct Types</h4>
                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-center">
                        <ArrowUp className="h-3.5 w-3.5 text-green-600 mr-1" />
                        <span className="text-xs text-gray-600">Well supported in BigQuery and Databricks</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowDown className="h-3.5 w-3.5 text-red-600 mr-1" />
                        <span className="text-xs text-gray-600">Limited support in Redshift</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800">Stored Procedures</h4>
                    <div className="mt-1.5 space-y-1">
                      <div className="flex items-center">
                        <ArrowUp className="h-3.5 w-3.5 text-green-600 mr-1" />
                        <span className="text-xs text-gray-600">Excellent support in Snowflake</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowDown className="h-3.5 w-3.5 text-red-600 mr-1" />
                        <span className="text-xs text-gray-600">More limited in BigQuery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Migration Tools & Methods</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="p-1.5 bg-blue-100 rounded-full mr-2 mt-0.5">
                      <Globe className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Cross-Platform Data Transfer</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Use cloud storage as an intermediate layer for efficient data movement between platforms.
                      </p>
                      <span className="mt-1 inline-block text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        Recommended: Cloud Storage + Dataflow/Airflow
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-green-100 rounded-full mr-2 mt-0.5">
                      <Braces className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">SQL Translation</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Automated and manual translation of SQL queries between different platform dialects.
                      </p>
                      <span className="mt-1 inline-block text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                        Tool: AI-powered SQL Converter
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-purple-100 rounded-full mr-2 mt-0.5">
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Metadata Management</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Unified catalog and governance across multiple platforms.
                      </p>
                      <span className="mt-1 inline-block text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                        Options: Atlan, Collibra, Alation
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1.5 bg-amber-100 rounded-full mr-2 mt-0.5">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Phased Migration Approach</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Start with non-critical workloads and gradually move to more critical ones as experience grows.
                      </p>
                      <div className="mt-1.5">
                        <button className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 hover:bg-amber-100">
                          View Sample Migration Timeline
                        </button>
                      </div>
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