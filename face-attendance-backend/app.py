from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId
from db import attendance_collection, faces_collection
from face_recognition import recognize_face, register_face

# ✅ Load environment variables
load_dotenv()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)


# ✅ Home API to check if the server is running
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Face Recognition Attendance System is Running!"})


# ✅ Mark Attendance using Face Recognition
@app.route("/attendance", methods=["POST"])
def mark_attendance():
    if "image" not in request.files:
        return jsonify({"message": "No image uploaded!"}), 400

    file = request.files["image"]
    image_path = os.path.join(UPLOAD_FOLDER, "temp.jpg")
    file.save(image_path)

    face_id = recognize_face(image_path)

    if face_id:
        # Fetch user details
        user = faces_collection.find_one({"_id": ObjectId(face_id)}, {"name": 1, "photo_url": 1})
        if not user:
            return jsonify({"message": "User not found!"}), 404

        # Insert attendance record
        attendance_collection.insert_one({"face_id": str(face_id), "timestamp": datetime.utcnow()})

        return jsonify({
            "name": user["name"],
            "photo_url": user.get("photo_url"),
            "status": "Present"
        })

    return jsonify({"name": "Unknown", "status": "Not Marked"})


# ✅ Get All Attendance Records with Names and Photos
@app.route("/attendance", methods=["GET"])
def get_attendance():
    records = list(attendance_collection.find().sort("timestamp", -1))  # Sort by latest
    formatted_records = []

    for record in records:
        face = faces_collection.find_one({"_id": ObjectId(record["face_id"])}, {"name": 1, "photo_url": 1})
        formatted_records.append({
            "name": face["name"] if face else "Unknown",
            "photo_url": face.get("photo_url") if face else None,
            "timestamp": record["timestamp"].isoformat()
        })

    return jsonify({"attendance_records": formatted_records})


# ✅ Clear All Attendance Records
@app.route("/attendance", methods=["DELETE"])
def clear_attendance():
    attendance_collection.delete_many({})
    return jsonify({"message": "All attendance records deleted!"})


# ✅ List Registered Faces with Names & Photos
@app.route("/registered_faces", methods=["GET"])
def get_registered_faces():
    faces = list(faces_collection.find({}, {"_id": 1, "name": 1, "photo_url": 1}))

    for face in faces:
        face["_id"] = str(face["_id"])  # Convert ObjectId to string

    return jsonify({"registered_faces": faces})


# ✅ Register a New Face (Store Face Encoding)
@app.route("/register_face", methods=["POST"])
def register_new_face():
    if "image" not in request.files or "name" not in request.form:
        return jsonify({"message": "Image and name are required!"}), 400

    file = request.files["image"]
    name = request.form["name"]
    image_path = os.path.join(UPLOAD_FOLDER, f"{name}.jpg")
    file.save(image_path)

    face_id = register_face(image_path, name)

    if face_id:
        return jsonify({"message": f"{name} registered successfully!", "face_id": str(face_id)})
    else:
        return jsonify({"message": "Face registration failed!"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
