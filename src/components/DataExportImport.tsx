import { useState } from 'react';
import { Download, Upload, FileText, CheckCircle, X, File, AlertCircle, ChevronDown, ChevronUp, Code, TrendingUp, AlertTriangle, Users, Info } from 'lucide-react';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';

interface ExportableData {
  id: string;
  name: string;
  description: string;
  records: number;
  type: 'queries' | 'optimizations' | 'alerts' | 'segments';
  lastUpdated: string;
  csvData: any[];
  csvHeaders: { label: string; key: string }[];
}

export function DataExportImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [showExportSuccess, setShowExportSuccess] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Here we'd normally process the file, but we'll simulate success
    setTimeout(() => {
      toast.success(`Successfully imported data from ${file.name}`);
      setIsImporting(false);
    }, 1500);
  };
  
  const handleToggleDataset = (id: string) => {
    if (selectedDatasets.includes(id)) {
      setSelectedDatasets(selectedDatasets.filter(datasetId => datasetId !== id));
    } else {
      setSelectedDatasets([...selectedDatasets, id]);
    }
  };
  
  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleExportSuccess = (datasetId: string) => {
    setShowExportSuccess(datasetId);
    setTimeout(() => setShowExportSuccess(null), 2000);
  };
  
  const exportableData: ExportableData[] = [
    {
      id: 'optimized-queries',
      name: 'Optimized Queries',
      description: 'Collection of all queries that have been optimized with before/after patterns',
      records: 127,
      type: 'queries',
      lastUpdated: '2024-03-15',
      csvData: [
        { id: 'q1', name: 'Daily Sales Report', original_bytes: '4.2 TB', optimized_bytes: '0.8 TB', savings_percent: '81%' },
        { id: 'q2', name: 'User Analytics Dashboard', original_bytes: '2.8 TB', optimized_bytes: '0.5 TB', savings_percent: '82%' },
        { id: 'q3', name: 'Inventory Report', original_bytes: '3.5 TB', optimized_bytes: '0.9 TB', savings_percent: '74%' }
      ],
      csvHeaders: [
        { label: 'Query ID', key: 'id' },
        { label: 'Query Name', key: 'name' },
        { label: 'Original Bytes Processed', key: 'original_bytes' },
        { label: 'Optimized Bytes Processed', key: 'optimized_bytes' },
        { label: 'Savings %', key: 'savings_percent' }
      ]
    },
    {
      id: 'cost-alerts',
      name: 'Cost Alert Rules',
      description: 'Export your custom cost alert rules for backup or sharing',
      records: 12,
      type: 'alerts',
      lastUpdated: '2024-03-10',
      csvData: [
        { id: 'a1', name: 'Daily Budget Alert', metric: 'daily_cost', threshold: '90%', severity: 'critical' },
        { id: 'a2', name: 'Large Query Alert', metric: 'query_bytes', threshold: '1TB', severity: 'warning' },
        { id: 'a3', name: 'Slot Utilization Alert', metric: 'slot_utilization', threshold: '95%', severity: 'info' }
      ],
      csvHeaders: [
        { label: 'Alert ID', key: 'id' },
        { label: 'Alert Name', key: 'name' },
        { label: 'Metric', key: 'metric' },
        { label: 'Threshold', key: 'threshold' },
        { label: 'Severity', key: 'severity' }
      ]
    },
    {
      id: 'optimization-strategies',
      name: 'Optimization Plans',
      description: 'Export your optimization plans with implementation details and expected savings',
      records: 8,
      type: 'optimizations',
      lastUpdated: '2024-03-05',
      csvData: [
        { id: 'o1', name: 'Materialized Views Implementation', status: 'in_progress', estimated_savings: '$4,500/month', priority: 'high' },
        { id: 'o2', name: 'Table Partitioning Strategy', status: 'completed', estimated_savings: '$3,200/month', priority: 'high' },
        { id: 'o3', name: 'Query Caching Improvements', status: 'planned', estimated_savings: '$1,800/month', priority: 'medium' }
      ],
      csvHeaders: [
        { label: 'Plan ID', key: 'id' },
        { label: 'Plan Name', key: 'name' },
        { label: 'Status', key: 'status' },
        { label: 'Estimated Savings', key: 'estimated_savings' },
        { label: 'Priority', key: 'priority' }
      ]
    },
    {
      id: 'customer-segments',
      name: 'Customer Segments',
      description: 'Export customer segmentation definitions and characteristics',
      records: 5,
      type: 'segments',
      lastUpdated: '2024-02-28',
      csvData: [
        { id: 's1', name: 'High-Value Loyalists', customer_count: 1250, avg_spend: '$1,250/month', key_characteristics: 'Frequent users, high spend, multi-product' },
        { id: 's2', name: 'Regular Users', customer_count: 3420, avg_spend: '$430/month', key_characteristics: 'Consistent usage, medium spend' },
        { id: 's3', name: 'Occasional Users', customer_count: 5680, avg_spend: '$120/month', key_characteristics: 'Infrequent usage, specific use cases' }
      ],
      csvHeaders: [
        { label: 'Segment ID', key: 'id' },
        { label: 'Segment Name', key: 'name' },
        { label: 'Customer Count', key: 'customer_count' },
        { label: 'Average Spend', key: 'avg_spend' },
        { label: 'Key Characteristics', key: 'key_characteristics' }
      ]
    }
  ];
  
  const formatType = (type: string): string => {
    switch (type) {
      case 'queries':
        return 'Optimized Queries';
      case 'optimizations':
        return 'Optimization Plans';
      case 'alerts':
        return 'Alert Rules';
      case 'segments':
        return 'Customer Segments';
      default:
        return type;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'queries':
        return <Code className="h-5 w-5 text-indigo-500" />;
      case 'optimizations':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'alerts':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'segments':
        return <Users className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Data Export & Import</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsImporting(!isImporting)}
            className={`px-4 py-2 flex items-center rounded-md ${
              isImporting 
                ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </button>
          
          <CSVLink 
            data={
              selectedDatasets.length > 0 
                ? exportableData
                    .filter(d => selectedDatasets.includes(d.id))
                    .flatMap(d => d.csvData)
                : []
            }
            headers={
              selectedDatasets.length === 1 
                ? exportableData.find(d => d.id === selectedDatasets[0])?.csvHeaders || [] 
                : []
            }
            filename={
              selectedDatasets.length === 1 
                ? `${exportableData.find(d => d.id === selectedDatasets[0])?.name.toLowerCase().replace(/\s+/g, '_')}.csv` 
                : "bigquery_cost_data_export.csv"
            }
            className={`px-4 py-2 flex items-center rounded-md ${
              selectedDatasets.length > 0 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(event) => {
              if (selectedDatasets.length === 0) {
                event.preventDefault();
                toast.error("Please select at least one dataset to export");
              } else {
                if (selectedDatasets.length === 1) {
                  handleExportSuccess(selectedDatasets[0]);
                } else {
                  toast.success(`Exporting ${selectedDatasets.length} datasets`);
                }
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Selected
          </CSVLink>
        </div>
      </div>
      
      {isImporting && (
        <div className="p-6 bg-amber-50 border-b border-amber-200">
          <div className="flex items-start">
            <div className="mr-3">
              <AlertCircle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Import Data</h3>
              <p className="mt-1 text-sm text-amber-700">
                Upload exported data to restore configurations or import from another environment.
                Only CSV files in the expected format will be processed correctly.
              </p>
              
              <div className="mt-4">
                <label className="block">
                  <span className="sr-only">Choose file</span>
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange}
                    className="block w-full text-sm text-amber-700
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-amber-100 file:text-amber-700
                      hover:file:bg-amber-200"
                  />
                </label>
              </div>
              
              <div className="mt-3 text-xs text-amber-600">
                <p>Supported files:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Optimization Plans (.csv)</li>
                  <li>Custom Alert Rules (.csv)</li>
                  <li>Query Patterns (.csv)</li>
                  <li>Customer Segments (.csv)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Export Datasets</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {exportableData.map((dataset) => (
            <div 
              key={dataset.id}
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedId === dataset.id ? 'shadow-md' : 'shadow-sm'
              } ${
                selectedDatasets.includes(dataset.id) ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={selectedDatasets.includes(dataset.id)}
                      onChange={() => handleToggleDataset(dataset.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 flex items-center">
                      {getTypeIcon(dataset.type)}
                      <span className="ml-2 font-medium text-gray-900">{dataset.name}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {dataset.records.toLocaleString()} {dataset.records === 1 ? 'record' : 'records'}
                    </span>
                    
                    <CSVLink
                      data={dataset.csvData}
                      headers={dataset.csvHeaders}
                      filename={`${dataset.name.toLowerCase().replace(/\s+/g, '_')}.csv`}
                      className="text-indigo-600 hover:text-indigo-800 p-1 rounded"
                      onClick={() => {
                        setTimeout(() => {
                          handleExportSuccess(dataset.id);
                        }, 100);
                      }}
                    >
                      {showExportSuccess === dataset.id ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                    </CSVLink>
                    
                    <button
                      onClick={() => handleToggleExpand(dataset.id)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded"
                    >
                      {expandedId === dataset.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="mt-1 text-sm text-gray-600 pl-7">{dataset.description}</p>
              </div>
              
              {expandedId === dataset.id && (
                <div className="bg-gray-50 border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>Data preview</span>
                    <span>Last updated: {dataset.lastUpdated}</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          {dataset.csvHeaders.map((header) => (
                            <th
                              key={header.key}
                              scope="col"
                              className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                            >
                              {header.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataset.csvData.map((row, idx) => (
                          <tr key={idx}>
                            {dataset.csvHeaders.map((header) => (
                              <td key={header.key} className="px-3 py-2 text-sm text-gray-500">
                                {row[header.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {dataset.records > dataset.csvData.length && (
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Showing {dataset.csvData.length} of {dataset.records.toLocaleString()} records
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <CSVLink
                      data={dataset.csvData}
                      headers={dataset.csvHeaders}
                      filename={`${dataset.name.toLowerCase().replace(/\s+/g, '_')}.csv`}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export full dataset
                    </CSVLink>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">About Data Export & Import</h4>
              <p className="mt-1 text-sm text-blue-700">
                This tool allows you to export your optimization configurations, alerts, and other settings for backup purposes
                or to share with other teams. You can also import previously exported data to restore configurations.
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-blue-800">Use cases for Export:</h5>
                  <ul className="mt-1 list-disc list-inside text-xs text-blue-700 space-y-1">
                    <li>Back up your optimization rules and alerts</li>
                    <li>Share best practices with other teams</li>
                    <li>Document optimization efforts for auditing</li>
                    <li>Generate reports of cost savings</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-800">Use cases for Import:</h5>
                  <ul className="mt-1 list-disc list-inside text-xs text-blue-700 space-y-1">
                    <li>Restore from backups after changes</li>
                    <li>Apply standardized optimization rules</li>
                    <li>Synchronize settings across environments</li>
                    <li>Quickly set up new projects with best practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}