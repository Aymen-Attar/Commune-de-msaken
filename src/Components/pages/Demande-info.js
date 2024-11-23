import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Demande-info.css"

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

  const onSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
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
          <button type="submit">Envoyer</button>
        </div>
      </Form>
    </Formik>
  );
};

export default AccessForm;
