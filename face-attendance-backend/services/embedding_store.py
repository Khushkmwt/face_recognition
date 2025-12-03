# services/embedding_store.py

import numpy as np
from bson import ObjectId
from database.mongo import faces_collection

# Global in-memory cache
EMB_IDS = []        # list of ObjectId
EMB_MATRIX = None   # numpy array shape (N, 512)


def _normalize(v: np.ndarray) -> np.ndarray:
    return v / (np.linalg.norm(v, axis=-1, keepdims=True) + 1e-10)


def load_all_embeddings():
    """
    Load all embeddings from MongoDB into memory.
    Call this once at startup.
    """
    global EMB_IDS, EMB_MATRIX

    docs = list(faces_collection.find(
        {"embedding": {"$exists": True}},
        {"_id": 1, "embedding": 1}
    ))

    if not docs:
        EMB_IDS = []
        EMB_MATRIX = None
        return

    EMB_IDS = [doc["_id"] for doc in docs]
    emb_list = [doc["embedding"] for doc in docs]
    EMB_MATRIX = _normalize(np.array(emb_list, dtype="float32"))


def add_embedding(face_id, embedding):
    """
    Add a new embedding to the in-memory cache when a user registers.
    """
    global EMB_IDS, EMB_MATRIX

    emb_vec = np.array(embedding, dtype="float32")
    emb_vec = _normalize(emb_vec.reshape(1, -1))  # (1, 512)

    if EMB_MATRIX is None:
        EMB_IDS = [face_id]
        EMB_MATRIX = emb_vec
    else:
        EMB_IDS.append(face_id)
        EMB_MATRIX = np.vstack([EMB_MATRIX, emb_vec])


def best_match(target_embedding, threshold: float = 0.45):
    """
    Given a target embedding, return (face_id, score) or (None, None).
    """
    global EMB_IDS, EMB_MATRIX

    if EMB_MATRIX is None or len(EMB_IDS) == 0:
        return None, None

    target = np.array(target_embedding, dtype="float32").reshape(1, -1)
    target = _normalize(target)  # (1, 512)

    # Cosine similarity: (N,512) · (512,1) -> (N,1)
    scores = (EMB_MATRIX @ target.T).flatten()  # shape (N,)

    best_idx = int(np.argmax(scores))
    best_score = float(scores[best_idx])

    if best_score < threshold:
        return None, best_score

    return EMB_IDS[best_idx], best_score
