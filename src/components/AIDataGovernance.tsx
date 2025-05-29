import { useState } from 'react';
import { Shield, Database, AlertTriangle, Eye, FileText, CheckCircle2, XCircle, Search, Info, Lock, BarChart2, Filter, Download, BookOpen, FileCheck, Settings, User, ListFilter, Table } from 'lucide-react';

interface SensitiveColumnData {
  id: string;
  table: string;
  column: string;
  sensitivityType: 'PII' | 'Financial' | 'Health' | 'Location' | 'Credentials';
  accessLevel: 'Restricted' | 'Controlled' | 'Public';
  detectionConfidence: number;
  lastAccessed: string;
  complianceStatus: 'Compliant' | 'Review Needed' | 'Non-Compliant';
}

interface GovernancePolicyData {
  id: string;
  name: string;
  description: string;
  policyType: 'Access Control' | 'Data Masking' | 'Row-Level Security' | 'Audit';
  status: 'Active' | 'Draft' | 'Inactive';
  appliesTo: string[];
  createdDate: string;
  lastUpdated: string;
  createdBy: string;
  aiGenerated: boolean;
}

const sensitiveColumnsData: SensitiveColumnData[] = [
  {
    id: "col-1",
    table: "customer_data.customers",
    column: "email",
    sensitivityType: "PII",
    accessLevel: "Restricted",
    detectionConfidence: 99,
    lastAccessed: "2024-03-15",
    complianceStatus: "Compliant"
  },
  {
    id: "col-2",
    table: "customer_data.customers",
    column: "phone_number",
    sensitivityType: "PII",
    accessLevel: "Restricted",
    detectionConfidence: 98,
    lastAccessed: "2024-03-14",
    complianceStatus: "Compliant"
  },
  {
    id: "col-3",
    table: "financial.transactions",
    column: "credit_card_number",
    sensitivityType: "Financial",
    accessLevel: "Restricted",
    detectionConfidence: 100,
    lastAccessed: "2024-03-10",
    complianceStatus: "Review Needed"
  },
  {
    id: "col-4",
    table: "financial.transactions",
    column: "account_number",
    sensitivityType: "Financial",
    accessLevel: "Controlled",
    detectionConfidence: 95,
    lastAccessed: "2024-03-18",
    complianceStatus: "Compliant"
  },
  {
    id: "col-5",
    table: "health_data.patient_records",
    column: "diagnosis_code",
    sensitivityType: "Health",
    accessLevel: "Restricted",
    detectionConfidence: 97,
    lastAccessed: "2024-03-05",
    complianceStatus: "Compliant"
  },
  {
    id: "col-6",
    table: "health_data.patient_records",
    column: "treatment_notes",
    sensitivityType: "Health",
    accessLevel: "Restricted",
    detectionConfidence: 92,
    lastAccessed: "2024-03-08",
    complianceStatus: "Non-Compliant"
  },
  {
    id: "col-7",
    table: "location_data.user_locations",
    column: "home_address",
    sensitivityType: "Location",
    accessLevel: "Controlled",
    detectionConfidence: 96,
    lastAccessed: "2024-03-12",
    complianceStatus: "Compliant"
  },
  {
    id: "col-8",
    table: "auth_system.credentials",
    column: "password_hash",
    sensitivityType: "Credentials",
    accessLevel: "Restricted",
    detectionConfidence: 100,
    lastAccessed: "2024-03-01",
    complianceStatus: "Compliant"
  }
];

