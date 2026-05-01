import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './store/ThemeContext';
import { AuthProvider } from './store/AuthContext';
import { MarketProvider } from './store/MarketContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

import Watchlist from './pages/Watchlist';

import { NotificationProvider } from './store/NotificationContext';

import Portfolio from './pages/Portfolio';
import Markets from './pages/Markets';
import Settings from './pages/Settings';
import AssetDetail from './pages/AssetDetail';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <MarketProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
              
                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="watchlist" element={<Watchlist />} />
                    <Route path="markets" element={<Markets />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="asset/:symbol" element={<AssetDetail />} />
                  </Route>
                </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </MarketProvider>
      </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
