import { MARKET_STATS } from '../../data/mockStocks'

const accentMap = {
  accent1: 'before:bg-cf-accent',
  accent2: 'before:bg-cf-blue',
  accent3: 'before:bg-cf-amber',
  accent4: 'before:bg-cf-red',
}

export default function MarketOverview() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {MARKET_STATS.map((stat) => (
        <div
          key={stat.label}
          className={`
            bg-cf-surface border border-cf-border rounded-xl p-4 relative overflow-hidden
            hover:border-[#2e2e4e] transition-colors duration-200 cursor-default
            before:content-[''] before:absolute before:top-0 before:right-0
            before:w-14 before:h-14 before:rounded-full before:opacity-[0.06]
            ${accentMap[stat.type]}
          `}
        >
          <div className="font-mono text-[11px] text-cf-muted uppercase tracking-widest mb-2">
            {stat.label}
          </div>
          <div className="font-mono text-[22px] font-bold text-cf-text tracking-tight mb-1.5">
            {stat.value}
          </div>
          <span
            className={`
              font-mono text-[11px] px-1.5 py-0.5 rounded inline-block
              ${stat.up === true  ? 'bg-[rgba(200,241,53,0.12)] text-cf-accent' : ''}
              ${stat.up === false ? 'bg-[rgba(255,95,95,0.12)]  text-cf-red'   : ''}
              ${stat.up === null  ? 'bg-[rgba(96,165,250,0.12)] text-cf-blue'  : ''}
            `}
          >
            {stat.chg}
          </span>
        </div>
      ))}
    </div>
  )
}