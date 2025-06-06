'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Calendar, 
  Users, 
  Search, 
  Filter,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';

const projects = [
  {
    id: '1',
    name: 'Tech Startup LLC Formation',
    description: 'Complete entity formation for new technology venture',
    status: 'in-progress',
    progress: 75,
    priority: 'high',
    dueDate: '2025-01-30',
    entity: 'TechVentures LLC',
    parties: ['Legal Team', 'CPA', 'Registered Agent'],
    lastUpdate: '2 hours ago',
    tasks: 12,
    completedTasks: 9
  },
  {
    id: '2',
    name: 'QSBS Rollover - Series A',
    description: 'Qualified Small Business Stock rollover for Series A investment',
    status: 'review',
    progress: 90,
    priority: 'high',
    dueDate: '2025-02-15',
    entity: 'Growth Capital Partners',
    parties: ['Tax Attorney', 'Investment Team', 'Securities Lawyer'],
    lastUpdate: '1 day ago',
    tasks: 8,
    completedTasks: 7
  },
  {
    id: '3',
    name: 'Real Estate Trust Setup',
    description: 'Establish irrevocable trust for commercial real estate holdings',
    status: 'pending',
    progress: 25,
    priority: 'medium',
    dueDate: '2025-03-01',
    entity: 'Real Estate Holdings Inc',
    parties: ['Estate Planner', 'Real Estate Attorney'],
    lastUpdate: '3 days ago',
    tasks: 15,
    completedTasks: 4
  },
  {
    id: '4',
    name: 'Annual Compliance Review',
    description: 'Comprehensive review of all entity compliance requirements',
    status: 'completed',
    progress: 100,
    priority: 'medium',
    dueDate: '2024-12-31',
    entity: 'Multiple Entities',
    parties: ['Compliance Team', 'Legal Team'],
    lastUpdate: '1 week ago',
    tasks: 20,
    completedTasks: 20
  },
  {
    id: '5',
    name: 'Tax Optimization Strategy',
    description: 'Develop comprehensive tax minimization strategy for 2025',
    status: 'in-progress',
    progress: 45,
    priority: 'high',
    dueDate: '2025-02-28',
    entity: 'Chen Family Trust',
    parties: ['Tax Strategist', 'CPA', 'Financial Advisor'],
    lastUpdate: '5 hours ago',
    tasks: 10,
    completedTasks: 4
  },
  {
    id: '6',
    name: 'Merger Documentation',
    description: 'Legal documentation for subsidiary merger',
    status: 'pending',
    progress: 10,
    priority: 'low',
    dueDate: '2025-04-15',
    entity: 'TechVentures LLC',
    parties: ['M&A Attorney', 'Due Diligence Team'],
    lastUpdate: '1 week ago',
    tasks: 25,
    completedTasks: 3
  }
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'review':
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track all your financial projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Projects"
            value={projects.length.toString()}
            icon={<Building2 className="h-5 w-5 text-blue-600" />}
            color="blue"
          />
          <StatsCard
            title="In Progress"
            value={projects.filter(p => p.status === 'in-progress').length.toString()}
            icon={<Clock className="h-5 w-5 text-amber-600" />}
            color="amber"
          />
          <StatsCard
            title="Completed"
            value={projects.filter(p => p.status === 'completed').length.toString()}
            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
            color="green"
          />
          <StatsCard
            title="Avg Progress"
            value={`${Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%`}
            icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
            color="purple"
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('in-progress')}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === 'review' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('review')}
              size="sm"
            >
              Review
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('pending')}
              size="sm"
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {project.entity}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tasks Completed</span>
                      <span className="font-medium">{project.completedTasks}/{project.tasks}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Parties Involved:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.parties.map((party, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {party}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Last updated: {project.lastUpdate}
                  </span>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({ title, value, icon, color }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50',
    amber: 'bg-amber-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
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
        </div>
      </CardContent>
    </Card>
  );
}