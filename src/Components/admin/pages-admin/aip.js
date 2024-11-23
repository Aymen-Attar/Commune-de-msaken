import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './aip.css';
import Aside from '../AdminSidebar';

const AdminPDFPage = () => {
  const [pdfFiles, setPDFFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize Firebase and get the Firestore database instance
  const db = getFirestore();
  const storage = getStorage();

  // Fetch PDF files from Firestore when the component mounts and whenever the pdfFiles changes
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
  }, [pdfFiles, db]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleAddPDFFile = async () => {
    if (selectedFile && title.trim() !== '') {
      try {
        const pdfRef = ref(storage, `pdfFiles/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(pdfRef, selectedFile);

        // Listen for state changes and errors during the upload
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, (error) => {
          console.error('Error uploading PDF:', error.message);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('PDF uploaded successfully:', downloadURL);

          // Add the new PDF file to the Firestore collection "pdfFiles"
          await addDoc(collection(db, 'pdfFiles'), {
            title: title.trim(),
            pdfURL: downloadURL,
          });

          // Clear the form data after successful submission
          setTitle('');
          setSelectedFile(null);
          setUploadProgress(0);
        });
      } catch (error) {
        console.error('Error adding PDF file:', error.message);
      }
    }
  };

  const handleRemovePDFFile = async (id) => {
    try {
      // Remove the PDF file document from Firestore
      await deleteDoc(doc(db, 'pdfFiles', id));
    } catch (error) {
      console.error('Error removing PDF file:', error.message);
    }
  };

  return (
    <>
    <Aside />

    <div className="admin-pdf-page">
      <h1>Page Plan d'investissement annuel</h1>
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
              <button onClick={() => handleRemovePDFFile(pdfFile.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-pdf">
        <h2>Ajouter un plan</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".pdf"
            id="pdf-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-upload" className="file-input-label">
            Choisir un fichier
          </label>
        </div>
        {selectedFile ? (
          <p className="selected-file">Fichier choisi: {selectedFile.name}</p>
        ) : (
          <p>Aucun fichier choisi</p>
        )}
        {uploadProgress > 0 && <p className="upload-progress">Progression du téléchargement: {uploadProgress.toFixed(2)}%</p>}
        <button onClick={handleAddPDFFile} disabled={!selectedFile || !title.trim()}>
          Ajouter
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminPDFPage;
