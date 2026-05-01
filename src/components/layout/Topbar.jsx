import { TICKERS } from '../../data/mockStocks'

export default function Topbar() {
  return (
    <header className="h-14 bg-cf-surface border-b border-cf-border flex items-center px-5 gap-4 flex-shrink-0">
      
      {/* Live dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-cf-accent live-dot flex-shrink-0" />

      <span className="font-syne font-bold text-[15px] text-cf-text tracking-tight flex-shrink-0">
        Markets
      </span>

      {/* Ticker strip */}
      <div
        className="flex-1 flex gap-5 overflow-hidden items-center"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        {[...TICKERS, ...TICKERS].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 flex-shrink-0 font-mono text-xs whitespace-nowrap"
          >
            <span className="text-cf-muted font-medium">{t.sym}</span>
            <span className="text-cf-text">{t.price}</span>
            <span className={t.up ? 'text-cf-accent' : 'text-cf-red'}>{t.chg}</span>
          </div>
        ))}
      </div>

      <span className="font-mono text-[11px] text-cf-dim flex-shrink-0">
        NYSE · Apr 28
      </span>
    </header>
  )
}