import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
UPLOAD_FOLDER = "uploads"
FACES_DB = "static/faces_db"
