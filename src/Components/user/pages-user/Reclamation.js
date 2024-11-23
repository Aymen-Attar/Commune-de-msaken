import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getFirestore, collection, addDoc, updateDoc,  query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Reclamation.css'
import Side from '../usersidebar';
const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    cin: "",
    reclamationType: "",
    address: "",
    reclamationSubject: "",
    photo: null, // Do not include the file in initial form values
    photoURL: "", // Initialize an empty string for the image URL
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom et prénom sont requis"),
    email: Yup.string().email("Adresse e-mail invalide").required(
      "L'adresse e-mail est requise"
    ),
    cin: Yup.string().required("Le numéro CIN est requis"),
    reclamationType: Yup.string().required("Le type de réclamation est requis"),
    address: Yup.string().required("L'adresse est requise"),
    reclamationSubject: Yup.string().required("Le sujet de réclamation est requis"),
    photo: Yup.mixed().required("La photo est requise"),
  });




  
  const onSubmit = async (values, { setSubmitting, setValues }) => {
    try {
      const db = getFirestore();
      const storage = getStorage();
  
      // Get the authenticated user
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        // Set the userId field in the form data
        values.userId = user.uid;
  
        // Add the form data to the "reclamation" collection in Firestore
        const docRef = await addDoc(collection(db, "reclamation"), values);
  
        // Handle file upload if a file was selected
        // ... (existing code for handling file upload) ...
  
        // Handle form submission success (e.g., show success message, redirect, etc.)
        console.log("Form data submitted:", values);
      } else {
        // Handle the case where the user is not authenticated
        console.log('User is not authenticated.');
      }
    } catch (error) {
      // Handle form submission error
      console.error("Error submitting form data:", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <>
    <Side />
    <div className="user-form">
        <h2>Posez votre Réclamation</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form">
        <div className="form-group">
          <label htmlFor="name">Nom et Prénom</label>
          <Field type="text" id="name" name="name" className="form-control" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="cin">Numéro CIN</label>
          <Field type="text" id="cin" name="cin" className="form-control" />
          <ErrorMessage name="cin" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="reclamationType">Type de réclamation</label>
          <Field as="select" id="reclamationType" name="reclamationType" className="form-control">
  <option value="">-Sélectionner-</option>
  <option value="Administration">Administration</option>
  <option value="Constructions Anarchiques">Constructions Anarchiques</option>
  <option value="Eclairage Public">Eclairage Public</option>
  <option value="Energie">Energie</option>
  <option value="Espaces Verts">Espaces Verts</option>
  <option value="Mobilité">Mobilité</option>
  <option value="Occupations Illégales">Occupations Illégales</option>
  <option value="Voirie">Voirie</option>
  <option value="Propreté">Propreté</option>
  <option value="Santé et Hygiène">Santé et Hygiène</option>
  <option value="Autres Réclamations">Autres Réclamations</option>
</Field>
          <ErrorMessage name="reclamationType" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Adresse</label>
          <Field type="text" id="address" name="address" className="form-control" />
          <ErrorMessage name="address" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="reclamationSubject">Sujet de réclamation</label>
          <Field type="text" id="reclamationSubject" name="reclamationSubject" className="form-control" />
          <ErrorMessage name="reclamationSubject" component="div" className="error" />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <Field type="file" id="photo" name="photo" className="form-control" />
          <ErrorMessage name="photo" component="div" className="error" />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Envoyer</button>
        </div>
      </Form>
    </Formik>
    </ div>
    </>
  );
};

export default UserForm;