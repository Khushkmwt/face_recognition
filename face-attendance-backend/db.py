from pymongo import MongoClient
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import os
from dotenv import load_dotenv

# ✅ Load Environment Variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# ✅ Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["face_attendance"]  # Database Name

# ✅ Define Collections
faces_collection = db["faces"]  # Stores registered users with face encodings
attendance_collection = db["attendance"]  # Stores attendance logs

# ✅ Ensure Indexing for Fast Queries
faces_collection.create_index("name", unique=True)
attendance_collection.create_index("face_id")

print("✅ MongoDB Connected! Collections:", db.list_collection_names())


# ==========================
# 📌 Data Models (Schemas)
# ==========================

# ✅ Schema for Registered Faces
class FaceSchema(BaseModel):
    name: str  # Name of the person
    photo_url: Optional[str] = None  # URL of the stored face image


# ✅ Schema for Attendance Records
class AttendanceSchema(BaseModel):
    face_id: str = Field(..., description="Reference to registered face ID")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
