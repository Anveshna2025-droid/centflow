import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '../store/ThemeContext';

const LiveCandlestick = ({ symbol = 'BTCUSDT', title }) => {
  const { theme } = useTheme();
  const [series, setSeries] = useState([
    { name: 'Price', type: 'candlestick', data: [] },
    { name: 'Volume', type: 'bar', data: [] }
  ]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1m');
  const ws = useRef(null);
  const mockInterval = useRef(null);

  const displayTitle = title || symbol;
  const isCrypto = symbol.toUpperCase().includes('USDT') || symbol.toUpperCase().includes('BTC');

  // Pseudo-random hash for deterministic base price
  const getBasePrice = (sym) => {
    let hash = 0;
    for (let i = 0; i < sym.length; i++) hash = sym.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash % 1000) + 50; 
  };

  const generateMockData = (basePrice, tf) => {
    let candleData = [];
    let volumeData = [];
    let timeStep = tf === '1m' ? 60000 : tf === '1h' ? 3600000 : 86400000;
    let time = Date.now() - (60 * timeStep);
    let price = basePrice;
    
    for (let i = 0; i < 60; i++) {
      let volatility = price * 0.005; 
      let open = price;
      let high = price + Math.random() * volatility;
      let low = price - Math.random() * volatility;
      let close = low + Math.random() * (high - low);
      let volume = Math.floor(Math.random() * 5000) + 1000;
      
      candleData.push({ x: new Date(time), y: [open, high, low, close] });
      volumeData.push({ x: new Date(time), y: volume });
      
      price = close;
      time += timeStep;
    }
    return { candleData, volumeData, lastPrice: price, firstPrice: candleData[0].y[0] };
  };

  useEffect(() => {
    setIsLoading(true);
    if (ws.current) ws.current.close();
    if (mockInterval.current) clearInterval(mockInterval.current);

    if (isCrypto) {
      // Real Binance Fetch
      const fetchHistory = async () => {
        try {
          const apiInterval = timeframe === '1m' ? '1m' : timeframe === '1h' ? '1h' : '1d';
          const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${apiInterval}&limit=60`);
          if (!response.ok) throw new Error("API failed");
          const data = await response.json();
          
          let candleData = [];
          let volumeData = [];
          
          data.forEach(kline => {
            const time = new Date(kline[0]);
            candleData.push({ x: time, y: [parseFloat(kline[1]), parseFloat(kline[2]), parseFloat(kline[3]), parseFloat(kline[4])] });
            volumeData.push({ x: time, y: parseFloat(kline[5]) });
          });

          setSeries([{ name: 'Price', type: 'candlestick', data: candleData }, { name: 'Volume', type: 'bar', data: volumeData }]);
          
          const lastClose = parseFloat(data[data.length - 1][4]);
          const lastOpen = parseFloat(data[data.length - 1][1]);
          setCurrentPrice(lastClose);
          setPriceChange(((lastClose - lastOpen) / lastOpen) * 100);
          setIsLoading(false);
          startBinanceSocket();
        } catch (error) {
          console.error("Falling back to mock data");
          startMockEngine();
        }
      };
      fetchHistory();
    } else {
      startMockEngine();
    }

    return () => {
      if (ws.current) ws.current.close();
      if (mockInterval.current) clearInterval(mockInterval.current);
    };
  }, [symbol, timeframe]);

  const startBinanceSocket = () => {
    if (timeframe !== '1m') return; // Websocket stream best for 1m
    ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;
      const newCandle = { x: new Date(kline.t), y: [parseFloat(kline.o), parseFloat(kline.h), parseFloat(kline.l), parseFloat(kline.c)] };
      const newVolume = { x: new Date(kline.t), y: parseFloat(kline.v) };

      updateChartState(newCandle, newVolume, parseFloat(kline.o), parseFloat(kline.c));
    };
  };

  const startMockEngine = () => {
    const basePrice = getBasePrice(symbol);
    const { candleData, volumeData, lastPrice, firstPrice } = generateMockData(basePrice, timeframe);
    
    setSeries([{ name: 'Price', type: 'candlestick', data: candleData }, { name: 'Volume', type: 'bar', data: volumeData }]);
    setCurrentPrice(lastPrice);
    setPriceChange(((lastPrice - firstPrice) / firstPrice) * 100);
    setIsLoading(false);

    if (timeframe === '1m') {
      let currentMockPrice = lastPrice;
      let lastTime = candleData[candleData.length - 1].x.getTime();
      
      mockInterval.current = setInterval(() => {
        const now = Date.now();
        // Start a new candle every 60s, otherwise update current
        if (now - lastTime >= 60000) lastTime = now;
        
        let volatility = currentMockPrice * 0.001;
        let diff = (Math.random() - 0.48) * volatility; // slight upward bias
        currentMockPrice += diff;

        const newCandle = { x: new Date(lastTime), y: [candleData[candleData.length-1].y[0], Math.max(candleData[candleData.length-1].y[1], currentMockPrice), Math.min(candleData[candleData.length-1].y[2], currentMockPrice), currentMockPrice] };
        const newVolume = { x: new Date(lastTime), y: volumeData[volumeData.length-1].y + Math.random() * 100 };

        updateChartState(newCandle, newVolume, candleData[0].y[0], currentMockPrice);
      }, 1500);
    }
  };

  const updateChartState = (newCandle, newVolume, openPrice, closePrice) => {
    setCurrentPrice(closePrice);
    setPriceChange(((closePrice - openPrice) / openPrice) * 100);

    setSeries((prevSeries) => {
      if (prevSeries[0].data.length === 0) return prevSeries;
      let candleData = [...prevSeries[0].data];
      let volumeData = [...prevSeries[1].data];
      
      if (candleData[candleData.length - 1].x.getTime() === newCandle.x.getTime()) {
        candleData[candleData.length - 1] = newCandle;
        volumeData[volumeData.length - 1] = newVolume;
      } else {
        candleData.push(newCandle);
        volumeData.push(newVolume);
        if (candleData.length > 60) { candleData.shift(); volumeData.shift(); }
      }
      return [{ name: 'Price', type: 'candlestick', data: candleData }, { name: 'Volume', type: 'bar', data: volumeData }];
    });
  };

  const options = {
    chart: { height: 450, background: 'transparent', toolbar: { show: false }, animations: { enabled: false } },
    title: { text: displayTitle, align: 'left', style: { color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontFamily: 'Syne', fontWeight: 700 } },
    xaxis: { type: 'datetime', labels: { style: { colors: theme === 'dark' ? '#a1a1aa' : '#64748b' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: [
      { seriesName: 'Price', tooltip: { enabled: true }, labels: { style: { colors: theme === 'dark' ? '#a1a1aa' : '#64748b' }, formatter: (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` } },
      { seriesName: 'Volume', opposite: true, show: false, max: (max) => max * 4 }
    ],
    grid: { borderColor: theme === 'dark' ? '#334155' : '#cbd5e1', strokeDashArray: 3 },
    plotOptions: { candlestick: { colors: { upward: '#10b981', downward: '#ef4444' }, wick: { useFillColor: true } }, bar: { columnWidth: '80%', colors: { ranges: [{ from: 0, to: 1000000000, color: theme === 'dark' ? '#f9731620' : '#ea580c20' }] } } },
    stroke: { width: [2, 0] },
    theme: { mode: theme }
  };

  if (isLoading) return <div className="w-full h-[450px] flex items-center justify-center text-cf-muted">Loading market data for {displayTitle}...</div>;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-4 px-2">
        <div>
          <p className="text-3xl font-syne font-bold text-cf-text">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className={`text-sm font-medium ${priceChange >= 0 ? 'text-cf-green' : 'text-cf-red'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% ({timeframe})
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex bg-cf-surface border border-cf-border rounded-lg p-1">
            {['1m', '1h', '1d'].map(tf => (
              <button 
                key={tf} 
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-bold rounded ${timeframe === tf ? 'bg-cf-accent text-white shadow-glow' : 'text-cf-muted hover:text-cf-text'}`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
          {timeframe === '1m' && (
            <div className="flex items-center gap-2 mt-1">
              <span className="live-dot w-2 h-2 rounded-full bg-cf-green"></span>
              <span className="text-xs text-cf-muted uppercase tracking-wider">{isCrypto ? 'Live WebSocket' : 'Live Mock Engine'}</span>
            </div>
          )}
        </div>
      </div>
      <div className="-ml-2">
        <ReactApexChart options={options} series={series} type="line" height={400} />
      </div>
    </div>
  );
};

export default LiveCandlestick;
