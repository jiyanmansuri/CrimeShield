import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different crime types
const createIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const icons = {
  Theft: createIcon('#3b82f6'),
  Assault: createIcon('#ef4444'),
  Fraud: createIcon('#f59e0b'),
  Cyber: createIcon('#8b5cf6'),
  Vandalism: createIcon('#10b981')
};

// Ahmedabad Coordinates
const AHMEDABAD_CENTER = [23.0225, 72.5714];

export default function GISMap({ theme = 'dark' }) {
  const [incidents, setIncidents] = useState([]);
  
  // Simulated data load
  useEffect(() => {
    // Generate some mock incidents around Ahmedabad
    const mockData = Array.from({ length: 50 }).map((_, i) => {
      const types = ['Theft', 'Assault', 'Fraud', 'Cyber', 'Vandalism'];
      return {
        id: i,
        lat: 22.95 + Math.random() * 0.15,
        lng: 72.5 + Math.random() * 0.15,
        type: types[Math.floor(Math.random() * types.length)],
        severity: Math.floor(Math.random() * 5) + 1,
        time: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString()
      };
    });
    setIncidents(mockData);
  }, []);

  // Use standard OSM for both modes, but we will invert colors in CSS for dark mode
  // to maintain the extreme clarity of OSM while keeping the dark aesthetic.
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer 
      center={AHMEDABAD_CENTER} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      {/* Dynamic theme map tiles */}
      <TileLayer
        key={theme} // Force re-render when theme changes
        url={tileUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {/* Render Incidents */}
      {incidents.map((incident) => (
        <Marker 
          key={incident.id} 
          position={[incident.lat, incident.lng]}
          icon={icons[incident.type]}
        >
          <Popup>
            <div style={{ padding: '4px' }}>
              <h4 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>{incident.type}</h4>
              <p style={{ margin: '0 0 2px 0', fontSize: '12px' }}>Severity: {incident.severity}/5</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Time: {incident.time}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Mock Hotspot Zones */}
      <Circle center={[23.03, 72.56]} radius={2000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }} />
      <Circle center={[22.99, 72.60]} radius={1500} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 }} />

    </MapContainer>
  );
}
