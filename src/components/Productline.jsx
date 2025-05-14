import React, { useState, useEffect, useRef } from "react";
import { CiServer } from "react-icons/ci";
import { FaServer } from "react-icons/fa";
import { VscServer, VscServerProcess } from "react-icons/vsc";
import { TbServerOff } from "react-icons/tb";
import { LuServerCog } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import content from "../public/assets/content.json"; // Import JSON content
import "../style/productline.css";
import image1 from "../public/assets/productlineimg/pl1.jpg";
import image2 from "../public/assets/productlineimg/pl2.jpg";
import image3 from "../public/assets/productlineimg/pl3.jpg";
import image4 from "../public/assets/productlineimg/pl4.jpg";
import image5 from "../public/assets/productlineimg/pl5.jpg";
import image6 from "../public/assets/productlineimg/pl6.jpg";

// Define icon and image arrays
const icons = [<CiServer />, <FaServer />, <VscServer />, <VscServerProcess />, <TbServerOff />, <LuServerCog />];
const images = [image1, image2, image3, image4, image5, image6];

const Productline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);

  const handleIconClick = (id) => {
    setSelectedProduct(id);
    setIsVisible(true);
  };

  const handlePageClick = () => {
    setIsVisible(false);
    setSelectedProduct(null);
  };

  const handleScroll = () => {
    if (isVisible) {
      handlePageClick();
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("scroll", handleScroll);
      document.body.classList.add("custom-cursor");
    } else {
      document.body.classList.remove("custom-cursor");
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("custom-cursor");
    };
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && isVisible) {
          handlePageClick();
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const selectedProductData = content.sections.find(section => section.id === "productline")
                                             .products.find(product => product.id === selectedProduct);

  return (
    <>
      <section className="product-line-section" ref={sectionRef}>
        <header className="left-title">
          <h1>Product Line</h1>
        </header>
        <div className="right-items">
          {content.sections.find(section => section.id === "productline").products.map(({ id, label }, index) => (
            <div className="product-item" key={id}>
              <div
                className="product-icon"
                onClick={() => handleIconClick(id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleIconClick(id)}
              >
                {icons[index]}
              </div>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div
        className={`sliding-page ${isVisible ? "visible" : ""}`}
        onClick={handlePageClick}
      >
        <IoCloseCircleOutline className="close-icon" onClick={handlePageClick} />
        {selectedProductData && (
          <>
            <div className="sliding-text" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedProductData.label}</h2>
              <p>{selectedProductData.description}</p>
            </div>
            <div className="sliding-image">
              <img src={images[selectedProduct - 1]} alt={selectedProductData.label} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Productline;
