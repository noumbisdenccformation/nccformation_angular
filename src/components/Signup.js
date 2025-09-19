// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Inscription réussie !');
    } catch (error) {
      setError(error.message);
      console.error('Erreur d\'inscription : ', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Créer un compte</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Signup;