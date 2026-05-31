require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
if (!process.env.GEMINI_API_KEY) {
    console.warn("WARNING: GEMINI_API_KEY is not set in the environment. API calls will fail.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

function cleanJsonResponse(text) {
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.substring(3);
    }
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    return cleaned.trim();
}

const router = express.Router();

router.post('/generate-futureme', async (req, res) => {
    try {
        const { name, age, goal, struggle, oneYearVision, tone } = req.body;

        if (!name || !goal || !tone) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `You are FutureMe, the future successful version of the user. You are not a generic motivational coach. You speak with emotional intelligence, clarity, and deep personal understanding. Your job is to help the user see who they are becoming, what they must change, and what they should do next.

Write as if you are the user's future self speaking directly to their current self.

Tone selected by user: ${tone}

User details:
Name: ${name}
Age: ${age}
Goal: ${goal}
Current struggle: ${struggle}
One-year vision: ${oneYearVision}

Return only valid JSON in this exact format:
{
  "message": "A powerful 120-180 word message from the future self.",
  "futureIdentity": "A concise description of who the user is becoming.",
  "nextMoves": ["Action 1", "Action 2", "Action 3"],
  "habit": "One small daily habit they should start today.",
  "warning": "One mistake their future self warns them about.",
  "mantra": "A short memorable line they can repeat daily."
}

Make it specific. Avoid generic motivation. Avoid clichés. Make it emotional but practical. Do not output anything except the JSON.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        try {
            const parsedJson = JSON.parse(cleanJsonResponse(text));
            res.json({
                success: true,
                data: parsedJson
            });
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Raw Response:", text);
            res.status(500).json({ success: false, error: 'Failed to parse AI response' });
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, error: 'FutureMe could not respond right now. Try again.' });
    }
});

router.post('/chat-futureme', async (req, res) => {
    try {
        const { userProfile, chatHistory, question } = req.body;

        if (!userProfile || !question) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Format history for the prompt
        let historyText = "";
        if (chatHistory && chatHistory.length > 0) {
            historyText = chatHistory.map(msg => `${msg.role === 'user' ? 'User' : 'FutureMe'}: ${msg.message}`).join('\n\n');
        }

        const prompt = `You are FutureMe, the future version of the user who already achieved their one-year vision. Reply directly to the user's question. Be personal, sharp, honest, and useful. Do not sound like a normal AI assistant. Do not mention that you are Gemini or an AI model. Speak like the future self.

User profile:
Name: ${userProfile.name}
Age: ${userProfile.age}
Goal: ${userProfile.goal}
Struggle: ${userProfile.struggle}
One-year vision: ${userProfile.oneYearVision}
Tone: ${userProfile.tone}

Recent chat history:
${historyText}

Current question:
${question}

Reply in 2-5 short paragraphs. Give at least one clear action.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.json({
            success: true,
            reply: text
        });
    } catch (error) {
        console.error("Gemini Chat API Error:", error);
        res.status(500).json({ success: false, error: 'FutureMe could not respond right now. Try again.' });
    }
});

router.post('/generate-daily-plan', async (req, res) => {
    try {
        const { name, goal, struggle, tone } = req.body;

        if (!name || !goal) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `You are FutureMe, the successful future version of the user. Your job is to create a highly actionable, structured, and motivational daily plan based on the user's current situation. 
        
Tone: ${tone}
User Name: ${name}
Goal: ${goal}
Struggle: ${struggle}

Return only valid JSON in this exact format:
{
  "motivationalIntro": "A sharp, inspiring opening from the future self.",
  "morningRoutine": ["Action 1", "Action 2"],
  "deepWorkBlocks": ["Action 1", "Action 2", "Action 3"],
  "eveningWindDown": ["Action 1", "Action 2"],
  "closingThought": "A final push of motivation."
}

Ensure the actions directly counter the user's struggle and build towards their goal. Keep the actions specific and bite-sized. Do not output anything except the JSON.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        try {
            const parsedJson = JSON.parse(cleanJsonResponse(text));
            res.json({
                success: true,
                data: parsedJson
            });
        } catch (parseError) {
            console.error("JSON Parse Error for Daily Plan:", parseError, "Raw:", text);
            res.status(500).json({ success: false, error: 'Failed to parse AI response' });
        }
    } catch (error) {
        console.error("Gemini Daily Plan API Error:", error);
        res.status(500).json({ success: false, error: 'Could not generate daily plan. Try again.' });
    }
});

// Mount routes for both local execution and Netlify Functions
app.use('/api', router);
app.use('/.netlify/functions/api', router);

// Export the app for serverless deployment
module.exports = app;

// Listen locally if executed directly
if (require.main === module) {
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        console.log(`FutureMe backend running locally on port ${port}`);
    });
}
