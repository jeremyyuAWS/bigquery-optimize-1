import { useState } from 'react';
import { AlertTriangle, Plus, X, Clock, DollarSign, Settings, Save, Info, Check, Edit2, Pause, Play, Trash, BarChart2, Lock, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface AlertRule {
  id: string;
  name: string;
  description: string;
  type: 'cost' | 'performance' | 'usage' | 'security';
  condition: {
    metric: string;
    operator: '>' | '<' | '>=' | '<=' | '=';
    threshold: number;
    timeframe: '24h' | '7d' | '30d';
    frequency: 'realtime' | 'hourly' | 'daily';
  };
  actions: {
    email: boolean;
    slack: boolean;
    dashboard: boolean;
  };
  severity: 'critical' | 'warning' | 'info';
  status: 'active' | 'inactive';
  lastTriggered: Date | null;
}

export function CustomAlertRules() {
  const [rules, setRules] = useState<AlertRule[]>([
    {
      id: 'rule-1',
      name: 'Daily Budget Alert',
      description: 'Alert when daily spend exceeds 90% of daily budget allocation',
      type: 'cost',
      condition: {
        metric: 'daily_cost',
        operator: '>',
        threshold: 90,
        timeframe: '24h',
        frequency: 'hourly'
      },
      actions: {
        email: true,
        slack: true,
        dashboard: true
      },
      severity: 'critical',
      status: 'active',
      lastTriggered: new Date(2024, 2, 15)
    },
    {
      id: 'rule-2',
      name: 'Long-Running Query Detection',
      description: 'Alert when queries run longer than 5 minutes',
      type: 'performance',
      condition: {
        metric: 'query_execution_time',
        operator: '>',
        threshold: 300,
        timeframe: '24h',
        frequency: 'realtime'
      },
      actions: {
        email: false,
        slack: true,
        dashboard: true
      },
      severity: 'warning',
      status: 'active',
      lastTriggered: new Date(2024, 2, 18)
    },
    {
      id: 'rule-3',
      name: 'Weekly Usage Trend',
      description: 'Alert when weekly data processed increases by 25% compared to previous week',
      type: 'usage',
      condition: {
        metric: 'data_processed_growth',
        operator: '>',
        threshold: 25,
        timeframe: '7d',
        frequency: 'daily'
      },
      actions: {
        email: true,
        slack: false,
        dashboard: true
      },
      severity: 'info',
      status: 'active',
      lastTriggered: null
    },
    {
      id: 'rule-4',
      name: 'Large Table Scan Alert',
      description: 'Alert when a query scans more than 1TB of data',
      type: 'cost',
      condition: {
        metric: 'bytes_processed',
        operator: '>',
        threshold: 1000,
        timeframe: '24h',
        frequency: 'realtime'
      },
      actions: {
        email: true,
        slack: true,
        dashboard: true
      },
      severity: 'critical',
      status: 'inactive',
      lastTriggered: null
    }
  ]);
  
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [newRule, setNewRule] = useState<Omit<AlertRule, 'id' | 'lastTriggered'>>({
    name: '',
    description: '',
    type: 'cost',
    condition: {
      metric: 'daily_cost',
      operator: '>',
      threshold: 0,
      timeframe: '24h',
      frequency: 'daily'
    },
    actions: {
      email: false,
      slack: false,
      dashboard: true
    },
    severity: 'warning',
    status: 'active'
  });
  
  const metrics = {
    cost: ['daily_cost', 'monthly_cost', 'query_cost', 'storage_cost', 'cost_growth'],
    performance: ['query_execution_time', 'slot_utilization', 'concurrent_queries', 'bytes_processed'],
    usage: ['data_processed', 'data_processed_growth', 'active_users', 'query_count'],
    security: ['unauthorized_access', 'sensitive_data_query', 'cross_project_query']
  };
  
  const handleAddRule = () => {
    if (!newRule.name.trim()) {
      toast.error('Please provide a name for the alert rule');
      return;
    }
    
    if (newRule.condition.threshold <= 0) {
      toast.error('Threshold must be greater than zero');
      return;
    }
    
    const rule: AlertRule = {
      ...newRule,
      id: `rule-${Date.now()}`,
      lastTriggered: null
    };
    
    if (editingRuleId) {
      setRules(rules.map(r => r.id === editingRuleId ? rule : r));
      toast.success('Alert rule updated successfully');
    } else {
      setRules([...rules, rule]);
      toast.success('New alert rule created successfully');
    }
    
    setNewRule({
      name: '',
      description: '',
      type: 'cost',
      condition: {
        metric: 'daily_cost',
        operator: '>',
        threshold: 0,
        timeframe: '24h',
        frequency: 'daily'
      },
      actions: {
        email: false,
        slack: false,
        dashboard: true
      },
      severity: 'warning',
      status: 'active'
    });
    
    setShowNewRuleForm(false);
    setEditingRuleId(null);
  };
  
  const handleEditRule = (rule: AlertRule) => {
    setNewRule({
      name: rule.name,
      description: rule.description,
      type: rule.type,
      condition: { ...rule.condition },
      actions: { ...rule.actions },
      severity: rule.severity,
      status: rule.status
    });
    setEditingRuleId(rule.id);
    setShowNewRuleForm(true);
  };
  
  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success('Alert rule deleted');
  };
  
  const handleToggleStatus = (id: string) => {
    setRules(rules.map(rule => {
      if (rule.id === id) {
        return {
          ...rule,
          status: rule.status === 'active' ? 'inactive' : 'active'
        };
      }
      return rule;
    }));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast.success(`Alert rule ${rule.status === 'active' ? 'deactivated' : 'activated'}`);
    }
  };
  
  const getMetricsForType = (type: string) => {
    switch (type) {
      case 'cost':
        return metrics.cost;
      case 'performance':
        return metrics.performance;
      case 'usage':
        return metrics.usage;
      case 'security':
        return metrics.security;
      default:
        return metrics.cost;
    }
  };
  
  const renderSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Critical</span>;
      case 'warning':
        return <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Warning</span>;
      case 'info':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Info</span>;
      default:
        return null;
    }
  };
  
  const renderTypeBadge = (type: string) => {
    switch (type) {
      case 'cost':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <DollarSign className="w-3 h-3 mr-1" />
          Cost
        </span>;
      case 'performance':
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          Performance
        </span>;
      case 'usage':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <BarChart2 className="w-3 h-3 mr-1" />
          Usage
        </span>;
      case 'security':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <Lock className="w-3 h-3 mr-1" />
          Security
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Custom Alert Rules</h2>
        </div>
        <button
          onClick={() => {
            setShowNewRuleForm(true);
            setEditingRuleId(null);
            setNewRule({
              name: '',
              description: '',
              type: 'cost',
              condition: {
                metric: 'daily_cost',
                operator: '>',
                threshold: 0,
                timeframe: '24h',
                frequency: 'daily'
              },
              actions: {
                email: false,
                slack: false,
                dashboard: true
              },
              severity: 'warning',
              status: 'active'
            });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Alert Rule
        </button>
      </div>
      
      {showNewRuleForm && (
        <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingRuleId ? 'Edit Alert Rule' : 'Create New Alert Rule'}
            </h3>
            <button
              onClick={() => {
                setShowNewRuleForm(false);
                setEditingRuleId(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Daily Budget Alert"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder="Describe what this alert is monitoring"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center ${
                      newRule.type === 'cost' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({
                      ...newRule, 
                      type: 'cost',
                      condition: {
                        ...newRule.condition,
                        metric: metrics.cost[0]
                      }
                    })}
                  >
                    <DollarSign className={`w-5 h-5 mr-2 ${newRule.type === 'cost' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={newRule.type === 'cost' ? 'text-indigo-700 font-medium' : 'text-gray-700'}>Cost</span>
                  </div>
                  
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center ${
                      newRule.type === 'performance' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({
                      ...newRule, 
                      type: 'performance',
                      condition: {
                        ...newRule.condition,
                        metric: metrics.performance[0]
                      }
                    })}
                  >
                    <Zap className={`w-5 h-5 mr-2 ${newRule.type === 'performance' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={newRule.type === 'performance' ? 'text-indigo-700 font-medium' : 'text-gray-700'}>Performance</span>
                  </div>
                  
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center ${
                      newRule.type === 'usage' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({
                      ...newRule, 
                      type: 'usage',
                      condition: {
                        ...newRule.condition,
                        metric: metrics.usage[0]
                      }
                    })}
                  >
                    <BarChart2 className={`w-5 h-5 mr-2 ${newRule.type === 'usage' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={newRule.type === 'usage' ? 'text-indigo-700 font-medium' : 'text-gray-700'}>Usage</span>
                  </div>
                  
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center ${
                      newRule.type === 'security' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({
                      ...newRule, 
                      type: 'security',
                      condition: {
                        ...newRule.condition,
                        metric: metrics.security[0]
                      }
                    })}
                  >
                    <Lock className={`w-5 h-5 mr-2 ${newRule.type === 'security' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={newRule.type === 'security' ? 'text-indigo-700 font-medium' : 'text-gray-700'}>Security</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Severity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center justify-center ${
                      newRule.severity === 'critical' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({...newRule, severity: 'critical'})}
                  >
                    <span className={newRule.severity === 'critical' ? 'text-red-700 font-medium' : 'text-gray-700'}>Critical</span>
                  </div>
                  
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center justify-center ${
                      newRule.severity === 'warning' 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({...newRule, severity: 'warning'})}
                  >
                    <span className={newRule.severity === 'warning' ? 'text-amber-700 font-medium' : 'text-gray-700'}>Warning</span>
                  </div>
                  
                  <div
                    className={`p-2 rounded border cursor-pointer flex items-center justify-center ${
                      newRule.severity === 'info' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setNewRule({...newRule, severity: 'info'})}
                  >
                    <span className={newRule.severity === 'info' ? 'text-blue-700 font-medium' : 'text-gray-700'}>Info</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Condition
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Metric</label>
                      <select
                        value={newRule.condition.metric}
                        onChange={(e) => setNewRule({
                          ...newRule,
                          condition: {
                            ...newRule.condition,
                            metric: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {getMetricsForType(newRule.type).map(metric => (
                          <option key={metric} value={metric}>
                            {metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Operator</label>
                      <select
                        value={newRule.condition.operator}
                        onChange={(e) => setNewRule({
                          ...newRule,
                          condition: {
                            ...newRule.condition,
                            operator: e.target.value as any
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value=">">Greater than (&gt;)</option>
                        <option value="<">Less than (&lt;)</option>
                        <option value=">=">Greater than or equal to (≥)</option>
                        <option value="<=">Less than or equal to (≤)</option>
                        <option value="=">Equal to (=)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Threshold</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={newRule.condition.threshold}
                          onChange={(e) => setNewRule({
                            ...newRule,
                            condition: {
                              ...newRule.condition,
                              threshold: parseFloat(e.target.value)
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="0"
                          step="0.01"
                        />
                        {(newRule.condition.metric === 'daily_cost' || newRule.condition.metric === 'monthly_cost' || newRule.condition.metric === 'query_cost') && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            $
                          </span>
                        )}
                        {newRule.condition.metric === 'cost_growth' && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            %
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Timeframe</label>
                      <select
                        value={newRule.condition.timeframe}
                        onChange={(e) => setNewRule({
                          ...newRule,
                          condition: {
                            ...newRule.condition,
                            timeframe: e.target.value as any
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="24h">24 hours</option>
                        <option value="7d">7 days</option>
                        <option value="30d">30 days</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Check Frequency</label>
                    <select
                      value={newRule.condition.frequency}
                      onChange={(e) => setNewRule({
                        ...newRule,
                        condition: {
                          ...newRule.condition,
                          frequency: e.target.value as any
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Channels
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={newRule.actions.email}
                      onChange={(e) => setNewRule({
                        ...newRule,
                        actions: {
                          ...newRule.actions,
                          email: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Email notifications</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={newRule.actions.slack}
                      onChange={(e) => setNewRule({
                        ...newRule,
                        actions: {
                          ...newRule.actions,
                          slack: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Slack notifications</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={newRule.actions.dashboard}
                      onChange={(e) => setNewRule({
                        ...newRule,
                        actions: {
                          ...newRule.actions,
                          dashboard: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Show in dashboard</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setShowNewRuleForm(false);
                setEditingRuleId(null);
              }}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRule}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingRuleId ? 'Update Rule' : 'Create Rule'}
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Triggered</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                  <div className="text-sm text-gray-500">{rule.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {rule.condition.metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} {rule.condition.operator} {rule.condition.threshold}
                    {rule.condition.metric.includes('cost') && !rule.condition.metric.includes('growth') ? '$' : ''}
                    {rule.condition.metric.includes('growth') ? '%' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rule.condition.frequency === 'realtime' ? 'Real-time' : rule.condition.frequency.charAt(0).toUpperCase() + rule.condition.frequency.slice(1)} check, {rule.condition.timeframe === '24h' ? '24 hours' : rule.condition.timeframe === '7d' ? '7 days' : '30 days'} window
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderTypeBadge(rule.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderSeverityBadge(rule.severity)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        rule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></div>
                    <div className="text-sm text-gray-900">
                      {rule.status === 'active' ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rule.lastTriggered 
                    ? rule.lastTriggered.toLocaleDateString() + ' ' + rule.lastTriggered.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'Never triggered'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleToggleStatus(rule.id)}
                      className={`p-1 rounded ${
                        rule.status === 'active' 
                          ? 'text-gray-400 hover:text-gray-500' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      title={rule.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEditRule(rule)}
                      className="p-1 text-indigo-600 hover:text-indigo-900"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="p-1 text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h3 className="font-medium text-blue-900">Alert Rule Tips</h3>
            <ul className="mt-1 text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Use cost alerts to stay under budget and avoid unexpected charges</li>
              <li>Performance alerts help identify slow queries that need optimization</li>
              <li>Configure Slack notifications for critical alerts that need immediate attention</li>
              <li>Set up trending alerts to detect gradual changes that might otherwise go unnoticed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}