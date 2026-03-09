// Spark Chat Widget 🔥
(function() {
  // Inject Spark widget HTML
  const widgetHTML = `
    <style>
      #spark-widget-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      }
      
      #spark-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 420px;
        max-width: calc(100vw - 48px);
        height: 600px;
        max-height: calc(100vh - 120px);
        background: rgba(0,0,0,0.95);
        backdrop-filter: blur(30px);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        display: none;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease;
      }
      
      #spark-chat-window.open {
        display: flex;
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      
      .spark-header {
        padding: 20px 24px;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .spark-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .spark-avatar-header {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      
      .spark-title {
        color: #000;
        font-weight: 700;
        font-size: 17px;
      }
      
      .spark-subtitle {
        color: rgba(0,0,0,0.7);
        font-size: 13px;
      }
      
      .spark-close {
        background: rgba(0,0,0,0.2);
        border: none;
        color: #000;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .spark-close:hover {
        background: rgba(0,0,0,0.3);
        transform: scale(1.05);
      }
      
      .spark-messages {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .spark-message {
        display: flex;
        gap: 12px;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .spark-message.spark {
        flex-direction: row;
      }
      
      .spark-message.user {
        flex-direction: row-reverse;
      }
      
      .spark-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(255,107,53,0.4);
      }
      
      .spark-message.user .spark-avatar {
        background: linear-gradient(135deg, #4794A6, #5aa5b8);
        box-shadow: 0 4px 12px rgba(71,148,166,0.4);
      }
      
      .spark-bubble {
        max-width: 75%;
        padding: 14px 18px;
        border-radius: 18px;
        font-size: 15px;
        line-height: 1.5;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        color: #f5f5f7;
      }
      
      .spark-message.user .spark-bubble {
        background: rgba(71,148,166,0.15);
        border-color: rgba(71,148,166,0.3);
        text-align: right;
      }
      
      .spark-typing {
        display: flex;
        gap: 4px;
        padding: 12px;
      }
      
      .spark-typing span {
        width: 6px;
        height: 6px;
        background: #FF6B35;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;
      }
      
      .spark-typing span:nth-child(1) { animation-delay: -0.32s; }
      .spark-typing span:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
        40% { transform: translateY(-6px); opacity: 1; }
      }
      
      .spark-input-container {
        padding: 16px 20px;
        border-top: 1px solid rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.5);
      }
      
      .spark-input-wrapper {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      
      .spark-input {
        flex: 1;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 20px;
        padding: 12px 18px;
        font-size: 15px;
        color: #fff;
        outline: none;
        transition: all 0.3s ease;
      }
      
      .spark-input:focus {
        background: rgba(255,255,255,0.12);
        border-color: #FF6B35;
      }
      
      .spark-send {
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }
      
      .spark-send:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(255,107,53,0.5);
      }
      
      .spark-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      #spark-trigger {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        border: none;
        box-shadow: 0 8px 30px rgba(255,107,53,0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        transition: all 0.3s ease;
        position: relative;
      }
      
      #spark-trigger:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 40px rgba(255,107,53,0.6);
      }
      
      .spark-pulse {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        opacity: 0;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.3); opacity: 0; }
      }
      
      .spark-landing {
        background: linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(71,148,166,0.05) 100%);
        border: 1px solid rgba(255,107,53,0.3);
        border-radius: 20px;
        padding: 32px 24px;
        margin: 16px 0;
      }
      
      .spark-landing h3 {
        font-size: 24px;
        font-weight: 900;
        margin-bottom: 10px;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .spark-landing-section {
        background: rgba(0,0,0,0.4);
        border-radius: 14px;
        padding: 16px;
        margin: 14px 0;
      }
      
      .spark-landing-section h4 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #FF6B35;
      }
      
      .spark-landing-section p, .spark-landing-section ul {
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255,255,255,0.8);
      }
      
      .spark-landing-section ul {
        list-style: none;
        padding: 0;
      }
      
      .spark-landing-section li {
        padding: 6px 0 6px 24px;
        position: relative;
      }
      
      .spark-landing-section li:before {
        content: "🔥";
        position: absolute;
        left: 0;
      }
      
      .spark-color-palette {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }
      
      .spark-color-swatch {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border: 2px solid rgba(255,255,255,0.2);
      }
      
      .spark-cta-banner {
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        border-radius: 14px;
        padding: 20px;
        text-align: center;
        margin-top: 20px;
      }
      
      .spark-cta-banner h4 {
        font-size: 18px;
        font-weight: 900;
        color: #000;
        margin-bottom: 8px;
      }
      
      .spark-cta-banner p {
        color: rgba(0,0,0,0.8);
        margin-bottom: 14px;
        font-size: 14px;
      }
      
      .spark-cta-btn {
        display: inline-block;
        background: #000;
        color: #fff;
        padding: 12px 28px;
        border-radius: 980px;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
        transition: all 0.3s ease;
      }
      
      .spark-cta-btn:hover {
        transform: scale(1.05);
      }
      
      @media (max-width: 734px) {
        #spark-chat-window {
          width: calc(100vw - 24px);
          right: 12px;
          bottom: 90px;
        }
        
        #spark-trigger {
          width: 56px;
          height: 56px;
          font-size: 28px;
        }
      }
    </style>
    
    <div id="spark-widget-container">
      <div id="spark-chat-window">
        <div class="spark-header">
          <div class="spark-header-left">
            <div class="spark-avatar-header">🔥</div>
            <div>
              <div class="spark-title">Meet Spark</div>
              <div class="spark-subtitle">Your brand strategist</div>
            </div>
          </div>
          <button class="spark-close" onclick="window.SparkWidget.toggle()">✕</button>
        </div>
        
        <div class="spark-messages" id="spark-messages"></div>
        
        <div class="spark-input-container">
          <div class="spark-input-wrapper">
            <input 
              type="text" 
              class="spark-input" 
              id="spark-input" 
              placeholder="Tell me about your business..."
            />
            <button class="spark-send" id="spark-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <button id="spark-trigger" onclick="window.SparkWidget.toggle()">
        <div class="spark-pulse"></div>
        🔥
      </button>
    </div>
  `;
  
  // Inject into DOM
  document.body.insertAdjacentHTML('beforeend', widgetHTML);
  
  // Spark Widget Logic
  window.SparkWidget = {
    isOpen: false,
    conversationStarted: false,
    currentStep: '',
    userData: {
      business: '',
      why: '',
      audience: '',
      problem: ''
    },
    
    toggle() {
      const chatWindow = document.getElementById('spark-chat-window');
      this.isOpen = !this.isOpen;
      chatWindow.classList.toggle('open', this.isOpen);
      
      if (this.isOpen && !this.conversationStarted) {
        setTimeout(() => {
          this.addMessage('Hey! 👋 I\'m Spark, your brand strategist. Tell me about your business and I\'ll build you a custom brand framework in 2 minutes. What do you do?', 'spark');
          document.getElementById('spark-input').focus();
        }, 300);
      }
    },
    
    addMessage(content, type = 'spark') {
      const messagesContainer = document.getElementById('spark-messages');
      const message = document.createElement('div');
      message.className = `spark-message ${type}`;
      message.innerHTML = `
        <div class="spark-avatar">${type === 'spark' ? '🔥' : '👤'}</div>
        <div class="spark-bubble">${content}</div>
      `;
      messagesContainer.appendChild(message);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    showTyping() {
      const messagesContainer = document.getElementById('spark-messages');
      const typing = document.createElement('div');
      typing.className = 'spark-message spark';
      typing.id = 'spark-typing';
      typing.innerHTML = `
        <div class="spark-avatar">🔥</div>
        <div class="spark-bubble">
          <div class="spark-typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    hideTyping() {
      const typing = document.getElementById('spark-typing');
      if (typing) typing.remove();
    },
    
    extractIndustry(text) {
      const lower = text.toLowerCase();
      if (lower.includes('fitness') || lower.includes('gym')) return 'fitness';
      if (lower.includes('saas') || lower.includes('software')) return 'SaaS';
      if (lower.includes('beauty') || lower.includes('skincare')) return 'beauty';
      if (lower.includes('ecommerce') || lower.includes('online store')) return 'e-commerce';
      if (lower.includes('real estate') || lower.includes('property')) return 'real estate';
      if (lower.includes('food') || lower.includes('restaurant')) return 'food & beverage';
      if (lower.includes('consulting') || lower.includes('agency')) return 'services';
      return 'your industry';
    },
    
    async handleMessage(message) {
      if (!this.conversationStarted) {
        this.conversationStarted = true;
        this.userData.business = message;
        const industry = this.extractIndustry(message);
        
        this.showTyping();
        await new Promise(r => setTimeout(r, 1500));
        this.hideTyping();
        
        this.addMessage(`Love it! ${industry.charAt(0).toUpperCase() + industry.slice(1)} is huge right now. 🚀<br><br>Here's the thing: people don't buy WHAT you do—they buy <strong>WHY you do it</strong>.<br><br>So tell me: <strong>Why did you start this? What's the deeper mission?</strong>`, 'spark');
        this.currentStep = 'why';
        
      } else if (this.currentStep === 'why') {
        this.userData.why = message;
        
        this.showTyping();
        await new Promise(r => setTimeout(r, 1400));
        this.hideTyping();
        
        this.addMessage(`That's POWERFUL. 💪 People connect with that story instantly.<br><br>Now let's get tactical: <strong>Who EXACTLY are you trying to reach?</strong> Be specific.`, 'spark');
        this.currentStep = 'audience';
        
      } else if (this.currentStep === 'audience') {
        this.userData.audience = message;
        
        this.showTyping();
        await new Promise(r => setTimeout(r, 1400));
        this.hideTyping();
        
        this.addMessage(`Crystal clear. That specificity is GOLD. 🎯<br><br>Last question: <strong>What's the #1 problem your audience faces that you solve?</strong>`, 'spark');
        this.currentStep = 'problem';
        
      } else if (this.currentStep === 'problem') {
        this.userData.problem = message;
        
        this.showTyping();
        await new Promise(r => setTimeout(r, 2500));
        this.hideTyping();
        
        this.addMessage(`Alright, let me cook… 🔥👨‍🍳`, 'spark');
        
        await new Promise(r => setTimeout(r, 2000));
        this.showTyping();
        await new Promise(r => setTimeout(r, 2000));
        this.hideTyping();
        
        this.generateLandingPage();
        return;
      }
    },
    
    generateLandingPage() {
      const brandName = this.extractBrandName(this.userData.business);
      const industry = this.extractIndustry(this.userData.business);
      const colors = this.generateColorPalette(industry);
      
      const landingHTML = `
        <div class="spark-landing">
          <h3>${brandName}</h3>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">${this.generateTagline()}</p>
          
          <div class="spark-landing-section">
            <h4>🎯 Your "Why" (This is what sells)</h4>
            <p>${this.userData.why}</p>
          </div>
          
          <div class="spark-landing-section">
            <h4>🧠 Brand Positioning</h4>
            <p>For <strong>${this.userData.audience}</strong> who struggle with <strong>${this.userData.problem}</strong>, ${brandName} is the solution that actually delivers.</p>
          </div>
          
          <div class="spark-landing-section">
            <h4>💎 Your Unique Value</h4>
            <ul>
              <li>Built for ${this.userData.audience.split(',')[0] || this.userData.audience.split(' ').slice(0,4).join(' ')}</li>
              <li>Solves ${this.userData.problem.split(' ').slice(0,5).join(' ')}...</li>
              <li>Founded on: ${this.userData.why.split('.')[0]}</li>
            </ul>
          </div>
          
          <div class="spark-landing-section">
            <h4>🎨 Brand Colors</h4>
            <div class="spark-color-palette">
              ${colors.map(c => `<div class="spark-color-swatch" style="background: ${c.hex};" title="${c.name}"></div>`).join('')}
            </div>
          </div>
          
          <div class="spark-cta-banner">
            <h4>Ready to Build This? 🚀</h4>
            <p>We'll turn this into a complete system in 4-8 weeks.</p>
            <a href="/contact" class="spark-cta-btn">Book Strategy Call →</a>
          </div>
        </div>
      `;
      
      this.addMessage(landingHTML, 'spark');
      
      setTimeout(() => {
        this.addMessage(`There you go! 🎉 Screenshot it, share it, own it.<br><br><a href="/contact" style="color: #FF6B35; text-decoration: underline; font-weight: 700;">Want us to build the full thing? →</a>`, 'spark');
      }, 800);
      
      document.getElementById('spark-input').disabled = true;
      document.getElementById('spark-send').disabled = true;
      document.getElementById('spark-input').placeholder = "✨ Your framework is ready!";
    },
    
    extractBrandName(desc) {
      const words = desc.split(' ').filter(w => w.length > 3);
      return words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : 'Your Brand';
    },
    
    generateTagline() {
      return `Helping ${this.userData.audience.split(',')[0] || this.userData.audience.split(' ').slice(0,4).join(' ')}...`;
    },
    
    generateColorPalette(industry) {
      const palettes = {
        'fitness': [{ hex: '#FF6B35' }, { hex: '#004E89' }, { hex: '#00A896' }],
        'beauty': [{ hex: '#D4AF37' }, { hex: '#F4E4E3' }, { hex: '#A43C5A' }],
        'SaaS': [{ hex: '#0071E3' }, { hex: '#4794A6' }, { hex: '#6C63FF' }],
        'e-commerce': [{ hex: '#FF6B6B' }, { hex: '#4ECDC4' }, { hex: '#FFD93D' }],
        'default': [{ hex: '#FF6B35' }, { hex: '#4794A6' }, { hex: '#FFD23F' }]
      };
      return palettes[industry] || palettes['default'];
    }
  };
  
  // Event listeners
  const input = document.getElementById('spark-input');
  const sendBtn = document.getElementById('spark-send');
  
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;
    
    window.SparkWidget.addMessage(message, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    
    // Check if this is the final answer BEFORE processing
    const isFinalAnswer = window.SparkWidget.currentStep === 'problem';
    
    await window.SparkWidget.handleMessage(message);
    
    // Don't re-enable input if we just submitted the final answer
    if (!isFinalAnswer) {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  sendBtn.addEventListener('click', sendMessage);
})();
