import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './concours.css';

const ConcoursPage = () => {
  const [concoursList, setConcoursList] = useState([]);

  useEffect(() => {
    // Initialize Firebase and get the Firestore database instance
    const db = getFirestore();

    // Fetch the concours from Firestore
    const fetchConcours = async () => {
      try {
        const concoursSnapshot = await getDocs(collection(db, 'concours'));
        const concoursData = concoursSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id }; // Create a new object with the 'id' field
        });
        setConcoursList(concoursData);
      } catch (error) {
        console.error('Error fetching concours:', error.message);
      }
    };

    fetchConcours();
  }, []);

  return (
    <div className="concours-page">
      <h1>Les concours</h1>
      <div className="concours-list">
        <h2>Liste des concours</h2>
        <ul>
          {concoursList.map((concours, index) => (
            <li key={index} className="concours-item">
              <div>
                <span>{concours.name}</span>
              </div>
              {concours.pdfURL && (
                <a href={concours.pdfURL} target="_blank" rel="noopener noreferrer" className="pdf-link">
                  Voir PDF
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConcoursPage;
