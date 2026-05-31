# FutureMe: Meet the version of you who already made it.

**Live Project URL:** 🚀 [https://futureme24.netlify.app](https://futureme24.netlify.app)

FutureMe is an advanced, AI-powered web application that allows users to reflect on their current struggles and goals, and receive personalized advice and actionable routines from their "Future Self" (a highly successful version of themselves who has already achieved their 1-year vision).

---

## 🌟 Key Features

1. **AI Persona Generation:** Uses Google's advanced Gemini AI to instantly generate a highly contextual, motivational profile based on the user's specific inputs and selected tone (e.g., "CEO Mode", "Tough Love", "Zen Master").
2. **Interactive Daily Operating System:** FutureMe doesn't just give vague advice. It generates a strict 3-phase execution model (Morning Alignment, Deep Work Blocks, Evening Wind Down) presented in a beautiful, glassmorphic interactive checklist that users can physically click to cross off throughout the day.
3. **Stateful AI Chat Interface:** A built-in chat interface that maintains memory context. Users can ask their Future Self follow-up questions, request deeper insights on a specific struggle, or get micro-actions to take immediately.
4. **Premium UI/UX:** Built with a lightning-fast native frontend. It features custom CSS variables, translucent "glassmorphism" effects, scroll-triggered fade-in animations, and dynamic loading states with typing simulations.

---

## 🛠️ Technology Stack & Architecture

This project was built to be highly scalable, extremely fast, and entirely serverless. 

### Frontend (The User Interface)
* **HTML5 & Vanilla CSS3:** Powers the premium aesthetic without the overhead of heavy styling frameworks.
* **Vanilla JavaScript (ES6+):** Manages the complex state, dynamic DOM injection, asynchronous fetch requests, and interactive checklist toggling.

### Backend (The Engine)
* **Node.js & Express.js:** Handles API routing and secure communication.
* **Serverless-Http:** Wraps the Express application into a Serverless Function, allowing it to scale infinitely and only run when requested.
* **@google/generative-ai SDK:** The official Google SDK used to connect the Node.js backend directly to the **Gemini 1.5 Flash** (`gemini-flash-latest`) model.

### Deployment & Hosting
* **Netlify:** The entire platform is deployed on Netlify. The `netlify.toml` automatically compiles the code, hosts the frontend on a global CDN, and deploys the backend as an AWS Lambda Serverless Function.

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/routhujahnavi/Future-me.git
   cd "Future-me"
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up your Environment Variables:**
   Create a `.env` file in the `backend/` directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   PORT=5001
   ```

4. **Start the Backend Server:**
   ```bash
   npm start
   ```
   *(The server will run on `http://localhost:5001`)*

5. **Start the Frontend:**
   Simply open the `frontend/index.html` file in any modern web browser. No frontend build step is required!

---

## ☁️ How to Deploy (Netlify)

This project is pre-configured for Netlify's serverless architecture.

1. Ensure you have the Netlify CLI installed (`npm install netlify-cli -g`).
2. Run `netlify deploy --prod` in the root directory.
3. Go to your Netlify Dashboard > Site Configuration > Environment Variables.
4. Add your `GEMINI_API_KEY`.
5. Trigger a new deploy to activate the environment variables!
