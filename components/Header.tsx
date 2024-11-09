import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaUserAlt, FaSignOutAlt, FaHome } from "react-icons/fa";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <Link href="/" className="text-2xl font-semibold flex items-center space-x-2">
        <FaHome className="text-white" />
        <span>E-Commerce</span>
      </Link>
      <div className="space-x-6 flex items-center">
        <Link href="/" className="hover:text-gray-400 flex items-center space-x-1">
          <FaHome />
          <span>Home</span>
        </Link>
        {session ? (
          <>
            <Link href="/profile" className="hover:text-gray-400 flex items-center space-x-1">
              <FaUserAlt />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="hover:text-gray-400 flex items-center space-x-1"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <Link href="/auth/signin" className="hover:text-gray-400 flex items-center space-x-1">
            <FaSignOutAlt />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
