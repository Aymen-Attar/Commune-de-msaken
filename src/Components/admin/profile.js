import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './profile.css'; // Add your CSS here
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';


const ProfileForm = ({ userType }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [addresse, setAddresse] = useState('');
    const [cin, setCin] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const navigate = useNavigate();
  
    // Get the current user's UID using Firebase authentication
    const auth = getAuth();
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
  
    const handleProfileSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const firestore = getFirestore();
        const profileData = {
          nom: nom,
          prenom: prenom,
          addresse: addresse,
          cin: cin,
          phone: phone,
          email: email,
          profilePhotoUrl: profilePhotoUrl,
        };
  
        // Save profile data to Firestore
        await setDoc(doc(firestore, 'profiless', userUid), profileData);
  
        // Redirect to appropriate route based on user type
        navigate(`/admin/profile`);
      } catch (error) {
        console.error('Error submitting profile:', error.message);
      }
    };

  const handleProfilePhotoChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profile-photos/${userUid}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePhotoUrl(downloadURL);
        setProfilePhoto(selectedFile);
      } catch (error) {
        console.error('Error uploading profile photo:', error.message);
      }
    }
  };

  return (
    <div className="profile-form">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          placeholder="Enter your last name"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label htmlFor="prenom">Prenom</label>
        <input
          type="text"
          id="prenom"
          placeholder="Enter your first name"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <label htmlFor="addresse">Addresse</label>
        <input
          type="text"
          id="addresse"
          placeholder="Enter your address"
          value={addresse}
          onChange={(e) => setAddresse(e.target.value)}
        />
        <label htmlFor="cin">CIN</label>
        <input
          type="text"
          id="cin"
          placeholder="Enter your CIN"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="profilePhoto">Profile Photo</label>
        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />
        {profilePhotoUrl && (
          <img
            src={profilePhotoUrl}
            alt="Profile"
            className="profile-photo-preview"
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
