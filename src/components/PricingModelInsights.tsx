import { useState } from 'react';
import { DollarSign, Clock, Zap, AlertCircle, Check, Info } from 'lucide-react';

export function PricingModelInsights() {
  const [activeTab, setActiveTab] = useState<'ondemand' | 'flatrate'>('ondemand');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">BigQuery Pricing Model Insights</h2>
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
          Cost Optimization
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'ondemand'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('ondemand')}
            >
              On-Demand Pricing
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === 'flatrate'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('flatrate')}
            >
              Capacity-Based Pricing
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'ondemand' && (
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pay Per Query</h3>
              <p className="text-gray-600 mt-1">
                $6.25 per TiB of data processed. Ideal for unpredictable or infrequent workloads.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Key Benefits</h3>
              <ul className="mt-1 space-y-1 text-gray-600 list-disc list-inside">
                <li>No upfront commitment or fixed costs</li>
                <li>Pay only for what you use</li>
                <li>Automatic scaling to meet demand</li>
                <li>First 1TB of data processed per month is free</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Optimization Strategy</h3>
              <ul className="mt-1 space-y-1 text-gray-600 list-disc list-inside">
                <li>Optimize queries to scan less data</li>
                <li>Use partitioning and clustering to reduce data scanned</li>
                <li>Implement column selection instead of SELECT *</li>
                <li>Use materialized views for repeated queries</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg mt-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-800">Business Value</h4>
                <p className="mt-1 text-sm text-blue-700">
                  Our analysis shows that implementing query optimizations for on-demand pricing can reduce your data processing costs by an average of 45-60%, resulting in direct monthly savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'flatrate' && (
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Capacity-Based (Flat-Rate)</h3>
              <p className="text-gray-600 mt-1">
                Purchase dedicated slots starting at $2,000/month for 100 slots. Ideal for predictable, high-volume workloads.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Key Benefits</h3>
              <ul className="mt-1 space-y-1 text-gray-600 list-disc list-inside">
                <li>Predictable monthly costs</li>
                <li>Unlimited queries and data processing</li>
                <li>Ideal for high-volume workloads</li>
                <li>Commitment discounts available (1-3 years)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Optimization Strategy</h3>
              <ul className="mt-1 space-y-1 text-gray-600 list-disc list-inside">
                <li>Optimize slot utilization across projects</li>
                <li>Implement workload management using reservations</li>
                <li>Schedule non-urgent queries during off-peak hours</li>
                <li>Focus on query concurrency and execution time</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg mt-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-purple-800">Business Value</h4>
                <p className="mt-1 text-sm text-purple-700">
                  Organizations with stable, high-volume query workloads typically see 25-40% cost reduction when switching from on-demand to capacity-based pricing with proper slot allocation management.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <h3 className="font-semibold text-indigo-900">Recommended Pricing Model</h3>
        <p className="mt-2 text-indigo-700">
          Based on your current usage patterns, we recommend:
          <span className="font-bold ml-2">
            {activeTab === 'ondemand' ? 'On-Demand Pricing' : 'Capacity-Based Pricing'}
          </span>
        </p>
        <p className="mt-1 text-indigo-600 text-sm">
          {activeTab === 'ondemand'
            ? 'Your query patterns show irregular usage that would benefit from pay-per-query pricing.'
            : 'Your stable, high-volume workload would be more cost-effective with dedicated slots.'}
        </p>
      </div>
    </div>
  );
}