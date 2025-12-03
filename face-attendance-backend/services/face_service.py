import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


import re
import numpy as np
from deepface import DeepFace
from config.cloudinary_config import cloudinary
import cloudinary.uploader
from database.mongo import faces_collection
from services.embedding_store import add_embedding, best_match

# ----------------------------------------
# Helper: sanitize Cloudinary public_id
# ----------------------------------------
def sanitize_public_id(name: str) -> str:
    name = name.lower()
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[^\w\-]", "", name)
    return name


# ----------------------------------------
# Preload ArcFace model ONCE
# ----------------------------------------
_ARCFACE_MODEL = DeepFace.build_model("ArcFace")


def _get_embedding(image_path: str):
    """
    Get ArcFace embedding using preloaded model.
    """
    reps = DeepFace.represent(
    img_path=image_path,
    model_name="ArcFace",
    enforce_detection=False
   )

    if not reps:
        return None
    return reps[0]["embedding"]


# ----------------------------------------
# Register Face (upload + embed + store)
# ----------------------------------------
def register_face(image_path, name):
    try:
        safe_name = sanitize_public_id(name)

        # 1️⃣ Upload to Cloudinary
        with open(image_path, "rb") as f:
            result = cloudinary.uploader.upload(
                f,
                folder="face-attendance",
                public_id=safe_name,
                overwrite=True
            )
        cloud_url = result["secure_url"]

        # 2️⃣ Generate embedding
        embedding = _get_embedding(image_path)
        if embedding is None:
            print("No face found during registration.")
            return None

        # 3️⃣ Save to MongoDB
        doc = {
            "name": safe_name,
            "full_name": name,
            "photo_url": cloud_url,
            "embedding": embedding
        }
        face_id = faces_collection.insert_one(doc).inserted_id

        # 4️⃣ Update in-memory cache
        add_embedding(face_id, embedding)

        return face_id

    except Exception as e:
        print("Error registering face:", e)
        return None


# ----------------------------------------
# Recognize face using in-memory embeddings
# ----------------------------------------
def recognize_face(image_path):
    try:
        target_embedding = _get_embedding(image_path)
        if target_embedding is None:
            return None

        face_id, score = best_match(target_embedding, threshold=0.45)
        # if you want to debug:
        # print("Best score:", score)
        return face_id

    except Exception as e:
        print("Error recognizing face:", e)
        return None
