import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Bell, Database, Save } from 'lucide-react';

export default function Settings() {
  const [riskThreshold, setRiskThreshold] = useState(75);

  return (
    <div style={{ padding: '1.5rem', height: 'calc(100vh - 64px - 3rem)', overflowY: 'auto' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <SettingsIcon /> System Settings
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Alert Config */}
          <section style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <Bell size={20} /> Alert Configuration
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Automated Alert Risk Threshold (0-100)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    type="range" 
                    min="50" max="100" 
                    value={riskThreshold} 
                    onChange={(e) => setRiskThreshold(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <span style={{ background: 'var(--accent-red)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>
                    {riskThreshold}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Zones surpassing this predicted risk score will trigger an automated command alert.
                </p>
              </div>
            </div>
          </section>

          {/* RBAC */}
          <section style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <ShieldCheck size={20} /> Role-Based Access
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Command Officer</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Full map & analytics access</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Patrol Officer</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Route viewing & incident logging</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Cyber Analyst</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Cyber layers & physical correlation</div>
              </div>
            </div>
            <button style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
              Manage Users
            </button>
          </section>

          {/* Data */}
          <section>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <Database size={20} /> Data Management
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={18} /> Export Audit Logs
              </button>
              <button style={{ background: 'transparent', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                Clear Cache
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
