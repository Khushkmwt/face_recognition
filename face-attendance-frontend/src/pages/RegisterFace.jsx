import { useRef, useState } from "react";
import Webcam from "react-webcam";

const Register = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async () => {
    if (!image || !name) {
      alert("Please enter a name and capture an image.");
      return;
    }

    const imageFile = dataURLtoFile(image, "register.jpg");
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);

    try {
      const response = await fetch("http://localhost:5000/register_face", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error registering face:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-white/70 to-teal-100 px-6">
      <h2 className="text-3xl font-semibold text-teal-800 mb-6">Register a New Face</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-3 border border-teal-300 rounded-lg shadow-sm w-72 text-center"
      />

      {/* If image exists → show captured image. Otherwise → show live webcam */}
      {!image ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-80 h-60 rounded-lg shadow-md border-2 border-teal-200"
        />
      ) : (
        <img
          src={image}
          alt="Captured"
          className="w-80 h-60 object-cover rounded-lg shadow-md border-2 border-teal-300"
        />
      )}

      <div className="flex space-x-4 mt-4">
        {!image ? (
          <button
            onClick={capture}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg text-lg shadow-md hover:bg-teal-700 transition"
          >
            Capture Image
          </button>
        ) : (
          <button
            onClick={() => setImage(null)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg shadow-md hover:bg-yellow-600 transition"
          >
            Retake
          </button>
        )}

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-teal-400 text-white rounded-lg text-lg shadow-md hover:bg-teal-500 transition"
        >
          Register Face
        </button>
      </div>

      {message && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center text-teal-700 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
