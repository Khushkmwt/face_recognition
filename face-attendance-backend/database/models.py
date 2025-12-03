from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class FaceSchema(BaseModel):
    name: str
    photo_url: Optional[str] = None

class AttendanceSchema(BaseModel):
    face_id: str = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
