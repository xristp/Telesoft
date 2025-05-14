import "./style/app.css";
import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import Productline from "./components/Productline";
import ParallaxCard from "./components/ParallaxCard";
import DottedScroller from "./components/DottedScroller";
import Whoweare from "./components/Whoweare";
import Partners from "./components/Partners";
import Leadership from "./components/Leadership";
import About from "./components/About";
import Contact from "./components/Contact";
import WeHire from "./components/WeHire";
import content from "./public/assets/content.json"; // Import JSON content
import bg from "./public/assets/background.jpg"; // Import background image

const componentMapping = {
  About: <About />,
  Whoweare: <Whoweare />,
  Leadership: <Leadership />,
  Productline: <Productline />,
  Partners: <Partners />,
  WeHire: <WeHire />,
  Contact: <Contact />,
};

function App() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isScrolling = useRef(false);
  const startY = useRef(0);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!isMobile) {
        const upscroll = e.deltaY < 0;
        if (!isScrolling.current) {
          setCurrent((prev) => {
            const newIndex = upscroll ? Math.max(prev - 1, 0) : Math.min(prev + 1, content.sections.length - 1);
            return newIndex;
          });
          isScrolling.current = true;
          setTimeout(() => (isScrolling.current = false), 800); // Adjusted scroll delay
        }
      }
    };

    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isMobile) {
        const touch = e.touches[0];
        const y = touch.clientY;
        if (!isScrolling.current && Math.abs(startY.current - y) > 180) {
          const isSwipeUp = startY.current > y;
          setCurrent((prev) => (isSwipeUp ? Math.min(prev + 1, content.sections.length - 1) : Math.max(prev - 1, 0)));
          isScrolling.current = true;
          setTimeout(() => (isScrolling.current = false), 700); // Adjusted scroll delay
        }
      }
    };

    document.addEventListener("wheel", handleScroll);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [current, isMobile]);

  return (
    <div className="app-container">
      <Navbar onNavClick={setCurrent} currentPage={current} />

      <div className={`content-container ${isMobile ? 'mobile' : ''}`}>
        {content.sections.map((section, index) => (
          <div key={section.id} className={`section ${isMobile ? 'no-parallax' : ''}`}>
            <ParallaxCard
              id={section.id}
              index={index}
              current={current}
              style={section.id === "home" ? { backgroundImage: `url(${bg})` } : {}}
              disableParallax={isMobile} // Pass prop to disable parallax effect on mobile
            >
              {section.title ? (
                <div className="info-text">
                  <h1 style={{ whiteSpace: "pre-line" }}>{section.title}</h1>
                </div>
              ) : null}
              {componentMapping[section.component]}
            </ParallaxCard>
          </div>
        ))}
      </div>

      <DottedScroller
        tabs={content.sections.map((section) => section.name)}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
}

export default App;
