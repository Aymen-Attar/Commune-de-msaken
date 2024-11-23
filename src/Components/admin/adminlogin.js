import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './adminlogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Additional admin-specific handling, if needed

      console.log('Admin login successful!');
      const userUid = auth.currentUser ? auth.currentUser.uid : null;
      // Navigate to admin dashboard or other routes
      navigate(`/admin/profile`);
    } catch (error) {
      console.error('Admin login error:', error.message);
    }
  };

  return (
    <div className="admin-login-form">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleAdminLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* New username input field */}
       {/* <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
  />*/}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;
