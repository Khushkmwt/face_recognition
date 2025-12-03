import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { BarLoader } from "react-spinners";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Capture Image
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  // Convert Data URL to File
  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please capture an image first.");
      return;
    }

    setLoading(true);

    const imageFile = dataURLtoFile(image, "attendance.jpg");
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/attendance", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error marking attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h2 className="text-3xl font-semibold text-blue-900 mb-6">
        Mark Attendance
      </h2>

      {/* Webcam or Preview */}
      {!image ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-80 h-60 rounded-lg shadow-md border-2"
        />
      ) : (
        <img
          src={image}
          alt="Captured Preview"
          className="w-80 h-60 object-cover rounded-lg shadow-md border-2"
        />
      )}

      <div className="flex space-x-4 mt-4">
        {/* Capture or Retake */}
        {!image ? (
          <button
            onClick={capture}
            disabled={loading}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            Capture Image
          </button>
        ) : (
          <button
            onClick={() => setImage(null)}
            disabled={loading}
            className={`px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg shadow-md hover:bg-yellow-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Retake
          </button>
        )}

        {/* Submit Attendance */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-3 text-white rounded-lg text-lg shadow-md transition ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Please wait..." : "Submit Attendance"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-6">
          <BarLoader color="#2563eb" height={6} width={180} />
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-lg font-bold">{result.name}</h3>
          <p
            className={`text-md ${
              result.name !== "Unknown" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
