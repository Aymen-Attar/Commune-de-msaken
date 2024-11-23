import React from "react";
import './refcom.css';
import img from "../images/image2.png" 
import { useTranslation } from 'react-i18next';
function Refcom() {
    const { t } = useTranslation();
    return(
        <>
            <h1 className="aha1">{t('Palais Municipal')}</h1>
            <p className="b">La commune de M'saken a été créée par décret le 19 février 1921.son adresse est: Avenue de la République.</p>
            <img src={img} className="img" alt="commune de Msaken"/>
        </>
    )
}
export default Refcom;