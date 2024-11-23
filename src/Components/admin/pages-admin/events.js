import React, { useEffect, useState } from 'react';
import './events.css';
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc, deleteDoc, addDoc,  getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable,  deleteObject } from 'firebase/storage';
import Aside from '../AdminSidebar';
const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);

  const [eventData, setEventData] = useState({
    photo: '',
    description: '',
  });

  // Initialize Firebase and get the Firestore database instance
  const db = getFirestore();
  const storage = getStorage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setEventData((prevState) => ({ ...prevState, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the photo to Firebase Storage and get the download URL
      if (eventData.photo) {
        const photoRef = ref(storage, `events/${eventData.photo.name}`);
        const uploadTask = uploadBytesResumable(photoRef, eventData.photo);

        // Listen for state changes and errors during the upload
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        }, (error) => {
          console.error('Error uploading photo:', error.message);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Photo uploaded successfully:', downloadURL);

          // Update the Firestore database with the new event data
          const newEvent = {
            description: eventData.description,
            photoURL: downloadURL, // Add the photo URL to the event data
          };

          // Add the new event to the Firestore collection "events"
          await addDoc(collection(db, 'events'), newEvent);

          // Clear the form data after successful submission
          setEventData({
            photo: '',
            description: '',
          });
        });
      } else {
        // If no photo is provided, add the event without a photoURL
        // Update the Firestore database with the new event data
        const newEvent = {
          description: eventData.description,
        };

        // Add the new event to the Firestore collection "events"
        await addDoc(collection(db, 'events'), newEvent);

        // Clear the form data after successful submission
        setEventData({
          photo: '',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };
  

  const handleRemoveEvent = async (eventId) => {
    try {
      // Get the event data by the eventId
      const eventDocRef = doc(collection(db, 'events'), eventId);
      const eventSnapshot = await getDoc(eventDocRef);
      const eventData = eventSnapshot.data();
  
      // Delete the photo from Firebase Storage if it exists
      if (eventData.photoURL) {
        await deleteObject(ref(storage, eventData.photoURL));
      }
  
      // Update the Firestore database to remove the event with the given eventId
      await deleteDoc(eventDocRef);
    } catch (error) {
      console.error('Error removing event:', error.message);
    }
  };
  
  
  

  useEffect(() => {
    // Fetch the events from Firestore when the component mounts
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsData = eventsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
    <Aside />
    <div className="admin-events-page">
      <h1>Page des Evenements</h1>
      <form className="admin-events-form" onSubmit={handleSubmit}>
        <div className="admin-events-form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
            className="admin-events-form-control"
          />
        </div>
        <div className="admin-events-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="admin-events-form-control"
          ></textarea>
        </div>
        <button type="submit" className="admin-events-btn admin-events-btn-primary">
          Ajouter Evenement
        </button>
      </form>
      <div className="admin-events-list">
        <h2>Liste des Evenements</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <div className="admin-events-item">
                {event.photo && <img src={URL.createObjectURL(event.photo)} alt={`Event ${index + 1}`} />}
                <p>{event.description}</p>
              </div>
              <button onClick={() => handleRemoveEvent(event.id)} className="admin-events-btn">
                Supprimer
              </button>

            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default AdminEventsPage;
