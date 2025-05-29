import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, MessageCircle, Clock, CornerDownLeft, Zap, Check, DollarSign, Database, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuerySuggestion {
  text: string;
  category: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function NaturalLanguageQueryInterface() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you analyze and optimize your BigQuery costs. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [suggestions, setSuggestions] = useState<QuerySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const querySuggestions: QuerySuggestion[] = [
    { text: "What were my top 5 most expensive queries last month?", category: "cost" },
    { text: "How much could I save by partitioning my largest tables?", category: "optimization" },
    { text: "Show me query optimization opportunities with the highest ROI", category: "optimization" },
    { text: "Predict my BigQuery costs for the next quarter", category: "forecast" },
    { text: "Which teams are consuming the most resources?", category: "attribution" },
    { text: "Compare on-demand vs flat-rate pricing for my current usage", category: "pricing" },
    { text: "What's the impact of our recent query optimizations?", category: "performance" },
    { text: "How many of our queries are using SELECT *?", category: "patterns" },
    { text: "What storage optimizations would you recommend?", category: "storage" },
    { text: "What's our month-over-month cost trend?", category: "trend" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = querySuggestions.filter(suggestion => 
      suggestion.text.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message to conversation
    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsProcessing(true);
    
    // Simulate API processing time
    setTimeout(() => {
      generateResponse(userMessage.content);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const generateResponse = (query: string) => {
    let response = '';
    
    // Simulate AI response based on query keywords
    if (query.toLowerCase().includes('expensive')) {
      response = `Based on your BigQuery usage data, your top 5 most expensive queries last month were:

1. Daily Sales Analytics (query_id: 4582) - $1,245.32
   • Processed 215.6 TB of data
   • Optimization potential: HIGH (estimated 72% cost reduction possible)

2. User Behavior Analysis (query_id: 7891) - $876.45
   • Processed 143.2 TB of data
   • Optimization potential: MEDIUM (estimated 45% cost reduction possible)

3. Inventory Reconciliation (query_id: 3456) - $654.23
   • Processed 98.7 TB of data
   • Optimization potential: HIGH (estimated 65% cost reduction possible)

4. Marketing Attribution (query_id: 6789) - $543.21
   • Processed 84.3 TB of data
   • Optimization potential: LOW (estimated 15% cost reduction possible)

5. Financial Reporting (query_id: 1234) - $432.10
   • Processed 67.8 TB of data
   • Optimization potential: MEDIUM (estimated 30% cost reduction possible)

Would you like me to generate optimization recommendations for any of these queries?`;
    } else if (query.toLowerCase().includes('partitioning')) {
      response = `I've analyzed your largest tables and here's the potential savings from implementing partitioning:

Your top 3 unpartitioned tables by size:
1. sales_data (5.2 TB) - Currently scanning ~145 TB/month
2. user_events (3.7 TB) - Currently scanning ~98 TB/month
3. product_analytics (2.1 TB) - Currently scanning ~56 TB/month

Estimated monthly savings with proper partitioning:
• sales_data: $630.42/month (67% reduction)
• user_events: $428.75/month (71% reduction)
• product_analytics: $245.32/month (65% reduction)

Total estimated monthly savings: $1,304.49

Would you like me to generate partitioning implementation scripts for these tables?`;
    } else if (query.toLowerCase().includes('roi') || query.toLowerCase().includes('highest')) {
      response = `Here are the optimization opportunities with the highest ROI, based on implementation effort and potential savings:

1. Materialized Views for Daily Aggregations
   • Potential savings: $3,450/month
   • Implementation effort: LOW (est. 4 hours)
   • ROI: 862.5x per hour of work

2. Partitioning on sales_history table
   • Potential savings: $1,875/month
   • Implementation effort: LOW (est. 2 hours)
   • ROI: 937.5x per hour of work

3. Standardizing Query Patterns for Cache Utilization
   • Potential savings: $2,750/month
   • Implementation effort: MEDIUM (est. 12 hours)
   • ROI: 229.2x per hour of work

4. Implementing Flat-rate Pricing
   • Potential savings: $8,500/month
   • Implementation effort: HIGH (est. 40 hours)
   • ROI: 212.5x per hour of work

Would you like a detailed implementation plan for any of these opportunities?`;
    } else if (query.toLowerCase().includes('forecast') || query.toLowerCase().includes('predict')) {
      response = `Based on your historical usage patterns and growth trends, here's my forecast for your BigQuery costs over the next quarter:

April 2024: $27,500 (±5%)
May 2024: $29,200 (±7%) 
June 2024: $31,500 (±10%)

Total Q2 2024 Forecast: $88,200 (±7%)
Compared to Q1 2024: +15.3% increase

Key factors influencing this forecast:
• Current month-over-month growth rate of 4.8%
• Seasonal spike expected in June based on historical patterns
• New data pipeline scheduled to launch in May

Would you like recommendations for controlling this cost growth?`;
    } else if (query.toLowerCase().includes('team')) {
      response = `Here's the breakdown of BigQuery resource consumption by team for the last 30 days:

1. Data Science Team: $12,450 (42.3%)
   • Top user: sarah.miller@company.com ($4,350)
   • Top query pattern: ML model training data preparation
   • Optimization potential: HIGH

2. Analytics Team: $8,750 (29.7%)
   • Top user: john.davis@company.com ($2,840)
   • Top query pattern: Executive dashboard data processing
   • Optimization potential: MEDIUM

3. Marketing Team: $4,320 (14.7%)
   • Top user: emily.zhang@company.com ($1,950)
   • Top query pattern: Campaign attribution analysis
   • Optimization potential: MEDIUM

4. Engineering Team: $2,680 (9.1%)
   • Top user: alex.kumar@company.com ($980)
   • Top query pattern: System monitoring analytics
   • Optimization potential: LOW

5. Finance Team: $1,230 (4.2%)
   • Top user: robert.chen@company.com ($780)
   • Top query pattern: Monthly financial reporting
   • Optimization potential: LOW

Would you like specific optimization recommendations for any of these teams?`;
    } else if (query.toLowerCase().includes('pricing') || query.toLowerCase().includes('flat-rate')) {
      response = `I've analyzed your current BigQuery usage patterns to compare on-demand vs. flat-rate pricing:

Current On-Demand Pricing:
• Average monthly cost: $29,450
• Cost variability: HIGH (±25% month-to-month)
• Data processed: ~4,700 TB/month

Recommended Flat-Rate Plan:
• 1,000 slots with annual commitment
• Monthly cost: $20,000
• Projected savings: $9,450/month (32%)

Key considerations:
• Your workload pattern shows 72% utilization during business hours
• Peak usage occurs between 9am-11am and 1pm-3pm
• Weekend usage is minimal (12% of weekday usage)

With flat-rate pricing, you could process unlimited queries without additional costs, but would need to implement workload management to optimize slot utilization.

Would you like a detailed transition plan for moving to flat-rate pricing?`;
    } else if (query.toLowerCase().includes('storage')) {
      response = `Based on analysis of your BigQuery storage patterns, here are my optimization recommendations:

1. Implement Table Expiration Policies
   • 58 tables identified with no activity in 180+ days (14.2 TB)
   • Potential savings: $142/month
   • Implementation effort: LOW

2. Convert to Logical Types
   • Current STRING columns storing numeric values: 245 columns
   • Storage reduction potential: 8.5 TB (40% of these columns)
   • Potential savings: $85/month
   • Implementation effort: MEDIUM

3. Implement Partition Expiration
   • 12 time-series tables without partition expiration
   • Data older than 90 days: 28.4 TB
   • Potential savings: $284/month
   • Implementation effort: LOW

4. Move Cold Data to Long-term Storage
   • Data automatically transitions to long-term storage after 90 days
   • Current savings from this feature: $320/month
   • No action required

Total potential additional savings: $511/month

Would you like implementation scripts for any of these recommendations?`;
    } else if (query.toLowerCase().includes('select *')) {
      response = `I've analyzed your query patterns and found:

• Total unique queries in the last 30 days: 1,247
• Queries using SELECT *: 412 (33.0%)
• Estimated unnecessary data processed: 820 TB/month
• Estimated monthly cost impact: $5,125

Top 5 queries using SELECT * by cost:
1. daily_user_activity.sql - $950/month
2. transaction_processing.sql - $780/month
3. inventory_analysis.sql - $650/month
4. marketing_attribution.sql - $520/month
5. financial_reporting.sql - $450/month

Average cost reduction potential by replacing SELECT * with specific columns: 65%

Would you like me to generate optimized versions of these queries with proper column selection?`;
    } else if (query.toLowerCase().includes('trend')) {
      response = `Here's your month-over-month BigQuery cost trend:

Jan 2024: $21,450
Feb 2024: $24,780 (+15.5%)
Mar 2024: $29,450 (+18.8%)

Three-month trend analysis:
• Average monthly growth rate: 17.2%
• Projected April 2024 cost: $34,515
• Primary growth drivers:
  1. Increased query volume (+45% in 3 months)
  2. Larger data volume being processed (+28% in 3 months)
  3. More complex query patterns (+15% avg. data processed per query)

Cost breakdown trend:
• Query processing: 80% → 85% of total cost
• Storage: 15% → 12% of total cost
• Streaming inserts: 5% → 3% of total cost

Would you like recommendations for controlling this cost growth?`;
    } else {
      response = `I've analyzed your BigQuery usage patterns and found several optimization opportunities:

1. Query Optimization
   • 35% of your queries could be optimized to reduce data processed
   • Potential monthly savings: $4,200
   • Most common issue: Using SELECT * instead of selecting specific columns

2. Storage Optimization
   • 40% of your stored data hasn't been queried in 90+ days
   • Implementing lifecycle policies could save: $850/month
   • Additional partition pruning opportunities: $1,250/month

3. Pricing Model Evaluation
   • Based on your usage patterns, switching to flat-rate pricing could save: $7,500/month
   • Your workload is consistent enough to benefit from slot-based pricing
   • Recommended slots: 800

Would you like me to provide more specific details on any of these opportunities?`;
    }
    
    // Add AI response to conversation
    setConversation(prev => [
      ...prev,
      {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
    ]);
  };

  const handleClearConversation = () => {
    setConversation([
      {
        role: 'assistant',
        content: 'Hello! I can help you analyze and optimize your BigQuery costs. What would you like to know?',
        timestamp: new Date()
      }
    ]);
    toast.success('Conversation cleared');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="text-white h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold text-white">Cost Optimization Assistant</h2>
          </div>
          <button 
            onClick={handleClearConversation}
            className="text-indigo-100 hover:text-white text-sm"
          >
            Clear conversation
          </button>
        </div>
        <p className="text-indigo-100 mt-1 text-sm">
          Ask me anything about your BigQuery costs and optimization opportunities
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="whitespace-pre-line text-sm">
                  {message.content}
                </div>
                <div 
                  className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(e.target.value.trim() !== '');
            }}
            placeholder="Ask about your BigQuery costs and optimization..."
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onFocus={() => {
              if (input.trim() !== '') setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicks
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800"
          >
            <CornerDownLeft className="h-5 w-5" />
          </button>
          
          {suggestions.length > 0 && showSuggestions && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <Search className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{suggestion.text}</span>
                </div>
              ))}
            </div>
          )}
        </form>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500">Suggested questions:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => handleSuggestionClick("What were my top 5 most expensive queries last month?")}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 flex items-center"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              Top expensive queries
            </button>
            <button
              onClick={() => handleSuggestionClick("How much could I save by partitioning my largest tables?")}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 flex items-center"
            >
              <Database className="h-3 w-3 mr-1" />
              Partitioning savings
            </button>
            <button
              onClick={() => handleSuggestionClick("Predict my BigQuery costs for the next quarter")}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 flex items-center"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Cost forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}