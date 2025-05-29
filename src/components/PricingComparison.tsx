import { CircleDollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function PricingComparison() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">BigQuery Pricing Model Comparison</h2>
        <p className="text-gray-600 mt-1">Compare on-demand vs. capacity-based pricing models to determine the best fit for your workloads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <CircleDollarSign className="w-10 h-10 text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-center text-indigo-900 mb-4">Model Comparison</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-indigo-900 mb-2">On-Demand Pricing</h4>
                  <p className="text-indigo-700 text-sm">
                    Pay only for the bytes processed by your queries ($6.25 per TB)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-indigo-900 mb-2">Capacity Pricing</h4>
                  <p className="text-indigo-700 text-sm">
                    Purchase dedicated processing capacity (slots) starting at $2,000/month for 100 slots
                  </p>
                </div>
                
                <div className="pt-4 border-t border-indigo-200">
                  <h4 className="font-medium text-indigo-900 mb-2">Your Current Spend</h4>
                  <p className="text-2xl font-bold text-indigo-700">$25,000<span className="text-sm font-normal">/month</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">On-Demand Model</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Pay Per Query</h4>
                      <p className="text-sm text-blue-700 mt-1">Only pay for the data processed by each query</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">No Commitment</h4>
                      <p className="text-sm text-blue-700 mt-1">No upfront costs or long-term commitments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Unpredictable Costs</h4>
                      <p className="text-sm text-blue-700 mt-1">Costs can vary significantly from month to month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Resource Contention</h4>
                      <p className="text-sm text-blue-700 mt-1">Queries may compete for resources during peak usage</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded border border-blue-200">
                  <h4 className="font-medium text-blue-900">Ideal For</h4>
                  <ul className="mt-2 space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Infrequent or unpredictable query workloads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Organizations getting started with BigQuery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Development and testing environments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Monthly processing under 250TB</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg border border-purple-100 p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-4">Capacity-Based Model</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Predictable Billing</h4>
                      <p className="text-sm text-purple-700 mt-1">Fixed monthly cost regardless of query volume</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Unlimited Queries</h4>
                      <p className="text-sm text-purple-700 mt-1">Run any number of queries without additional costs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Commitment Required</h4>
                      <p className="text-sm text-purple-700 mt-1">Annual commitment required for best pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Resource Management</h4>
                      <p className="text-sm text-purple-700 mt-1">Slot allocation and workload management needed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded border border-purple-200">
                  <h4 className="font-medium text-purple-900">Ideal For</h4>
                  <ul className="mt-2 space-y-2 text-sm text-purple-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Predictable, high-volume workloads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Enterprise data warehousing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Organizations processing 500TB+ monthly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Production environments with SLAs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-bold text-green-900 mb-3">Your Recommended Pricing Model</h3>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Capacity-Based Pricing</h4>
                  <p className="text-green-700 mt-1">
                    Based on your current monthly spend of $25,000 on on-demand pricing, we recommend switching to capacity-based pricing with 800 slots.
                  </p>
                  <p className="text-green-700 mt-2">
                    Estimated new monthly cost: <span className="font-bold">$16,000</span>
                  </p>
                  <p className="text-green-700 mt-0.5">
                    Projected annual savings: <span className="font-bold">$108,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}