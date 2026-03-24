/**
 * ACROMATICO CRM - AI AGENT SYSTEM
 * 
 * 4 specialized agents using Genspark API:
 * - Agent 1: Message Classification (Executive Assistant)
 * - Agent 2: Task Generation (Project Manager)
 * - Agent 3: Client Health Scoring (Account Manager)
 * - Agent 4: Pattern Analysis (Business Analyst)
 */

// ==============================================
// GENSPARK API CLIENT
// ==============================================

const GENSPARK_API_URL = 'https://api.genspark.ai/v1/chat/completions'

interface GensparkMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GensparkResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

/**
 * Call Genspark API with retry logic and error handling
 */
async function callGensparkAPI(
  messages: GensparkMessage[],
  gensparkApiKey: string,
  model: string = 'genspark-pro',
  maxRetries: number = 3
): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(GENSPARK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gensparkApiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3,  // Low temperature for consistent structured output
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`Genspark API error: ${response.status} ${response.statusText}`)
      }

      const data: GensparkResponse = await response.json()
      return data.choices[0].message.content

    } catch (error) {
      lastError = error as Error
      console.error(`Genspark API attempt ${attempt}/${maxRetries} failed:`, error)
      
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  throw new Error(`Genspark API failed after ${maxRetries} attempts: ${lastError?.message}`)
}

/**
 * Parse JSON response from AI, handling markdown code blocks
 */
function parseAIJSON(content: string): any {
  try {
    // Remove markdown code blocks if present
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse AI JSON:', content)
    throw new Error('AI returned invalid JSON format')
  }
}

// ==============================================
// AGENT 1: MESSAGE CLASSIFICATION
// ==============================================

export interface Agent1Input {
  rawMessage: string
  clientName?: string
  companyName?: string
  projectName?: string
  conversationHistory?: Array<{ role: string; content: string }>
}

export interface Agent1Output {
  messageType: 'bug-report' | 'feature-request' | 'question' | 'feedback' | 'scope-change' | 'payment' | 'personal' | 'spam'
  category: 'technical' | 'business' | 'relationship' | 'urgent-blocker' | 'non-actionable'
  urgency: 'critical' | 'high' | 'medium' | 'low'
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated'
  requiresAction: boolean
  projectId: string | null
  confidence: number
  reasoning: string
}

/**
 * Agent 1: Classify incoming client message
 */
export async function classifyMessage(
  input: Agent1Input,
  gensparkApiKey: string
): Promise<Agent1Output> {
  const systemPrompt = `You are an Executive Assistant for Acromatico, a premium branding and web/app development agency.

Your task: Analyze client messages and classify them for the operations team with surgical precision.

CLASSIFICATION FRAMEWORK:

MESSAGE TYPES:
- bug-report: Something is broken or not working as expected
- feature-request: Client wants new functionality added
- question: Needs information, clarification, or guidance
- feedback: General comments about project quality or experience
- scope-change: Wants to modify project scope or add deliverables
- payment: Invoice, budget, timeline, or payment discussion
- personal: Social/relationship building, not project-related
- spam: Irrelevant, sales pitches, or automated messages

CATEGORIES:
- technical: Requires development work (coding, design, infrastructure)
- business: Contract, payment, timeline, budget discussions
- relationship: Check-ins, feedback, trust-building, satisfaction
- urgent-blocker: Blocking client's business operations RIGHT NOW
- non-actionable: No follow-up needed, informational only

URGENCY LEVELS:
- critical: Production down, revenue loss, angry client, legal issues
- high: Impacts project timeline or client satisfaction significantly
- medium: Important but not time-sensitive, can wait 48 hours
- low: Nice-to-have, no deadline, backlog item

SENTIMENT:
- positive: Happy, excited, grateful, enthusiastic
- neutral: Factual, transactional, professional
- negative: Disappointed, concerned, hesitant
- frustrated: Angry, impatient, threatening to leave

RESPOND WITH JSON ONLY (no markdown, no explanations, no code blocks):
{
  "messageType": "bug-report",
  "category": "urgent-blocker",
  "urgency": "critical",
  "sentiment": "frustrated",
  "requiresAction": true,
  "projectId": "proj-001",
  "confidence": 0.95,
  "reasoning": "Client reports login failure affecting their business operations"
}`

  const userPrompt = `CLIENT MESSAGE:
"""
${input.rawMessage}
"""

CONTEXT:
- Client: ${input.clientName || 'Unknown'}
- Company: ${input.companyName || 'Unknown'}
- Active Project: ${input.projectName || 'No active project'}
${input.conversationHistory ? `- Previous messages: ${input.conversationHistory.length} messages` : '- No previous conversation history'}

Classify this message now.`

  const messages: GensparkMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]

  const responseText = await callGensparkAPI(messages, gensparkApiKey)
  const classification = parseAIJSON(responseText)

  return classification as Agent1Output
}

