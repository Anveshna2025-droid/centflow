import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import LiveCandlestick from '../components/LiveCandlestick';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '../store/ThemeContext';
import { useMarket } from '../store/MarketContext';
import { Activity, ShieldAlert, Zap, TrendingUp, TrendingDown } from 'lucide-react';

const SuggestedAsset = ({ symbol, name, price, change, isPositive }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/asset/${symbol}`)}
      className="flex-shrink-0 w-48 bg-cf-surface border border-cf-border hover:border-cf-accent rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-glow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-cf-text">{symbol}</h4>
          <p className="text-xs text-cf-muted truncate">{name}</p>
        </div>
        <div className={`p-1 rounded ${isPositive ? 'bg-cf-green/10 text-cf-green' : 'bg-cf-red/10 text-cf-red'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-mono text-cf-text">{price}</p>
        <p className={`text-sm font-bold ${isPositive ? 'text-cf-green' : 'text-cf-red'}`}>{change}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { theme } = useTheme();
  const { state } = useMarket();
  const navigate = useNavigate();

  // Sentiment Gauge options
  const sentimentOptions = {
    chart: { type: 'radialBar', height: 250, background: 'transparent' },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '60%', background: 'transparent' },
        track: { background: theme === 'dark' ? '#334155' : '#e2e8f0', strokeWidth: '100%' },
        dataLabels: {
          name: { offsetY: 20, color: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: '12px' },
          value: { offsetY: -10, color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontSize: '24px', fontWeight: 'bold' }
        }
      }
    },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'horizontal', gradientToColors: ['#10b981'], stops: [0, 100] } },
    stroke: { lineCap: 'round' },
    labels: ['Sentiment'],
    colors: ['#ef4444'], // Red to Green gradient
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-up pb-8">
      
      {/* Top Ticker Marquee */}
      <div className="w-full bg-cf-surface border border-cf-border rounded-xl p-3 flex overflow-hidden whitespace-nowrap shadow-sm">
        <div className="animate-[slide-in_20s_linear_infinite] inline-block font-mono text-sm">
          <span className="mx-4"><span className="text-cf-muted">SPY</span> <span className="text-cf-text font-bold">512.45</span> <span className="text-cf-green">+0.4%</span></span>
          <span className="mx-4"><span className="text-cf-muted">QQQ</span> <span className="text-cf-text font-bold">445.10</span> <span className="text-cf-green">+0.7%</span></span>
          <span className="mx-4"><span className="text-cf-muted">AAPL</span> <span className="text-cf-text font-bold">178.90</span> <span className="text-cf-red">-1.2%</span></span>
          <span className="mx-4"><span className="text-cf-muted">TSLA</span> <span className="text-cf-text font-bold">205.60</span> <span className="text-cf-green">+2.1%</span></span>
          <span className="mx-4"><span className="text-cf-muted">BTC</span> <span className="text-cf-text font-bold">64,230</span> <span className="text-cf-green">+4.5%</span></span>
        </div>
      </div>

      {/* Suggested Stocks Carousel */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4">
          <SuggestedAsset symbol="NVDA" name="NVIDIA Corp" price="$850.20" change="+4.2%" isPositive={true} />
          <SuggestedAsset symbol="AMD" name="Adv. Micro Devices" price="$180.50" change="+2.1%" isPositive={true} />
          <SuggestedAsset symbol="ETH" name="Ethereum" price="$3,450.00" change="-1.5%" isPositive={false} />
          <SuggestedAsset symbol="PLTR" name="Palantir Tech" price="$24.10" change="+8.4%" isPositive={true} />
          <SuggestedAsset symbol="SOL" name="Solana" price="$145.20" change="+12.0%" isPositive={true} />
          <SuggestedAsset symbol="MSFT" name="Microsoft" price="$420.10" change="-0.5%" isPositive={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Live Chart Area */}
        <Card className="lg:col-span-3 min-h-[450px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-syne font-bold text-cf-text flex items-center gap-2">
              <Activity className="w-5 h-5 text-cf-accent" />
              Markets (Live)
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold rounded bg-cf-hover text-cf-text hover:bg-cf-accent hover:text-white transition-colors">BTC/USDT</button>
              <button className="px-3 py-1 text-xs font-bold rounded border border-cf-border text-cf-muted hover:text-cf-text transition-colors">ETH/USDT</button>
            </div>
          </div>
          
          <LiveCandlestick symbol="btcusdt" title="Bitcoin" />
        </Card>

        {/* Market Sentiment & Side widgets */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-cf-muted uppercase tracking-wider mb-2">Market Sentiment</h3>
            <div className="-mt-4 -mb-4">
              <ReactApexChart options={sentimentOptions} series={[78]} type="radialBar" height={250} />
            </div>
            <p className="text-center font-bold text-cf-green text-lg">Extreme Greed</p>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-cf-muted uppercase tracking-wider mb-4">Your Watchlist</h3>
            <div className="space-y-3">
              {state.watchlist.slice(0, 4).map((symbol) => (
                <div 
                  key={symbol} 
                  onClick={() => navigate(`/asset/${symbol}`)}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-cf-hover transition-colors cursor-pointer"
                >
                  <span className="font-bold text-cf-text">{symbol}</span>
                  <span className="text-sm text-cf-green flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Live
                  </span>
                </div>
              ))}
              {state.watchlist.length === 0 && (
                 <p className="text-sm text-cf-muted text-center py-4">Watchlist is empty</p>
              )}
              <button className="w-full text-xs text-cf-accent hover:underline text-center block pt-2">View Full Watchlist →</button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
