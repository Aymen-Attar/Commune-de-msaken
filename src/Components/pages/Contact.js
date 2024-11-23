import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Contact.css"

const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    Subject: "",
    message:"",
  
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom et prénom sont requis"),
    email: Yup.string().email("Adresse e-mail invalide").required(
      "L'adresse e-mail est requise"
    ),

    Subject: Yup.string(),
    message: Yup.string().required("Le message est requis"),
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
          <label htmlFor="Subject">Sujet</label>
          <Field type="text" id="Subject" name="Subject" className="form-control" />
          <ErrorMessage name="Subject" component="div" className="error" />
        </div>

        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <Field type="text" id="message" name="message" className="form-control" />
          <ErrorMessage name="message" component="div" className="error" />
        </div>



        <div className="form-group">
          <button type="submit" className="btn btn-primary">Envoyer</button>
        </div>
      </Form>
    </Formik>
  );
};

export default UserForm;