// ==============================================
// AGENT 2: TASK GENERATION
// ==============================================

export interface Agent2Input {
  rawMessage: string
  classification: Agent1Output
  projectContext: {
    projectName: string
    projectType: string
    techStack: string
    currentPhase: string
    budgetHours: number
    hoursUsed: number
  }
}

export interface Agent2Output {
  taskTitle: string
  description: string
  acceptanceCriteria: string[]
  estimatedEffort: '15min' | '30min' | '1hr' | '2hr' | '4hr' | '8hr' | '16hr' | 'unknown'
  priority: 'critical' | 'high' | 'medium' | 'low'
  tags: string[]
  suggestedResponse: string
  scopeFlag: boolean
  clientApprovalRequired: boolean
}

/**
 * Agent 2: Generate detailed technical task from client message
 */
export async function generateTask(
  input: Agent2Input,
  gensparkApiKey: string
): Promise<Agent2Output> {
  const systemPrompt = `You are a Senior Project Manager at Acromatico, a premium branding and web/app development agency.

Your task: Convert client requests into detailed technical specifications that developers can execute immediately.

TASK CREATION RULES:

TITLE FORMAT:
- Start with action verb: "Fix", "Add", "Update", "Refactor", "Investigate"
- Be specific: "Fix login authentication on mobile Safari" not "Login issue"
- Include context: Platform, device, or feature area
- Examples: "Fix broken image upload on iPhone 13", "Add newsletter signup to homepage footer"

DESCRIPTION STRUCTURE:
1. CLIENT REQUEST: What the client said (verbatim or paraphrased)
2. CURRENT STATE: What's happening now (if bug) or what's missing (if feature)
3. EXPECTED STATE: What should happen instead
4. USER IMPACT: How this affects client's business or users
5. TECHNICAL CONTEXT: Relevant tech stack, dependencies, or constraints

ACCEPTANCE CRITERIA:
- Use "Given-When-Then" format for clarity
- Make them testable (pass/fail, no ambiguity)
- Include edge cases and error scenarios
- Example:
  * "Given user on mobile Safari, when clicking login button, then form submits successfully"
  * "Given invalid credentials, when submitting form, then show error message"
  * "Given valid credentials, when submitting form, then redirect to dashboard"

EFFORT ESTIMATION GUIDE:
- 15min: Typo fixes, config tweaks, simple CSS adjustments, content updates
- 30min: Minor bug fixes, small style changes, basic integrations
- 1hr: Small features, moderate styling work, simple API connections
- 2hr: Moderate features, authentication work, form implementations
- 4hr: Complex features, database schema changes, advanced integrations
- 8hr: Major features, architecture changes, third-party API deep integration
- 16hr: Epic-level work, requires planning session, multiple subsystems
- unknown: Scope unclear, needs discovery call with client

PRIORITY MAPPING:
- critical: Blocking production, revenue loss (maps from "critical" urgency)
- high: Impacts timeline or satisfaction (maps from "high" urgency)
- medium: Important but flexible (maps from "medium" urgency)
- low: Nice-to-have, backlog (maps from "low" urgency)

SCOPE DETECTION:
- Flag scopeFlag=true if request is outside original project agreement
- Flag clientApprovalRequired=true if task needs budget/timeline approval
- Examples of out-of-scope: "Can you also build a mobile app?" when project is website only

RESPONSE TEMPLATE GUIDE:
- Acknowledge: "Thanks for reaching out!"
- Confirm understanding: "We've identified [specific issue]"
- Set expectation: "We'll have [solution] ready by [timeframe]"
- Provide value: "I'll send you a confirmation once it's live"
- Stay professional but friendly

RESPOND WITH JSON ONLY (no markdown):
{
  "taskTitle": "Fix login authentication flow on mobile Safari",
  "description": "CLIENT REQUEST: Login button not working on iPhone\\n\\nCURRENT STATE: Button click has no effect, form doesn't submit\\n\\nEXPECTED STATE: Form submits on click, redirects to dashboard on success\\n\\nUSER IMPACT: Client cannot access admin panel from mobile device, affecting daily operations\\n\\nTECHNICAL CONTEXT: React form, Safari-specific event handling issue",
  "acceptanceCriteria": [
    "Given user on mobile Safari, when clicking login button, then form submits",
    "Given valid credentials, when form submits, then redirect to dashboard",
    "Given invalid credentials, when form submits, then show error message",
    "Given slow network, when submitting form, then show loading state"
  ],
  "estimatedEffort": "2hr",
  "priority": "high",
  "tags": ["bug", "mobile", "auth", "safari"],
  "suggestedResponse": "Thanks for reporting this! We've identified the mobile Safari issue with the login button. Our team will have a fix deployed by end of day Friday. I'll send you a confirmation email once it's live so you can test it. Let me know if you need anything else!",
  "scopeFlag": false,
  "clientApprovalRequired": false
}`

  const userPrompt = `CLIENT MESSAGE:
"""
${input.rawMessage}
"""

MESSAGE CLASSIFICATION:
- Type: ${input.classification.messageType}
- Category: ${input.classification.category}
- Urgency: ${input.classification.urgency}
- Sentiment: ${input.classification.sentiment}

PROJECT CONTEXT:
- Project: ${input.projectContext.projectName}
- Type: ${input.projectContext.projectType}
- Tech Stack: ${input.projectContext.techStack}
- Phase: ${input.projectContext.currentPhase}
- Budget: ${input.projectContext.budgetHours} hours (${input.projectContext.hoursUsed} used, ${input.projectContext.budgetHours - input.projectContext.hoursUsed} remaining)

Generate a detailed task specification now.`

  const messages: GensparkMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]

  const responseText = await callGensparkAPI(messages, gensparkApiKey)
  const taskSpec = parseAIJSON(responseText)

  return taskSpec as Agent2Output
}

