import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './usersidebar.css'; // Import the CSS file for styling
import Uslogo from '../images/msakin.png'

const UserSidebar = () => {
  const [showReclamations, setShowReclamations] = useState(false);
  const [showDemandes, setShowDemandes] = useState(false);
  const navigate = useNavigate(); 

  const toggleReclamations = () => {
    setShowReclamations(!showReclamations);
  };

  const toggleDemandes = () => {
    setShowDemandes(!showDemandes);
  };
  const handleDisconnect = async () => {
    const auth = getAuth();
    try {
      // Perform the sign-out operation
      // Replace 'auth' with your Firebase authentication instance
      await signOut(auth);

      // Redirect the admin to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error disconnecting:', error.message);
    }
  };


  return (
    <aside className="user-sidebar">
                 <div className="user-sidebar__logo">
        <img src={Uslogo}  alt="Logo" />
      </div>
      <ul className="user-sidebar__menu">
        <li>
          <Link to="/user/profile" className="user-sidebar__link">
            Profil
          </Link>
        </li>
        <li onClick={toggleReclamations}>
          <div className="user-sidebar__link">Réclamations</div>
          {showReclamations && (
            <ul className="user-sidebar__submenu">
              <li>
                <Link to="/user/reclamation" className="user-sidebar__link">
                  Ajouter une réclamation
                </Link>
              </li>
              <li>
                <Link
                  to="/user/mes-reclamations"
                  className="user-sidebar__link"
                >
                  Mes réclamations
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={toggleDemandes}>
          <div className="user-sidebar__link">
            Demande d'accès à l'information
          </div>
          {showDemandes && (
            <ul className="user-sidebar__submenu">
              <li>
                <Link to="/user/Demandes" className="user-sidebar__link">
                  Ajouter une demande d'accès à l'information
                </Link>
              </li>
              <li>
                <Link
                  to="/user/MesDemandes"
                  className="user-sidebar__link"
                >
                  Mes demandes
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/user/Permis" className="user-sidebar__link">
            Permis de bâtir
          </Link>
        </li>
        <li>
          <Link to="/user/Concours" className="user-sidebar__link">
            Concours
          </Link>
        </li>
      </ul>
      <div className="user-sidebar__disconnect">
        <button className ='user-sidebar__disconnect-button' onClick={handleDisconnect}>Se déconnecter</button>
      </div>
    </aside>
  );
};

export default UserSidebar;
