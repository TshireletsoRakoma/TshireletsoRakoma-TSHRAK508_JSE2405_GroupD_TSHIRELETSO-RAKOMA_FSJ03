'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';

/**
 * Higher-order component (HOC) that wraps a given component and manages
 * authentication state. It checks if a user is authenticated and either
 * renders the component or redirects to the authentication page.
 *
 * @param {React.ComponentType} Component - The component to be rendered if authenticated.
 * @returns {React.FC} AuthenticatedComponent - The component that checks authentication state.
 */
const WithAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Ensure this only runs in the client
      if (typeof window !== 'undefined') {
        // Make sure this is not being called during SSR
        // Safely initialize Firebase Auth
        const auth = getAuth(app);

        // Subscribe to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (!user) {
            // Redirect to /auth if the user is not authenticated
            router.push('/auth');
          } else {
            setIsAuthenticated(true); // User is authenticated
          }
          setIsLoading(false); // Done checking auth state
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
      }
    }, [router]);

    // Optionally, show a loading state while checking authentication
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Render the protected component if authenticated
    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default WithAuth;
