import React, { useState } from 'react';
import { getDocs, query, where, collection, getFirestore } from 'firebase/firestore';
import './Conc.css';
import Side from '../usersidebar';

const UserResultatConcoursSearch = () => {
  const [cin, setCIN] = useState('');
  const [resultatConcours, setResultatConcours] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const db = getFirestore();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const resultatConcoursQuery = query(
        collection(db, 'resultats'),
        where('cin', '==', cin)
      );

      const resultatConcoursSnapshot = await getDocs(resultatConcoursQuery);
      if (resultatConcoursSnapshot.empty) {
        setResultatConcours(null);
        setErrorMessage('Resultat concours does not exist.');
      } else {
        const resultatConcoursData = resultatConcoursSnapshot.docs.map((doc) => doc.data());
        setResultatConcours(resultatConcoursData);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error searching for resultat concours:', error.message);
      setErrorMessage('An error occurred while searching for the resultat concours.');
    }
  };

  return (
    <>
    <Side />
    <div className="user-resultat-concours-search">
      <h2>Consulter concours</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>CIN:</label>
          <input type="text" value={cin} onChange={(e) => setCIN(e.target.value)} />
        </div>
        <button type="submit">Consulter</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {resultatConcours && (
        <div className="resultat-concours-details">
          <h3>Resultat de Concours </h3>
          {resultatConcours.map((resultat, index) => (
            <div key={index}>
              <p>
                <span>CIN:</span> {resultat.cin}
              </p>
              <p>
                <span>Poste:</span> {resultat.post}
              </p>
              <p>
                <span>Date du concours:</span> {resultat.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default UserResultatConcoursSearch;
