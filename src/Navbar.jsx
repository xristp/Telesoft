import React, { useState, useEffect } from "react";
import content from "./public/assets/content.json"; // Import JSON content
import "./style/navbar.css"; 
import Logo from "./components/Logo";
import PropTypes from 'prop-types';

const Navbar = ({ onNavClick, currentPage }) => {
    const [isOpen, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Extracting nav items from JSON content
    const navSections = content.sections;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);
            return () => window.removeEventListener('resize', checkIsMobile);
        }
    }, []);

    const handleNavClick = (index) => {
        onNavClick(index);
        setOpen(false);
    };

    const handleLogoClick = (event) => {
        event.preventDefault();
        handleNavClick(0);
    };

    const handleOverlayClick = () => {
        setOpen(false);
    };

    return (
        <header className="navbar">
            <div className="logo">
                <a href="#home" className="logo-link" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={`navbar-logo ${currentPage === 3 || currentPage === 6 ? 'logo-animation' : ''}`}>
                        <Logo className={currentPage === 3 || currentPage === 6 ? 'logo-animation' : ''} value={currentPage === 3 || currentPage === 6 ? 0 : 3} />
                    </div>
                    <h1 className={`logo-title ${currentPage === 3 || currentPage === 6 ? 'title-animation white_color_logo transition-color' : 'gradient_color_logo'}`}>
                        Telesoft<span className="small-symbol">®</span>
                    </h1>
                </a>
            </div>
            <nav
                className={`nav-container ${isMobile ? '' : 'desktop'}`}
                onMouseEnter={!isMobile ? () => setOpen(true) : null}
                onMouseLeave={!isMobile ? () => setOpen(false) : null}
            >
                <div 
                    className={`hamburger ${currentPage === 3 || currentPage === 6 ? "white-hamburger transition-color" : ""} ${isOpen ? "white-hamburger" : ""}`}
                    onClick={isMobile ? () => setOpen(prev => !prev) : null}
                    aria-expanded={isOpen}
                >
                    <div />
                    <div />
                    <div />
                </div>

                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    {navSections.map((section, index) => (
                        <li key={section.id} onClick={() => handleNavClick(index)}>
                            <a href={`#${section.id}`}>{section.name}</a>
                        </li>
                    ))}
                    <div className="contact-details">
                        <p>Ακτή Θεμιστοκλέους 70, </p>
                        <p>189 02, Σελήνια, Greece</p>
                        <p>T: +30 6988022212</p>
                        <p>E: <a href="mailto:info@Telesoft.com">info@Telesoft.com</a></p>
                    </div>
                </ul>

                {/* Overlay for mobile devices */}
                {isMobile && isOpen && (
                    <div
                        className="menu-overlay open"
                        onClick={handleOverlayClick}
                    ></div>
                )}
            </nav>
        </header>
    );
};

Navbar.propTypes = {
    onNavClick: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Navbar;
