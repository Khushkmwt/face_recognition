import { useEffect, useState } from "react";
import axios from "axios";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Photo</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(8)].map((_, i) => (
            <tr key={i} className="border">
              <td className="border p-2 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse mx-auto"></div>
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Records = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/attendance")
      .then((res) => {
        setRecords(res.data.attendance_records);
        console.log("Fetched Records:", res.data.attendance_records);
      })
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = records.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let valA = sortKey === "timestamp" ? new Date(a.timestamp) : a.name;
    let valB = sortKey === "timestamp" ? new Date(b.timestamp) : b.name;

    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const start = (page - 1) * itemsPerPage;
  const paginated = sorted.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 min-h-screen bg-gray-50 pt-22">
    

      {/* Loader Stage */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Search + Sorting UI */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between items-center">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded w-full md:w-64 shadow-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
              <h2 className="text-3xl font-bold text-center mb-6 mt-2">Attendance Records</h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSortKey("name");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                Sort by Name
              </button>

              <button
                onClick={() => {
                  setSortKey("timestamp");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
              >
                Sort by Date
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Photo</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((record, index) => (
                    <tr
                      key={index}
                      className="border hover:bg-gray-50 transition"
                    >
                      <td className="border p-2 text-center">
                        {record.photo_url ? (
                          <img
                            src={record.photo_url}
                            alt={record.name}
                            className="w-12 h-12 rounded-full mx-auto cursor-pointer hover:scale-110 transition"
                            onClick={() => setSelectedImage(record.photo_url)}
                          />
                        ) : (
                          <span className="text-gray-500">No Photo</span>
                        )}
                      </td>

                      <td className="border p-2 font-medium">{record.name}</td>

                      <td className="border p-2 text-gray-600">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded shadow ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-400 hover:bg-gray-500 text-white"
              }`}
            >
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold">Page {page}</span>

            <button
              disabled={start + itemsPerPage >= sorted.length}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded shadow ${
                start + itemsPerPage >= sorted.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-400 hover:bg-gray-500 text-white"
              }`}
            >
              Next
            </button>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <img src={selectedImage} className="w-96 rounded shadow-lg" />
              <button
                className="absolute top-10 right-10 text-white text-3xl"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Records;
