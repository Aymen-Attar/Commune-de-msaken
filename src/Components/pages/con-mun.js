import React from "react";
import './con-mun.css';
import imgconmun from "../images/orgcons.png" 
import { useTranslation } from 'react-i18next';
function Conmun() {
    const { t } = useTranslation();
    return(
        <>
            <h1 className="cm">{t('Le conseil municipal')}</h1>
            <img src={imgconmun} className="imgco" alt="commune de Msaken"/>
        </>
    )
}
export default Conmun;