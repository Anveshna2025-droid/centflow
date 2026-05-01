import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MarketContext = createContext();

const initialState = {
  watchlist: [],
  marketTrend: 'bullish', // 'bullish' or 'bearish'
  activeAsset: 'BTC',
};

function marketReducer(state, action) {
  switch (action.type) {
    case 'INIT_WATCHLIST':
      return { ...state, watchlist: action.payload };
    case 'ADD_TO_WATCHLIST':
      if (state.watchlist.includes(action.payload)) return state;
      const newList = [...state.watchlist, action.payload];
      localStorage.setItem('cf_watchlist', JSON.stringify(newList));
      return { ...state, watchlist: newList };
    case 'REMOVE_FROM_WATCHLIST':
      const filteredList = state.watchlist.filter(item => item !== action.payload);
      localStorage.setItem('cf_watchlist', JSON.stringify(filteredList));
      return { ...state, watchlist: filteredList };
    case 'SET_ACTIVE_ASSET':
      return { ...state, activeAsset: action.payload };
    case 'SET_MARKET_TREND':
      return { ...state, marketTrend: action.payload };
    default:
      return state;
  }
}

export const MarketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketReducer, initialState);

  useEffect(() => {
    // Rehydrate watchlist from LocalStorage
    const storedWatchlist = localStorage.getItem('cf_watchlist');
    if (storedWatchlist) {
      dispatch({ type: 'INIT_WATCHLIST', payload: JSON.parse(storedWatchlist) });
    } else {
      // Default watchlist
      const defaultList = ['BTC', 'ETH', 'SOL', 'AAPL', 'TSLA'];
      dispatch({ type: 'INIT_WATCHLIST', payload: defaultList });
      localStorage.setItem('cf_watchlist', JSON.stringify(defaultList));
    }
  }, []);

  return (
    <MarketContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);
