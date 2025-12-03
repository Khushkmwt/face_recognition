import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Mark Attendance", to: "/attendance" },
    { label: "Register Face", to: "/register" },
    { label: "Attendance Records", to: "/records" },
    { label: "Registered Users", to: "/registered-users" }
  ];

  return (
    <nav className="bg-white/70 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Title */}
        <Link 
          to="/" 
          className="flex items-center gap-3 text-2xl font-semibold tracking-wide text-teal-700 hover:text-teal-900 transition"
        >
          <img
            src="/logo.png"
            alt="FaceTrackAI Logo"
            className="w-12 h-12 object-contain"
          />
          FaceTrackAI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg text-slate-700">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="relative group hover:text-teal-700 transition"
              >
                {item.label}
                <span className="block h-[2px] bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white/70 backdrop-blur-lg transition-all rounded-b-lg shadow ${
          isOpen ? "max-h-96 py-3" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 text-center text-slate-700 text-lg">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-teal-700 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
