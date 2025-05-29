import { useState } from 'react';
import { RefreshCw, CheckCircle, Clock, Calendar, BarChart, Settings, Info, AlertCircle } from 'lucide-react';

export function SmartDataPolling() {
  const [activeTab, setActiveTab] = useState<'status' | 'history' | 'settings'>('status');
  
  // Mock data for refresh history
  const refreshHistory = [
    { id: 1, timestamp: '2024-03-15 08:00:00', status: 'success', duration: '3m 12s', tablesScanned: 42, queriesAnalyzed: 1248 },
    { id: 2, timestamp: '2024-03-15 04:00:00', status: 'success', duration: '2m 58s', tablesScanned: 42, queriesAnalyzed: 1156 },
    { id: 3, timestamp: '2024-03-15 00:00:00', status: 'success', duration: '3m 05s', tablesScanned: 42, queriesAnalyzed: 987 },
    { id: 4, timestamp: '2024-03-14 20:00:00', status: 'success', duration: '3m 10s', tablesScanned: 41, queriesAnalyzed: 1430 },
    { id: 5, timestamp: '2024-03-14 16:00:00', status: 'warning', duration: '4m 32s', tablesScanned: 41, queriesAnalyzed: 1390 },
    { id: 6, timestamp: '2024-03-14 12:00:00', status: 'success', duration: '3m 02s', tablesScanned: 41, queriesAnalyzed: 1256 },
  ];
  
  // Mock data for next scheduled refresh
  const nextRefresh = new Date();
  nextRefresh.setHours(nextRefresh.getHours() + 1);
  
  // Mock data for refresh settings
  const [refreshSettings, setRefreshSettings] = useState({
    interval: '4h',
    dataRetention: '90d',
    refreshTime: '30m',
    refreshPriority: 'medium',
    notifyOnFailure: true,
    autoRetry: true,
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <RefreshCw className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Smart Data Polling & Refresh System</h2>
        </div>
        <p className="text-gray-600 mt-1">
          Intelligent data refresh system that learns from historical job frequencies to optimize polling intervals
        </p>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex px-6">
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'status'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('status')}
          >
            Refresh Status
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'history'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'settings'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Data is up-to-date</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Last successful refresh: <span className="font-medium">35 minutes ago</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Next Scheduled Refresh</h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {nextRefresh.toLocaleTimeString()} ({Math.round((nextRefresh.getTime() - new Date().getTime()) / 60000)} minutes)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <BarChart className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">Data Coverage</h3>
                    <p className="text-sm text-indigo-700 mt-1">
                      <span className="font-medium">1,248</span> queries analyzed in last refresh
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-indigo-900">AI-Optimized Refresh Schedule</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    Our AI has analyzed your BigQuery usage patterns and optimized the refresh schedule:
                  </p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Current Schedule: Every 4 hours</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Based on your query volume (~350 queries/hour) and change frequency, a 4-hour interval 
                        provides optimal balance between data freshness and system overhead.
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Pattern Detection</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Our AI has detected peak usage periods on weekdays between 9am-11am and 1pm-3pm. 
                        During these times, refresh frequency is increased to every 2 hours for more timely insights.
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800">Recommendation</h4>
                      <p className="text-xs text-indigo-700 mt-1">
                        Based on query pattern analysis, enabling more frequent refreshes on Monday mornings 
                        would provide more timely insights for your weekly planning meetings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Refresh Now
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tables Scanned</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Queries Analyzed</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {refreshHistory.map((refresh) => (
                    <tr key={refresh.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refresh.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          refresh.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {refresh.status === 'success' ? 'Success' : 'Warning'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{refresh.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{refresh.tablesScanned}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{refresh.queriesAnalyzed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-900">Refresh Anomaly Detected</h4>
                  <p className="text-sm text-amber-800 mt-1">
                    The refresh at 2024-03-14 16:00:00 took longer than usual (4m 32s vs avg 3m 05s). 
                    This might be due to increased query volume or system load.
                  </p>
                  <p className="text-sm text-amber-800 mt-2">
                    <strong>AI Recommendation:</strong> Consider adjusting your refresh schedule to avoid peak usage times around 4pm on weekdays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Refresh Interval</label>
                <select 
                  value={refreshSettings.interval}
                  onChange={(e) => setRefreshSettings({...refreshSettings, interval: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="1h">Every Hour</option>
                  <option value="2h">Every 2 Hours</option>
                  <option value="4h">Every 4 Hours</option>
                  <option value="6h">Every 6 Hours</option>
                  <option value="12h">Every 12 Hours</option>
                  <option value="24h">Daily</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">How often to refresh data from BigQuery</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention</label>
                <select 
                  value={refreshSettings.dataRetention}
                  onChange={(e) => setRefreshSettings({...refreshSettings, dataRetention: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="30d">30 Days</option>
                  <option value="60d">60 Days</option>
                  <option value="90d">90 Days</option>
                  <option value="180d">180 Days</option>
                  <option value="365d">365 Days</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">How long to keep historical data</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Refresh Time</label>
                <select 
                  value={refreshSettings.refreshTime}
                  onChange={(e) => setRefreshSettings({...refreshSettings, refreshTime: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="15m">15 Minutes</option>
                  <option value="30m">30 Minutes</option>
                  <option value="45m">45 Minutes</option>
                  <option value="60m">60 Minutes</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">Maximum time allowed for each refresh</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Refresh Priority</label>
                <select 
                  value={refreshSettings.refreshPriority}
                  onChange={(e) => setRefreshSettings({...refreshSettings, refreshPriority: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">Priority of refresh jobs</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={refreshSettings.notifyOnFailure}
                  onChange={(e) => setRefreshSettings({...refreshSettings, notifyOnFailure: e.target.checked})}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Notify on refresh failure</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={refreshSettings.autoRetry}
                  onChange={(e) => setRefreshSettings({...refreshSettings, autoRetry: e.target.checked})}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Automatically retry failed refreshes</span>
              </label>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-blue-800">AI-Recommended Settings</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Based on your current usage patterns, our AI recommends a 4-hour refresh interval 
                    with adaptive refreshes during peak hours. This would provide optimal data freshness 
                    while minimizing overhead.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                Cancel
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}