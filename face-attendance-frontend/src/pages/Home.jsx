import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FiCamera, FiUserCheck, FiDatabase } from "react-icons/fi";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col items-center justify-center 
        bg-gradient-to-br from-white via-white/70 to-teal-100 backdrop-blur-lg text-slate-800 px-6 pt-20">

        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 text-center drop-shadow-sm">
          Face Recognition Attendance System
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-8 text-center max-w-2xl">
          A modern and effortless way to track attendance using AI-powered face detection.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/attendance"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg text-lg shadow hover:bg-teal-700 transition"
          >
            Mark Attendance
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 bg-teal-400 text-white rounded-lg text-lg shadow hover:bg-teal-500 transition"
          >
            Register Face
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-10">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
              <FiCamera className="text-teal-600 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                AI-Powered Face Detection
              </h3>
              <p className="text-slate-600">
                Fast and accurate face recognition using machine learning technology.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
              <FiUserCheck className="text-teal-600 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Easy Attendance Marking
              </h3>
              <p className="text-slate-600">
                Mark your attendance in seconds with a single click using your webcam.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
              <FiDatabase className="text-teal-600 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Smart Record Management
              </h3>
              <p className="text-slate-600">
                View attendance records, track users, and manage face data easily.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
