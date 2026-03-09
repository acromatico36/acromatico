// Spark Strategic Intelligence Widget 🔥
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
        width: 460px;
        max-width: calc(100vw - 48px);
        height: 680px;
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
        max-width: 85%;
        padding: 14px 18px;
        border-radius: 18px;
        font-size: 15px;
        line-height: 1.6;
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
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        position: fixed;
        bottom: 24px;
        right: 24px;
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
      
      .spark-insight-card {
        background: linear-gradient(135deg, rgba(255,107,53,0.08), rgba(71,148,166,0.08));
        border: 1px solid rgba(255,107,53,0.3);
        border-radius: 16px;
        padding: 20px;
        margin: 12px 0;
      }
      
      .spark-insight-card h4 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 12px;
        color: #FF6B35;
      }
      
      .spark-insight-card p, .spark-insight-card ul {
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255,255,255,0.85);
      }
      
      .spark-insight-card ul {
        list-style: none;
        padding: 0;
        margin: 8px 0;
      }
      
      .spark-insight-card li {
        padding: 6px 0 6px 24px;
        position: relative;
      }
      
      .spark-insight-card li:before {
        content: "→";
        position: absolute;
        left: 0;
        color: #FF6B35;
        font-weight: 700;
      }
      
      .spark-strategic-brief {
        background: linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(71,148,166,0.05) 100%);
        border: 1px solid rgba(255,107,53,0.3);
        border-radius: 20px;
        padding: 28px 20px;
        margin: 16px 0;
      }
      
      .spark-strategic-brief h3 {
        font-size: 22px;
        font-weight: 900;
        margin-bottom: 8px;
        background: linear-gradient(135deg, #FF6B35, #FFD23F);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
              <div class="spark-title">Spark Strategic AI</div>
              <div class="spark-subtitle">Deep brand intelligence</div>
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
  
  // Strategic Intelligence Database (define BEFORE injecting DOM)
  const StrategicIntelligence = {
    // Industry-specific competitive landscapes
    competitiveLandscapes: {
      'fitness': {
        keyPlayers: ['Peloton', 'ClassPass', 'Barry\'s Bootcamp', 'F45', 'Orangetheory'],
        marketSize: '$96.7B globally',
        trends: ['At-home fitness', 'Boutique studios', 'Wearable tech integration', 'Community-first'],
        blueOcean: 'Hyper-personalized recovery + performance tracking',
        positioning: 'Most brands compete on equipment or class variety. Win by owning OUTCOMES.'
      },
      'saas': {
        keyPlayers: ['Varies by vertical'],
        marketSize: '$195B and growing 18% YoY',
        trends: ['AI-first products', 'Vertical SaaS', 'No-code tools', 'Usage-based pricing'],
        blueOcean: 'Solving one workflow problem 10x better than horizontal tools',
        positioning: 'Horizontal SaaS is saturated. Vertical + AI + specific workflow = moat.'
      },
      'beauty': {
        keyPlayers: ['Glossier', 'The Ordinary', 'Drunk Elephant', 'Fenty Beauty'],
        marketSize: '$511B globally',
        trends: ['Clean beauty', 'Personalization', 'DTC brands', 'Influencer-led'],
        blueOcean: 'Science-backed formulations with transparent ingredients',
        positioning: 'Market is emotional + aspirational. Win with education + trust.'
      },
      'ecommerce': {
        keyPlayers: ['Amazon', 'Shopify merchants', 'DTC brands'],
        marketSize: '$5.7T globally',
        trends: ['Social commerce', 'Subscription models', 'Fast shipping', 'Sustainability'],
        blueOcean: 'Niche products with strong community + content',
        positioning: 'Compete on trust, story, and community—not price.'
      },
      'realestate': {
        keyPlayers: ['Zillow', 'Redfin', 'Compass', 'Opendoor'],
        marketSize: '$3.7T (US residential alone)',
        trends: ['iBuying', 'Virtual tours', 'Data-driven pricing', 'Fractional ownership'],
        blueOcean: 'Institutional-grade tools for individual investors',
        positioning: 'Technology + trust + transparency = differentiation.'
      },
      'default': {
        keyPlayers: ['Varies by vertical'],
        marketSize: 'Depends on niche',
        trends: ['Digital transformation', 'AI integration', 'Customer experience'],
        blueOcean: 'Solve a specific pain point 10x better',
        positioning: 'Find where incumbents are weak and dominate that wedge.'
      }
    },
    
    // Strategic frameworks
    frameworks: {
      blueOcean: (industry, problem) => `
        <strong>Blue Ocean Strategy Analysis:</strong><br>
        Instead of competing in the red ocean (crowded ${industry} space), create uncontested market space by:<br>
        • <strong>Eliminate:</strong> Features that are industry standard but don't create value<br>
        • <strong>Reduce:</strong> Over-delivered features that customers don't value<br>
        • <strong>Raise:</strong> Factors well above industry standard (focus on ${problem})<br>
        • <strong>Create:</strong> New value elements the industry has never offered
      `,
      
      jobsToBeDone: (audience, problem) => `
        <strong>Jobs-to-be-Done Framework:</strong><br>
        ${audience} isn't buying your product—they're "hiring" it to do a job:<br>
        • <strong>Functional job:</strong> Solve ${problem}<br>
        • <strong>Emotional job:</strong> Feel confident, secure, successful<br>
        • <strong>Social job:</strong> Look smart to peers/colleagues<br>
        <em>Win by being the BEST tool for that specific job.</em>
      `,
      
      positioning: (audience, problem, competitors) => `
        <strong>Strategic Positioning:</strong><br>
        • <strong>Who:</strong> ${audience} (hyper-specific)<br>
        • <strong>What:</strong> The ONLY solution that solves ${problem}<br>
        • <strong>How:</strong> Unlike ${competitors}, you [unique approach]<br>
        • <strong>Proof:</strong> [Case study / metric / testimonial]<br>
        <em>This is your positioning statement. Memorize it.</em>
      `
    },
    
    // Growth stage playbooks
    stagePlaybooks: {
      'pre-revenue': {
        focus: 'Validation & Positioning',
        kpis: ['Customer interviews (20+)', 'MVP feedback', 'Positioning clarity'],
        nextSteps: [
          'Talk to 20-50 target customers BEFORE building',
          'Identify the ONE problem worth solving',
          'Build MVP that solves ONLY that problem',
          'Get 10 paying customers (even if manual process)'
        ]
      },
      '0-5k': {
        focus: 'Product-Market Fit',
        kpis: ['Customer retention', 'NPS score', 'Word-of-mouth growth'],
        nextSteps: [
          'Double down on your best customers (who loves you?)',
          'Build a repeatable acquisition channel',
          'Nail your onboarding (first 24 hours = critical)',
          'Create case studies from early wins'
        ]
      },
      '5k-25k': {
        focus: 'Scalable Acquisition',
        kpis: ['CAC:LTV ratio', 'Monthly growth rate', 'Churn rate'],
        nextSteps: [
          'Automate customer acquisition (ads, content, partnerships)',
          'Build a content engine (SEO + thought leadership)',
          'Hire your first growth person',
          'Implement analytics + cohort tracking'
        ]
      },
      '25k-100k': {
        focus: 'Scale & Systems',
        kpis: ['Revenue per employee', 'Gross margin', 'Expansion revenue'],
        nextSteps: [
          'Build systems for sales, marketing, operations',
          'Hire specialists (not generalists)',
          'Launch second acquisition channel',
          'Explore strategic partnerships'
        ]
      },
      '100k+': {
        focus: 'Market Leadership',
        kpis: ['Market share', 'Brand awareness', 'Enterprise deals'],
        nextSteps: [
          'Dominate your category (thought leadership)',
          'Launch enterprise offering',
          'Build moat (network effects, data, brand)',
          'Consider strategic M&A'
        ]
      }
    }
  };
  
  // Spark Widget Logic
  window.SparkWidget = {
    isOpen: false,
    conversationStarted: false,
    currentStep: '',
    messageCount: 0,
    conversationHistory: [], // Track full conversation for AI
    userData: {
      business: '',
      industry: '',
      audience: '',
      problem: '',
      stage: '',
      competitors: '',
      differentiator: ''
    },
    
    toggle() {
      const chatWindow = document.getElementById('spark-chat-window');
      this.isOpen = !this.isOpen;
      chatWindow.classList.toggle('open', this.isOpen);
      
      if (this.isOpen && !this.conversationStarted) {
        setTimeout(() => {
          this.addMessage('<strong>What\'s the biggest problem in your business right now?</strong><br><br>(e.g., "Can\'t get consistent leads", "Spending 10 hours/week on manual tasks", "Competitors are crushing us on price")', 'spark');
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
      if (lower.includes('fitness') || lower.includes('gym') || lower.includes('workout')) return 'fitness';
      if (lower.includes('saas') || lower.includes('software') || lower.includes('platform')) return 'saas';
      if (lower.includes('beauty') || lower.includes('skincare') || lower.includes('cosmetic')) return 'beauty';
      if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('online store')) return 'ecommerce';
      if (lower.includes('real estate') || lower.includes('property') || lower.includes('realestate')) return 'realestate';
      return 'default';
    },
    
    conversationHistory: [],
    messageCount: 0,
    
    async callAI(userMessage) {
      this.messageCount++;
      
      // Add message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });
      
      // Update userData based on message count
      if (this.messageCount === 1) this.userData.problem = userMessage;
      else if (this.messageCount === 2) {
        this.userData.business = userMessage;
        this.userData.industry = this.extractIndustry(userMessage);
      }
      else if (this.messageCount === 3) this.userData.audience = userMessage;
      else if (this.messageCount === 4) this.userData.stage = this.normalizeStage(userMessage);
      else if (this.messageCount === 5) this.userData.competitors = userMessage;
      else if (this.messageCount === 6) this.userData.differentiator = userMessage;
      
      // Call REAL AI API (powered by your GenSpark credits)
      try {
        const response = await fetch('/api/spark-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: this.conversationHistory,
            userData: this.userData
          })
        });
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Add AI response to history
        this.conversationHistory.push({
          role: 'assistant',
          content: data.message
        });
        
        return data.message;
        
      } catch (error) {
        console.error('Spark AI Error:', error);
        return `🔥 <strong>Spark is having trouble connecting.</strong><br><br>But don't worry - based on what you've told me, I can still help. Let me know what you need and I'll get you a strategic brief.`;
      }
    },
    
    analyzePainType(text) {
      if (text.includes('lead') || text.includes('customer') || text.includes('traffic')) {
        return '🎯 <strong>Acquisition problem.</strong> This is THE number 1 killer of businesses. Every other problem stems from this.';
      }
      if (text.includes('time') || text.includes('hour') || text.includes('manual') || text.includes('automat')) {
        return '⏰ <strong>Efficiency problem.</strong> Time equals money. If you are spending 10 hours on X, that is opportunity cost you cannot scale.';
      }
      if (text.includes('money') || text.includes('cost') || text.includes('expensive') || text.includes('price')) {
        return '💰 <strong>ROI problem.</strong> Every dollar matters. You need to see clear returns or you are bleeding cash.';
      }
      if (text.includes('trust') || text.includes('credibility') || text.includes('confidence')) {
        return '🛡️ <strong>Authority problem.</strong> People buy from who they trust. Without credibility, you are fighting uphill.';
      }
      if (text.includes('convert') || text.includes('close') || text.includes('sale')) {
        return '📈 <strong>Conversion problem.</strong> Traffic means nothing if it does not convert. This is pure math you can fix.';
      }
      return '🔥 <strong>Growth blocker.</strong> This is costing you time, money, and momentum.';
    },
    
    analyzeAudience(audience, problem) {
      const size = audience.match(/\d+[\-\+]?/g);
      if (size) {
        return `The specificity is GOLD. ${audience} with "${problem}" = A market segment you can dominate.`;
      }
      if (audience.includes('founder') || audience.includes('CEO') || audience.includes('owner')) {
        return `Decision-makers. That means shorter sales cycles, higher LTV, but you need to PROVE ROI fast.`;
      }
      if (audience.includes('millennial') || audience.includes('gen z') || audience.includes('boomer')) {
        return `Generational targeting = smart. Different pain points, different buying behaviors. Tailor everything to THEM.`;
      }
      return `That's your ICP (Ideal Customer Profile). Every marketing dollar should target THIS person.`;
    },
    
    analyzeCompetitors(competitors, problem) {
      const names = competitors.split(/[,;&]+/).map(c => c.trim());
      if (names.length >= 2) {
        return `Multiple competitors means validated market. Good. Now you need to differentiate on solving "${problem}" better than ALL of them.`;
      }
      if (competitors.toLowerCase().includes('no one') || competitors.toLowerCase().includes('none')) {
        return `No direct competitors? Either you found a blue ocean or the market doesn't exist yet. Validate demand FAST.`;
      }
      return `Knowing your enemy is half the battle. Study how they solve "${problem}" and do it 10x better.`;
    },
    
    async handleMessage(message) {
      // Store user data as we go
      if (!this.conversationStarted) {
        this.conversationStarted = true;
        this.userData.problem = message;
        this.currentStep = 'discovering';
      } else if (!this.userData.business && message.length > 5) {
        this.userData.business = message;
        this.userData.industry = this.extractIndustry(message);
      } else if (!this.userData.audience && message.length > 5) {
        this.userData.audience = message;
      } else if (!this.userData.stage && message.length > 2) {
        this.userData.stage = this.normalizeStage(message);
      } else if (!this.userData.competitors && message.length > 2) {
        this.userData.competitors = message;
      } else if (!this.userData.differentiator && message.length > 5) {
        this.userData.differentiator = message;
        this.currentStep = 'final';
      }
      
      // Call REAL AI
      this.showTyping();
      const aiResponse = await this.callAI(message);
      this.hideTyping();
      
      // Display AI response
      this.addMessage(aiResponse, 'spark');
      
      // If we have all data, generate brief
      if (this.currentStep === 'final' && this.userData.differentiator) {
        await new Promise(r => setTimeout(r, 1000));
        this.showTyping();
        await new Promise(r => setTimeout(r, 2000));
        this.hideTyping();
        this.generateStrategicBrief();
      }
    },
    
    extractPainValidation(problem) {
      if (problem.toLowerCase().includes('time') || problem.toLowerCase().includes('hour')) {
        return 'Time = money. If you can save them hours, you can charge premium.';
      }
      if (problem.toLowerCase().includes('money') || problem.toLowerCase().includes('cost')) {
        return 'ROI is clear. Lead with cost savings in your messaging.';
      }
      if (problem.toLowerCase().includes('trust') || problem.toLowerCase().includes('confidence')) {
        return 'This is emotional. Your brand needs to scream trust + authority.';
      }
      return 'That is a painful problem worth solving.';
    },
    
    normalizeStage(input) {
      const lower = input.toLowerCase();
      if (lower.includes('pre') || lower.includes('0') && lower.includes('revenue')) return 'pre-revenue';
      if (lower.includes('5k') && !lower.includes('25')) return '0-5k';
      if (lower.includes('25') || (lower.includes('5') && lower.includes('25'))) return '5k-25k';
      if (lower.includes('100') || lower.includes('25k-100')) return '25k-100k';
      if (lower.includes('100k+') || lower.includes('100k +')) return '100k+';
      return 'pre-revenue';
    },
    
    getStageInsight(stage) {
      const playbook = StrategicIntelligence.stagePlaybooks[stage];
      if (!playbook) return 'focus is critical.';
      return `your focus should be <strong>${playbook.focus}</strong>.`;
    },
    
    generateStrategicBrief() {
      const intel = StrategicIntelligence.competitiveLandscapes[this.userData.industry] || StrategicIntelligence.competitiveLandscapes.default;
      const playbook = StrategicIntelligence.stagePlaybooks[this.userData.stage];
      
      const briefHTML = `
        <div class="spark-strategic-brief">
          <h3>📊 Your Strategic Brief</h3>
          <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 20px;">This is your battle plan. Screenshot it.</p>
          
          <div class="spark-insight-card">
            <h4>🎯 Market Position</h4>
            <p><strong>Industry:</strong> ${this.userData.industry.charAt(0).toUpperCase() + this.userData.industry.slice(1)}<br>
            <strong>Market size:</strong> ${intel.marketSize}<br>
            <strong>Your stage:</strong> ${this.userData.stage}<br>
            <strong>Positioning gap:</strong> ${intel.positioning}</p>
          </div>
          
          <div class="spark-insight-card">
            <h4>🧠 Strategic Positioning</h4>
            <p><strong>Who:</strong> ${this.userData.audience}<br>
            <strong>What they need:</strong> ${this.userData.problem}<br>
            <strong>Your differentiator:</strong> ${this.userData.differentiator}<br>
            <strong>vs. Competitors:</strong> ${this.userData.competitors}</p>
            <p style="margin-top: 12px;"><em>Your one-liner:</em><br>"For ${this.userData.audience.split(',')[0] || this.userData.audience.split('.')[0]} who ${this.userData.problem.split('.')[0]}, we're the only solution that ${this.userData.differentiator.split('.')[0]}."</p>
          </div>
          
          <div class="spark-insight-card">
            <h4>📈 Growth Playbook (${this.userData.stage})</h4>
            <p><strong>Focus area:</strong> ${playbook.focus}<br>
            <strong>Key metrics:</strong> ${playbook.kpis.join(', ')}</p>
            <p style="margin-top: 12px;"><strong>Next 4 weeks:</strong></p>
            <ul>
              ${playbook.nextSteps.map((s, i) => `<li><strong>Week ${i+1}:</strong> ${s}</li>`).join('')}
            </ul>
          </div>
          
          <div class="spark-insight-card">
            <h4>🚀 Blue Ocean Strategy</h4>
            <p>${intel.blueOcean}</p>
            <p style="margin-top: 12px;"><strong>Your wedge:</strong><br>
            Instead of competing on ${intel.trends[0]}, dominate on solving "${this.userData.problem}" better than anyone else.</p>
          </div>
          
          <div class="spark-insight-card">
            <h4>💡 Tactical Recommendations</h4>
            <ul>
              <li><strong>Messaging:</strong> Lead with "${this.userData.problem}"—not your product</li>
              <li><strong>Content:</strong> Create 10 pieces educating ${this.userData.audience.split(',')[0]} on solving this problem</li>
              <li><strong>Positioning:</strong> Be THE solution for ${this.userData.audience.split(',')[0]}—not a "feature"</li>
              <li><strong>Differentiation:</strong> Triple down on "${this.userData.differentiator}"—that's your moat</li>
            </ul>
          </div>
          
          <div class="spark-cta-banner">
            <h4>Want Us to Build This? 🚀</h4>
            <p>We turn strategic briefs into complete systems: positioning → platform → content engine.</p>
            <a href="/contact" class="spark-cta-btn">Book Strategy Call →</a>
          </div>
        </div>
      `;
      
      this.addMessage(briefHTML, 'spark');
      
      setTimeout(() => {
        this.addMessage(`There's your strategic brief for solving "<strong>${this.userData.problem}</strong>" for <strong>${this.userData.audience}</strong>. 🔥<br><br>This isn't generic BS—it's a battle plan based on your ${this.userData.industry} market, your ${this.userData.stage} stage, and how you stack up against ${this.userData.competitors.split(',')[0] || this.userData.competitors}.<br><br><a href="/contact" style="color: #FF6B35; text-decoration: underline; font-weight: 700;">Want us to build the platform that executes this? →</a>`, 'spark');
      }, 1000);
      
      document.getElementById('spark-input').disabled = true;
      document.getElementById('spark-send').disabled = true;
      document.getElementById('spark-input').placeholder = "✨ Your strategic brief is ready!";
    }
  };
  
  // Inject widget into DOM (AFTER all code is defined)
  document.body.insertAdjacentHTML('beforeend', widgetHTML);
  
  // Event listeners (AFTER DOM injection)
  const input = document.getElementById('spark-input');
  const sendBtn = document.getElementById('spark-send');
  
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;
    
    window.SparkWidget.addMessage(message, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    
    const isFinalAnswer = window.SparkWidget.currentStep === 'differentiator';
    
    await window.SparkWidget.handleMessage(message);
    
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
