import React, { useState } from 'react';
import { getDocs, query, where, collection, getFirestore } from 'firebase/firestore';
import './Per.css';
import Side from '../usersidebar';
const UserPermitSearch = () => {
  const [cin, setCIN] = useState('');
  const [folderNumber, setFolderNumber] = useState('');
  const [permit, setPermit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const db = getFirestore();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const permitQuery = query(
        collection(db, 'permits'),
        where('cin', '==', cin),
        where('folderNumber', '==', folderNumber)
      );

      const permitSnapshot = await getDocs(permitQuery);
      if (permitSnapshot.empty) {
        setPermit(null);
        setErrorMessage('Permit does not exist.');
      } else {
        const permitData = permitSnapshot.docs[0].data();
        setPermit(permitData);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error searching for permit:', error.message);
      setErrorMessage('An error occurred while searching for the permit.');
    }
  };

  return (
    <>
    <Side />
    <div className="user-permit-search">
      <h2>Consulter mon permis</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>CIN:</label>
          <input type="text" value={cin} onChange={(e) => setCIN(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Numéro du dossier:</label>
          <input type="text" value={folderNumber} onChange={(e) => setFolderNumber(e.target.value)} />
        </div>
        <button type="submit">Consulter</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {permit && (
        <div className="permit-details">
          <p>
            <span>CIN:</span> {permit.cin}
          </p>
          <p>
            <span>Numéro du dossier:</span> {permit.folderNumber}
          </p>
          <p>
            <span>Type de permis:</span> {permit.permitType}
          </p>
          <p>
            <span>Date d'expiration:</span> {permit.expirationDate}
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default UserPermitSearch;
