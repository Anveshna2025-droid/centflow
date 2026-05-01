import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import LiveCandlestick from '../components/LiveCandlestick';
import { ArrowLeft, Star, Activity, Info } from 'lucide-react';
import { useMarket } from '../store/MarketContext';
import { useNotification } from '../store/NotificationContext';

const AssetDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useMarket();
  const { addNotification } = useNotification();
  
  const formattedSymbol = symbol ? symbol.toUpperCase() : 'BTCUSDT';
  const displaySymbol = formattedSymbol.replace('USDT', '');
  
  const [ticker24h, setTicker24h] = useState(null);
  
  // Try to fetch 24h stats for Binance pairs, otherwise use mock
  useEffect(() => {
    const fetch24hStats = async () => {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${formattedSymbol.includes('USDT') ? formattedSymbol : formattedSymbol + 'USDT'}`);
        if (res.ok) {
          const data = await res.json();
          setTicker24h(data);
        } else {
          // Mock data for non-crypto
          setTicker24h({
            highPrice: (Math.random() * 500 + 100).toFixed(2),
            lowPrice: (Math.random() * 400 + 50).toFixed(2),
            volume: (Math.random() * 1000000).toFixed(0),
            quoteVolume: (Math.random() * 50000000).toFixed(0),
          });
        }
      } catch (e) {
        console.log("Using mock stats");
      }
    };
    fetch24hStats();
  }, [formattedSymbol]);

  const isWatched = state.watchlist.includes(displaySymbol);

  const toggleWatchlist = () => {
    if (isWatched) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: displaySymbol });
      addNotification(`Removed ${displaySymbol} from watchlist.`, 'error');
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: displaySymbol });
      addNotification(`Added ${displaySymbol} to watchlist.`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-up pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-cf-surface border border-cf-border hover:border-cf-accent text-cf-muted hover:text-cf-text transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-syne font-bold text-cf-text">{displaySymbol}</h1>
              <span className="px-2 py-1 bg-cf-accent/10 text-cf-accent text-xs font-bold rounded">LIVE</span>
            </div>
            <p className="text-cf-muted">Detailed asset overview and live performance.</p>
          </div>
        </div>
        
        <button 
          onClick={toggleWatchlist}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            isWatched 
              ? 'bg-cf-surface border border-cf-accent text-cf-accent' 
              : 'bg-cf-accent text-white hover:shadow-glow'
          }`}
        >
          <Star className={`w-5 h-5 ${isWatched ? 'fill-current' : ''}`} />
          {isWatched ? 'Watching' : 'Add to Watchlist'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Chart */}
        <Card className="lg:col-span-3 min-h-[500px]">
          <LiveCandlestick 
            symbol={formattedSymbol.includes('USDT') ? formattedSymbol.toLowerCase() : formattedSymbol.toLowerCase() + 'usdt'} 
            title={`${displaySymbol} / USDT`} 
          />
        </Card>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-cf-muted uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> 24h Statistics
            </h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-cf-border/50">
                <p className="text-xs text-cf-muted mb-1">24h High</p>
                <p className="text-xl font-mono text-cf-text font-bold">
                  ${ticker24h ? parseFloat(ticker24h.highPrice).toLocaleString(undefined, {minimumFractionDigits: 2}) : '---'}
                </p>
              </div>
              
              <div className="pb-4 border-b border-cf-border/50">
                <p className="text-xs text-cf-muted mb-1">24h Low</p>
                <p className="text-xl font-mono text-cf-text font-bold">
                  ${ticker24h ? parseFloat(ticker24h.lowPrice).toLocaleString(undefined, {minimumFractionDigits: 2}) : '---'}
                </p>
              </div>
              
              <div className="pb-4 border-b border-cf-border/50">
                <p className="text-xs text-cf-muted mb-1">24h Volume ({displaySymbol})</p>
                <p className="text-lg font-mono text-cf-text">
                  {ticker24h ? parseFloat(ticker24h.volume).toLocaleString(undefined, {maximumFractionDigits: 0}) : '---'}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-cf-muted mb-1">24h Volume (USDT)</p>
                <p className="text-lg font-mono text-cf-text">
                  ${ticker24h ? parseFloat(ticker24h.quoteVolume).toLocaleString(undefined, {maximumFractionDigits: 0}) : '---'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-cf-accent/5 border-cf-accent/20">
            <h3 className="text-sm font-bold text-cf-accent uppercase tracking-wider mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" /> Note
            </h3>
            <p className="text-sm text-cf-muted">
              Live WebSocket data is fetched directly from Binance. Non-crypto symbols will attempt to map to their closest USDT pair for demonstration purposes.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default AssetDetail;
