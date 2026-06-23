import React from 'react';
import { Radio, AlertCircle, MapPin, Activity } from 'lucide-react';

const mockCyberThreats = [
  { id: 'CYB-772', type: 'Phishing Cluster', origin: 'Vastrapur', targets: 'Senior Citizens', status: 'High Alert', mappedToPhysical: true },
  { id: 'CYB-891', type: 'ATM Skimming', origin: 'Maninagar', targets: 'Bank Kiosks', status: 'Investigating', mappedToPhysical: true },
  { id: 'CYB-904', type: 'Crypto Fraud', origin: 'Unknown IP', targets: 'Students', status: 'Monitoring', mappedToPhysical: false },
];

export default function CyberIntel() {
  return (
    <div style={{ padding: '1.5rem', height: 'calc(100vh - 64px - 3rem)', overflowY: 'auto' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Radio /> Cyber Intelligence Hub
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Active Cyber Threats</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>14</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Mapped to Physical Zones</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>8</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Recent Takedowns</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>5</p>
          </div>
        </div>

        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Emerging Cyber threat Clusters</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockCyberThreats.map((threat) => (
            <div key={threat.id} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border-color)', 
              padding: '1.5rem', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{threat.id}</span>
                  <span style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>{threat.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> Origin: {threat.origin}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={16} /> Targets: {threat.targets}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '999px', 
                  fontSize: '0.875rem',
                  background: threat.status === 'High Alert' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                  color: threat.status === 'High Alert' ? 'var(--accent-red)' : 'var(--accent-yellow)'
                }}>
                  {threat.status}
                </span>
                {threat.mappedToPhysical && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Activity size={12} /> Correlated to Physical Map
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Temporary icon import fix since Users wasn't imported at top
function Users(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>; }
