// components/SignOutButton.js
import { signOutUser } from '../utils/auth';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
