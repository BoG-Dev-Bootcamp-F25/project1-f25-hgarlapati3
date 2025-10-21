// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import TrainList from '../components/TrainList';
// import './LinesPage.css';
// import React from 'react';

// export default function LinesPage() {
//   const { line } = useParams<{ line: string }>();
//   const [currColor, setCurrColor] = useState(line || 'gold');
//   const [trainData, setTrainData] = useState([]);
//   const [stationData, setStationData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStation, setSelectedStation] = useState<string | null>(null);
//   const [filters, setFilters] = useState({
//     arriving: false,
//     scheduled: false,
//     direction1: false,
//     direction2: false
//   });

//   const isEastWest = currColor === 'green' || currColor === 'blue';
//   const direction1Label = isEastWest ? 'Eastbound' : 'Northbound';
//   const direction2Label = isEastWest ? 'Westbound' : 'Southbound';

//   useEffect(() => {
//     if (line) {
//       setCurrColor(line);
//     }
//   }, [line]);

//   useEffect(() => {
//     setLoading(true);
//     setSelectedStation(null);
//     setFilters({
//       arriving: false,
//       scheduled: false,
//       direction1: false,
//       direction2: false
//     });

//     Promise.all([
//       fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currColor}`),
//       fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currColor}`)
//     ])
//       .then(([trainsRes, stationsRes]) => 
//         Promise.all([trainsRes.json(), stationsRes.json()])
//       )
//       .then(([trains, stations]) => {
//         setTrainData(trains);
//         setStationData(stations);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, [currColor]);

//   const toggleFilter = (filterName: keyof typeof filters) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: !prev[filterName]
//     }));
//   };

//   const colorMap: { [key: string]: string } = {
//     gold: '#FFD700',
//     red: '#FF0000',
//     green: '#008000',
//     blue: '#0000FF'
//   };

//   if (loading) {
//     return (
//       <div className="loading-message">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="lines-page">
//       <div className="page-header">
//         <h1 className="page-title" style={{ color: colorMap[currColor] }}>
//           MARTA {currColor} Line
//         </h1>
//         <Link to="/" className="home-link">
//           Home
//         </Link>
//       </div>

//       {/* Line Color Buttons */}
//       <div className="line-buttons">
//         {['gold', 'red', 'green', 'blue'].map(color => (
//           <button
//             key={color}
//             onClick={() => setCurrColor(color)}
//             className={`line-button ${currColor === color ? 'active' : ''}`}
//             style={{ backgroundColor: colorMap[color] }}
//           >
//             {color}
//           </button>
//         ))}
//       </div>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         <button
//           onClick={() => toggleFilter('arriving')}
//           className={`filter-button ${filters.arriving ? 'active' : 'inactive'}`}
//         >
//           Arriving
//         </button>
//         <button
//           onClick={() => toggleFilter('scheduled')}
//           className={`filter-button ${filters.scheduled ? 'active' : 'inactive'}`}
//         >
//           Scheduled
//         </button>
//         <button
//           onClick={() => toggleFilter('direction1')}
//           className={`filter-button ${filters.direction1 ? 'active' : 'inactive'}`}
//         >
//           {direction1Label}
//         </button>
//         <button
//           onClick={() => toggleFilter('direction2')}
//           className={`filter-button ${filters.direction2 ? 'active' : 'inactive'}`}
//         >
//           {direction2Label}
//         </button>
//       </div>

//       <NavBar 
//         color={currColor} 
//         data={stationData} 
//         selectedStation={selectedStation}
//         onStationClick={setSelectedStation}
//       />
      
//       <TrainList 
//         color={currColor} 
//         data={trainData}
//         selectedStation={selectedStation}
//         filters={filters}
//       />
//     </div>
//   );
// }

// ...imports stay the same


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

export default function LinesPage() {
  const { line } = useParams<{ line: string }>();

  // state
  const [currColor, setCurrColor] = useState(line || "gold");
  const [trainData, setTrainData] = useState<any[]>([]);
  const [stationData, setStationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    arriving: false,
    scheduled: false,
    direction1: false,
    direction2: false,
  });

  // direction labels by line
  const isEastWest = currColor === "green" || currColor === "blue";
  const direction1Label = isEastWest ? "Eastbound" : "Northbound";
  const direction2Label = isEastWest ? "Westbound" : "Southbound";

  // keep currColor in sync with route
  useEffect(() => {
    if (line) setCurrColor(line);
  }, [line]);

  // fetch when color changes
  useEffect(() => {
    setLoading(true);
    setSelectedStation(null);
    setFilters({
      arriving: false,
      scheduled: false,
      direction1: false,
      direction2: false,
    });

    Promise.all([
      fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currColor}`),
      fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currColor}`),
    ])
      .then(([tr, st]) => Promise.all([tr.json(), st.json()]))
      .then(([trains, stations]) => {
        setTrainData(trains);
        setStationData(stations);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [currColor]);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="lines-page">
      {/* HEADER: color tabs ABOVE the title */}
      <div className="page-header">
        <div className="line-buttons">
          {["gold", "red", "blue", "green"].map((color) => (
            <button
              key={color}
              data-color={color}
              className={`line-button ${currColor === color ? "active" : ""}`}
              onClick={() => setCurrColor(color)}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>

        <h1 className="page-title">{currColor.toUpperCase()}</h1>

        <Link to="/" className="home-link">
          Home
        </Link>
      </div>

      {/* FILTER PILLS */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${filters.arriving ? "active" : ""}`}
          onClick={() => toggleFilter("arriving")}
        >
          Arriving
        </button>
        <button
          className={`filter-button ${filters.scheduled ? "active" : ""}`}
          onClick={() => toggleFilter("scheduled")}
        >
          Scheduled
        </button>
        <button
          className={`filter-button ${filters.direction1 ? "active" : ""}`}
          onClick={() => toggleFilter("direction1")}
        >
          {direction1Label}
        </button>
        <button
          className={`filter-button ${filters.direction2 ? "active" : ""}`}
          onClick={() => toggleFilter("direction2")}
        >
          {direction2Label}
        </button>
      </div>

      {/* MAIN: sidebar + list */}
      <div className="lines-main">
        <aside className="sidebar">
          <NavBar
            color={currColor}
            data={stationData}
            selectedStation={selectedStation}
            onStationClick={setSelectedStation}
          />
        </aside>

        <section className="content">
          <TrainList
            color={currColor}
            data={trainData}
            selectedStation={selectedStation}
            filters={filters}
          />
        </section>
      </div>
    </div>
  );
}
