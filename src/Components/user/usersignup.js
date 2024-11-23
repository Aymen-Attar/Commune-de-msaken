import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import './usersignup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Create a new user account using Firebase createUserWithEmailAndPassword
      await createUserWithEmailAndPassword(getAuth(), email, password);

      // Additional user data can be stored in the Firestore database or any other backend
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');

      // Save additional user data to Firestore
      await setDoc(doc(usersCollection, email), {
        username: username,
        // Add any other user-related data you want to store
      });

      console.log('User registration successful!');

      // Navigate to the /user route after successful signup
      navigate('/usprofile');
    } catch (error) {
      // Handle sign-up error, show error message, etc.
      console.error('Sign-up error:', error.message);
    }
  };
  return (
    <div className="signup-form">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/*<div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
  </div>*/}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
