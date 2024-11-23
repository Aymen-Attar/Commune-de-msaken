import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './pad.css';

const PDFDisplayPage = () => {
  const [pdfFiles, setPDFFiles] = useState([]);

  // Initialize Firebase and get the Firestore database instance
  const db = getFirestore();

  // Fetch PDF files from Firestore when the component mounts
  useEffect(() => {
    const fetchPDFFiles = async () => {
      try {
        const pdfSnapshot = await getDocs(collection(db, 'pdfFiles'));
        const pdfData = pdfSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setPDFFiles(pdfData);
      } catch (error) {
        console.error('Error fetching PDF files:', error.message);
      }
    };

    fetchPDFFiles();
  }, [db]);

  return (
    <div className="pdf-display-page">
      <h1>Plan annuel d'investissement</h1>
      <div className="pdf-list">
        <h2>Les plans</h2>
        <ul>
          {pdfFiles.map((pdfFile) => (
            <li key={pdfFile.id}>
              <span>{pdfFile.title}</span>
              {pdfFile.pdfURL && (
                <a className="pdf-link" href={pdfFile.pdfURL} target="_blank" rel="noopener noreferrer">
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

export default PDFDisplayPage;
