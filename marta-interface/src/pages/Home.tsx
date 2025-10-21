// import { Link } from 'react-router-dom';
// import './Home.css';
// import React from 'react';

// export default function Home() {
//   const lines = [
//     { color: 'gold', hex: '#FFD700' },
//     { color: 'red', hex: '#FF0000' },
//     { color: 'green', hex: '#008000' },
//     { color: 'blue', hex: '#0000FF' }
//   ];

//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <div className="home-header">
//           <Link to="/about" className="about-link">
//             About
//           </Link>
//         </div>

//         <h1 className="home-title">
//           MARTA
//         </h1>
        
//         <p className="home-subtitle">
//           Metropolitan Atlanta Rapid Transit Authority
//         </p>

//         <div className="lines-grid">
//           {lines.map(line => (
//             <Link
//               key={line.color}
//               to={`/lines/${line.color}`}
//               className="line-link"
//               style={{ backgroundColor: line.hex }}
//             >
//               {line.color} Line
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import "./Home.css";
import React from 'react';

export default function Home() {
  return (
    <div className="home">
      {/* Top Bar */}
      <header className="home__topbar">
        <h1 className="home__brand">MARTA</h1>
        <Link to="/about" className="home__about">About MARTA</Link>
      </header>

      {/* Main Content */}
      <main className="home__main">
        <section className="home__left">
          <h2 className="home__title">VIEW ROUTES SCHEDULE</h2>

          <nav className="home__routes">
            <Link className="home__route" to="/lines/gold">Gold Line</Link>
            <Link className="home__route" to="/lines/red">Red Line</Link>
            <Link className="home__route" to="/lines/green">Green Line</Link>
            <Link className="home__route" to="/lines/blue">Blue Line</Link>
          </nav>
        </section>

        <figure className="home__figure">
          <img
            src="/marta.png"            // ✅ served from /public
            alt="MARTA train arriving at station"
            className="home__image"
          />
        </figure>
      </main>
    </div>
  );
}
