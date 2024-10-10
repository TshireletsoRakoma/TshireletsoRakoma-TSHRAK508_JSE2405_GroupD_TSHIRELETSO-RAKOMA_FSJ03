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

  return (
    <button
      onClick={handleSignOut}
      className="p-2 bg-red-500 text-white rounded-md text-lg cursor-pointer transition-colors duration-300 hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
