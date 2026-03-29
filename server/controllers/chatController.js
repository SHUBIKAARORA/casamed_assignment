import Chat from "../models/Chat.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    // 1. Validation: Ensure API Key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    // 2. Initialize AI inside the request handler
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Save user message to DB
    const userMsg = await Chat.create({
      sessionId,
      role: "user",
      content: message,
    });

    // 4. Fetch previous chat history
    const previousChats = await Chat.find({ sessionId })
      .sort({ createdAt: 1 });

    // 5. Convert to conversation format
    let conversation = `You are a physiotherapy assistant.

Rules:
- Always suggest 3 to 5 safe exercises
- Each exercise should have:
  1. Name
  2. Short description (1-2 lines)
- Consider user's previous messages for context
- If surgery or serious condition is mentioned:
  - Give safer, modified exercises
  - Add a short caution (not too long)\n\n`;

    previousChats.forEach(chat => {
      if (chat.role === "user") {
        conversation += `User: ${chat.content}\n`;
      } else {
        conversation += `Assistant: ${chat.content}\n`;
      }
    });

    // 6. Call Gemini API
    const result = await model.generateContent(conversation);
    
    // Safety check for empty response
    const response = await result.response;
    const aiText = response.text();

    // 7. Save AI response to DB
    const aiMsg = await Chat.create({
      sessionId,
      role: "assistant",
      content: aiText,
    });

    // 8. Return response
    res.json({
      userMessage: userMsg,
      aiMessage: aiMsg,
    });

  } catch (error) {
    console.error("Chat Error:", error);
    // Return the specific error message to help you debug in Postman/Frontend
    res.status(500).json({ 
      message: "Error processing chat request", 
      error: error.message 
    });
  }
};


export const getChatBySession = async (req, res) => {
  try {
    const chats = await Chat.find({
      sessionId: req.params.sessionId,
    }).sort({ createdAt: 1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};