from pymongo import MongoClient
from config.settings import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["face_attendance"]

faces_collection = db["faces"]
attendance_collection = db["attendance"]

faces_collection.create_index("name", unique=True)
attendance_collection.create_index("face_id")
