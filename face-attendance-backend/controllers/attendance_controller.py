from flask import Blueprint, request, jsonify
from bson import ObjectId
from services.face_service import recognize_face
from services.attendance_service import log_attendance
from database.mongo import faces_collection,attendance_collection
from config.settings import UPLOAD_FOLDER
import os

attendance_bp = Blueprint("attendance", __name__)

@attendance_bp.post("/attendance")
def mark_attendance():
    image = request.files.get("image")
    if not image:
        return {"message": "No image uploaded"}, 400

    temp_path = os.path.join(UPLOAD_FOLDER, "temp.jpg")
    image.save(temp_path)

    face_id = recognize_face(temp_path)
    if not face_id:
        return {"name": "Unknown", "status": "Not Marked"}

    user = faces_collection.find_one({"_id": ObjectId(face_id)})
    log_attendance(ObjectId(face_id))


    return {
        "name": user["name"],
        "photo_url": user["photo_url"],
        "status": "Present"
    }

@attendance_bp.get("/attendance")
def get_attendance():
    logs = attendance_collection.find().sort("timestamp", -1)

    response = []

    for log in logs:
        face_id = log.get("face_id")
        user = faces_collection.find_one({"_id": ObjectId(face_id)})

        response.append({
            "name": user["name"] if user else "Unknown",
            "photo_url": user["photo_url"] if user else None,
            "timestamp": log["timestamp"].isoformat()
        })

    return jsonify({"attendance_records": response})