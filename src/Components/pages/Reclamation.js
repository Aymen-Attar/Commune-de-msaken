import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Reclamation.css"

const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    cin: "",
    reclamationType: "",
    address: "",
    reclamationSubject: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom et prénom sont requis"),
    email: Yup.string().email("Adresse e-mail invalide").required(
      "L'adresse e-mail est requise"
    ),
    cin: Yup.string().required("Le numéro CIN est requis"),
    reclamationType: Yup.string().required("Le type de réclamation est requis"),
    adresse: Yup.string(),
    reclamationSubject: Yup.string().required("Le sujet de réclamation est requis"),
    photo: Yup.mixed().required("La photo est requise"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
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
            <option value="Option 1">Administration</option>
            <option value="Option 2">Constructions Anarchiques</option>
            <option value="Option 3">Eclairage Public</option>
            <option value="Option 4">Energie</option>
            <option value="Option 5">Espaces Verts</option>
            <option value="Option 6">Mobilité</option>
            <option value="Option 7">Occupations Illégales</option>
            <option value="Option 8">Voirie</option>
            <option value="Option 9">Propreté</option>
            <option value="Option 10">Santé et Hygiène</option>
            <option value="Option 11">Autres Réclamations</option>
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
  );
};

export default UserForm;
