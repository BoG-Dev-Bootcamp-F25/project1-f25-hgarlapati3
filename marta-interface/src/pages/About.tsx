import { Link } from 'react-router-dom';
import './About.css';
import React from 'react';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">
          About MARTA
        </h1>

        <div className="about-map-container">
          <img
            src="martaInfo.jpg"
            alt="MARTA System Map"
            className="about-map"
          />
        </div>

        <div className="about-text">
          <h2 className="about-section-title">Our Mission</h2>
          <p>
            The Metropolitan Atlanta Rapid Transit Authority (MARTA) is the principal public 
            transport operator in the Atlanta metropolitan area. MARTA operates a network of 
            bus routes linked to a rapid transit system consisting of 48 miles of rail track 
            with 38 train stations.
          </p>

          <h2 className="about-section-title">System Overview</h2>
          <p>
            MARTA's rail system consists of four lines: Red, Gold, Blue, and Green. The system 
            serves over 400,000 riders daily, connecting major destinations throughout Atlanta 
            including Hartsfield-Jackson Atlanta International Airport, downtown Atlanta, 
            Buckhead, and many other key locations.
          </p>

          <h2 className="about-section-title">Our Commitment</h2>
          <p>
            MARTA is committed to providing safe, reliable, and efficient public transportation 
            to the Atlanta community. We strive to reduce traffic congestion, improve air quality, 
            and enhance the quality of life for all residents and visitors in the metropolitan area.
          </p>

          <h2 className="about-section-title">Service Hours</h2>
          <p>
            MARTA trains run from approximately 5:00 AM to 1:00 AM on weekdays, with extended 
            hours on weekends. Trains arrive every 10-15 minutes during peak hours and every 
            15-20 minutes during off-peak times.
          </p>
        </div>

        <div className="about-button-container">
          <Link to="/" className="back-home-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}