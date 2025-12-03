import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-white via-white/70 to-teal-100 backdrop-blur-lg text-slate-800 px-6">

      <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 text-center drop-shadow-sm">
        Face Recognition Attendance System
      </h1>

      <p className="text-lg md:text-xl text-slate-600 mb-8 text-center max-w-2xl">
        A modern and effortless way to track attendance using facial recognition.
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
  );
};

export default Home;
