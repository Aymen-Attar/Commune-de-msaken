import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './user-management.css'
import Aside from '../AdminSidebar';

const AdminDashboard = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editedProfileData, setEditedProfileData] = useState({});

  useEffect(() => {
    // Fetch user profiles from Firestore
    const fetchUserProfiles = async () => {
      const db = getFirestore();
      const userProfilesCollection = collection(db, 'profiles');
      const userProfilesQuery = query(userProfilesCollection);

      try {
        const querySnapshot = await getDocs(userProfilesQuery);
        const profiles = [];
        querySnapshot.forEach((doc) => {
          profiles.push({ id: doc.id, ...doc.data() });
        });
        setUserProfiles(profiles);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    };

    fetchUserProfiles();
  }, []);

  const handleEditProfile = (profile) => {
    // Set the profile to be edited and initialize the edited profile data
    setEditingProfile(profile);
    setEditedProfileData({
      nom: profile.nom,
      prenom: profile.prenom,
      addresse: profile.addresse,
      cin: profile.cin,
      phone: profile.phone,
      email: profile.email,
      profilePhotoUrl: profile.profilePhotoUrl,
    });
  };

  const handleSaveEdit = async () => {
    // Update the user profile in Firestore with the edited data
    const db = getFirestore();
    const profileRef = doc(db, 'profiles', editingProfile.id);

    try {
      await updateDoc(profileRef, editedProfileData);
      // Clear the editing state
      setEditingProfile(null);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCancelEdit = () => {
    // Clear the editing state
    setEditingProfile(null);
  };
  const handleDeleteProfile = async (profileId) => {
    // Delete a user profile by ID
    const db = getFirestore();
    const profileRef = doc(db, 'profiles', profileId);
  
    try {
      await deleteDoc(profileRef);
      // Remove the deleted profile from the userProfiles state
      setUserProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== profileId));
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  return (
    <>
    <Aside />
    <div className="admin-dashboard">
      <h2 className="admin-dashboard-header">Les utilisateurs</h2>
      <table className="user-profiles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            {/* Add more fields as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{editingProfile === profile ? (
                <input
                  type="text"
                  value={editedProfileData.nom}
                  onChange={(e) =>
                    setEditedProfileData({
                      ...editedProfileData,
                      nom: e.target.value,
                    })
                  }
                />
              ) : (
                profile.nom
              )}</td>
              <td>{editingProfile === profile ? (
                <input
                  type="text"
                  value={editedProfileData.prenom}
                  onChange={(e) =>
                    setEditedProfileData({
                      ...editedProfileData,
                      prenom: e.target.value,
                    })
                  }
                />
              ) : (
                profile.prenom
              )}</td>
              <td>{profile.email}</td>
              {/* Add more fields as needed */}
              <td>
                {editingProfile === profile ? (
                  <>
                    <button className="admin-dashboard-button" onClick={handleSaveEdit}>Sauvgarder</button>
                    <button className="admin-dashboard-button" onClick={handleCancelEdit}>Annuler</button>
                  </>
                ) : (
                  <button className="admin-dashboard-button" onClick={() => handleEditProfile(profile)}>Modifier</button>
                )}
                <button className="admin-dashboard-button" onClick={() => handleDeleteProfile(profile.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminDashboard;
