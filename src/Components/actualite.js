import React, { useEffect, useState } from 'react';
import './actualite.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const EventSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Initialize Firebase and get the Firestore database instance
    const db = getFirestore();

    // Fetch the events from Firestore
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id }; // Create a new object with the 'id' field
        });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="event-section">
      <h2 className="section-title">Evenements</h2>
      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            {/* Replace this image tag with your actual image */}
            <img src={event.photoURL} alt={event.title} className="event-image" /> 
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;
