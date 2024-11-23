import React, { useState, useEffect } from 'react';
import { addDoc, collection, getFirestore, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './concours-consult.css';
import Aside from '../AdminSidebar';

const AdminResultatConcoursInsert = () => {
  const [cin, setCIN] = useState('');
  const [post, setPost] = useState('');
  const [date, setDate] = useState('');
  const [submittedResults, setSubmittedResults] = useState([]); // State to store submitted results

  const db = getFirestore();

  useEffect(() => {
    // Fetch submitted results when the component mounts
    fetchSubmittedResults();
  }, []);

  const fetchSubmittedResults = async () => {
    try {
      const resultsSnapshot = await getDocs(collection(db, 'resultats'));
      const resultsData = resultsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmittedResults(resultsData);
    } catch (error) {
      console.error('Error fetching submitted results:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the "resultat concours" data to the Firestore collection "resultats"
      await addDoc(collection(db, 'resultats'), {
        cin,
        post,
        date,
      });

      // Clear the form data after successful submission
      setCIN('');
      setPost('');
      setDate('');

      // Fetch updated submitted results after adding a new one
      fetchSubmittedResults();

      alert('Resultat concours submitted successfully!');
    } catch (error) {
      console.error('Error adding resultat concours:', error.message);
    }
  };

  const handleRemoveResult = async (resultId) => {
    try {
      // Remove the result document from Firestore
      await deleteDoc(doc(db, 'resultats', resultId));

      // Fetch updated submitted results after removing one
      fetchSubmittedResults();

      alert('Resultat concours removed successfully!');
    } catch (error) {
      console.error('Error removing resultat concours:', error.message);
    }
  };
  return (
    <>
    <Aside />
    <div className="admin-resultat-concours-insert">
      <h2>Gérer concours</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CIN:</label>
          <input type="text" value={cin} onChange={(e) => setCIN(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Poste:</label>
          <input type="text" value={post} onChange={(e) => setPost(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">Soumettre</button>
      </form>
      <div className="submitted-results-list">
        <h3>Liste des résultats</h3>
        <ul>
          {submittedResults.map((result, index) => (
            <li key={index}>
              <p><span>CIN:</span> {result.cin}</p>
              <p><span>Poste:</span> {result.post}</p>
              <p><span>Date:</span> {result.date}</p>
              <button className='delete-button' onClick={() => handleRemoveResult(result.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default AdminResultatConcoursInsert;
