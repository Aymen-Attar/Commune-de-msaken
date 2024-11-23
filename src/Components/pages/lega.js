import React from "react";
import "./lega.css";

function Lega(){
    return(
        <>
        <h1>Légalisation des signatures</h1>
        <h4>Formalités obligatoires</h4>
        <p>Le document est présenté personnellement par l'intéressé aux agents du service de l'Etat civil. Seul est exempt de cette obligation quiconque a déposé un spécimen de sa signature suivant les formalités ci-dessous désignées.</p>
        <br />
        <h4>Pièces d'identités à présenter</h4>
        <p>La légalisation de signature est effectuée après présentation de l'une des pièces d'identité officielles suivantes en cours de validité:</p>
        <br />
        <ul>
            <li>.La carte d'identité nationale.</li>
            <li>.La carte d'identité réservée aux étrangers et délivrée par la direction de la sûreté nationale.</li>
            <li>.Le passeport</li>
        </ul>
        <br />
        <h4>Le spécimen de signature</h4>
        <p>Tout particulier qui demande fréquemment la légalisation de sa signature peut en déposer personnellement le spécimen auprès du service de l'état civil.</p>
        <br />
        <h5>NB :</h5>
        <ul>
            <li>.La légalisation de signature est interdite en ce qui concerne les documents contraires aux bonnes moeurs ou portant atteinte à l'ordre public.</li>
            <li>.Les documents administratifs présentés par les services de l'état, des collectivités locales et des établissements publics à caractère administratif sont exemptés du payement des redevances.</li>
        </ul>
        </>
    )
}
export default Lega;