import React from "react";
import content from "../public/assets/content.json"; // Import JSON content
import "../style/whoweare.css"; // Import CSS

const Whoweare = () => {
    // Find the 'whoweare' section in content.json
    const whoWeAreContent = content.sections.find(section => section.id === "whoweare");

    return (
        <section className="who-we-are-container" role="region" aria-label="Who We Are">
            <div className="left-content">
                <div className="highlight-container">
                    <div className="title-wrapper">
                        <p className="highlight">{whoWeAreContent.highlightText}</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="current-text">{whoWeAreContent.mainText}</p>
                        <ul className="current-text">
                            {whoWeAreContent.bulletPoints.map((item, index) => (
                                <li key={index} className="bullets">{item}</li>
                            ))}
                        </ul>
                        <p className="current-text">{whoWeAreContent.closingText}</p>
                    </div>
                </div>
            </div>
            <div className="right-image">
            </div>
        </section>
    );
};

export default Whoweare;
