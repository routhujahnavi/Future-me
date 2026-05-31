# FutureMe

FutureMe is an AI-powered personal reflection product where a user fills in details about their current life, goals, fears, struggles, habits, and future ambition. The app generates a powerful message from their future self using the Gemini API.

## Project Structure
- `frontend/`: Contains the vanilla HTML, CSS, and JS interface.
- `backend/`: Node.js Express server to handle secure API calls to Gemini.

## Setup Instructions

### 1. Backend Setup
Open a terminal and run the following commands:
```bash
cd backend
npm install
```

### 2. Environment Variables
In the `backend` directory, create a `.env` file (you can copy `.env.example`) and add your Gemini API Key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 3. Run the Backend
Start the development server:
```bash
npm run dev
```
(Alternatively, use `npm start`)
The backend will run on `http://localhost:5000`.

### 4. Run the Frontend
Simply open `frontend/index.html` in your web browser. Or, you can use a static server like `npx serve frontend`.

## API Routes
- `POST /api/generate-futureme`: Generates the FutureMe persona and advice based on user profile.
- `POST /api/chat-futureme`: Handles follow-up questions in the chat interface.
