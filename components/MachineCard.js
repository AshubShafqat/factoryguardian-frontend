import { Cog6ToothIcon, FireIcon, BoltIcon } from '@heroicons/react/24/solid'

export default function MachineCard({ machine }) {
  const score = machine.risk_score ?? 0;

  const getStatus = (s) => {
    if (s >= 80) return { color: 'bg-red-500', pulse: 'pulse-red' };
    if (s >= 50) return { color: 'bg-yellow-400', pulse: 'pulse-yellow' };
    return { color: 'bg-green-500', pulse: 'pulse-green' };
  };

  const { color, pulse } = getStatus(score);

  const getIcon = (name) => {
    if (name.toLowerCase().includes('boiler'))
      return <FireIcon className="h-6 w-6 text-red-500" />;
    if (name.toLowerCase().includes('conveyor'))
      return <BoltIcon className="h-6 w-6 text-yellow-500" />;
    return <Cog6ToothIcon className="h-6 w-6 text-gray-600" />;
  };

  return (
    <div className="p-4 border rounded shadow-sm flex items-center justify-between bg-white hover:shadow-md transition">
      <div className="flex items-center space-x-3">
        {getIcon(machine.name)}
        <div>
          <div className="font-semibold">{machine.name}</div>
          <div className="text-sm text-gray-500">Score: {score}</div>
        </div>
      </div>
      <div className={`w-5 h-5 rounded-full ${color} ${pulse}`} />
    </div>
  );
}
