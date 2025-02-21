import { useRef, useState } from "react";
import Webcam from "react-webcam";

const Attendance = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  // Capture Image from Webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  // Convert Data URL to File
  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please capture an image first.");
      return;
    }

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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h2 className="text-3xl font-semibold text-blue-900 mb-6">Mark Attendance</h2>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-80 h-60 rounded-lg shadow-md border-2" />
      <button onClick={capture} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
        Capture Image
      </button>

      {image && <img src={image} alt="Captured" className="mt-4 w-40 h-40 border-2 rounded-lg shadow-md" />}
      
      <button onClick={handleSubmit} className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition">
        Submit Attendance
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-lg font-bold">{result.name}</h3>
          <p className={`text-md ${result.name !== "Unknown" ? "text-green-600" : "text-red-600"}`}>
            {result.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
