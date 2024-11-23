import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './permis.css';
import Aside from '../AdminSidebar';

const AdminPermitPage = () => {
  const [cin, setCIN] = useState('');
  const [folderNumber, setFolderNumber] = useState('');
  const [permitType, setPermitType] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [permitList, setPermitList] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    fetchPermits(); // Fetch permits when the component mounts
  }, []);

  const fetchPermits = async () => {
    try {
      const permitSnapshot = await getDocs(collection(db, 'permits'));
      const permitData = permitSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPermitList(permitData);
    } catch (error) {
      console.error('Error fetching permits:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the permit data to the Firestore collection "permits"
      await addDoc(collection(db, 'permits'), {
        cin,
        folderNumber,
        permitType,
        expirationDate,
      });

      // Clear the form data after successful submission
      setCIN('');
      setFolderNumber('');
      setPermitType('');
      setExpirationDate('');
      alert('Permit submitted successfully!');
      fetchPermits(); // Fetch updated permits after adding a new one
    } catch (error) {
      console.error('Error adding permit:', error.message);
    }
  };

  const handleRemovePermit = async (id) => {
    try {
      // Remove the permit document from Firestore
      await deleteDoc(doc(db, 'permits', id));
      fetchPermits(); // Fetch updated permits after removing one
    } catch (error) {
      console.error('Error removing permit:', error.message);
    }
  };

  return (
    <>
    <Aside />
    <div className="admin-permit-page">
      <h1>Gérer les permis</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CIN:</label>
          <input type="text" value={cin} onChange={(e) => setCIN(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Numéro dossier:</label>
          <input type="text" value={folderNumber} onChange={(e) => setFolderNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type de permis:</label>
          <input type="text" value={permitType} onChange={(e) => setPermitType(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date d'expiration:</label>
          <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        </div>
        <button type="submit">Soumettre</button>
      </form>
      <div className="permit-list">
        <h2>Liste des permis</h2>
        <ul>
          {permitList.map((permit) => (
            <li key={permit.id}>
              <div className="permit-details">
                <p>
                  <span>CIN:</span> {permit.cin}
                </p>
                <p>
                  <span>Numéro dossier:</span> {permit.folderNumber}
                </p>
                <p>
                  <span>Type de permis:</span> {permit.permitType}
                </p>
                <p>
                  <span>Date d'expiration:</span> {permit.expirationDate}
                </p>
                <button onClick={() => handleRemovePermit(permit.id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default AdminPermitPage;