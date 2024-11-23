import React from "react";
import './arrondi.css'
import imgg from "../images/b1.png" 
import imgg1 from "../images/b2.png"
import { useTranslation } from 'react-i18next';

function Arr() {
    const { t } = useTranslation();
    return(
        <>
            <h1 className="arr">Arrondissements Msaken Nord</h1>
            <p> {t('Date de création: 24 Février 1999')}</p>
            
            <p>{t('adresse: Rue de la Mecque cité nouvelles, Taouara, Jedidine')}</p>
            <img src={imgg} className="imgar" alt="commune de Msaken"/>
            <h1 className="arr">Arrondissements Msaken Sud</h1>
            <p> Date de création:	19 Février 2000</p>
            
            <p>adresse: Rue de l'indépendance Nejejra, Kebliine, Cité Enno</p>
            <img src={imgg1} className="imgar" alt="commune de Msaken"/>


            

        
        </>
    )
}
export default Arr;