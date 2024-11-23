import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './profil.css'
import Aside from '../AdminSidebar'
const UserProfileDisplay = () => {
  const { userUid } = useParams();
  const [profileData, setProfileData] = useState(null);
  const auth = getAuth();
  const currentUserUid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchProfile = async () => {
      const firestore = getFirestore();
      const profileDocRef = doc(firestore, 'profiless', currentUserUid);

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
  }, [currentUserUid]);

  return (
    <>
    <Aside />
    <div className="user-profile-container">
      <h1>Profil</h1>
      {profileData && (
        <div className="profile-details">
                    <img
            src={profileData.profilePhotoUrl}
            alt="User Profile"
            className="user-profile-photo"
          />
          <p><strong>Nom:</strong> {profileData.nom}</p>
          <p><strong>Prenom:</strong> {profileData.prenom}</p>
          <p><strong>Adresse:</strong> {profileData.addresse}</p>
          <p><strong>CIN:</strong> {profileData.cin}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p><strong>Email: </strong>{profileData.email}</p>

          {/* Display other profile fields */}
        </div>
      )}
    </div>
    </>
  );
};

export default UserProfileDisplay;