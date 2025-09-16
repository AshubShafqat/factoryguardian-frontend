import { useState, useEffect } from 'react';
import usePolling from '../hooks/usePolling'
import MachineCard from '../components/MachineCard'
import AlertPanel from '../components/AlertPanel'
import { translations } from '../translations'
import { BuildingFactoryIcon } from '@heroicons/react/24/solid'

export default function Home() {
  const data = usePolling('/mock.json', 5000) || { machines: [], alerts: [] };
  const [lang, setLang] = useState('en');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [footerState, setFooterState] = useState('normal'); // normal | warning | critical
  const [alertSummary, setAlertSummary] = useState({ total: 0, critical: 0, warning: 0 });

  // Update timestamp, footer state, and alert counts when new data arrives
  useEffect(() => {
    if (data.machines.length || data.alerts.length) {
      setLastUpdated(new Date().toLocaleTimeString());

      // machine status → decide footer color
      const maxScore = Math.max(...data.machines.map(m => m.risk_score), 0);
      if (maxScore >= 80) {
        setFooterState('critical');
      } else if (maxScore >= 50) {
        setFooterState('warning');
      } else {
        setFooterState('normal');
      }

      // alert summary
      const total = data.alerts.length;
      const critical = data.alerts.filter(a => a.risk_score >= 80).length;
      const warning = data.alerts.filter(a => a.risk_score >= 50 && a.risk_score < 80).length;

      setAlertSummary({ total, critical, warning });
    }
  }, [data]);

  const footerClasses = {
    normal: 'bg-gray-200 text-gray-700',
    warning: 'bg-yellow-400 text-black',
    critical: 'bg-red-600 text-white font-bold flash-footer',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Bar */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <BuildingFactoryIcon className="h-7 w-7 text-white" />
            <h1 className="text-xl font-bold">FactoryGuardian</h1>
          </div>

          {/* Language Switch */}
          <div>
            <button
              onClick={() => setLang('en')}
              className="px-3 py-1 border rounded bg-white text-blue-600 hover:bg-gray-100"
            >
              EN
            </button>
            <button
              onClick={() => setLang('ur')}
              className="ml-2 px-3 py-1 border rounded bg-white text-blue-600 hover:bg-gray-100"
            >
              UR
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Layout */}
          <div className="grid grid-cols-4 gap-6">
            {/* Machine Grid */}
            <div className="col-span-3 grid grid-cols-2 gap-4">
              {data.machines.map((m) => (
                <MachineCard key={m.id} machine={m} />
              ))}
            </div>

            {/* Alerts */}
            <div className="col-span-1">
              <h3 className="font-semibold mb-2">{translations[lang].alerts}</h3>
              <AlertPanel alerts={data.alerts} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${footerClasses[footerState]} p-3 text-sm text-center`}>
        Last Updated: {lastUpdated || 'Fetching...'} | Alerts: {alertSummary.total} total 
        {alertSummary.critical > 0 && `, ${alertSummary.critical} critical`}
        {alertSummary.warning > 0 && `, ${alertSummary.warning} warning`}
      </footer>
    </div>
  )
}
