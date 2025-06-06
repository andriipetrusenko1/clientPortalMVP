'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Building2,
  MessageCircle,
  Eye,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your portfolio</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
            </Link>
            <Link href="/mindmap">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Mind Map
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            title="Active Projects"
            value="8"
            change="+12%"
            changeType="positive"
            icon={<Building2 className="h-5 w-5" />}
            color="blue"
          />
          <StatusCard
            title="Pending Actions"
            value="3"
            change="Due this week"
            changeType="warning"
            icon={<Clock className="h-5 w-5" />}
            color="amber"
          />
          <StatusCard
            title="Tax Estimate"
            value="$45,200"
            change="Q1 2025"
            changeType="neutral"
            icon={<DollarSign className="h-5 w-5" />}
            color="green"
          />
          <StatusCard
            title="Completion Rate"
            value="87%"
            change="+5% this month"
            changeType="positive"
            icon={<BarChart3 className="h-5 w-5" />}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Active Projects
                </CardTitle>
                <CardDescription>Current initiatives and their status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProjectItem
                  name="Tech Startup LLC Formation"
                  status="in-progress"
                  progress={75}
                  dueDate="Jan 30, 2025"
                  parties={["Legal Team", "CPA"]}
                />
                <ProjectItem
                  name="QSBS Rollover - Series A"
                  status="review"
                  progress={90}
                  dueDate="Feb 15, 2025"
                  parties={["Tax Attorney", "Investment Team"]}
                />
                <ProjectItem
                  name="Real Estate Trust Setup"
                  status="pending"
                  progress={25}
                  dueDate="Mar 1, 2025"
                  parties={["Estate Planner"]}
                />
                <div className="pt-4 border-t">
                  <Link href="/projects">
                    <Button variant="outline" className="w-full">
                      View All Projects
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <UpdateItem
                  title="LLC Operating Agreement Review Complete"
                  description="Legal team has completed the review process"
                  time="2 hours ago"
                  type="success"
                />
                <UpdateItem
                  title="Tax Document Upload Required"
                  description="2024 K-1 forms needed for QSBS analysis"
                  time="1 day ago"
                  type="warning"
                />
                <UpdateItem
                  title="Meeting Scheduled: Estate Planning"
                  description="Initial consultation set for next Tuesday"
                  time="2 days ago"
                  type="info"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <DeadlineItem
                  title="Q4 Tax Filing"
                  date="Jan 31"
                  priority="high"
                />
                <DeadlineItem
                  title="LLC Annual Report"
                  date="Feb 14"
                  priority="medium"
                />
                <DeadlineItem
                  title="Trust Distribution"
                  date="Mar 15"
                  priority="low"
                />
              </CardContent>
            </Card>

            {/* Key Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Key Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ContactItem
                  name="Michael Chen"
                  role="Tax Attorney"
                  status="available"
                />
                <ContactItem
                  name="Sarah Johnson"
                  role="CPA"
                  status="busy"
                />
                <ContactItem
                  name="David Wilson"
                  role="Estate Planner"
                  status="available"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/documents">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask Question
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusCard({ title, value, change, changeType, icon, color }: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'warning' | 'neutral';
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    warning: 'text-amber-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-600 mt-1">{title}</p>
          <p className={`text-xs mt-1 ${changeColors[changeType]}`}>{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectItem({ name, status, progress, dueDate, parties }: {
  name: string;
  status: 'in-progress' | 'review' | 'pending' | 'completed';
  progress: number;
  dueDate: string;
  parties: string[];
}) {
  const statusColors = {
    'in-progress': 'bg-blue-100 text-blue-800',
    'review': 'bg-amber-100 text-amber-800',
    'pending': 'bg-gray-100 text-gray-800',
    'completed': 'bg-green-100 text-green-800',
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">Due: {dueDate}</p>
        </div>
        <Badge className={statusColors[status]}>
          {status.replace('-', ' ')}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex flex-wrap gap-1 mt-2">
          {parties.map((party, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {party}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpdateItem({ title, description, time, type }: {
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}) {
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    info: <Clock className="h-4 w-4 text-blue-500" />,
  };

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function DeadlineItem({ title, date, priority }: {
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}) {
  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-amber-500 bg-amber-50',
    low: 'border-l-green-500 bg-green-50',
  };

  return (
    <div className={`p-3 border-l-4 rounded ${priorityColors[priority]}`}>
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <span className="text-sm text-gray-600">{date}</span>
      </div>
    </div>
  );
}

function ContactItem({ name, role, status }: {
  name: string;
  role: string;
  status: 'available' | 'busy';
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-600">{role}</p>
      </div>
      <div className={`w-2 h-2 rounded-full ${status === 'available' ? 'bg-green-400' : 'bg-red-400'}`} />
    </div>
  );
}