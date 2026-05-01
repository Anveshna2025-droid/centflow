import { useState } from 'react'
import { LayoutGrid, Activity, Star, Bell, Settings } from 'lucide-react'

const NAV = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: Activity,   label: 'Charts'    },
  { icon: Star,       label: 'Watchlist' },
  { icon: Bell,       label: 'Alerts'    },
]

export default function Sidebar() {
  const [active, setActive] = useState(0)

  return (
    <nav className="w-16 bg-cf-surface border-r border-cf-border flex flex-col items-center py-5 gap-2 flex-shrink-0">
      
      {/* Logo */}
      <div className="w-9 h-9 bg-cf-accent rounded-lg flex items-center justify-center text-cf-bg font-syne font-black text-sm mb-5 flex-shrink-0">
        CF
      </div>

      {NAV.map(({ icon: Icon, label }, i) => (
        <button
          key={label}
          onClick={() => setActive(i)}
          title={label}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer border-0 outline-none
            ${active === i
              ? 'bg-[#1a1a2e] text-cf-accent'
              : 'text-cf-muted hover:bg-[#141420] hover:text-[#aaa] bg-transparent'
            }`}
        >
          <Icon size={17} strokeWidth={1.8} />
        </button>
      ))}

      <div className="flex-1" />

      <button
        title="Settings"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-cf-muted hover:bg-[#141420] hover:text-[#aaa] transition-all duration-150 border-0 outline-none cursor-pointer bg-transparent"
      >
        <Settings size={17} strokeWidth={1.8} />
      </button>
    </nav>
  )
}