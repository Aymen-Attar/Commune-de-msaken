import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Adminsidebar.css'; // Import the CSS file for styling
import admilogo from '../images/msakin.png';


const AdminSidebar = () => {
  const [showConcours, setShowConcours] = useState(false);
  const navigate = useNavigate(); 

  const toggleConcours = () => {
    setShowConcours(!showConcours);
  };
  const handleDisconnect = async () => {
    const auth = getAuth();
    try {
      // Perform the sign-out operation
      // Replace 'auth' with your Firebase authentication instance
      await signOut(auth);

      // Redirect the admin to the login page
      navigate('/admilogin');
    } catch (error) {
      console.error('Error disconnecting:', error.message);
    }
  };


  return (
    <aside className="admin-sidebar">
           <div className="admin-sidebar__logo">
        <img src={admilogo}  alt="Logo" />
      </div>
      <ul className="admin-sidebar__menu">
        <li>
          <Link to="/admin/profile" className="admin-sidebar__link">
            Profil
          </Link>
        </li>
        <li>
          <Link to="/admin/events" className="admin-sidebar__link">
            Evenements
          </Link>
        </li>
        <li>
          <Link to="/admin/investment-plan" className="admin-sidebar__link">
            Plan d'investissement annuel
          </Link>
        </li>
        <li onClick={toggleConcours}>
          <div className="admin-sidebar__link">Concours</div>
          {showConcours && (
            <ul className="admin-sidebar__submenu">
              <li>
                <Link to="/admin/contests" className="admin-sidebar__link">
                  Ajouter Concours
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/consult-contests"
                  className="admin-sidebar__link"
                >
                  Gérer Concours
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/admin/reclamation" className="admin-sidebar__link">
            Consulter Réclamations
          </Link>
        </li>
        <li>
          <Link
            to="/admin/information-access"
            className="admin-sidebar__link"
          >
            Consulter Demandes d'Accès à l'Information
          </Link>
        </li>
        <li>
          <Link
            to="/admin/building-permits"
            className="admin-sidebar__link"
          >
            Gérer les Permis de Bâtir
          </Link>
        </li>
        <li>
          <Link
            to="/admin/user-management"
            className="admin-sidebar__link"
          >
            Gestion d'Utilisateurs
          </Link>
        </li>
      </ul>
      <div className="admin-sidebar__disconnect">
        <button className ='admin-sidebar__disconnect' onClick={handleDisconnect}>Se déconnecter</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
