import React from "react";
import './org.css';
import img1 from "../images/org.png";

function org() {
    return(
        <>
            <h1 className="org">Organigramme Administratif de la municipalité</h1>
            <img src={img1} className="imgorg" alt="commune de Msaken"/>

        </>
    )
}
export default org;