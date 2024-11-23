import React from "react";
import "./enf.css";

function Enf(){
    return(
        <>
        <h1 className="x">Conseil Municipal Enfant:</h1>
        <h2 className="c-enf">Constitution du conseil municipal d'enfant :</h2>
        <table border={1} className="tab-enf">
            <tr>
                <th className="p-enf">Président du Conseil</th>
                <th className="p-enf">Les Adjoints</th>
                <th className="p-enf">Les Conseillers</th>
            </tr>
            <tr>
                <th>1</th>
                <th>10</th>
                <th>19</th>
            </tr>

        </table>
        <h2 className="c-enf">Activité du conseil municipal d'enfant :</h2>
        <p>Les attributions du conseil municipal des enfants sont :</p>
        <ul>
            <li>.L'amélioration de l'aspect général de la ville et la création d'un environnement écologique homogène et sain.</li>
            <li>.La protection de la nature et de l'environnement</li>
            <li>.Décoration des poteries qui ont été exploités comme conteneur</li>
            <li>.Implantation des panneaux invitant à la préservation de la nature et de l'environnement.</li>
            <li>.Faire des études dans divers domaines et plusieurs enquêtes traitants divers sujets.</li>
            <li>.Evoquer plusieurs problèmes auprès des conseils municipaux de la ville pour être étudiés.</li>
        </ul>
        </>
    )
}
export default Enf;