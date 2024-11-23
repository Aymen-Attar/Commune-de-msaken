import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './adminsignup.css';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Add username state

  const navigate = useNavigate();

  const handleAdminSignUp = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userUid = userCredential.user.uid; 

      // Additional admin-specific handling, if needed

      console.log('Admin registration successful!');

      // Navigate to admin dashboard or other routes
      navigate(`/profile/`);

    } catch (error) {
      console.error('Admin sign-up error:', error.message);
    }
  };

  return (
    <div className="admin-signup-form">
      <h2>Admin Sign Up</h2>
      <form onSubmit={handleAdminSignUp}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* New username input field */}
        {/*<label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
  />*/}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
