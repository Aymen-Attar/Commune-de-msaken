import React from "react";
import "./histo.css";
import imghis from "../images/kousour.png"

function histo(){
    return(
        <>
        <h1 className="his">L'historique de la ville de M'saken:</h1>
        <p>La ville de M'saken a été fondée au début du 8ème siècle de l'Héjire par des ( Chorfas )descendants du prophète. Leurs ancêtres émigrèrent du Hijaz au Magreb dans la période de la dynastie Idrissienne. Ainsi un groupe de leurs neveux s'installèrent sur une terre connue sous le nom de la vallée du lion ( Ghabat Essid ) d'un moment donné et à un autre par la vallée du Sultan qui portait le nom du Sultan Hafside qui leur a léguée.Une fois installés à ces lieux , ils se divisèrent en cinq tribus et construisirent cinq palais entourant la mosquée "El Aousat" . Ces palais se sont métamorphosés au fil des années en quartiers dont;</p>
        <ul >
            <li>Le quartier de Njejra : sis au sud de la mosquée El Aousat</li>
            <li>Le quartier de Kebline : sis également au sud de la même mosquée</li>
            <li>Le quartier de Menâama : sis à l'est de la dite mosquée</li>
            <li>Le quartier de Jebline : sis au nord de cette mosquée</li>
            <li>Le quartier de Jdidine : sis à l'ouest de la mosquée El Aousat</li>
        </ul>
        <p>Chaque palais consiste en une petite forteresse d'une seule issue fermée la nuit.
M'saken est un mot arabe indiquant le pluriel du mot singulier ( mesken ) qui signifie habitation. Ainsi les habitants des villages arvisionnants l'appelaient ( M'saken des Chorfas ) c'est à dire ( les habitations des descendants du prophète ) .
( Voir "Silsilat Abou Errasoul" et "les douars Essamia" )</p>           

        <img src={imghis} className="imghis" alt="commune de Msaken"/>


        </>
    )
}
export default histo;