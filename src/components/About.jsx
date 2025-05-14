import React from 'react';
import content from '../public/assets/content.json'; // Import JSON content
import '../style/about.css'; // Import the About CSS

const About = () => {
    // Find the 'about' section in content.json
    const aboutContent = content.sections.find(section => section.id === "about");

    return (
        <section className="about-section">
            <div className="left-text">
                <p>{aboutContent.leftText}</p>
            </div>
            <div className="right-text">
                {aboutContent.rightText.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </section>
    );
};

export default About;
