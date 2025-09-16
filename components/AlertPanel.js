import { useEffect, useRef } from 'react'
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

export default function AlertPanel({ alerts = [] }) {
  const spokenRef = useRef(new Set()) // track already spoken alerts

  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  }

  // Auto-speak critical alerts
  useEffect(() => {
    alerts.forEach((a) => {
      if (a.risk_score >= 80 && !spokenRef.current.has(a.id)) {
        speak(`${a.message}. Score ${a.risk_score}`);
        spokenRef.current.add(a.id);
      }
    });
  }, [alerts]);

  const getIcon = (score) => {
    if (score >= 80) {
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    }
    return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="p-4 border rounded h-full bg-white">
      <h3 className="font-semibold mb-2">Recent Alerts</h3>
      <div className="space-y-3 overflow-auto max-h-[40vh]">
        {alerts.slice(0, 5).map((a) => (
          <div
            key={a.id}
            className={`p-2 bg-gray-50 rounded flex items-start justify-between border-2 ${
              a.risk_score >= 80 ? 'flash-critical' : 'border-transparent'
            }`}
          >
            {/* Icon + Message */}
            <div className="flex items-start space-x-2">
              {getIcon(a.risk_score)}
              <div>
                <div className="text-sm font-medium">{a.message}</div>
                <div className="text-xs text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </div>
                <div className="text-xs">Score: {a.risk_score}</div>
              </div>
            </div>

            {/* Manual Play Button */}
            <button
              onClick={() => speak(`${a.message}. Score ${a.risk_score}`)}
              className="px-2 py-1 text-xs border rounded bg-blue-100 hover:bg-blue-200"
            >
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