// ==============================================
// AGENT 3: CLIENT HEALTH SCORING
// ==============================================

export interface Agent3Input {
  clientId: string
  clientData: {
    name: string
    company: string
    totalProjects: number
    activeProjects: number
    totalRevenue: number
  }
  recentMessages: Array<{
    content: string
    sentiment: string
    urgency: string
    timestamp: string
  }>
  projectMetrics: {
    onTimeDelivery: boolean
    budgetCompliance: boolean
    currentStatus: string
  }
  responseMetrics: {
    avgResponseTimeHours: number
    lastContactDate: string
  }
}

export interface Agent3Output {
  healthScore: number              // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  churnRiskFactors: string[]
  upsellSignals: string[]
  responseTimeTrend: 'improving' | 'stable' | 'declining'
  sentimentTrend: 'positive' | 'neutral' | 'negative'
  recommendedActions: string[]
  confidence: number
}

/**
 * Agent 3: Calculate client health score and relationship intelligence
 */
export async function calculateClientHealth(
  input: Agent3Input,
  gensparkApiKey: string
): Promise<Agent3Output> {
  const systemPrompt = `You are an Account Manager at Acromatico analyzing client relationship health with data-driven precision.

Your task: Calculate health score and identify risks/opportunities.

HEALTH SCORING RUBRIC (START AT 75, ADJUST):

DEDUCT POINTS:
- Each negative sentiment message: -10 points
- Each frustrated sentiment message: -15 points
- Response time > 48 hours: -15 points
- Response time > 72 hours: -25 points
- Radio silence (no contact > 14 days): -25 points
- Radio silence > 21 days: -35 points
- Project behind schedule: -15 points
- Over budget: -20 points
- Payment issues: -25 points

ADD POINTS:
- Each positive sentiment message: +10 points
- Enthusiastic feedback: +15 points
- On-time project delivery: +15 points
- Under budget: +10 points
- Active engagement (messages every 3-7 days): +10 points
- Referrals or testimonials: +25 points
- Multiple active projects: +20 points

RISK LEVEL THRESHOLDS:
- 0-40: CRITICAL (immediate intervention required)
- 41-60: HIGH (schedule check-in within 48h)
- 61-79: MEDIUM (monitor closely, proactive check-in)
- 80-100: LOW (healthy relationship, maintain momentum)

CHURN RISK INDICATORS:
- Negative sentiment + slow responses
- Payment disputes or delays
- Silent for >21 days despite active project
- Scope creep complaints
- Expressing dissatisfaction with timeline
- Mentioning competitors

UPSELL SIGNALS:
- Mentions additional needs ("we also need...", "what about...")
- Expresses satisfaction ("love what you built", "exceeded expectations")
- Growing business ("scaling fast", "hiring team", "expanding")
- Asks about other services ("do you also do...", "can you help with...")
- Multiple successful projects (proven trust)

RECOMMENDED ACTIONS PRIORITY:
1. CRITICAL: Schedule immediate call (within 24h)
2. HIGH: Send personalized check-in email
3. MEDIUM: Add to weekly review list
4. LOW: Continue current cadence

RESPOND WITH JSON ONLY:
{
  "healthScore": 72,
  "riskLevel": "medium",
  "churnRiskFactors": ["slow-responses", "overdue-payment", "negative-sentiment-trend"],
  "upsellSignals": ["mentioned-mobile-app-need", "expressed-satisfaction", "expanding-team"],
  "responseTimeTrend": "declining",
  "sentimentTrend": "neutral",
  "recommendedActions": [
    "Schedule check-in call within 48 hours to address payment",
    "Send invoice reminder with payment link",
    "Propose mobile app development as Phase 2 (estimated $15k)",
    "Monitor next 2 messages for sentiment improvement"
  ],
  "confidence": 0.88
}`

  const daysSinceLastContact = input.responseMetrics.lastContactDate 
    ? Math.floor((Date.now() - new Date(input.responseMetrics.lastContactDate).getTime()) / (1000 * 60 * 60 * 24))
    : 999

  const userPrompt = `CLIENT PROFILE:
- Name: ${input.clientData.name}
- Company: ${input.clientData.company}
- Total Projects: ${input.clientData.totalProjects}
- Active Projects: ${input.clientData.activeProjects}
- Total Revenue: $${input.clientData.totalRevenue.toLocaleString()}

RECENT MESSAGES (last 30 days):
${input.recentMessages.map((m, i) => `${i + 1}. [${m.sentiment.toUpperCase()}, ${m.urgency}] "${m.content.substring(0, 100)}..." (${m.timestamp})`).join('\n')}

RESPONSE METRICS:
- Average response time: ${input.responseMetrics.avgResponseTimeHours} hours
- Last contact: ${input.responseMetrics.lastContactDate || 'Never'} (${daysSinceLastContact} days ago)

PROJECT PERFORMANCE:
- On-time delivery: ${input.projectMetrics.onTimeDelivery ? 'Yes' : 'No'}
- Budget compliance: ${input.projectMetrics.budgetCompliance ? 'Yes' : 'No'}
- Current status: ${input.projectMetrics.currentStatus}

Calculate health score and provide strategic recommendations.`

  const messages: GensparkMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]

  const responseText = await callGensparkAPI(messages, gensparkApiKey)
  const healthAnalysis = parseAIJSON(responseText)

  return healthAnalysis as Agent3Output
}

