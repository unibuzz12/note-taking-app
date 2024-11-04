# Note-Taking Application with In-App Audio Recording

This project is a full-stack note-taking application that enables users to manage daily text notes and record audio notes. Built with Django REST Framework and ReactJS, this app includes features for secure user authentication, daily notes management, and an integrated in-app audio recording system.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Architecture and Design](#architecture-and-design)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Assumptions](#assumptions)

## Project Overview

This app allows users to:

1. Register and log in using secure authentication (JWT).
2. Create, view, edit and delete daily notes.
3. Record audio notes directly within the app, with each recording linked to a specific note.
4. Access notes and recordings only if authenticated.

## Features

### 1. User Authentication

- **Registration & Login**: Users can securely register and log in with JWT-based authentication.
- **Authentication-Restricted Access**: Only authenticated users can access note-related functionalities.

### 2. Daily Notes Management

- **Create, Update, Delete, and View Notes**: Each user can manage their notes.
- **Note Structure**: Each note contains a title, description and audio.

### 3. In-App Audio Recording

- **Recording Directly in App**: Users can record audio directly and link it to specific notes.
- **Audio Storage**: Audio files are stored securely on the server and are only accessible to authenticated users.
- **Playback**: Users can play back audio recordings from their notes.

## Technical Stack

- **Backend**: Django REST Framework
- **Frontend**: ReactJS
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication using Django REST Framework

## Architecture and Design

### Backend

The backend, built with Django REST Framework, provides a RESTful API to manage user authentication, notes, and audio recording storage. Key components include:

- **Authentication**: JWT authentication secures the API, ensuring only authorized users can access note and audio data.
- **Notes API**: Allows users to create, view, update, and delete notes.

### Frontend

The frontend, built with ReactJS, includes components for user authentication, note management, and audio recording. Core components are:

- **Authentication Pages**: For user registration and login.
- **Notes Management**: Interface for creating, editing, viewing, and deleting notes.
- **Audio Recorder**: Integrated component for recording, playing back, and saving audio notes.

### Database

PostgreSQL is used to store user information and notes data with audio files.

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL

### Backend Setup (Django REST Framework)

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd note-taking-app
   ```
2. **Set Up Virtual Environment and Install Dependencies**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. **Configure Database**

   - Ensure PostgreSQL is running.
   - Create a PostgreSQL database (e.g., notesdb).
   - Confirm backend/.env file

   ```bash
   DB_NAME=notesdb
   DB_USER=postgres
   DB_PASSWORD=123456789
   DB_HOST=localhost
   DB_PORT=5432

   CLIENT_PORT=3000
   ```

4. **Run Migrations**
   ```bash
   python manage.py migrate
   ```
5. **Run the Development Server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (ReactJS)

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure API URL**

   - Update the API base URL in frontend/.env file if necessary

4. **Run the Frontend Development Server**

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- POST /api/register/ - Register a new user.
- POST /api/token/ - Log in a user and return a JWT token.

### Notes

- GET /api/notes/ - Retrieve a list of user notes.
- GET /api/notes/{id}/ - Retrieve a detailed note.
- POST /api/notes/create - Create a new note.
- PATCH /api/notes/{id}/update - Update an existing note.
- DELETE /api/notes/{id}/delete - Delete a note.

## API Endpoints

- **Audio Storage**: Audio files are stored on the server, accessible only to authenticated users.
- **No File Uploading**: Audio recording must happen in-app; uploading pre-recorded files is not allowed.
- **Frontend Authentication**: JWT is stored in the client-side storage and attached to all requests for secure access.
