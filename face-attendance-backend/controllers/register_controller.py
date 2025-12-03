from flask import Blueprint, request, jsonify
from services.face_service import register_face
from config.settings import UPLOAD_FOLDER
import os

register_bp = Blueprint("register", __name__)

@register_bp.post("/register_face")
def register_new_face():
    image = request.files.get("image")
    name = request.form.get("name")

    if not image or not name:
        return {"message": "Image and name are required"}, 400

    temp_path = os.path.join(UPLOAD_FOLDER, f"{name}.jpg")
    image.save(temp_path)

    try:
        face_id = register_face(temp_path, name)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    return {"message": f"{name} registered successfully!", "face_id": str(face_id)}
