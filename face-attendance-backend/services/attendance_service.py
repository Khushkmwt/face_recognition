from database.mongo import attendance_collection
from datetime import datetime

def log_attendance(face_id: str):
    attendance_collection.insert_one({
        "face_id": face_id,
        "timestamp": datetime.now()
    })
