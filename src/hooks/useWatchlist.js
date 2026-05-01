import { useState, useEffect } from 'react'
import { WATCH_STOCKS } from '../data/mockStocks'

const STORAGE_KEY = 'centflow_watchlist'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : WATCH_STOCKS
    } catch {
      return WATCH_STOCKS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  const addTicker = (ticker) => {
    if (!watchlist.find(w => w.sym === ticker.sym)) {
      setWatchlist(prev => [...prev, ticker])
    }
  }

  const removeTicker = (sym) => {
    setWatchlist(prev => prev.filter(w => w.sym !== sym))
  }

  return { watchlist, addTicker, removeTicker }
}