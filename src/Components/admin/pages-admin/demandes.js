import React, { useState, useEffect } from 'react';
import './demandes.css';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import Aside from '../AdminSidebar';

const AdminSubmissionsPage = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);

  // Function to fetch form submissions from Firebase Firestore
  const fetchFormSubmissions = async () => {
    try {
      // Initialize Firebase and get the Firestore database instance
      const db = getFirestore();

      // Get all documents from the "submissions" collection
      const querySnapshot = await getDocs(collection(db, 'submissions'));

      // Convert the query snapshot into an array of form submissions
      const submissionsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Set the form submissions state
      setFormSubmissions(submissionsArray);
    } catch (error) {
      // Handle error while fetching form submissions
      console.error('Error fetching form submissions:', error.message);
    }
  };

  useEffect(() => {
    // Fetch form submissions when the component mounts
    fetchFormSubmissions();
  }, []);

  const markFormAsSeen = async (submissionId) => {
    try {
      // Initialize Firebase and get the Firestore database instance
      const db = getFirestore();

      // Update the "seen" field to true for the specified submission
      await setDoc(doc(db, 'submissions', submissionId), { seen: true }, { merge: true });

      // After marking the form as seen, you can re-fetch the form submissions to update the UI
      fetchFormSubmissions();
    } catch (error) {
      console.error('Error marking form as seen:', error.message);
    }
  };
  const markFormAsSee = async (submissionId) => {
    try {
      // Initialize Firebase and get the Firestore database instance
      const db = getFirestore();
  
      // Update the "status" field to 'Seen' for the specified submission
      await setDoc(doc(db, 'submissions', submissionId), { status: 'Seen' }, { merge: true });
  
      // After marking the form as seen, you can re-fetch the form submissions to update the UI
      fetchFormSubmissions();
    } catch (error) {
      console.error('Error marking form as seen:', error.message);
    }
  };
  
  const markFormAsAccepted = async (submissionId) => {
    try {
      const db = getFirestore();
      await setDoc(doc(db, 'submissions', submissionId), { status: 'Accepté' }, { merge: true });
      fetchFormSubmissions();
    } catch (error) {
      console.error('Error marking form as accepted:', error.message);
    }
  };
  
  const markFormAsRefused = async (submissionId) => {
    try {
      const db = getFirestore();
      await setDoc(doc(db, 'submissions', submissionId), { status: 'Refusé' }, { merge: true });
      fetchFormSubmissions();
    } catch (error) {
      console.error('Error marking form as refused:', error.message);
    }
  };

  

  return (
    <>
    <Aside />
    <div className="admin-submissions-page">
      {/*<h1>Admin Submissions Page</h1>*/}
      <div className="submissions-list">
        <h2>Les Demandes</h2>
        {formSubmissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <ul>
            {formSubmissions.map((submission, index) => (
              <li key={index}>
                <h3>Demande #{index + 1}</h3>
                <div>
                  <strong>Nom:</strong> {submission.name}
                </div>
                <div>
                  <strong>Numéro CIN:</strong> {submission.cin}
                </div>
                <div>
                  <strong>Adresse:</strong> {submission.address}
                </div>
                <div>
                  <strong>Numéro de téléphone:</strong> {submission.phoneNumber}
                </div>
                <div>
                  <strong>Email:</strong> {submission.email}
                </div>
                <div>
                  <strong>Document:</strong> {submission.document}
                </div>
                <div>
                  <strong>Structure administrative:</strong> {submission.administrativeStructure}
                </div>
                <div>
                  <strong>Référence:</strong> {submission.reference}
                </div>
                <div>
                  <strong>Type d'accès à l'information:</strong> {submission.accessType}
                </div>
                
                {submission.status !== 'Accepté' && submission.status !== 'Refusé' && (
        <>
          <button className='seen-btn' onClick={() => markFormAsRefused(submission.id)}>Refusé</button>
          <button className='seen-btn' onClick={() => markFormAsAccepted(submission.id)}>Accepté</button>
        </>
      )}
                

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminSubmissionsPage;
