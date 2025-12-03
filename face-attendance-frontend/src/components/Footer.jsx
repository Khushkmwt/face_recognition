import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-b from-white/60 via-white/80 to-teal-100 shadow-inner border-t border-gray-300 py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="FaceTrackAI Logo"
                className="w-16 h-16 rounded-lg object-contain shadow"
              />
              <h2 className="text-3xl font-bold text-teal-700">FaceTrackAI</h2>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed">
              A next-gen AI-powered face recognition system for seamless, secure, 
              and automated attendance management.
            </p>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-xl font-semibold text-teal-700 mb-4">About</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              FaceTrackAI uses advanced face recognition to automate employee/student 
              attendance with accuracy and speed.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-lg text-slate-700">
              <li><Link to="/" className="hover:text-teal-700 transition">Home</Link></li>
              <li><Link to="/attendance" className="hover:text-teal-700 transition">Mark Attendance</Link></li>
              <li><Link to="/register" className="hover:text-teal-700 transition">Register Face</Link></li>
              <li><Link to="/records" className="hover:text-teal-700 transition">Attendance Records</Link></li>
              <li><Link to="/registered-users" className="hover:text-teal-700 transition">Registered Users</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Contact</h3>
            <ul className="space-y-3 text-lg text-slate-700">
              <li>Email: <span className="text-teal-600">support@facetrackai.io</span></li>
              <li>Phone: <span className="text-teal-600">+91 98765 43210</span></li>
              <li>Location: <span className="text-teal-600">India</span></li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-2xl text-slate-700 hover:text-teal-700 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-slate-700 hover:text-teal-700 transition">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl text-slate-700 hover:text-teal-700 transition">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-teal-300 mt-12 mb-6"></div>

        {/* BOTTOM COPYRIGHT */}
        <div className="text-center text-slate-700 text-lg">
          © {new Date().getFullYear()} <span className="font-semibold text-teal-700">FaceTrackAI</span>.  
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
