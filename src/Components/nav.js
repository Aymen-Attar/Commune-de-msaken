import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "./images/msakin.png";
import "./nav.css";



function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      <Link to="/">
        <img src={image} className="img1" alt="commune de Msaken"/>
        </Link>

      <ul className={active}>
      <li className="dropdown">
          <button className="dropbtn" onclick="myFunction()">Ville de Msaken</button>
          <div className="dropdown-content" >
            <Link to="/Situation-géographique">Situation-géographique</Link>
            <Link to="/Msaken-en-chiffres">Msaken en chiffres</Link>
            <Link to="/Historique">Historique</Link>
            <Link to="/Relations-extérieurs">Relations extérieurs</Link>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Municipalité</button>
          <div className="dropdown-content">
            <Link to="/Date-de-création">Date de création</Link>
            <Link to="/Organisation-municipale">Organisation municipale</Link>
            <Link to="/Arrondissements-municipaux">Arrondissements municipaux</Link>
            <Link to="/Conseil-municipal">Conseil municipal</Link>
            <Link to="/Conseil-des-enfants">Conseil des enfants</Link>
          </div>
        </li>
        
        {/*<li className="dropdown">
          <button className="dropbtn">Environnement</button>
          <div className="dropdown-content">
            <Link to="Campagne-environnementale">Campagne environnementale</Link>
            <Link to="Les-espaces-verts">Les espaces verts</Link>
          </div>
  </li>*/}
        
        <li className="dropdown">
          <Link to="/Réalisations">
            <button className="dropbtn">Réalisations</button>
          </Link>
        </li>

        <li className="dropdown">
          <Link to="/Plan-annuel-d'investissement">
          <button className="dropbtn">Plan annuel d'investissement</button>
          </Link>
        </li>

        <li className="dropdown">
          <button className="dropbtn">Mairie et citoyens</button>
          <div className="dropdown-content">
            <Link to="/Etat-civil">Etat civil</Link>
            <Link to="/Légalisation-de-signature">Légalisation de signature</Link>
            <Link to="/Certification-des-copies">Certification des copies</Link>
            <Link to="/Permis-de-bâtir">Permis de bâtir</Link>
            <Link to="/Fiscalité-locale">Fiscalité locale</Link>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Espace citoyen</button>
          <div className="dropdown-content">
            <Link to="/Réclamation">Déposer une réclamation</Link>
            <Link to="/Concoursu">Concours</Link>
            <Link to="/Demande-accés-á-l'information">Demande d'accés á l'information</Link>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Permis et urbanisme</button>
          <div className="dropdown-content">
            <Link to="/Dossier-de-permis-de-bâtir">Dossier de permis de bâtir</Link>
            <Link to="/Consultation-des-commissions">Consultation des commissions</Link>
            <Link to="/Consultation-du-permis-de-bâtir">Consultation du permis de bâtir</Link>
            <Link to="/Plan-d'aménagement">Plan d'aménagement</Link>
          </div>
        </li>
        <li className="dropdown">
          <Link to="/Contact">
            <button className="dropbtn" >Contact</button>
          </Link>
        </li>

      
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;