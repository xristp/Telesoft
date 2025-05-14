import React from 'react';
import content from '../public/assets/content.json'; // Import JSON content
import '../style/contact.css';

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

const Contact = () => {
  const contactContent = content.sections.find(section => section.id === "contact");

  return (
    <div className="contact-section">
      <div className="contact-box">
        {contactContent.companyDetails.map(({ name, address, phone, email, website }) => (
          <div key={email} className="company-info">
            <h2>{name}</h2>
            <div className="company-details">
              <p>{address.split(',').map((line, i) => (
                <React.Fragment key={i}>{line}<br /></React.Fragment>
              ))}</p>
              <p className="clickable" onClick={() => handleCopy(phone)}>T: {phone}</p>
              <p className="clickable" onClick={() => handleCopy(email)}>E: {email}</p>
              <p className="clickable" onClick={() => handleCopy(website)}>{website}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="map-box">
        <h2>Corporate HQ</h2>
        <iframe
          title="Corporate HQ Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.9210974902458!2d23.532910311259293!3d37.932273702955165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1b718360faae9%3A0x9c7977a5d44b6710!2zzpHOus-Ezq4gzpjOtc68zrnPg8-Ezr_Ous67zq3Ov8-Fz4IgNzAsIM6jzrXOu86uzr3Ouc6xIDE4OSAwMg!5e0!3m2!1sel!2sgr!4v1729504634118!5m2!1sel!2sgr"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
