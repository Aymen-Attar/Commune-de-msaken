/*import React from "react";
import "./footer.css"

export default function Footer(){
    return(
        <footer className="ac"></footer>
    )
}*/
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© 2023 Commune de msaken. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
