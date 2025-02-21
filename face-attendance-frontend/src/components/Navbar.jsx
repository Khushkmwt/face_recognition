import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-600 text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-200">
          Face-Attendance
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
          <Link to="/attendance" className="hover:text-cyan-300 transition">Mark Attendance</Link>
          <Link to="/register" className="hover:text-cyan-300 transition">Register Face</Link>
          <Link to="/records" className="hover:text-cyan-300 transition">Attendance Records</Link>
          <Link to="/registered-users" className="hover:text-cyan-300 transition">Registered Users</Link> {/* New Link */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-teal-700 text-center py-4">
          <Link to="/" className="block py-2 hover:text-cyan-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/attendance" className="block py-2 hover:text-cyan-300" onClick={() => setIsOpen(false)}>Mark Attendance</Link>
          <Link to="/register" className="block py-2 hover:text-cyan-300" onClick={() => setIsOpen(false)}>Register Face</Link>
          <Link to="/records" className="block py-2 hover:text-cyan-300" onClick={() => setIsOpen(false)}>Attendance Records</Link>
          <Link to="/registered-users" className="block py-2 hover:text-cyan-300" onClick={() => setIsOpen(false)}>Registered Users</Link> {/* New Link */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
