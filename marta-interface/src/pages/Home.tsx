

import { Link } from "react-router-dom";
import "./Home.css";
import React from 'react';

export default function Home() {
  return (
    <div className="home">
      <header className="home__topbar">
        <h1 className="home__brand">MARTA</h1>
        <Link to="/about" className="home__about">About MARTA</Link>
      </header>

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
            src="/marta.png"            
            alt="MARTA train arriving at station"
            className="home__image"
          />
        </figure>
      </main>
    </div>
  );
}
