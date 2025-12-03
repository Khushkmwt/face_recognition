import { useState, useEffect } from "react";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/registered_faces")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.registered_faces);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching registered users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> 
      {/* 🔥 Padding added here so header clears the navbar */}

      {/* Page Header */}
      <div className="w-full bg-white shadow-sm py-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-teal-700">
          Registered Users
        </h1>
      </div>

      <div className="container mx-auto p-6">

        {/* Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-white shadow-sm animate-pulse"
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-28 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-6 border rounded-xl bg-white shadow hover:shadow-lg transition cursor-pointer text-center"
              >
                {user.photo_url ? (
                  <img
                    src={user.photo_url}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-gray-200 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                )}

                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500 mt-1">Registered User</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisteredUsers;
