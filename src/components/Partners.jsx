import React from 'react';
import content from '../public/assets/content.json'; // Import JSON content
import '../style/partners.css';

const Partners = () => {
  const partnersContent = content.sections.find(section => section.id === "partners");

  return (
    <div className="partners-container">
      <div className="text-section">
        <h1 className="heading">Partners</h1>
        {partnersContent.mainText.map((paragraph, index) => (
          <p key={index} className="description">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default Partners;
