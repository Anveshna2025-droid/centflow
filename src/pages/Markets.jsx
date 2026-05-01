import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Markets = () => {
  const navigate = useNavigate();
  const movers = [
    { symbol: 'NVDA', name: 'Nvidia Corp', price: '$850.20', change: '+12.4%', isPositive: true, volume: '45.2M' },
    { symbol: 'AMD', name: 'Advanced Micro', price: '$180.50', change: '+8.1%', isPositive: true, volume: '32.1M' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: '$205.10', change: '-5.2%', isPositive: false, volume: '28.9M' },
    { symbol: 'META', name: 'Meta Platforms', price: '$490.80', change: '+4.2%', isPositive: true, volume: '18.5M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: '$145.30', change: '-1.5%', isPositive: false, volume: '22.0M' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-up pb-8">
      <div className="mb-8">
        <h1 className="text-4xl font-syne font-bold text-cf-text mb-2">Market Overview</h1>
        <p className="text-cf-muted">Global trends, sectors, and top movers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Movers */}
        <Card className="lg:col-span-2">
           <div className="flex items-center gap-2 mb-6">
             <Activity className="w-5 h-5 text-cf-accent" />
             <h3 className="font-bold text-cf-muted tracking-wider uppercase text-sm">Top Movers (Today)</h3>
           </div>
           
           <div className="space-y-4">
             {movers.map((m, i) => (
               <div 
                  key={i} 
                  onClick={() => navigate(`/asset/${m.symbol}`)}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-cf-hover border border-transparent hover:border-cf-border transition-all cursor-pointer"
                >
                 <div className="flex gap-4 items-center w-1/3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${m.isPositive ? 'bg-cf-green/10 text-cf-green' : 'bg-cf-red/10 text-cf-red'}`}>
                      {m.isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-cf-text">{m.symbol}</p>
                      <p className="text-xs text-cf-muted truncate">{m.name}</p>
                    </div>
                 </div>
                 
                 <div className="w-1/3 text-center">
                   <p className="font-mono text-cf-text">{m.price}</p>
                   <p className="text-xs text-cf-muted">Vol: {m.volume}</p>
                 </div>

                 <div className="w-1/3 text-right">
                    <span className={`px-2 py-1 rounded text-sm font-bold ${m.isPositive ? 'text-cf-green' : 'text-cf-red'}`}>
                      {m.change}
                    </span>
                 </div>
               </div>
             ))}
           </div>
        </Card>

        {/* Sectors */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-cf-muted tracking-wider uppercase mb-4 text-sm">Sector Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cf-text">Technology</span>
                <span className="text-cf-green font-bold">+2.4%</span>
              </div>
              <div className="w-full bg-cf-hover h-2 rounded-full overflow-hidden">
                <div className="bg-cf-green h-full" style={{ width: '70%' }}></div>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-cf-text">Healthcare</span>
                <span className="text-cf-green font-bold">+0.8%</span>
              </div>
              <div className="w-full bg-cf-hover h-2 rounded-full overflow-hidden">
                <div className="bg-cf-green h-full" style={{ width: '40%' }}></div>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-cf-text">Energy</span>
                <span className="text-cf-red font-bold">-1.2%</span>
              </div>
              <div className="w-full bg-cf-hover h-2 rounded-full overflow-hidden flex justify-end">
                <div className="bg-cf-red h-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Markets;
