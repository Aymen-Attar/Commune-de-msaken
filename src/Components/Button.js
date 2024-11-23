import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Import your CSS file

const LoginDropdown = () => {
  const [selectedRole, setSelectedRole] = useState('User');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="login-container">
      <select className="login-dropdown" value={selectedRole} onChange={handleRoleChange}>
        <option value="User">Utilisateur</option>
        <option value="Admin">Admin</option>
      </select>
      <Link to={selectedRole === 'User' ? '/login' : '/admilogin'} className="login-link">
        <button className="login-button">Se connecter</button>
      </Link>
    </div>
  );
};

export default LoginDropdown;
