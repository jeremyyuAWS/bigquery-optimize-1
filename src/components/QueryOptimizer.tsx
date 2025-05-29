import { X } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { generateOptimizationSuggestions } from '../data/mockData';

// Register the language
SyntaxHighlighter.registerLanguage('sql', sql);

interface QueryOptimizerProps {
  open: boolean;
  onClose: () => void;
  queryId: string | null;
}

export function QueryOptimizer({ open, onClose, queryId }: QueryOptimizerProps) {
  if (!open || !queryId) return null;

  const suggestions = generateOptimizationSuggestions(queryId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Query Optimization Suggestions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Original Query</h3>
            <SyntaxHighlighter
              language="sql"
              style={dracula}
              showLineNumbers
              customStyle={{ borderRadius: '0.375rem' }}
            >
              {suggestions.originalQuery}
            </SyntaxHighlighter>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Optimized Query</h3>
            <SyntaxHighlighter
              language="sql"
              style={dracula}
              showLineNumbers
              customStyle={{ borderRadius: '0.375rem' }}
            >
              {suggestions.optimizedQuery}
            </SyntaxHighlighter>
            <div className="mt-4 text-sm text-green-600">
              Estimated cost reduction: {suggestions.costReduction}%
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Optimization Details</h3>
            <div className="space-y-4">
              {suggestions.improvements.map((improvement, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-600">{improvement.title}</h4>
                  <p className="mt-1 text-gray-600">{improvement.description}</p>
                  {improvement.impact && (
                    <p className="mt-2 text-sm text-gray-500">
                      Impact: {improvement.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}