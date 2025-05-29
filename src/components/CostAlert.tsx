import { X } from 'lucide-react';

interface CostAlertProps {
  open: boolean;
  onClose: () => void;
}

export function CostAlert({ open, onClose }: CostAlertProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Cost Alerts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <p className="font-semibold text-red-700">Critical: High Cost Query Detected</p>
            <p className="text-sm text-gray-600 mt-1">Query processed 2.5TB of data, estimated cost: $15.62</p>
            <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="font-semibold text-amber-700">Warning: Approaching Budget Limit</p>
            <p className="text-sm text-gray-600 mt-1">Monthly spending at 85% of budget ($8,500/$10,000)</p>
            <p className="text-sm text-gray-500 mt-1">12 hours ago</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-semibold text-blue-700">Info: Cost Optimization Available</p>
            <p className="text-sm text-gray-600 mt-1">Potential savings of $1,200 identified in query patterns</p>
            <p className="text-sm text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}