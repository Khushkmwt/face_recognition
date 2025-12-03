from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class FaceSchema(BaseModel):
    name: str                    # sanitized id
    full_name: Optional[str] = None   # actual user name
    photo_url: Optional[str] = None
    embedding: List[float]             # 512-dim vector from ArcFace
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AttendanceSchema(BaseModel):
    face_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
