import React from "react";
import "./stat.css"


function Stat(){
    return(
        <>
        <h1 className="aha1">Statistiques générales</h1>
        <table>
            <tr>
                <th>Nombre d'habitants :</th>
                <th className="aha">75.721(dont 20.000 à l'étranger)</th>
            </tr>
            <tr>
                <th>Superficie Verte :</th>
                <th className="aha"> 14m2 /personne</th>
            </tr>
            <tr>
                <th>Electricité en fonction : </th>
                <th className="aha">95%</th>
            </tr>            
            <tr>
                <th>Eclairage public :</th>
                <th className="aha">85%</th>
            </tr>            
            <tr>
                <th>Routes goudornnées :</th>
                <th className="aha">50%</th>
            </tr>            
            <tr>
                <th>Lien avec l'ONAS </th>
                <th className="aha">63%</th>
            </tr>  
            <tr>
                <th>Lien avec SONEDE :</th>
                <th className="aha">95%</th>
            </tr>
        </table>

        <table border={1} className="ahaa">
            <tr>
                <td>Données générales</td>
                <td>Nombre</td>
            </tr>
            <tr>
                <td>Ecoles primaires</td>
                <td>13</td>
            </tr>
            <tr>
                <td>Ecoles preparatoires</td>
                <td>04</td>
            </tr>
            <tr>
                <td>Lycés</td>
                <td>03</td>
            </tr>
            <tr>
                <td>Ecoles professionneles</td>
                <td>03</td>
            </tr>
            <tr>
                <td>Bibliothéques publics</td>
                <td>01</td>
            </tr>
            <tr>
                <td>Maisons des jeunesses et de sport</td>
                <td>01</td>
            </tr>
            <tr>
                <td>Clubs d'enfants</td>
                <td>01</td>
            </tr>
            <tr>
                <td>Associations sportives</td>
                <td>03</td>
            </tr>
            <tr>
                <td>Stades sportifs</td>
                <td>02</td>
            </tr>
            <tr>
                <td>Stades tennis</td>
                <td>05</td>
            </tr>
            <tr>
                <td>Associations nationnales</td>
                <td>20</td>
            </tr>
            <tr>
                <td>Dispensaires</td>
                <td>04</td>
            </tr>
            <tr>
                <td>Hôpitaux régionaux</td>
                <td>01</td>
            </tr>
            
        </table>
        </>
    )
}
export default Stat;