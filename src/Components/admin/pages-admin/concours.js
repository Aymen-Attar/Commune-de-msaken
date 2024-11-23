import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './concours.css';
import Aside from '../AdminSidebar';

const AdminConcoursPage = () => {
  const [concoursList, setConcoursList] = useState([]);
  const [newConcours, setNewConcours] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize Firebase and get the Firestore database instance
  const db = getFirestore();
  const storage = getStorage();

  // Fetch concours data from Firestore when the component mounts and whenever the concoursList changes
  useEffect(() => {
    const fetchConcours = async () => {
      try {
        const concoursSnapshot = await getDocs(collection(db, 'concours'));
        const concoursData = concoursSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setConcoursList(concoursData);
      } catch (error) {
        console.error('Error fetching concours:', error.message);
      }
    };

    fetchConcours();
  }, [concoursList, db]);

  const handleAddConcours = async () => {
    if (newConcours.trim() !== '') {
      try {
        // Upload the PDF to Firebase Storage and get the download URL
        if (selectedPDF) {
          const pdfRef = ref(storage, `concours/${selectedPDF.name}`);
          const uploadTask = uploadBytesResumable(pdfRef, selectedPDF);

          // Listen for state changes and errors during the upload
          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress); // Update the upload progress state
          }, (error) => {
            console.error('Error uploading PDF:', error.message);
          }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('PDF uploaded successfully:', downloadURL);

            // Add the new concours to the Firestore collection "concours"
            await addDoc(collection(db, 'concours'), {
              name: newConcours,
              pdfURL: downloadURL, // Add the PDF URL to the concours data
            });

            // Clear the form data after successful submission
            setNewConcours('');
            setSelectedPDF(null);
            setUploadProgress(0);
          });
        } else {
          // If no PDF is provided, add the concours without a pdfURL
          // Add the new concours to the Firestore collection "concours"
          await addDoc(collection(db, 'concours'), {
            name: newConcours,
          });

          // Clear the form data after successful submission
          setNewConcours('');
        }
      } catch (error) {
        console.error('Error adding concours:', error.message);
      }
    }
  };

  const handleRemoveConcours = async (id) => {
    try {
      // Remove the concours document from Firestore
      await deleteDoc(doc(db, 'concours', id));
    } catch (error) {
      console.error('Error removing concours:', error.message);
    }
  };
  

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setSelectedPDF(file); // Update the variable name to setSelectedPDF
  };

  return (
    <>
    <Aside />
    <div className="admin-concours-page">
      <h1>Page des concours</h1>
      <div className="concours-list">
        <h2>Liste des concours</h2>
        <ul>
          {concoursList.map((concours) => (
            <li key={concours.id}>
              <div>
                <span>{concours.name}</span>
                <button onClick={() => handleRemoveConcours(concours.id)}>Supprimer</button>
              </div>
              {concours.pdfURL && (
                <a className="pdf-link" href={concours.pdfURL} target="_blank" rel="noopener noreferrer">Voir PDF</a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-concours">
        <h2>Ajouter Concours</h2>
        <input
          type="text"
          value={newConcours}
          onChange={(e) => setNewConcours(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfChange}
        />
        {selectedPDF && (
          <p>PDF choisi: {selectedPDF.name}</p>
        )}
                {/* Display the upload progress */}
        {uploadProgress > 0 && <p className="upload-progress">Progression du téléchargement: {uploadProgress.toFixed(2)}%</p>}
        <button onClick={handleAddConcours} disabled={!newConcours || !selectedPDF}>
          Ajouter 
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminConcoursPage;