const governancePoliciesData: GovernancePolicyData[] = [
  {
    id: "policy-1",
    name: "PII Data Access Control",
    description: "Restrict access to personally identifiable information to authorized personnel only",
    policyType: "Access Control",
    status: "Active",
    appliesTo: ["customer_data.customers.email", "customer_data.customers.phone_number"],
    createdDate: "2024-01-15",
    lastUpdated: "2024-03-10",
    createdBy: "AI Governance Assistant",
    aiGenerated: true
  },
  {
    id: "policy-2",
    name: "Financial Data Masking",
    description: "Apply dynamic masking to financial information for non-finance teams",
    policyType: "Data Masking",
    status: "Active",
    appliesTo: ["financial.transactions.credit_card_number", "financial.transactions.account_number"],
    createdDate: "2024-02-20",
    lastUpdated: "2024-03-12",
    createdBy: "maria.sanchez@company.com",
    aiGenerated: false
  },
  {
    id: "policy-3",
    name: "Healthcare Data Access",
    description: "Implement row-level security for healthcare data based on patient consent",
    policyType: "Row-Level Security",
    status: "Draft",
    appliesTo: ["health_data.patient_records"],
    createdDate: "2024-03-05",
    lastUpdated: "2024-03-15",
    createdBy: "AI Governance Assistant",
    aiGenerated: true
  },
  {
    id: "policy-4",
    name: "Financial Audit Logging",
    description: "Comprehensive audit logging for all access to financial transaction data",
    policyType: "Audit",
    status: "Active",
    appliesTo: ["financial.transactions"],
    createdDate: "2023-11-10",
    lastUpdated: "2024-02-25",
    createdBy: "john.smith@company.com",
    aiGenerated: false
  },
  {
    id: "policy-5",
    name: "Location Data Minimization",
    description: "Apply filtering to location data to reduce precision for non-essential use cases",
    policyType: "Data Masking",
    status: "Active",
    appliesTo: ["location_data.user_locations.home_address", "location_data.user_locations.work_address"],
    createdDate: "2024-02-10",
    lastUpdated: "2024-03-01",
    createdBy: "AI Governance Assistant",
    aiGenerated: true
  }
];

const queryExamples = [
  {
    id: "query-1",
    text: "SELECT customer_id, email, phone_number, purchase_history FROM customer_data.customers WHERE signup_date > '2023-01-01'",
    sensitiveColumns: ["email", "phone_number"],
    suggestedAction: "Apply data masking and limit access to authorized users"
  },
  {
    id: "query-2",
    text: "SELECT * FROM health_data.patient_records JOIN billing.invoices ON patient_records.id = invoices.patient_id",
    sensitiveColumns: ["diagnosis_code", "treatment_notes", "billing_amount"],
    suggestedAction: "Implement row-level security and column-level access control"
  },
  {
    id: "query-3",
    text: "SELECT transaction_id, credit_card_number, amount FROM financial.transactions WHERE transaction_date BETWEEN '2024-01-01' AND '2024-03-31'",
    sensitiveColumns: ["credit_card_number"],
    suggestedAction: "Apply credit card masking (show only last 4 digits) for non-finance teams"
  }
];

