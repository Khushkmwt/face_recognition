import os
import shutil
import re
from config.cloudinary_config import cloudinary
import cloudinary.uploader
from deepface import DeepFace
from database.mongo import faces_collection
from services.detection_service import detect_faces
from config.settings import FACES_DB


# ----------------------------------------
# Helper: sanitize Cloudinary public_id
# ----------------------------------------
def sanitize_public_id(name: str) -> str:
    """
    Cloudinary public_id cannot contain spaces or special characters.
    This makes the name safe for Cloudinary.
    """
    name = name.lower()
    name = re.sub(r"\s+", "_", name)        # spaces → underscores
    name = re.sub(r"[^\w\-]", "", name)     # remove everything except letters, numbers, _
    return name


# ----------------------------------------
# Face Recognition (DeepFace)
# ----------------------------------------
def recognize_face(image_path):
    results, _ = detect_faces(image_path)
    if not results or not results.detections:
        return None

    try:
        matches = DeepFace.find(
            img_path=image_path,
            db_path=FACES_DB,               # DeepFace uses LOCAL images
            model_name="ArcFace",
            enforce_detection=False
        )
    except Exception as e:
        print("DeepFace error:", e)
        return None

    if not matches or matches[0].empty:
        return None

    # sort by best match (lowest distance)
    df = matches[0].sort_values(by="distance")
    best_match_path = df.iloc[0]["identity"]

    # Normalize Windows/Linux paths
    best_match_path = best_match_path.replace("\\", "/")

    # Extract file name only
    filename = os.path.basename(best_match_path)
    matched_name = os.path.splitext(filename)[0]

    # Find user in DB
    user = faces_collection.find_one({"name": matched_name})
    if not user:
        return None

    return user["_id"]


# ----------------------------------------
# Register Face (Cloudinary + DeepFace local copy)
# ----------------------------------------
def register_face(image_path, name):
    try:
        # 1️⃣ Sanitize name for Cloudinary and file system
        safe_name = sanitize_public_id(name)

        # 2️⃣ Upload image to Cloudinary
        with open(image_path, "rb") as f:
            upload_result = cloudinary.uploader.upload(
             f,
             public_id=safe_name,
             folder="face-attendance",
             overwrite=True
            )

        cloud_url = upload_result["secure_url"]

        # 3️⃣ Save a local copy for DeepFace matching
        os.makedirs(FACES_DB, exist_ok=True)
        local_path = os.path.join(FACES_DB, f"{safe_name}.jpg")
        shutil.copy(image_path, local_path)

        # 4️⃣ Insert into MongoDB
        face_id = faces_collection.insert_one({
            "name": safe_name,             # sanitized unique identifier
            "photo_url": cloud_url,        # Cloudinary URL
            "local_image_path": local_path # local path for DeepFace
        }).inserted_id

        return face_id

    except Exception as e:
        print("Error registering face:", e)
        return None
