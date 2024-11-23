//import React from "react";
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Dai.css"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Us from '../usersidebar.js'
const AccessForm = () => {
  const initialValues = {
    name: "",
    cin: "",
    address: "",
    phoneNumber: "",
    email: "",
    document: "",
    administrativeStructure: "",
    reference: "",
    accessType: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom est requis"),
    cin: Yup.string().required("Le numéro CIN est requis"),
    address: Yup.string().required("L'adresse est requise"),
    phoneNumber: Yup.string().required("Le numéro de téléphone est requis"),
    email: Yup.string().email("Adresse e-mail invalide").required("L'adresse e-mail est requise"),
    document: Yup.string().required("Le champ Document est requis"),
    administrativeStructure: Yup.string().required("Le champ La structure administrative pertinente est requis"),
    reference: Yup.string(),
    accessType: Yup.string().required("Le type d'accès à l'information est requis"),
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);

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
  }, [currentUser]); // Add currentUser as a dependency to re-fetch submissions when the user changes

  const onSubmit = async (values) => {
    try {
      // If the user is logged in, add their UID to the form data
      if (currentUser) {
        values.userId = currentUser.uid;
      }

      // Initialize Firebase and get the Firestore database instance
      const db = getFirestore();

      // Add the form data to a "submissions" collection in Firestore
      await addDoc(collection(db, 'submissions'), values);

      // Handle form submission success
      console.log('Form submission successful:', values);
    } catch (error) {
      // Handle form submission error
      console.error('Form submission error:', error.message);
    }
  };

  return (
    <>
    <Us />
    <div className="access-form-container">
    <div className="containe">
    <div className="form-wrappe">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
          <h2>Posez votre Demande</h2>
          <label htmlFor="name">Nom</label>
          <Field type="text" id="name" name="name" className="form-control" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="cin">Numéro CIN</label>
          <Field type="text" id="cin" name="cin" className="form-control" />
          <ErrorMessage name="cin" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Adresse</label>
          <Field type="text" id="address" name="address" className="form-control" />
          <ErrorMessage name="address" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Numéro de téléphone</label>
          <Field type="text" id="phoneNumber" name="phoneNumber" className="form-control" />
          <ErrorMessage name="phoneNumber" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <h3>Informations à consulter</h3>

        <div className="form-group">
          <label htmlFor="document">DOCUMENT</label>
          <Field type="text" id="document" name="document" className="form-control" />
          <ErrorMessage name="document" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="administrativeStructure">LA STRUCTURE ADMINISTRATIVE PERTINENTE</label>
          <Field type="text" id="administrativeStructure" name="administrativeStructure" className="form-control" />
          <ErrorMessage name="administrativeStructure" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="reference">(RÉFÉRENCE) S'IL EXISTE</label>
          <Field type="text" id="reference" name="reference" className="form-control" />
          <ErrorMessage name="reference" component="div" className="error" />
        </div>

        <h3>Type d'accès à l'information</h3>

        <div className="form-group">
          <Field as="select" id="accessType" name="accessType" className="form-control">
            <option value="">Choisir une option</option>
            <option value="VOIR LES INFORMATIONS SUR PLACE">VOIR LES INFORMATIONS SUR PLACE</option>
            <option value="OBTENIR UNE COPIE PAPIER">OBTENIR UNE COPIE PAPIER</option>
            <option value="OBTENIR UNE COPIE ÉLECTRONIQUE DE L'INFORMATION">OBTENIR UNE COPIE ÉLECTRONIQUE DE L'INFORMATION</option>
            <option value="OBTENIR DES EXTRAITS DE L'INFORMATION">OBTENIR DES EXTRAITS DE L'INFORMATION</option>
          </Field>
          <ErrorMessage name="accessType" component="div" className="error" />
        </div>

        <div className="form-group">
          <button type="submit" className='hawahou'>Envoyer</button>
        </div>
      </Form>
    </Formik>
    </div>
    </div>
    </div>
    </>
  );
};

export default AccessForm;
