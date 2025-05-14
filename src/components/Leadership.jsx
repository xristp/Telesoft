import React from 'react';
import content from '../public/assets/content.json'; // Import JSON content
import '../style/leadership.css';
import leaderPhoto from '../public/assets/leader1.jpg'; // Import leader photo

const Leadership = () => {
    // Find the 'leadership' section in content.json
    const leadershipContent = content.sections.find(section => section.id === "leadership");

    return (
        <div className="leadership-container">
            <div className="leadership-background" />
            <div className="leadership-cards">
                {leadershipContent.leaders.map((leader, index) => (
                    <div key={`${leader.name}-${leader.title}`} className="leadership-card">
                        <div
                            className="leader-photo"
                            style={{ backgroundImage: `url(${leaderPhoto})` }} // Use the imported image
                            aria-label={`${leader.name}'s photo`}
                        />
                        <div className="leader-info">
                            <h3 className="leader-name">{leader.name}</h3>
                            <p className="leader-title">{leader.title}</p>
                            <p className="leader-description">{leader.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leadership;
