# **Face Recognition Attendance System** 🏫💻  

A **Face Recognition-based Attendance System** built using **Flask, OpenCV, Mediapipe, TensorFlow, DeepFace, and MongoDB**. This system captures a user's face, recognizes it, and marks attendance automatically.  

---

## **📌 Features**  
✅ **Face Registration** – Users can register their face to be recognized later.  
✅ **Face Recognition** – Recognizes faces in real-time using DeepFace and Mediapipe.  
✅ **Mark Attendance** – Automatically logs attendance when a face is detected.  
✅ **View Attendance** – Fetches all recorded attendance logs with names and timestamps.  
✅ **Delete Attendance Records** – Allows clearing all attendance records.  
✅ **MongoDB Integration** – Stores registered users and attendance records efficiently.  
✅ **REST API** – Exposes API endpoints for registration, attendance marking, and fetching data.  

---

## **🚀 Tech Stack Used**  

| Technology  | Purpose |
|------------|---------|
| **Flask**  | Backend framework for API development |
| **Flask-CORS**  | Enables Cross-Origin Resource Sharing |
| **Pymongo**  | MongoDB integration for storing user data and attendance logs |
| **Mediapipe**  | Face detection and landmark extraction |
| **OpenCV**  | Image processing for face recognition |
| **NumPy**  | Array and image manipulation |
| **TensorFlow / Keras**  | Deep learning model for face recognition |
| **DeepFace**  | Pre-trained deep learning model for face verification |
| **Python-Dotenv**  | Manages environment variables |

---

## **📂 Project Structure**  

```
📂 face-recognition-attendance
│── face-attendance-backend/     # Backend (Flask API)
│   ├── app.py                   # Main Flask application
│   ├── db.py                     # Database connection (MongoDB)
│   ├── face_recognition.py       # Face recognition logic
│   ├── requirements.txt          # Dependencies
│   ├── .env                      # Environment variables
│   ├── .gitignore                # Ignore unnecessary files
│   └── uploads/                  # Temporary storage for uploaded images
│
│── face-attendance-frontend/     # Frontend (React/Vite or HTML-CSS-JS)
│   ├── src/                       # Source files
│   ├── public/                    # Public assets
│   ├── package.json               # Dependencies for frontend
│   ├── .gitignore                 # Ignore unnecessary files
│   └── README.md                  # Frontend documentation
│
└── README.md                     # Main project documentation
```

---

## **📌 How to Run the Project**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Khushkmwt/face_recognition.git
cd face-recognition-attendance
```

### **2️⃣ Backend Setup (Flask + MongoDB)**  
#### **🔹 Install Dependencies**  
```bash
cd face-attendance-backend
pip install -r requirements.txt
```

#### **🔹 Setup Environment Variables**  
Create a `.env` file inside the `backend/` folder and add the following:  
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/face_attendance
UPLOAD_FOLDER=uploads/
```

#### **🔹 Run the Backend Server**  
```bash
python app.py
```
✅ Flask server will start at `http://localhost:5000`

---

### **3️⃣ Frontend Setup (React or Vanilla JS)**
#### **🔹 React Setup**
```bash
cd face-attendance-frontend
npm install
npm run dev
```
✅ Frontend will be available at `http://localhost:5173`

---

## **📌 API Endpoints**  

| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/register_face` | Register a new face |
| **POST** | `/attendance` | Mark attendance |
| **GET** | `/attendance` | Fetch all attendance records |
| **DELETE** | `/attendance` | Delete all attendance records |
| **GET** | `/registered_faces` | Fetch all registered users |

---

## **📌 Screenshots & Demo**  
🚀 **Coming soon...** 

---

## **📌 Future Enhancements**  
🔹 Real-time video stream attendance marking  
🔹 User authentication & role-based access  
🔹 Cloud storage for face images  
🔹 Improved accuracy with more ML models  

---

## **📌 Contributors**  
👤 **Dilkhush kumawat** – [GitHub](https://github.com/Khushkmwt)  

---


