import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth'; // Your Firebase config
import app from '../firebaseConfig';

const auth = getAuth(app);

/**
 * LoginLogout component handles user authentication, allowing users to log in
 * with their email and password or log out if they are authenticated.
 *
 * @returns {JSX.Element} The rendered component.
 */
const LoginLogout = () => {
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [user, setUser] = useState(null); // User state
  const [error, setError] = useState(''); // Error state

  /**
   * Handles the login process when the form is submitted.
   * It authenticates the user using Firebase's signInWithEmailAndPassword method.
   *
   * @param {React.FormEvent} e - The event triggered by the form submission.
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set the authenticated user
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Failed to log in'); // Set error message if login fails
    }
  };

  /**
   * Handles the logout process when the logout button is clicked.
   * It signs out the user using Firebase's signOut method.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the authenticated user
      setUser(null); // Clear the user state
    } catch (err) {
      console.error('Failed to log out:', err); // Log error if logout fails
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Welcome, {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
          >
            Log Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginLogout;
