import React from 'react';
import Card from '../components/Card';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '../store/ThemeContext';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Portfolio = () => {
  const { theme } = useTheme();

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['Apple (AAPL)', 'Tesla (TSLA)', 'Bitcoin (BTC)', 'Cash (USD)'],
    colors: ['#4f46e5', '#ef4444', '#f59e0b', '#10b981'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: { color: theme === 'dark' ? '#a1a1aa' : '#64748b' },
            value: { color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontWeight: 'bold' },
            total: {
              show: true,
              label: 'Total Value',
              color: theme === 'dark' ? '#a1a1aa' : '#64748b',
              formatter: function (w) {
                return '$' + w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString();
              }
            }
          }
        }
      }
    },
    stroke: { show: true, colors: [theme === 'dark' ? '#121217' : '#ffffff'], width: 2 },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', labels: { colors: theme === 'dark' ? '#f8fafc' : '#0f172a' } },
    theme: { mode: theme }
  };

  const donutSeries = [45000, 23000, 85000, 12000];

  const holdings = [
    { asset: 'Bitcoin', symbol: 'BTC', amount: '1.24', value: '$85,000', change: '+4.5%', isPositive: true },
    { asset: 'Apple', symbol: 'AAPL', amount: '250', value: '$45,000', change: '-1.2%', isPositive: false },
    { asset: 'Tesla', symbol: 'TSLA', amount: '110', value: '$23,000', change: '+2.1%', isPositive: true },
    { asset: 'US Dollar', symbol: 'USD', amount: '12,000', value: '$12,000', change: '0.0%', isPositive: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-syne font-bold text-cf-text mb-2">Portfolio</h1>
          <p className="text-cf-muted">Overview of your current asset allocation.</p>
        </div>
        <button className="bg-cf-accent text-white px-4 py-2 rounded-lg font-bold hover:shadow-glow transition-all flex items-center gap-2">
          <Wallet className="w-5 h-5" /> Deposit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Allocation Chart */}
        <Card className="flex flex-col items-center justify-center">
          <h3 className="w-full text-left font-bold text-cf-muted tracking-wider uppercase mb-6 text-sm">Asset Allocation</h3>
          <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={320} width="100%" />
        </Card>

        {/* Holdings Table */}
        <Card className="lg:col-span-2 overflow-x-auto">
           <h3 className="font-bold text-cf-muted tracking-wider uppercase mb-6 text-sm">Your Holdings</h3>
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-cf-border">
                 <th className="py-3 px-4 text-xs font-semibold text-cf-muted">Asset</th>
                 <th className="py-3 px-4 text-xs font-semibold text-cf-muted">Amount</th>
                 <th className="py-3 px-4 text-xs font-semibold text-cf-muted">Total Value</th>
                 <th className="py-3 px-4 text-xs font-semibold text-cf-muted text-right">24h Change</th>
               </tr>
             </thead>
             <tbody>
               {holdings.map((h, i) => (
                 <tr key={i} className="border-b border-cf-border/50 hover:bg-cf-hover/50 transition-colors">
                   <td className="py-4 px-4">
                     <p className="font-bold text-cf-text">{h.asset}</p>
                     <p className="text-xs text-cf-muted">{h.symbol}</p>
                   </td>
                   <td className="py-4 px-4 font-mono text-cf-text">{h.amount}</td>
                   <td className="py-4 px-4 font-mono font-bold text-cf-text">{h.value}</td>
                   <td className="py-4 px-4 text-right flex items-center justify-end gap-1">
                     <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${h.isPositive ? 'bg-cf-green/10 text-cf-green' : 'bg-cf-red/10 text-cf-red'}`}>
                       {h.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                       {h.change}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </Card>

      </div>
    </div>
  );
};

export default Portfolio;
