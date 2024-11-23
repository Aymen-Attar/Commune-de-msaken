import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './Displaydai.css';
import Side from '../usersidebar';
const UserSubmissionsPage = () => {
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      // Function to fetch the user's form submissions from Firebase Firestore
      const fetchUserSubmissions = async () => {
        try {
          // If the user is not logged in, do nothing
          if (!currentUser) return;
  
          // Initialize Firebase and get the Firestore database instance
          const db = getFirestore();
  
          // Query to get form submissions where userId matches the current user's UID
          const submissionsQuery = query(collection(db, 'submissions'), where('userId', '==', currentUser.uid));
  
          // Get form submissions for the current user
          const querySnapshot = await getDocs(submissionsQuery);
  
          // Convert the query snapshot into an array of form submissions
          const userSubmissionsArray = querySnapshot.docs.map((doc) => doc.data());
  
          // Set the user's form submissions state
          setUserSubmissions(userSubmissionsArray);
        } catch (error) {
          // Handle error while fetching form submissions
          console.error('Error fetching user form submissions:', error.message);
        }
      };
  
      // Listen for changes in the authentication state
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
  
      // Fetch the user's form submissions when the component mounts or when the current user changes
      fetchUserSubmissions();
  
      // Clean up the auth state change listener when the component unmounts
      return () => unsubscribe();
    }, [currentUser]);  // Add currentUser as a dependency to re-fetch submissions when the user changes

  return (
    <>
    <Side />
    <div className="user-submissions-page">
      {/*<h1>User Submissions Page</h1>*/}
      <div className="submissions-list">
        <h2>Mes demandes</h2>
        {userSubmissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <ul>
            {userSubmissions.map((submission, index) => (
              <li key={index}>
                {/* Display the form submission details here as per your design */}
                <div>
                  <strong>Nom:</strong> {submission.name}
                </div>
                <div>
                  <strong>Numéro CIN:</strong> {submission.cin}
                </div>
                <div>
                  {/* Display other form fields here */}
                  <strong>Address:</strong> {submission.address}
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
                <div>
          <strong>Statut:</strong> {submission.status}
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default UserSubmissionsPage;
