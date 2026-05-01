export const TICKERS = [
  { sym: 'AAPL', price: '189.42', chg: '+1.8%', up: true },
  { sym: 'MSFT', price: '412.17', chg: '+0.6%', up: true },
  { sym: 'NVDA', price: '875.30', chg: '+3.2%', up: true },
  { sym: 'TSLA', price: '163.57', chg: '-2.1%', up: false },
  { sym: 'AMZN', price: '182.91', chg: '+1.1%', up: true },
  { sym: 'META', price: '504.23', chg: '+0.9%', up: true },
  { sym: 'GOOGL', price: '172.84', chg: '-0.4%', up: false },
  { sym: 'BRK.B', price: '411.50', chg: '+0.2%', up: true },
]

export const MARKET_STATS = [
  { label: 'S&P 500',   value: '5,248',  chg: '+1.24%',  up: true,  type: 'accent1' },
  { label: 'NASDAQ',    value: '16,390', chg: '+0.87%',  up: true,  type: 'accent2' },
  { label: 'Dow Jones', value: '38,920', chg: '−0.31%',  up: false, type: 'accent3' },
  { label: 'VIX',       value: '18.4',   chg: 'Moderate', up: null, type: 'accent4' },
]

export const MOVERS = [
  { sym: 'NVDA',  name: 'NVIDIA',   chg: '+3.2%', price: '875.30', pct: 0.88, up: true  },
  { sym: 'AAPL',  name: 'Apple',    chg: '+1.8%', price: '189.42', pct: 0.72, up: true  },
  { sym: 'AMZN',  name: 'Amazon',   chg: '+1.1%', price: '182.91', pct: 0.55, up: true  },
  { sym: 'TSLA',  name: 'Tesla',    chg: '-2.1%', price: '163.57', pct: 0.60, up: false },
  { sym: 'GOOGL', name: 'Alphabet', chg: '-0.4%', price: '172.84', pct: 0.25, up: false },
]

export const SECTORS = [
  { s: 'Tech',    v: '+2.1', up: true  },
  { s: 'Semis',   v: '+3.4', up: true  },
  { s: 'Health',  v: '+0.8', up: true  },
  { s: 'Finance', v: '+0.4', up: true  },
  { s: 'Energy',  v: '-1.2', up: false },
  { s: 'Util',    v: '-0.6', up: false },
  { s: 'Cons',    v: '+1.1', up: true  },
]

export const NEWS = [
  { time: '2m ago',  src: 'Reuters',   headline: 'Fed signals pause on rate hikes amid cooling inflation data' },
  { time: '14m ago', src: 'Bloomberg', headline: 'NVIDIA surges after record datacenter revenue beat' },
  { time: '31m ago', src: 'WSJ',       headline: 'Tesla production cut raises supply chain concerns' },
  { time: '1h ago',  src: 'CNBC',      headline: 'S&P 500 nears all-time high on tech-led rally' },
]

export const WATCH_STOCKS = [
  { sym: 'AAPL', price: '$189.42', up: true,  data: [165,170,168,175,178,182,185,189] },
  { sym: 'NVDA', price: '$875.30', up: true,  data: [780,800,795,820,840,855,865,875] },
  { sym: 'TSLA', price: '$163.57', up: false, data: [185,178,172,168,165,162,161,163] },
  { sym: 'META', price: '$504.23', up: true,  data: [480,488,491,496,500,502,503,504] },
  { sym: 'MSFT', price: '$412.17', up: true,  data: [400,405,403,407,409,410,411,412] },
]

export const AAPL_30D = [165,167,164,168,171,170,173,175,172,176,178,177,180,179,182,181,184,183,185,187,185,188,186,189,188,190,189,191,190,189]

export const VOLUME_DATA = {
  labels: ['AAPL','MSFT','NVDA','TSLA','META'],
  today:  [82, 65, 110, 95, 48],
  avg:    [70, 60,  80, 100, 55],
}

export const SENTIMENT = {
  bull: 62,
  neu:  23,
  bear: 15,
  fearGreed: 74,
  label: 'Greed',
}