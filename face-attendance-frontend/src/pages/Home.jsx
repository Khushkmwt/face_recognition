import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-green-200 text-gray-900 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 text-center">
        Face Recognition Attendance System
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6 text-center max-w-2xl">
        A smart and efficient way to mark attendance using facial recognition.
      </p>
      <div className="flex space-x-4">
        <Link to="/attendance" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
          Mark Attendance
        </Link>
        <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition">
          Register Face
        </Link>
      </div>
    </div>
  );
};

export default Home;