// ==============================================
// AGENT 4: PATTERN ANALYSIS
// ==============================================

export interface Agent4Input {
  timeframe: '7d' | '30d' | '90d'
  allMessages: Array<{
    clientId: string
    projectType: string
    messageType: string
    urgency: string
    sentiment: string
    content: string
  }>
  allTasks: Array<{
    title: string
    effort: string
    status: string
    tags: string
    actualEffort?: number
  }>
  allClients: Array<{
    id: string
    name: string
    status: string
    totalRevenue: number
    healthScore?: number
  }>
}

export interface Agent4Output {
  topPatterns: Array<{
    pattern: string
    frequency: number
    affectedClients: string[]
    productizationPotential: 'high' | 'medium' | 'low'
    estimatedRevenue: number
    recommendation: string
  }>
  operationalInsights: Array<{
    insight: string
    impact: 'high' | 'medium' | 'low'
    affectedTasks: number
    recommendation: string
  }>
  revenueOpportunities: Array<{
    clientId: string
    clientName: string
    opportunity: string
    estimatedValue: number
    confidence: number
    nextSteps: string
  }>
  strategicAlerts: Array<{
    alert: string
    urgency: 'critical' | 'high' | 'medium'
    action: string
    deadline: string
  }>
  productivityScore: number        // 0-100
  estimationAccuracy: number       // 0-100 percentage
}

