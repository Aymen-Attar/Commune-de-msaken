import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './reclamationsa.css'
import Aside from '../AdminSidebar';

const AdminPage = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);

  useEffect(() => {
    // Initialize Firebase and get the Firestore database instance
    const db = getFirestore();
    const storage = getStorage();

    // Fetch the form submissions from Firestore
    const fetchFormSubmissions = async () => {
      try {
        const submissionsSnapshot = await getDocs(collection(db, "reclamation"));
        const submissionsData = [];
        for (const doc of submissionsSnapshot.docs) {
          const data = doc.data();
          if (data.photoURL) {
            // If photoURL is present, it means the form submission has an image
            // Retrieve the download URL of the image from Firebase Storage
            const photoRef = ref(storage, `reclamation_photos/${data.photo.name}`);
            const downloadURL = await getDownloadURL(photoRef);
            data.photoURL = downloadURL;
          }
          submissionsData.push({ ...data, id: doc.id }); // Create a new object with the 'id' field
        }
        setFormSubmissions(submissionsData);
      } catch (error) {
        console.error("Error fetching form submissions:", error.message);
      }
    };

    fetchFormSubmissions();
  }, []);

  const handleSeenClick = async (formId) => {
    try {
      const db = getFirestore();
      const formRef = doc(collection(db, "reclamation"), formId);
      await updateDoc(formRef, { seen: true });

      // Remove the form submission from the state after it's marked as seen
      setFormSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission.id !== formId));
    } catch (error) {
      console.error("Error updating 'seen' status:", error.message);
    }
  };

  return (
    <>
    <Aside />
    <div className="admin-submissions-page">
      <h1>Les Réclamations</h1>
      <div className="submissions-list">
        {formSubmissions.map((submission, index) => (
          <div key={index} className="submission-container">
            <h3>Réclamation #{index + 1}</h3>
            <div><strong>Nom:</strong> {submission.name}</div>
            <div><strong>Email:</strong> {submission.email}</div>
            <div><strong>Numéro CIN:</strong> {submission.cin}</div>
            <div><strong>Type de réclamation:</strong> {submission.reclamationType}</div>
            <div><strong>Adresse:</strong> {submission.address}</div>
            <div><strong>Sujet de réclamation:</strong> {submission.reclamationSubject}</div>
            {submission.photoURL && <img src={submission.photoURL} alt="Reclamation" className="submission-image" />}
            {!submission.seen && <button className='seen-btn' onClick={() => handleSeenClick(submission.id)}>Soumettre la réclamation</button>}

            
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminPage;