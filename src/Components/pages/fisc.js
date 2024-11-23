import React from "react";
import "./fisc.css"


function Fisc(){
    return(
        <>
        <h1>Connu sur l'immobilier bâti</h1>
        <br />
        <h3 className="def-fisc">Définition</h3>
        <p>Les biens immobiliers bâtis situés dans les zones visées en considération du territoire communal ou aptes à l'habitation ou similaires sont soumis à ce qu'on appelle « le connu sur le bien immobilier bâti ».</p>
        <br />
        <h3 className="def-fisc">Modalités de paiement</h3>
        <p>Au 1er janvier de chaque année.</p>
        <br />
        <h3 className="def-fisc">Le champ d'application du connu doit être payé à :</h3>
        <ul>
            <li>.le propriétaire d'un bien immobilier</li>
            <li>.Bénéficiaire</li>
            <li>.En cas d'absence de ce qui précède, la taxe est due par le propriétaire ou l'occupant du bien Obligatoire</li>
        </ul>
        <br />
        <h3 className="def-fisc">Obligatoire</h3>
        <ul>
            <li>.Statistiques : Tout propriétaire d'immeuble doit déclarer son immeuble dans une publication que la municipalité lui fournit et lui distribue dans les trente jours à compter de la date de réception de la publication.</li>
            <li>.Après la procédure de recensement : Tout propriétaire d'un immeuble doit informer la commune, dans un délai n'excédant pas trente jours, de :
                <li>-Chaque nouveau bâtiment, agrandissement ou mise à niveau.</li>
                <li>-Tous les immeubles qui étaient vacants et occupés, ou qui deviennent assujettis à une taxe sur les propriétés bâties au cours de l'année, en fonction d'un changement de sens de leur utilisation</li>
                <li>Devoirs des rédacteurs de contrat : Toute personne qualifiée pour rédiger un contrat d'achat d'un immeuble autonome doit exiger du vendeur et de l'acheteur que le reçu de paiement municipal soit disponible.</li>
            </li>
        </ul>
        <br/>
        <h3 className="def-fisc">Biens immobiliers exonérés</h3>
        <ul>
            <li>.Les biens immobiliers bâtis appartenant à l'Etat, aux établissements publics à caractère administratif ou aux collectivités locales, à moins qu'ils ne soient justifiés.</li>
            <li>.Mosquées et biens immobiliers construits pour le culte et les coins.</li>
            <li>.Biens immobiliers bâtis appartenant à des pays étrangers destinés à abriter des intérêts administratifs ou diplomatiques, sous réserve de réciprocité.</li>
        </ul>
        <br />
        <h3 className="def-fisc">La base du connu et son ratio</h3>
        <p>La déduction est appliquée sur les propriétés bâties sur la base de 2% du prix de référence du mètre carré pour chaque propriété multiplié par la surface couverte de la propriété. L'ordonnance n° 431-D du 03/03/97 a fixé les prix de référence minimum et maximum au mètre carré bâti pour chaque catégorie de biens immobiliers comme suit :</p>
        <br/>
        <table  border={1} className="tab1-fisc">
            <tr>
                <td>Classe 1, une superficie n'excédant pas 100 mètres carrés</td>
                <td>De 100 à 150</td>
            </tr>
            <tr>
                <td>Classe 2 : Une superficie de plus de 100 mètres carrés et pas plus de 200 mètres carrés</td>
                <td>De 151 à 200</td>
            </tr>
            <tr>
                <td>Classe 3 : Une superficie de plus de 400 mètres carrés et pas plus de 200 mètres carrés</td>
                <td>De 201 à 250</td>
            </tr>
            <tr>
                <td>Classe 4, superficie de plus de 400 mètres carrés</td>
                <td>De 300 à 251</td>
            </tr>
        </table>
        <br />
        <h3 className="def-fisc">Le prix</h3>
        <ul>
            <li>.Le taux de la taxe sur les propriétés bâties était déterminé en fonction du niveau des services rendus par la commune : tels que l'éclairage public, le pavage des trottoirs et le pavage des routes.</li>
            <li>.Il varie selon les services utilisés.</li>
        </ul>
        <table  border={1} className="tab1-fisc">
            <tr>
                <td>Pourcentage</td>
                <td>Services aux bénéficiaires</td>
            </tr>
            <tr>
                <td>8%</td>
                <td>Pour les biens bénéficiant d'un ou deux services</td>
            </tr>
            <tr>
                <td>10%</td>
                <td>Pour les biens immobiliers bénéficiant de trois ou quatre services</td>
            </tr>
            <tr>
                <td>12%</td>
                <td>Pour les biens bénéficiant de plus de quatre services</td>
            </tr>
            <tr>
                <td>14%</td>
                <td>Pour les biens immobiliers bénéficiant de plus de quatre services et autres services</td>
            </tr>
        </table>
        <br />
        <h3 className="def-fisc">Extraction</h3>
        <p>La taxe sur les immeubles construits par le holding financier est prélevée au moyen d'un chèque annuel qui est établi par la commune.</p>
        <br />
        <h3 className="def-fisc">Pénalités</h3>
        <p>1,25 % pour chaque mois de retard (récemment exonéré par les frais émis par le ministère des Finances et liés uniquement aux péchés de l'année 2011)</p>
        <br />
        <h3 className="def-fisc">Objections</h3>
        <p>Les contestations doivent être présentées par écrit, accompagnées des pièces justificatives, au Comité d'Audit, dans un délai d'un mois à compter de la date de notification de l'information.</p>

        </>
    )
}
export default Fisc;