/**
 * Agent 4: Analyze patterns across all clients for strategic insights
 */
export async function analyzePatterns(
  input: Agent4Input,
  gensparkApiKey: string
): Promise<Agent4Output> {
  const systemPrompt = `You are a McKinsey-level Business Analyst at Acromatico identifying patterns and strategic opportunities.

Your task: Analyze client data to generate executive intelligence for 10x growth decisions.

ANALYSIS DIMENSIONS:

1. COMMON REQUEST PATTERNS
   - What are multiple clients asking for?
   - Are there recurring technical issues?
   - Can we productize repeated custom work?
   - Example: If 5+ clients need "booking system" → Create "BookingStarter" template ($2k product)

2. PRODUCTIZATION OPPORTUNITIES (HIGH ROI)
   - Frequency: How many clients need this?
   - Revenue potential: What could we charge?
   - Development cost: One-time build effort
   - ROI calculation: (Revenue × Frequency) / Development Cost
   - Prioritize: ROI > 500% = HIGH, 200-500% = MEDIUM, <200% = LOW

3. OPERATIONAL BOTTLENECKS
   - Which task types take longest?
   - Where are estimates consistently wrong?
   - What's blocking project velocity?
   - Example: "Auth bugs take 3x longer than estimated → Invest in auth testing framework"

4. REVENUE OPPORTUNITIES (IMMEDIATE)
   - Which clients show expansion signals?
   - What services should we cross-sell?
   - Calculate estimated deal value × confidence score
   - Example: Client mentions "need mobile app" + high satisfaction → $15k opportunity at 0.85 confidence

5. STRATEGIC ALERTS
   - Critical: Requires action this week
   - High: Address within 2 weeks
   - Medium: Add to monthly strategy review

6. PRODUCTIVITY METRICS
   - Productivity Score = (Tasks Completed / Tasks Created) × Estimation Accuracy × 100
   - Estimation Accuracy = (Tasks where actual ≤ estimated) / Total Completed Tasks × 100

RESPOND WITH JSON ONLY:
{
  "topPatterns": [
    {
      "pattern": "Mobile responsiveness issues across Safari and Chrome",
      "frequency": 8,
      "affectedClients": ["client-001", "client-003", "client-005"],
      "productizationPotential": "high",
      "estimatedRevenue": 4000,
      "recommendation": "Create 'Mobile QA Package' ($500/client) - includes cross-browser testing, responsive audit, iOS/Android validation. ROI: 8 clients × $500 = $4k revenue for ~$600 dev cost = 667% ROI"
    }
  ],
  "operationalInsights": [
    {
      "insight": "Authentication tasks consistently take 2-3x longer than estimated",
      "impact": "high",
      "affectedTasks": 12,
      "recommendation": "Invest 8 hours building auth testing framework with Playwright. Will save ~24 hours over next quarter = 300% ROI"
    }
  ],
  "revenueOpportunities": [
    {
      "clientId": "client-002",
      "clientName": "FitPro App",
      "opportunity": "Email automation system integration",
      "estimatedValue": 3500,
      "confidence": 0.82,
      "nextSteps": "Client mentioned 'need to automate onboarding emails' in last message. Schedule 30-min discovery call, send proposal by Friday"
    }
  ],
  "strategicAlerts": [
    {
      "alert": "3 clients at high churn risk (health score < 50)",
      "urgency": "critical",
      "action": "Schedule retention calls this week with personalized recovery plans",
      "deadline": "2026-03-28"
    }
  ],
  "productivityScore": 78,
  "estimationAccuracy": 65
}`

  const userPrompt = `ANALYSIS TIMEFRAME: ${input.timeframe}

MESSAGE DATA (${input.allMessages.length} total):
${JSON.stringify(input.allMessages.slice(0, 100), null, 2)}

TASK DATA (${input.allTasks.length} total):
${JSON.stringify(input.allTasks.slice(0, 50), null, 2)}

CLIENT DATA (${input.allClients.length} total):
${JSON.stringify(input.allClients, null, 2)}

Generate executive intelligence report with strategic recommendations ranked by ROI impact.`

  const messages: GensparkMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]

  const responseText = await callGensparkAPI(messages, gensparkApiKey, 'genspark-pro')
  const analysis = parseAIJSON(responseText)

  return analysis as Agent4Output
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

