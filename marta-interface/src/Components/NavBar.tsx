import './NavBar.css';
import React from 'react';

interface NavBarProps {
  color: string;
  data: string[];
  selectedStation: string | null;
  onStationClick: (station: string | null) => void;
}

export default function NavBar({ color, data, selectedStation, onStationClick }: NavBarProps) {
  const colorMap: { [key: string]: string } = {
    gold: '#FFD700',
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF'
  };

  const bgColor = colorMap[color.toLowerCase()] || '#ccc';

  return (
    <div className="navbar-container" style={{ backgroundColor: bgColor }}>
      <h2 className="navbar-title">
        {color} Line Stations
      </h2>
      <div className="navbar-stations">
        {data.map((station, index) => (
          <button
            key={index}
            onClick={() => onStationClick(selectedStation === station ? null : station)}
            className={`station-button ${selectedStation === station ? 'selected' : 'unselected'}`}
            style={{
              color: selectedStation === station ? bgColor : '#333'
            }}
          >
            {station}
          </button>
        ))}
      </div>
    </div>
  );
}