import os
import cv2
import shutil
import numpy as np
import mediapipe as mp
from deepface import DeepFace
from db import faces_collection

mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5)


def recognize_face(image_path):
    """Recognizes a face from the image and returns the corresponding face_id from DB."""
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_detection.process(img_rgb)

    if results.detections:
        for detection in results.detections:
            bboxC = detection.location_data.relative_bounding_box
            h, w, _ = img.shape
            x, y, w, h = int(bboxC.xmin * w), int(bboxC.ymin * h), int(bboxC.width * w), int(bboxC.height * h)
            face_crop = img[y:y+h, x:x+w]

            # Use DeepFace for Face Recognition
            result = DeepFace.find(img_path=image_path, db_path="faces_db/", model_name="ArcFace", enforce_detection=False)
            if not result or result[0].empty:
                print("Face not recognized.")

            if len(result) > 0:
                matched_name = result[0]["identity"][0].split("/")[-1].split(".")[0]
                face_record = faces_collection.find_one({"name": matched_name})
                if face_record:
                    return face_record["_id"]

    return None


def register_face(image_path, name):
    """Registers a new face, saves it to DB, and stores an image reference."""
    faces_db_path = "faces_db"
    os.makedirs(faces_db_path, exist_ok=True)

    save_path = os.path.join(faces_db_path, f"{name}.jpg")

    # Prevent duplicate file copy
    if os.path.abspath(image_path) == os.path.abspath(save_path):
        print(f"Skipping copy: {image_path} and {save_path} are the same file.")
        return None

    try:
        shutil.copy(image_path, save_path)
        face_id = faces_collection.insert_one({"name": name, "photo_url": save_path}).inserted_id
        return face_id
    except Exception as e:
        print(f"Error saving face image: {e}")
        return None
