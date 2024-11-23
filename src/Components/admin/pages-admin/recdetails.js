import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const DetailedFormPage = () => {
  const { formId } = useParams();
  const [formSubmission, setFormSubmission] = useState(null);

  useEffect(() => {
    const fetchFormSubmission = async () => {
      try {
        const db = getFirestore();
        const storage = getStorage();
        const formRef = doc(db, "reclamation", formId);
        const formSnapshot = await getDoc(formRef);
        if (formSnapshot.exists()) {
          const formData = formSnapshot.data();
          if (formData.photoURL) {
            const photoRef = ref(storage, `reclamation_photos/${formData.photo.name}`);
            const downloadURL = await getDownloadURL(photoRef);
            formData.photoURL = downloadURL;
          }
          setFormSubmission(formData);
        } else {
          console.error("Form submission not found");
        }
      } catch (error) {
        console.error("Error fetching form submission:", error.message);
      }
    };

    fetchFormSubmission();
  }, [formId]);

  if (!formSubmission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailed-form-page">
      <h1>Detailed Form</h1>
      {/* Render the detailed form content */}
      <div><strong>Name:</strong> {formSubmission.name}</div>
      <div><strong>Email:</strong> {formSubmission.email}</div>
      {/* Add more fields here */}
      {formSubmission.photoURL && (
        <img src={formSubmission.photoURL} alt="Reclamation" className="submission-image" />
      )}
    </div>
  );
};

export default DetailedFormPage;
