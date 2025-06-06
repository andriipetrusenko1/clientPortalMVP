'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Clock,
  TrendingUp,
  FileText,
  Building2
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  "What's the latest on my QSBS rollover?",
  "When is my next tax deadline?",
  "How is my LLC formation progressing?",
  "Show me my project completion rates",
  "What documents do I need to upload?",
  "Who should I contact about my real estate trust?"
];

const sampleResponses = {
  "What's the latest on my QSBS rollover?": "Your QSBS rollover for the Series A investment is currently 90% complete. The tax attorney has finished reviewing the documentation, and we're waiting for final signatures from the investment team. Expected completion is February 15, 2025. The estimated tax benefit from this rollover is approximately $125,000.",
  "When is my next tax deadline?": "Your next major tax deadline is January 31, 2025 for Q4 filing. You also have the LLC Annual Report due February 14, 2025, and Trust Distribution deadline on March 15, 2025. Would you like me to schedule reminders or connect you with Michael Chen (your CPA) to discuss preparation?",
  "How is my LLC formation progressing?": "Your TechVentures LLC formation is 75% complete and on track for the January 30th deadline. Completed: Articles of Organization filed, EIN obtained, Operating Agreement drafted. Remaining: Client review of Operating Agreement (due Jan 20), Business Banking setup, and Initial Tax Elections filing.",
  default: "I understand you're asking about your financial portfolio. Based on your current projects, I can help you with information about your LLC formation (75% complete), QSBS rollover (90% complete), real estate trust setup (25% complete), and tax optimization strategy (45% complete). What specific aspect would you like to know more about?"
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI financial assistant. I have access to all your projects, documents, and timelines. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: sampleResponses[content as keyof typeof sampleResponses] || sampleResponses.default,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(newMessage);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
              AI Assistant
            </h1>
            <p className="text-gray-600 mt-1">Get instant answers about your financial portfolio</p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online
          </Badge>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-blue-600" />
                  AI Financial Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="p-2 rounded-full bg-gray-200">
                          <Bot className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-100 text-gray-900">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask about your projects, deadlines, or financial status..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button 
                      type="submit" 
                      disabled={!newMessage.trim() || isTyping}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full text-left justify-start text-sm h-auto p-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">I can help with</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Project Updates</p>
                    <p className="text-xs text-gray-600">Status, progress, next steps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-sm">Deadlines</p>
                    <p className="text-xs text-gray-600">Tax dates, filings, milestones</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Documents</p>
                    <p className="text-xs text-gray-600">Required docs, status, uploads</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Analytics</p>
                    <p className="text-xs text-gray-600">Performance, trends, insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Context Awareness */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Projects:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Tasks:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming Deadlines:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium">24</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}