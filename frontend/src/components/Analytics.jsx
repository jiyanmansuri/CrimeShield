import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [zoneData, setZoneData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live risk predictions from backend
    fetch('http://localhost:5000/api/predict/hotspots')
      .then(res => res.json())
      .then(data => {
        if (data.predictions) {
          // Format for Recharts
          const formatted = data.predictions.map(p => ({
            name: p.zone,
            crimes: p.risk_score // Displaying risk score as the bar height
          }));
          setZoneData(formatted);
        }
      })
      .catch(err => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const mockTimeData = [
    { day: 'Mon', theft: 12, cyber: 5, assault: 2 },
    { day: 'Tue', theft: 15, cyber: 8, assault: 1 },
    { day: 'Wed', theft: 9, cyber: 12, assault: 4 },
    { day: 'Thu', theft: 18, cyber: 4, assault: 3 },
    { day: 'Fri', theft: 22, cyber: 15, assault: 6 },
    { day: 'Sat', theft: 30, cyber: 20, assault: 10 },
    { day: 'Sun', theft: 25, cyber: 18, assault: 8 },
  ];

  return (
    <div style={{ padding: '1.5rem', height: 'calc(100vh - 64px - 3rem)', overflowY: 'auto' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.5rem' }}>Crime Analytics Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: '400px' }}>
          
          {/* Bar Chart */}
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Live Predicted Risk by Zone</h3>
            <ResponsiveContainer width="100%" height="90%">
              {loading ? (
                <div style={{ color: 'var(--text-main)' }}>Loading predictions from AI...</div>
              ) : (
                <BarChart data={zoneData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)' }} />
                  <Bar dataKey="crimes" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Weekly Trends by Crime Type</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={mockTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)' }} />
                <Legend />
                <Line type="monotone" dataKey="theft" stroke="var(--accent-cyan)" strokeWidth={3} />
                <Line type="monotone" dataKey="cyber" stroke="var(--accent-yellow)" strokeWidth={3} />
                <Line type="monotone" dataKey="assault" stroke="var(--accent-red)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}