export function AIDataGovernance() {
  const [activeTab, setActiveTab] = useState<'detection' | 'policies' | 'monitoring'>('detection');
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [sensitivityFilter, setSensitivityFilter] = useState<string | null>(null);
  
  const filteredColumns = sensitiveColumnsData.filter(col => 
    !sensitivityFilter || col.sensitivityType === sensitivityFilter
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Shield className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">AI Data Governance</h2>
        </div>
        <p className="text-gray-600">
          Automatically identify sensitive data patterns, recommend governance policies, and monitor compliance.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('detection')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'detection'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sensitive Data Detection
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'policies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Governance Policies
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monitoring'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance Monitoring
            </button>
          </nav>
        </div>
        
        {activeTab === 'detection' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <Database className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">Columns Scanned</h3>
                    <p className="text-3xl font-bold text-indigo-700 mt-1">2,547</p>
                    <p className="text-xs text-indigo-600 mt-1">
                      Across 128 tables in 15 datasets
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">Sensitive Data Found</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-1">87</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Columns containing sensitive information
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
                    <h3 className="font-medium text-amber-900">Compliance Issues</h3>
                    <p className="text-3xl font-bold text-amber-700 mt-1">12</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Potential data governance violations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Detected Sensitive Data</h3>
                
                <div className="flex items-center space-x-2">
                  <div>
                    <select 
                      className="text-sm border border-gray-300 rounded-md shadow-sm px-3 py-1.5 bg-white"
                      value={sensitivityFilter || ""}
                      onChange={(e) => setSensitivityFilter(e.target.value === "" ? null : e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="PII">PII</option>
                      <option value="Financial">Financial</option>
                      <option value="Health">Health</option>
                      <option value="Location">Location</option>
                      <option value="Credentials">Credentials</option>
                    </select>
                  </div>
                  
                  <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                    <Filter className="h-4 w-4 mr-1.5" />
                    Filter
                  </button>
                  
                  <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
                    <Download className="h-4 w-4 mr-1.5" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table & Column</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sensitivity Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Level</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detection Confidence</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Accessed</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredColumns.map((column) => (
                      <tr 
                        key={column.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedColumn === column.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => setSelectedColumn(selectedColumn === column.id ? null : column.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{column.table}</div>
                          <div className="text-sm text-gray-500">{column.column}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            column.sensitivityType === 'PII' ? 'bg-purple-100 text-purple-800' :
                            column.sensitivityType === 'Financial' ? 'bg-green-100 text-green-800' :
                            column.sensitivityType === 'Health' ? 'bg-red-100 text-red-800' :
                            column.sensitivityType === 'Location' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {column.sensitivityType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            column.accessLevel === 'Restricted' ? 'bg-red-100 text-red-800' :
                            column.accessLevel === 'Controlled' ? 'bg-amber-100 text-amber-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {column.accessLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div className={`h-2 rounded-full ${
                                column.detectionConfidence > 95 ? 'bg-green-600' :
                                column.detectionConfidence > 85 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`} style={{ width: `${column.detectionConfidence}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-900">{column.detectionConfidence}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {column.lastAccessed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            column.complianceStatus === 'Compliant' ? 'bg-green-100 text-green-800' :
                            column.complianceStatus === 'Review Needed' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {column.complianceStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {selectedColumn && (
              <div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-indigo-900">AI Recommendation for Selected Column</h3>
                  <button 
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={() => setSelectedColumn(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Recommended Actions</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span className="text-sm text-gray-700">
                          Apply column-level access controls to restrict access to authorized roles
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span className="text-sm text-gray-700">
                          Implement data masking for non-privileged users (show only partial data)
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                        <span className="text-sm text-gray-700">
                          Enable enhanced audit logging for all access to this column
                        </span>
                      </div>
                    </div>
                    <button className="mt-3 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                      Apply Recommendations
                    </button>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-indigo-200">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Regulatory Compliance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">GDPR</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Applicable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">CCPA</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Applicable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">HIPAA</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">Not Applicable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">PCI DSS</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">Not Applicable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Distribution by Sensitivity Type</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">PII Data</span>
                      <span className="text-xs font-medium text-gray-900">42 columns</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Financial Data</span>
                      <span className="text-xs font-medium text-gray-900">19 columns</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Health Data</span>
                      <span className="text-xs font-medium text-gray-900">15 columns</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Location Data</span>
                      <span className="text-xs font-medium text-gray-900">8 columns</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Credentials</span>
                      <span className="text-xs font-medium text-gray-900">3 columns</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Query Risk Detection</h3>
                
                <div className="space-y-4">
                  {queryExamples.map(example => (
                    <div key={example.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Potential Privacy Risk in Query</h4>
                          <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono text-gray-700 overflow-x-auto">
                            {example.text}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {example.sensitiveColumns.map((col, i) => (
                              <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                                {col}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-xs text-amber-600">
                            <span className="font-medium">Recommendation:</span> {example.suggestedAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'policies' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">AI-Generated Governance Policies</h3>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search policies..."
                    className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center">
                  <Shield className="h-4 w-4 mr-1.5" />
                  Generate New Policy
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              <div className="md:col-span-5">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">Available Policies</h4>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {governancePoliciesData.map(policy => (
                        <li 
                          key={policy.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedPolicy === policy.id ? 'bg-indigo-50' : ''
                          }`}
                          onClick={() => setSelectedPolicy(policy.id)}
                        >
                          <div className="px-4 py-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium text-gray-900 truncate">{policy.name}</p>
                                  {policy.aiGenerated && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full flex items-center">
                                      <Brain className="h-3 w-3 mr-1" />
                                      AI Generated
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{policy.description}</p>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                                policy.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {policy.status}
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full inline-flex items-center ${
                                policy.policyType === 'Access Control' ? 'bg-purple-50 text-purple-800' :
                                policy.policyType === 'Data Masking' ? 'bg-blue-50 text-blue-800' :
                                policy.policyType === 'Row-Level Security' ? 'bg-amber-50 text-amber-800' :
                                'bg-green-50 text-green-800'
                              }`}>
                                {policy.policyType === 'Access Control' && <Lock className="h-3 w-3 mr-1" />}
                                {policy.policyType === 'Data Masking' && <Eye className="h-3 w-3 mr-1" />}
                                {policy.policyType === 'Row-Level Security' && <ListFilter className="h-3 w-3 mr-1" />}
                                {policy.policyType === 'Audit' && <FileCheck className="h-3 w-3 mr-1" />}
                                {policy.policyType}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Updated: {policy.lastUpdated}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7">
                {selectedPolicy ? (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
                    {(() => {
                      const policy = governancePoliciesData.find(p => p.id === selectedPolicy);
                      if (!policy) return null;
                      
                      return (
                        <>
                          <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{policy.name}</h4>
                              <div className="flex items-center space-x-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  policy.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {policy.status}
                                </span>
                                <button className="text-gray-500 hover:text-gray-700">
                                  <Settings className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">{policy.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-900 mb-1">Policy Type</h5>
                                <div className={`text-sm px-2 py-1 inline-flex items-center rounded ${
                                  policy.policyType === 'Access Control' ? 'bg-purple-50 text-purple-800' :
                                  policy.policyType === 'Data Masking' ? 'bg-blue-50 text-blue-800' :
                                  policy.policyType === 'Row-Level Security' ? 'bg-amber-50 text-amber-800' :
                                  'bg-green-50 text-green-800'
                                }`}>
                                  {policy.policyType === 'Access Control' && <Lock className="h-4 w-4 mr-1.5" />}
                                  {policy.policyType === 'Data Masking' && <Eye className="h-4 w-4 mr-1.5" />}
                                  {policy.policyType === 'Row-Level Security' && <ListFilter className="h-4 w-4 mr-1.5" />}
                                  {policy.policyType === 'Audit' && <FileCheck className="h-4 w-4 mr-1.5" />}
                                  {policy.policyType}
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-900 mb-1">Created By</h5>
                                <div className="flex items-center">
                                  <div className="text-sm text-gray-700 flex items-center">
                                    <User className="h-4 w-4 mr-1.5 text-gray-500" />
                                    {policy.createdBy}
                                  </div>
                                  {policy.aiGenerated && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full flex items-center">
                                      <Brain className="h-3 w-3 mr-1" />
                                      AI Generated
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-1">Applies To</h5>
                              <div className="flex flex-wrap gap-2">
                                {policy.appliesTo.map((item, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center">
                                    <Table className="h-3 w-3 mr-1 text-gray-500" />
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-3">Policy Implementation</h5>
                              
                              {policy.policyType === 'Access Control' && (
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                  <div className="mb-2 text-xs font-mono text-gray-700 overflow-x-auto">
                                    <pre>
                                      {`-- Access Control Policy (BigQuery example)
GRANT SELECT ON TABLE \`project.dataset.table\`
TO GROUP "authorized_analysts@company.com";

-- Deny everyone else
REVOKE ALL PRIVILEGES
ON TABLE \`project.dataset.table\`
FROM GROUP "allUsers";`}
                                    </pre>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    This policy restricts access to specified tables/columns to only authorized users.
                                  </div>
                                </div>
                              )}
                              
                              {policy.policyType === 'Data Masking' && (
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                  <div className="mb-2 text-xs font-mono text-gray-700 overflow-x-auto">
                                    <pre>
                                      {`-- Data Masking Policy (BigQuery example)
CREATE OR REPLACE VIEW \`project.dataset.masked_view\` AS
SELECT
  id,
  CASE
    WHEN SESSION_USER() IN ('finance@company.com')
    THEN credit_card_number
    ELSE CONCAT('XXXX-XXXX-XXXX-', SUBSTR(credit_card_number, 15, 4))
  END AS credit_card_number,
  transaction_date
FROM \`project.dataset.transactions\`;`}
                                    </pre>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    This policy dynamically masks sensitive data based on user roles.
                                  </div>
                                </div>
                              )}
                              
                              {policy.policyType === 'Row-Level Security' && (
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                  <div className="mb-2 text-xs font-mono text-gray-700 overflow-x-auto">
                                    <pre>
                                      {`-- Row-Level Security Policy (BigQuery example)
CREATE ROW ACCESS POLICY patient_data_access
ON \`project.dataset.patient_records\`
GRANT TO ('group:healthcare_providers@company.com')
FILTER USING (TRUE);

CREATE ROW ACCESS POLICY patient_data_restricted
ON \`project.dataset.patient_records\`
GRANT TO ('group:researchers@company.com')
FILTER USING (consent_for_research = TRUE);`}
                                    </pre>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    This policy restricts row-level access based on user roles and data attributes.
                                  </div>
                                </div>
                              )}
                              
                              {policy.policyType === 'Audit' && (
                                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                  <div className="mb-2 text-xs font-mono text-gray-700 overflow-x-auto">
                                    <pre>
                                      {`-- Audit Logging Policy (BigQuery example)
-- Enable data access logs in BigQuery
gcloud logging sinks create financial_data_audit_sink \
storage.googleapis.com/my-company-audit-logs \
--log-filter='resource.type="bigquery_resource" AND \
resource.labels.dataset_id="financial"'

-- Create audit views
CREATE OR REPLACE VIEW \`admin.financial_data_access_logs\` AS
SELECT
  timestamp,
  principal_email,
  method,
  resource_name,
  metadata.table.table_name
FROM \`project.logs.cloudaudit_googleapis_com_data_access\`
WHERE resource.labels.dataset_id = 'financial'`}
                                    </pre>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    This policy implements comprehensive audit logging for sensitive data access.
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex justify-between">
                              <div className="text-xs text-gray-500">
                                Created: {policy.createdDate} | Last Updated: {policy.lastUpdated}
                              </div>
                              
                              <div className="flex space-x-2">
                                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50">
                                  Edit Policy
                                </button>
                                <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                                  Apply Policy
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Select a Policy</h3>
                      <p className="text-sm text-gray-500 max-w-md">
                        Choose a governance policy from the list to view details, implementation code, and apply to your data.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Brain className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">AI-Generated Policy Recommendations</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Based on your sensitive data patterns and query history, our AI suggests these new policies:
                  </p>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-start">
                        <Eye className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">Customer Address Masking</h4>
                          <p className="text-xs text-blue-700 mt-1">
                            Apply dynamic masking to customer address fields for non-support staff.
                          </p>
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                            Generate Policy
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-start">
                        <ListFilter className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">Marketing Data RLS</h4>
                          <p className="text-xs text-blue-700 mt-1">
                            Implement row-level security for marketing data based on opt-in status.
                          </p>
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                            Generate Policy
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <div className="flex items-start">
                        <Lock className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">Financial Data Access</h4>
                          <p className="text-xs text-blue-700 mt-1">
                            Restrict access to financial transaction data to finance team only.
                          </p>
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                            Generate Policy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'monitoring' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Compliance Score</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">86<span className="text-lg">/100</span></p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '86%' }}></div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Last assessed: Today at 6:15 AM</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-amber-100 rounded-full mr-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Open Issues</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Critical</span>
                    <span className="text-xs font-medium text-red-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">High</span>
                    <span className="text-xs font-medium text-amber-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Medium</span>
                    <span className="text-xs font-medium text-blue-600">4</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Policy Coverage</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">94%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <p className="mt-2 text-xs text-gray-500">6% of sensitive data needs policy protection</p>
              </div>
            </div>
            
            <div className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Compliance Monitoring Dashboard</h3>
                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 rounded text-gray-700 hover:bg-gray-200">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export Report
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Access Control Compliance</h4>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Appropriate access controls</span>
                      <span className="text-xs font-medium text-green-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      5 tables need access control review
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Data Masking Compliance</h4>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Appropriate data masking</span>
                      <span className="text-xs font-medium text-amber-600">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      18 columns need data masking implementation
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Audit Logging Status</h4>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Comprehensive audit logging</span>
                      <span className="text-xs font-medium text-green-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Audit logging enabled for most sensitive tables
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Regulatory Compliance</h4>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">GDPR, CCPA, HIPAA, PCI DSS</span>
                      <span className="text-xs font-medium text-blue-600">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      7 compliance issues need remediation
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg border border-red-100 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Critical Compliance Issues</h4>
                      <ul className="mt-2 space-y-1 text-xs text-red-700">
                        <li className="flex items-start">
                          <span className="text-red-600 mr-1.5">•</span>
                          <span>Unmasked credit card data potentially accessible to unauthorized users (financial.transactions)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-1.5">•</span>
                          <span>Missing row-level security for patient records with no audit logging (health_data.patient_records)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-1.5">•</span>
                          <span>PII data in customer exports not properly anonymized (exports.customer_analysis)</span>
                        </li>
                      </ul>
                      <button className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                        Generate Remediation Plan
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-medium text-amber-800 mb-2">Recent Access Activity on Sensitive Data</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-amber-200">
                      <div className="flex items-start">
                        <div className="text-xs text-amber-800">
                          <span className="font-medium">Today, 9:45 AM:</span> User <span className="font-medium">robert.chen@company.com</span> accessed health_data.patient_records from an unusual location
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded border border-amber-200">
                      <div className="flex items-start">
                        <div className="text-xs text-amber-800">
                          <span className="font-medium">Yesterday, 4:32 PM:</span> User <span className="font-medium">sarah.johnson@company.com</span> exported 15,000 records with PII data
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded border border-amber-200">
                      <div className="flex items-start">
                        <div className="text-xs text-amber-800">
                          <span className="font-medium">Mar 27, 11:20 AM:</span> Unusual query pattern detected accessing multiple sensitive tables
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Compliance Trend</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Compliance trend visualization will appear here</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">AI-Powered Compliance Insights</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex items-start">
                      <Brain className="h-4 w-4 text-indigo-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800">Compliance Pattern Analysis</h4>
                        <p className="text-xs text-indigo-700 mt-1">
                          AI has detected that most compliance issues occur after new data pipelines are implemented. Consider adding a governance review step to your CI/CD process.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex items-start">
                      <Brain className="h-4 w-4 text-indigo-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800">Access Pattern Analysis</h4>
                        <p className="text-xs text-indigo-700 mt-1">
                          The marketing team frequently needs access to customer PII data for campaigns. Consider creating a de-identified view with tokenized IDs to eliminate compliance risks.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex items-start">
                      <Brain className="h-4 w-4 text-indigo-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium text-indigo-800">Remediation Priority</h4>
                        <p className="text-xs text-indigo-700 mt-1">
                          Based on risk analysis, addressing the unmasked credit card data issue should be your highest priority as it presents the greatest compliance and security risk.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-3 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 w-full flex items-center justify-center">
                  <Brain className="h-4 w-4 mr-1.5" />
                  Generate Full Compliance Report
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="bg-indigo-50 p-4 border-t border-indigo-100">
        <div className="flex items-start">
          <BookOpen className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-indigo-900">About AI Data Governance</h3>
            <p className="text-sm text-indigo-700 mt-1">
              Our AI-powered data governance system continuously scans your BigQuery datasets to identify sensitive information, 
              recommend appropriate protection policies, and monitor compliance with data protection regulations such as GDPR, 
              CCPA, and HIPAA. This helps you maintain data security while enabling appropriate access for business needs.
            </p>
            <button className="mt-2 text-sm text-indigo-700 hover:text-indigo-900 font-medium">
              Learn more about data governance best practices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}