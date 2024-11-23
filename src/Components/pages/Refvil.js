import React from "react";
import './refvil.css';
import img from "../images/image3.png" 
import img1 from "../images/image4.png"
//import PDFButton from '../PDFButton';
import { useTranslation } from 'react-i18next';



function Refvil() {

    const { t } = useTranslation();
    return(
        <>
            <h1 className="aha1">{t('Ville de Msaken')}</h1>
            <p className="b">{t(`M'saken est une ville du Sahel tunisien située à une douzaine de kilomètres au sud de Sousse et environ 140 kilomètres au sud de Tunis par l'autoroute A1.Rattachée administrativement au gouvernorat de Sousse, elle constitue une municipalité comptant 60 165 habitants en 20142 et étendue sur 12 650 hectares. Il est à noter un accroissement du nombre d'habitants en été en raison du retour des expatriés travaillant majoritairement en France.Le climat de M'saken subit les influences méditerranéennes.`)}</p>
            <img src={img} className="img" alt="commune de Msaken"/>
            <h1 className="aha1">{t('Histoire')}</h1>
            <p className="d">{t(`Dans son ouvrage Tunisie et Tunisiens, l'essayiste historique François Bournand avance que M'saken était une ville sainte : « Sa qualification de lieu saint lui vient de la médersa de Sidi-Ali-ben-Khalifa, école célèbre, non seulement dans la Régence, mais dans la Tripolitaine, l'Algérie, et qui a acquis par l'enseignement supérieur qu'on y professe, par le nombre considérable d'élèves qu'elle reçoit, l'importance d'une université. Msaken est la Séville, la Padoue, l'Oxford, la Cologne de la Tunisie [...] L'accès de cette cité sainte est formellement interdit aux chrétiens... »5.Selon la municipalité de M'saken, la ville a été fondée au début du viiie siècle de l'hégire par des descendants du prophète Mahomet venus du Hedjaz3. Il se divisent en cinq forteresses entourant la mosquée El Aousat et donnant naissance aux quartiers modernes de Njejra, Kebline, Menâama, Jebline et Jdidine3.La ville est érigée en municipalité le 19 février 19216 puis subdivisée en deux arrondissements municipaux : La Cité nouvelle le 24 février 1999 et M'saken Sud le 19 février 20007.`)}</p>
            <img src={img1} className="img11" alt="commune de Msaken"/>
            
            
        </>
    )
}
export default Refvil;
