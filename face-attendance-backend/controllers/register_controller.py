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

    image_path = os.path.join(UPLOAD_FOLDER, f"{name}.jpg")
    image.save(image_path)

    face_id = register_face(image_path, name)
    return {"message": f"{name} registered!", "face_id": str(face_id)}
