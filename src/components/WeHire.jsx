import React, { useState } from "react";
import content from '../public/assets/content.json'; // Import JSON content
import '../style/wehire.css';
import { IoCloseCircleOutline } from "react-icons/io5";

const WeHire = () => {
  const weHireContent = content.sections.find(section => section.id === "wehire");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isJumping, setIsJumping] = useState(false); // State for jump animation

  const handlePositionClick = (positionId) => {
    setSelectedPosition(weHireContent.positions.find(pos => pos.id === positionId));
  };

  const handleClose = () => setSelectedPosition(null);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(weHireContent.email);
      alert('Email copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleCtaClick = () => {
    setIsJumping(true); // Trigger animation
    document.getElementById('open-positions').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setIsJumping(false), 800); // Reset after animation duration
  };

  return (
    <>
      <div className="background-section"></div>
      <div className="wehire-section">
        <div className="wehire-content">
          <div className="hero-section">
            <h1>Shape the Future with Telesoft</h1>
            <p>We're looking for passionate individuals to join our mission.</p>
            <button 
              className={`cta-button ${isJumping ? 'animate-jump' : ''}`} 
              onClick={handleCtaClick}
            >
              See Open Positions
            </button>
          </div>

          <div className="positions-section" id="open-positions">
            <h2>Open Positions</h2>
            <div className="positions">
              {weHireContent.positions.map((position) => (
                <div
                  key={position.id}
                  className={`position-card ${isJumping ? 'jump-animation' : ''}`}
                  onClick={() => handlePositionClick(position.id)}
                >
                  <h3>{position.title}</h3>
                  <p>{position.description}</p>
                  <button className="more-info-button" onClick={() => handlePositionClick(position.id)}>
                    More Info
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedPosition && (
          <div className="modal" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={handleClose}>&times;</span>
              <h2>{selectedPosition.title}</h2>
              <p>{selectedPosition.description}</p>
              <h3>Requirements:</h3>
              <ul>
                {selectedPosition.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <div className="contact-email">
                <span className="email-text" onClick={handleEmailCopy}>{weHireContent.email}</span>
                <br />
                <small className="email-instruction">Send an HR email here</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeHire;
