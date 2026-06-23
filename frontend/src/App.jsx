import React, { useState, useEffect } from 'react';
import { Shield, Map, Activity, Users, Settings, AlertTriangle, Radio, Sun, Moon } from 'lucide-react';
import { io } from 'socket.io-client';
import GISMap from './components/GISMap';
import Analytics from './components/Analytics';
import Patrols from './components/Patrols';
import CyberIntel from './components/CyberIntel';
import SettingsScreen from './components/Settings';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [theme, setTheme] = useState('light');
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, title: 'High Risk Spike: Navrangpura', time: 'Just now', type: 'critical' },
    { id: 2, title: 'Fraud Cluster Detected', time: '2m ago', type: 'warning' },
    { id: 3, title: 'Patrol Unit 4 Rerouted', time: '15m ago', type: 'info' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Connect to Flask WebSocket Backend
  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.on('live_event', (event) => {
      setLiveEvents(prev => [{
        id: Date.now(),
        title: event.title,
        time: 'Just now',
        type: event.type
      }, ...prev].slice(0, 8)); // Keep last 8 events
    });

    return () => socket.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="logo-container">
          <Shield size={32} className="logo-icon" />
          <span className="logo-text">CrimeShield</span>
        </div>
        
        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
            <div className="nav-item-content">
              <Map size={20} />
              <span>GIS Map</span>
            </div>
          </div>
          <div className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <div className="nav-item-content">
              <Activity size={20} />
              <span>Analytics</span>
            </div>
          </div>
          <div className={`nav-item ${activeTab === 'patrol' ? 'active' : ''}`} onClick={() => setActiveTab('patrol')}>
            <div className="nav-item-content">
              <Users size={20} />
              <span>Patrol Routes</span>
            </div>
          </div>
          <div className={`nav-item ${activeTab === 'cyber' ? 'active' : ''}`} onClick={() => setActiveTab('cyber')}>
            <div className="nav-item-content">
              <Radio size={20} />
              <span>Cyber Intelligence</span>
            </div>
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <div className="nav-item-content">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </div>
        </nav>
        
        <div className="nav-item" onClick={toggleTheme} style={{ marginTop: 'auto' }}>
          <div className="nav-item-content">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'map' ? (
          <>
            {/* Top bar */}
            <header className="top-bar glass-panel" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '350px', width: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="text" 
                    placeholder="Ask Claude: 'Show theft hotspots in Navrangpura last week'..." 
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)', 
                      background: 'var(--topbar-input-bg)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-green)' }}></div>
                    <span style={{ fontSize: '0.875rem' }}>System Online</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Map Container */}
            <div className="map-container">
              <GISMap theme={theme} />
            </div>

            {/* KPI Cards */}
            <div className="kpi-cards">
              <div className="kpi-card glass-panel">
                <div className="kpi-icon alerts">
                  <AlertTriangle size={24} />
                </div>
                <div className="kpi-info">
                  <h3>Active Alerts</h3>
                  <p>12</p>
                </div>
              </div>
              <div className="kpi-card glass-panel">
                <div className="kpi-icon patrol">
                  <Users size={24} />
                </div>
                <div className="kpi-info">
                  <h3>Active Patrols</h3>
                  <p>48 units</p>
                </div>
              </div>
              <div className="kpi-card glass-panel">
                <div className="kpi-icon cyber">
                  <Radio size={24} />
                </div>
                <div className="kpi-info">
                  <h3>Cyber Clusters</h3>
                  <p>5 zones</p>
                </div>
              </div>
              <div className="kpi-card glass-panel">
                <div className="kpi-icon crimes">
                  <Activity size={24} />
                </div>
                <div className="kpi-info">
                  <h3>Predicted Risk</h3>
                  <p>High</p>
                </div>
              </div>
            </div>

            {/* Live Feed Panel */}
            <aside className="live-feed-panel glass-panel">
              <div className="panel-header">
                <h2>Live Intelligence <div className="live-dot"></div></h2>
              </div>
              <div className="feed-list">
                {liveEvents.map(event => (
                  <div key={event.id} className={`feed-item ${event.type}`}>
                    <div className="feed-item-header">
                      <span>{event.time}</span>
                    </div>
                    <div className="feed-item-title">{event.title}</div>
                  </div>
                ))}
              </div>
            </aside>
          </>
        ) : (
          <div style={{ padding: '1.5rem', width: '100%', height: '100%', overflowY: 'auto', pointerEvents: 'auto' }}>
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'patrol' && <Patrols />}
            {activeTab === 'cyber' && <CyberIntel />}
            {activeTab === 'settings' && <SettingsScreen />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
