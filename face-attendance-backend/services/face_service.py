import os
import re
import numpy as np
from config.cloudinary_config import cloudinary
import cloudinary.uploader
from deepface import DeepFace
from database.mongo import faces_collection


# ----------------------------------------
# Helper: sanitize Cloudinary public_id
# ----------------------------------------
def sanitize_public_id(name: str) -> str:
    name = name.lower()
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[^\w\-]", "", name)
    return name


# ----------------------------------------
# Cosine similarity
# ----------------------------------------
def cosine_similarity(v1, v2):
    v1 = np.array(v1)
    v2 = np.array(v2)
    return float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))


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
        embedding_obj = DeepFace.represent(
            img_path=image_path,
            model_name="ArcFace",
            enforce_detection=False
        )[0]

        embedding = embedding_obj["embedding"]

        # 3️⃣ Save to MongoDB
        face_id = faces_collection.insert_one({
            "name": safe_name,
            "full_name": name,
            "photo_url": cloud_url,
            "embedding": embedding
        }).inserted_id

        return face_id

    except Exception as e:
        print("Error registering face:", e)
        return None


# ----------------------------------------
# Recognize face using embeddings ONLY
# ----------------------------------------
def recognize_face(image_path):
    try:
        # 1️⃣ Get embedding for incoming image
        target = DeepFace.represent(
            img_path=image_path,
            model_name="ArcFace",
            enforce_detection=False
        )[0]["embedding"]
    except Exception as e:
        print("Embedding failed:", e)
        return None

    # 2️⃣ Get all stored embeddings
    users = list(faces_collection.find({}, {"embedding": 1, "name": 1}))

    if not users:
        return None

    best_match = None
    best_score = -1

    # 3️⃣ Compare embeddings
    for user in users:
        score = cosine_similarity(target, user["embedding"])
        if score > best_score:
            best_score = score
            best_match = user

    # 4️⃣ Threshold tuning (recommended 0.42–0.5)
    if best_score < 0.45:
        return None

    return best_match["_id"]
