'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp, Users, FileText, MessageCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Simulate login
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FinanceHub</span>
          </div>
          <div className="text-sm text-gray-600">Secure Client Portal</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Login */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Your Financial World,
                <span className="text-blue-600"> Simplified</span>
              </h1>
              <p className="text-xl text-gray-600">
                Access your complete financial ecosystem: projects, deadlines, relationships, and insights—all in one secure portal.
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your personalized financial dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <Button 
                  onClick={handleLogin}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Access Dashboard
                </Button>
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Need help accessing your account?
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Features */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-green-600" />}
                title="Real-Time Status"
                description="Track project progress with visual indicators and automated updates"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-blue-600" />}
                title="Team Coordination"
                description="See all parties involved: legal, tax, CPA, and key stakeholders"
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6 text-purple-600" />}
                title="Secure Documents"
                description="Access tax returns, contracts, and important files with enterprise security"
              />
              <FeatureCard
                icon={<MessageCircle className="h-6 w-6 text-amber-600" />}
                title="AI Assistant"
                description="Get instant answers about your projects, deadlines, and financial status"
              />
              <FeatureCard
                icon={<Eye className="h-6 w-6 text-indigo-600" />}
                title="Visual Overview"
                description="Interactive mind map showing relationships between trusts, entities, and projects"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>© 2025 FinanceHub. Enterprise-grade security and privacy.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-l-4 border-l-blue-600 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}