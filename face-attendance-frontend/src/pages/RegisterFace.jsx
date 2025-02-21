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
    let n = bstr.length;
    let u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h2 className="text-3xl font-semibold text-green-900 mb-6">Register a New Face</h2>
      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded-lg shadow-sm" />
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-80 h-60 rounded-lg shadow-md border-2" />
      <button onClick={capture} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
        Capture Image
      </button>

      {image && <img src={image} alt="Captured" className="mt-4 w-40 h-40 border-2 rounded-lg shadow-md" />}
      
      <button onClick={handleSubmit} className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg text-lg shadow-md hover:bg-green-700 transition">
        Register Face
      </button>

      {message && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center text-blue-800 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
