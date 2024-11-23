import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './userlogin.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      // Sign in the user using Firebase signInWithEmailAndPassword
      await signInWithEmailAndPassword(getAuth(), email, password);

      // Additional handling after successful login, e.g., redirect to dashboard
      console.log('User login successful!');
      const userUid = auth.currentUser ? auth.currentUser.uid : null;

      // Navigate to the /user route after successful login
      navigate(`/user/profile`);
    } catch (error) {
      // Handle login error, show error message, etc.
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p className='sig'>
  
Vous n'avez pas de compte ? <Link to="/signup" style={{ textDecoration: 'underline', color: '#007bff' }}>Inscrivez-vous</Link>
</p>

    </div>
  );
};

export default Login;