/**
 * Generate unique ID for CRM entities
 */
export function generateCRMId(prefix: 'msg' | 'task' | 'client' | 'proj' | 'health'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Format phone number to E.164 standard (+1234567890)
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  // Add + prefix if missing
  return digits.startsWith('1') ? `+${digits}` : `+1${digits}`
}

/**
 * Calculate days since last contact
 */
export function daysSinceLastContact(lastContactDate: string | null): number {
  if (!lastContactDate) return 999
  
  const lastContact = new Date(lastContactDate)
  const now = new Date()
  const diffMs = now.getTime() - lastContact.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Map effort string to hours
 */
export function effortToHours(effort: string): number {
  const map: Record<string, number> = {
    '15min': 0.25,
    '30min': 0.5,
    '1hr': 1,
    '2hr': 2,
    '4hr': 4,
    '8hr': 8,
    '16hr': 16,
    'unknown': 4  // Default to 4 hours for unknowns
  }
  return map[effort] || 4
}

/**
 * Calculate estimation accuracy percentage
 */
export function calculateEstimationAccuracy(tasks: Array<{ estimated: number; actual: number }>): number {
  if (tasks.length === 0) return 100

  const accurateCount = tasks.filter(t => t.actual <= t.estimated * 1.2).length  // Allow 20% buffer
  return Math.round((accurateCount / tasks.length) * 100)
}

/**
 * Format dollar amount with proper formatting
 */
export function formatDollars(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
