// ============================================
// Recruiter Chatbot - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotSuggestions = document.querySelectorAll('.chatbot-suggestion');

  // Check if chatbot elements exist
  if (!chatbotToggle || !chatbotWindow || !chatbotInput || !chatbotSend || !chatbotMessages) return;

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    chatbotWindow.classList.toggle('active');
    const isActive = chatbotWindow.classList.contains('active');
    
    const chatIcon = document.querySelector('.chatbot-toggle .chat-icon');
    const closeIcon = document.querySelector('.chatbot-toggle .close-icon');
    
    if (isActive) {
      chatbotInput.focus();
      if(chatIcon) chatIcon.style.display = 'none';
      if(closeIcon) closeIcon.style.display = 'block';
    } else {
      if(chatIcon) chatIcon.style.display = 'block';
      if(closeIcon) closeIcon.style.display = 'none';
    }
  };

  chatbotToggle.addEventListener('click', toggleChatbot);
  chatbotClose.addEventListener('click', toggleChatbot);

  // Add message to chat
  const addMessage = (text, sender) => {
    const messageEl = document.createElement('div');
    messageEl.classList.add('chatbot-message', sender);
    
    const textEl = document.createElement('p');
    textEl.textContent = text;
    messageEl.appendChild(textEl);
    
    chatbotMessages.appendChild(messageEl);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  // Add a typing indicator
  const showTypingIndicator = () => {
    const typingEl = document.createElement('div');
    typingEl.classList.add('chatbot-message', 'bot', 'typing-indicator');
    typingEl.id = 'typing-indicator';
    
    typingEl.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    
    chatbotMessages.appendChild(typingEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) {
      typingEl.remove();
    }
  };

  // Process user input via Groq AI
  const processInput = async (text) => {
    if (!text.trim()) return;
    
    // Clear input
    chatbotInput.value = '';
    
    // Show user message
    addMessage(text, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      removeTypingIndicator();
      addMessage(data.reply || "Sorry, I couldn't understand that.", 'bot');
    } catch (error) {
      console.error('Error fetching chat response:', error);
      removeTypingIndicator();
      addMessage("Sorry, I'm having trouble connecting right now. Please email Rohit directly!", 'bot');
    }
  };

  // Event Listeners for sending messages
  chatbotSend.addEventListener('click', () => {
    processInput(chatbotInput.value);
  });

  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      processInput(chatbotInput.value);
    }
  });

  // Handle suggestion chips
  chatbotSuggestions.forEach(chip => {
    chip.addEventListener('click', () => {
      processInput(chip.textContent);
    });
  });

  // Initial welcome message (delayed slightly)
  setTimeout(() => {
    if (chatbotMessages.children.length === 0) {
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addMessage("Hi there! 👋 I'm Charlie, Rohit's virtual assistant. Ask me anything about his skills, experience, or projects!", 'bot');
      }, 800);
    }
  }, 1500);
});
