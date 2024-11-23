import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Displayrec.css'
import Side from '../usersidebar';

const UserFormsList = () => {
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    // Fetch user-specific forms from Firestore
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid; // Use the user's ID as a filter
      console.log('Current User ID:', userId); // Check if the user ID is correct
      const formsRef = collection(db, 'reclamation');
      const userFormsQuery = query(formsRef, where('userId', '==', userId));

      getDocs(userFormsQuery)
        .then((querySnapshot) => {
          const forms = querySnapshot.docs.map((doc) => doc.data());
          console.log('User Forms:', forms); // Check if the forms are fetched correctly
          setUserForms(forms);
        })
        .catch((error) => {
          console.error('Error fetching user forms:', error);
        });
    }
  }, []);

  return (
    <>
    <Side />
    <div className="user-forms-list">
      <h2>Mes réclamations</h2>
      <ul>
        {userForms.map((form) => (
          <li key={form.id} className="form-item">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Numéro CIN:</strong> {form.cin}</p>
            <p><strong>Type de réclamation:</strong> {form.reclamationType}</p>
            <p><strong>Adresse:</strong> {form.address}</p>
            <p><strong>Sujet de réclamation:</strong> {form.reclamationSubject}</p>
            {form.photoURL && <img src={form.photoURL} alt="Form Photo" className="form-photo" />}
            {form.seen && <div className='seen'>La réclamation est en cours de traitement</div>}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default UserFormsList;
