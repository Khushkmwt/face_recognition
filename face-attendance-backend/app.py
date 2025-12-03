from flask import Flask, jsonify
from flask_cors import CORS

# Blueprints
from controllers.attendance_controller import attendance_bp
from controllers.register_controller import register_bp
from controllers.face_controller import face_bp   # <--- ADD THIS

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(attendance_bp)
app.register_blueprint(register_bp)
app.register_blueprint(face_bp)                    # <--- AND THIS

@app.get("/")
def home():
    return {"message": "Face Recognition Attendance System Running!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
