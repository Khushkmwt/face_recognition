from flask import Blueprint, jsonify
from database.mongo import faces_collection

face_bp = Blueprint("faces", __name__)

@face_bp.get("/registered_faces")
def list_faces():
    faces = list(faces_collection.find({}, {"name": 1, "photo_url": 1}))
    for f in faces:
        f["_id"] = str(f["_id"])
    return {"registered_faces": faces}
