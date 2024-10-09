'use client';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth'; // Your Firebase config
import app from '../firebaseConfig';

const auth = getAuth(app);

/**
 * LoginLogout component allows users to log in or out.
 *
 * It handles user authentication via Firebase and displays
 * different UI elements based on the user's authentication state.
 *
 * @returns {JSX.Element} The rendered component.
 */
const LoginLogout = () => {
  console.log('login'); // Log for debugging
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [user, setUser] = useState(null); // State for the authenticated user
  const [error, setError] = useState(''); // State for error messages

  /**
   * Handles the login process when the user submits the login form.
   * It uses Firebase's signInWithEmailAndPassword method to authenticate the user.
   *
   * @param {React.FormEvent} e - The event triggered by the form submission.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the user state to the authenticated user
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Failed to log in'); // Set an error message if login fails
    }
  };

  /**
   * Handles the logout process when the user clicks the log out button.
   * It uses Firebase's signOut method to log out the authenticated user.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user state
    } catch (err) {
      console.error('Failed to log out:', err); // Log an error if logout fails
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginLogout;
