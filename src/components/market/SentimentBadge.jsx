import { SENTIMENT } from '../../data/mockStocks'

function Pill({ className, children }) {
  return (
    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${className}`}>
      {children}
    </span>
  )
}

export default function SentimentBadge() {
  const { bull, neu, bear, fearGreed, label } = SENTIMENT

  return (
    <div className="bg-cf-surface border border-cf-border rounded-xl p-4 w-44 flex-shrink-0">
      <div className="mb-4">
        <div className="font-syne font-semibold text-[13px] text-cf-text">Sentiment</div>
        <div className="font-mono text-[11px] text-cf-dim mt-0.5">Market today</div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-cf-muted">Bullish</span>
            <Pill className="text-cf-accent border-[rgba(200,241,53,0.3)] bg-[rgba(200,241,53,0.06)]">
              {bull}%
            </Pill>
          </div>
          <div className="h-1.5 rounded bg-[#141420] overflow-hidden flex gap-0.5">
            <div className="bg-cf-accent rounded h-full" style={{ width: `${bull}%` }} />
            <div className="bg-[#444] flex-1" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-cf-muted">Neutral</span>
          <Pill className="text-cf-blue border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.06)]">
            {neu}%
          </Pill>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-cf-muted">Bearish</span>
          <Pill className="text-cf-red border-[rgba(255,95,95,0.3)] bg-[rgba(255,95,95,0.06)]">
            {bear}%
          </Pill>
        </div>

        <div className="mt-1 pt-2 border-t border-[#141420]">
          <div className="font-mono text-[10px] text-cf-dim mb-1">Fear & Greed Index</div>
          <div className="font-mono text-[20px] font-bold text-cf-accent leading-none">
            {fearGreed}{' '}
            <span className="text-[11px] text-cf-muted font-normal">{label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}