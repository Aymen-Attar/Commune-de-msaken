import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './userpro.css';
import Side from '../usersidebar';

const UserProfileDisplay = () => {
  const [profileData, setProfileData] = useState(null);

  const auth = getAuth();
  const userUid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchProfile = async () => {
      const firestore = getFirestore();
      const profileDocRef = doc(firestore, 'profiles', userUid);

      try {
        const profileDoc = await getDoc(profileDocRef);
        if (profileDoc.exists()) {
          setProfileData(profileDoc.data());
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfile();
  }, [userUid]);

  return (
    <>
    <Side />
    <div className="user-profile-container">
      <h1>Profil</h1>
      {profileData && (
        <div className="user-profile-details">
          <img
            src={profileData.profilePhotoUrl}
            alt="User Profile"
            className="user-profile-photo"
          />
          <p>Nom: {profileData.nom}</p>
          <p>Prenom: {profileData.prenom}</p>
          <p>Adresse: {profileData.addresse}</p>
          <p>CIN: {profileData.cin}</p>
          <p>Phone: {profileData.phone}</p>
          <p>Email: {profileData.email}</p>
          {/* Display other profile fields */}
        </div>
      )}
    </div>
    </>
  );
};

export default UserProfileDisplay;
