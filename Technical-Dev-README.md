# Technical-Dev-README.md

## Project Overview

This project is a Face Recognition Attendance System. It consists of a frontend built with React and a backend built with Flask. The system allows for registering users with their faces and then marking their attendance by recognizing their faces.

## Tech Stack

**Frontend:**

*   React
*   Vite
*   Tailwind CSS
*   `react-router-dom` for routing
*   `react-webcam` for accessing the camera
*   `axios` for making HTTP requests

**Backend:**

*   Flask
*   `flask-cors` for handling Cross-Origin Resource Sharing
*   `pymongo` for interacting with MongoDB
*   `face_recognition` for face recognition
*   `cloudinary` for image storage

## System Architecture

The system is divided into two main components:

1.  **Frontend:** A React application that provides the user interface for registering users and marking attendance.
2.  **Backend:** A Flask application that provides the API for face recognition, user registration, and attendance logging.

The frontend and backend communicate with each other through a RESTful API.

## Getting Started

### Prerequisites

*   Node.js and npm
*   Python and pip
*   MongoDB

### Installation

**Frontend:**

1.  Navigate to the `face-attendance-frontend` directory.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

**Backend:**

1.  Navigate to the `face-attendance-backend` directory.
2.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the development server:
    ```bash
    python app.py
    ```

## Features

*   **User Registration:** Users can register their faces with their names.
*   **Face Recognition:** The system can recognize registered faces.
*   **Attendance Logging:** The system logs the attendance of recognized faces.
*   **List Registered Users:** The system can list all the registered users.

## API Endpoints

*   `POST /register_face`: Registers a new face.
    *   **Request Body:** `image` (file), `name` (string)
    *   **Response:** `{"message": "Face registered!", "face_id": "..."}`
*   `POST /attendance`: Marks attendance for a recognized face.
    *   **Request Body:** `image` (file)
    *   **Response:** `{"name": "...", "photo_url": "...", "status": "Present"}` or `{"name": "Unknown", "status": "Not Marked"}`
*   `GET /registered_faces`: Lists all registered faces.
    *   **Response:** `{"registered_faces": [{"_id": "...", "name": "...", "photo_url": "..."}, ...]}`

## Frontend

The frontend is a single-page application built with React. It has the following pages:

*   **Home:** The landing page.
*   **Register Face:** A page for registering new users.
*   **Attendance:** A page for marking attendance.
*   **Registered Users:** A page for listing all the registered users.
*   **Records:** A page for viewing attendance records.

## Backend

The backend is a Flask application that provides the API for the frontend. It has the following modules:

*   **`app.py`:** The main application file.
*   **`controllers`:** Contains the API endpoint definitions.
*   **`services`:** Contains the business logic for face recognition and attendance logging.
*   **`database`:** Contains the database models and connection logic.
*   **`config`:** Contains the application configuration.

## Database

The system uses MongoDB for storing user data and attendance logs. The following collections are used:

*   **`faces`:** Stores the registered faces with their names and photo URLs.
*   **`attendance`:** Stores the attendance logs.

## Future Improvements

*   Add authentication and authorization.
*   Add a dashboard for viewing attendance statistics.
*   Improve the face recognition accuracy.
*   Add support for multiple cameras.
*   Add support for real-time attendance tracking.
