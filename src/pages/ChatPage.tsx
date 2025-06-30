import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { useApp } from '../contexts/AppContext';
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  DollarSign,
  Sparkles
} from 'lucide-react';

export function ChatPage() {
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How can I validate my business idea?",
    "What are the key metrics I should track?",
    "How do I identify my target market?",
    "What's the best way to price my product?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const getDetailedResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('dubai') && lowerMessage.includes('real estate')) {
      return `Excellent question about Dubai real estate investment! Here's a comprehensive analysis:

**Market Overview:**
Dubai's real estate market has shown remarkable resilience and growth potential. The market has recovered strongly post-2020, with property prices increasing by 15-20% in prime areas.

**Key Investment Strategies:**

1. **Location Focus:**
   - Downtown Dubai: Premium properties with high rental yields (6-8%)
   - Dubai Marina: Popular with expats, strong rental demand
   - Business Bay: Emerging business district with growth potential
   - Dubai Hills Estate: Family-oriented community with long-term appreciation

2. **Property Types:**
   - Off-plan properties: 20-30% lower prices, payment plans available
   - Ready properties: Immediate rental income, lower risk
   - Commercial properties: Higher yields (8-12%) but require larger capital

3. **Financial Considerations:**
   - Minimum down payment: 25% for residents, 40% for non-residents
   - Additional costs: 4% DLD fee, 2% agent commission, mortgage fees
   - Expected ROI: 6-10% annually depending on location and property type

4. **Legal Framework:**
   - Freehold ownership available for foreigners in designated areas
   - No property taxes, but service charges apply
   - Golden Visa eligibility for properties above AED 2 million

**Risks to Consider:**
- Market volatility due to economic cycles
- Oversupply in certain segments
- Currency fluctuation risks for foreign investors

Would you like me to elaborate on any specific aspect of Dubai real estate investment?`;
    }
    
    if (lowerMessage.includes('validate') && lowerMessage.includes('business')) {
      return `Great question about business idea validation! Here's a comprehensive approach:

**1. Problem-Solution Fit:**
- Conduct 20-30 customer interviews to understand pain points
- Create a problem statement and validate its significance
- Ensure your solution directly addresses the core problem

**2. Market Research:**
- Analyze market size using TAM, SAM, SOM framework
- Study competitor landscape and identify gaps
- Research industry trends and growth projections
- Use tools like Google Trends, SEMrush for demand analysis

**3. MVP Testing:**
- Build a minimum viable product with core features
- Launch to a small test group (100-500 users)
- Measure key metrics: user engagement, retention, feedback
- Iterate based on user behavior and feedback

**4. Financial Validation:**
- Test pricing strategies with potential customers
- Calculate unit economics (CAC, LTV, gross margins)
- Create financial projections for 3-5 years
- Identify break-even point and funding requirements

**5. Go-to-Market Validation:**
- Test different marketing channels and messages
- Measure conversion rates and customer acquisition costs
- Validate sales processes and customer onboarding
- Build initial customer base and gather testimonials

**Tools for Validation:**
- Survey tools: Typeform, SurveyMonkey
- Analytics: Google Analytics, Mixpanel
- Landing page testing: Unbounce, Leadpages
- Customer feedback: Hotjar, UserVoice

Would you like me to dive deeper into any of these validation methods?`;
    }
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
      return `Excellent question about pricing strategy! Here's a comprehensive framework:

**1. Cost-Plus Pricing:**
- Calculate all costs (materials, labor, overhead)
- Add desired profit margin (typically 20-50%)
- Ensure price covers all expenses and generates profit
- Best for: Manufacturing, service businesses with clear cost structures

**2. Value-Based Pricing:**
- Price based on perceived value to customer
- Research what customers are willing to pay
- Consider the problem you're solving and its impact
- Best for: Software, consulting, unique solutions

**3. Competitive Pricing:**
- Analyze competitor pricing in your market
- Position as premium, mid-market, or budget option
- Consider your unique value proposition
- Monitor competitor price changes regularly

**4. Psychological Pricing:**
- Use charm pricing ($9.99 vs $10.00)
- Bundle products/services for perceived value
- Offer multiple tiers to guide customer choice
- Create urgency with limited-time offers

**5. Testing Strategies:**
- A/B test different price points
- Survey customers about price sensitivity
- Analyze conversion rates at different prices
- Monitor customer lifetime value vs acquisition cost

**Key Considerations:**
- Price elasticity of your market
- Customer segments and their willingness to pay
- Seasonal demand fluctuations
- Long-term brand positioning goals

**Common Pricing Models:**
- Subscription: Recurring revenue, predictable income
- Freemium: Free basic version, paid premium features
- Usage-based: Pay per use, scales with customer success
- Tiered: Multiple options to capture different segments

Would you like me to help you develop a specific pricing strategy for your business?`;
    }

    // Default responses for other topics
    const responses = [
      `That's a fantastic question! Let me provide you with a detailed analysis and actionable insights.

Based on current market trends and best practices, here are the key considerations you should focus on:

**Strategic Approach:**
- Start with thorough market research to understand your competitive landscape
- Identify your unique value proposition and target audience
- Develop a clear go-to-market strategy with measurable milestones

**Implementation Steps:**
1. Validate your assumptions through customer interviews and surveys
2. Create a minimum viable product (MVP) to test core features
3. Establish key performance indicators (KPIs) to track progress
4. Build strategic partnerships to accelerate growth
5. Secure adequate funding for sustainable operations

**Risk Mitigation:**
- Diversify your revenue streams to reduce dependency
- Monitor cash flow closely and maintain adequate reserves
- Stay agile and ready to pivot based on market feedback
- Build a strong team with complementary skills

Would you like me to elaborate on any of these points or discuss specific aspects of your situation?`,

      `Excellent strategic thinking! Here's a comprehensive breakdown of what you should consider:

**Market Analysis:**
The current business environment presents both opportunities and challenges. Key trends to watch include digital transformation acceleration, sustainability focus, and changing consumer behaviors post-pandemic.

**Actionable Recommendations:**

**Phase 1 - Foundation (Weeks 1-4):**
- Conduct thorough competitor analysis
- Define your target customer personas
- Validate your business model assumptions
- Set up basic analytics and tracking systems

**Phase 2 - Development (Weeks 5-12):**
- Build and test your minimum viable product
- Gather user feedback and iterate quickly
- Establish key partnerships and supplier relationships
- Develop your brand identity and marketing materials

**Phase 3 - Launch (Weeks 13-20):**
- Execute soft launch with limited audience
- Monitor key metrics and user behavior
- Refine your offering based on real-world data
- Scale marketing efforts based on proven channels

**Success Metrics to Track:**
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Monthly recurring revenue (MRR)
- User engagement and retention rates
- Net promoter score (NPS)

What specific aspect would you like to explore further?`,

      `Great question! This is exactly the kind of strategic thinking that separates successful entrepreneurs from the rest. Let me break this down for you:

**Current Market Dynamics:**
The business landscape is evolving rapidly, with technology disruption, changing consumer preferences, and new regulatory environments creating both challenges and opportunities.

**Strategic Framework:**

**1. Market Opportunity Assessment:**
- Total Addressable Market (TAM): $X billion globally
- Serviceable Addressable Market (SAM): Focus on your geographic/demographic reach
- Serviceable Obtainable Market (SOM): Realistic market share you can capture

**2. Competitive Positioning:**
- Direct competitors: Companies offering similar solutions
- Indirect competitors: Alternative ways customers solve the problem
- Competitive advantages: What makes you unique and defensible

**3. Business Model Optimization:**
- Revenue streams: Diversify to reduce risk
- Cost structure: Fixed vs. variable costs analysis
- Scalability factors: How to grow without proportional cost increases

**4. Execution Roadmap:**
- Short-term goals (3-6 months): MVP development and initial traction
- Medium-term objectives (6-18 months): Market expansion and team building
- Long-term vision (2-5 years): Market leadership and potential exit strategies

**Key Success Factors:**
- Customer-centric approach with continuous feedback loops
- Agile development methodology for rapid iteration
- Strong financial management and cash flow monitoring
- Building a resilient and adaptable team culture

Which area would you like to dive deeper into?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with detailed content
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: getDetailedResponse(message),
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
      setIsTyping(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="AI Mentor Chat" />
      
      <div className="flex-1 px-4 py-6 pb-24 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Welcome Message */}
          {state.chatMessages.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <Card className="p-8 text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Hi {state.user?.name}! 👋
                </h2>
                <p className="text-gray-600 mb-6">
                  I'm your AI business mentor. Ask me anything about your business ideas, market validation, strategy, or entrepreneurship in general.
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Chat Messages */}
          {state.chatMessages.length > 0 && (
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {state.chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</div>
                      <p className={`text-xs mt-3 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quick Actions */}
          {state.chatMessages.length > 0 && (
            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[
                  { icon: Lightbulb, text: "Idea validation", color: "bg-blue-100 text-blue-700" },
                  { icon: TrendingUp, text: "Market research", color: "bg-green-100 text-green-700" },
                  { icon: Target, text: "Customer targeting", color: "bg-purple-100 text-purple-700" },
                  { icon: DollarSign, text: "Pricing strategy", color: "bg-orange-100 text-orange-700" },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(`Help me with ${action.text.toLowerCase()}`)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap ${action.color} hover:opacity-80 transition-opacity`}
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your business..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}