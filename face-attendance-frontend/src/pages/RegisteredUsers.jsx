import { useState, useEffect } from "react";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/registered_faces")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.registered_faces);
      })
      .catch((err) => console.error("Error fetching registered users:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded-lg text-center">
            {user.photo_url ? (
              <img
                src={user.photo_url}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-2"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
            )}
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;
