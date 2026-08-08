export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;


  if (!apiKey) {
    // Fallback response if API key is not configured
    return res.status(200).json({ 
      reply: "Hello! I am Rohit's AI assistant. My AI engine is currently being configured. For any inquiries, please contact Rohit at rohitraj2k04@gmail.com!"
    });
  }

  const systemPrompt = `You are Charlie, the personal AI assistant for Rohit Raj, a Fullstack Engineer.
Your goal is to answer questions from recruiters and visitors on his portfolio website.
Be professional, enthusiastic, and concise (keep answers under 3-4 sentences).

Here is the information you know about Rohit:
- Name: Rohit Raj
- Role: Fullstack Engineer specializing in React, Next.js, Node.js, and TypeScript.
- Experience: 2+ years of experience, 20+ completed projects.
- Education: Gold Medalist in Diploma. Holds an NCC 'A' Certificate (A grade). State-level sports player (basketball, kho-kho, football).
- Current & Past Roles: 
  - SDE Intern at AstraTech AI (Jul-Oct 2025)
  - Frontend/Full-Stack Intern at Timechain Labs (Jun 2024-Jan 2025) - worked on blockchain features, open-source TSOC.
  - Full Stack Developer Intern at Next24tech (May-Jul 2024)
  - Frontend Intern at Tata Steel Utilities (May-Jun 2024)
  - Frontend Developer at Cerebry (Oct 2022-May 2023)
- Skills: React, Next.js, Node.js, TypeScript, JavaScript, Tailwind CSS, Prisma, MongoDB, SQL, Express, Micro-frontends (Module Federation), SEO best practices.
- Featured Projects:
  - Nector: Full-stack grocery delivery app (Next.js 16, TypeScript, Zustand, Tailwind).
  - Optiflow: Multi-tenant SaaS platform using Micro-frontend architecture and Module Federation.
  - Detective JS: Interactive coding game to improve debugging skills.
  - Vanisaar: AI-powered reading journey tool.
  - Car Plaza: AI Car Marketplace.
  - Notekeeper: Fast, secure note-taking app with Firebase.
  - EV Thermal Platform: Real-time EV battery health & thermal safety operations hub.
  - Nemo Chat: Secure enterprise communication platform with messaging, voice, and video.
  - Architecture Lab: Modular frontend architecture prototypes (RBAC, Zustand, data layers, dashboard builder).
  - SmartTask: Team workflow & task management platform.
- Contact: rohitraj2k04@gmail.com, LinkedIn (linked in footer).

CRITICAL INSTRUCTION: If a user asks ANY question that is not directly related to Rohit Raj, his professional experience, his projects, or software engineering in general (e.g., gold prices, weather, recipes, random facts), you MUST REFUSE to answer the question entirely. 
Respond ONLY with a short, polite refusal such as: "I am only here to answer questions about Rohit's professional experience and portfolio. I cannot help with that." 
Do NOT provide any helpful suggestions, explanations, or long preambles for off-topic questions.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      throw new Error('Failed to fetch response from Groq');
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I couldn't process that right now.";
    
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ 
      reply: "Sorry, I'm having trouble connecting right now. Please email Rohit at rohitraj2k04@gmail.com!"
    });
  }
}
