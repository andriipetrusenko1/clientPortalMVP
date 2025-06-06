'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageCircle,
  Upload,
  Edit,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';

// Mock project data - in real app, this would come from API
const projectData = {
  '1': {
    id: '1',
    name: 'Tech Startup LLC Formation',
    description: 'Complete entity formation for new technology venture including operating agreements, tax elections, and compliance setup',
    status: 'in-progress',
    progress: 75,
    priority: 'high',
    dueDate: '2025-01-30',
    entity: 'TechVentures LLC',
    createdDate: '2024-12-15',
    estimatedCompletion: '2025-01-28',
    parties: [
      { name: 'Sarah Johnson', role: 'Lead Attorney', status: 'active', contact: 'sarah@legalfirm.com' },
      { name: 'Michael Chen', role: 'CPA', status: 'active', contact: 'mchen@accountingfirm.com' },
      { name: 'Legal Corp Services', role: 'Registered Agent', status: 'pending', contact: 'services@legalcorp.com' }
    ],
    tasks: [
      { id: 1, title: 'File Articles of Organization', status: 'completed', assignee: 'Sarah Johnson', dueDate: '2024-12-20' },
      { id: 2, title: 'Obtain EIN from IRS', status: 'completed', assignee: 'Michael Chen', dueDate: '2024-12-22' },
      { id: 3, title: 'Draft Operating Agreement', status: 'completed', assignee: 'Sarah Johnson', dueDate: '2025-01-05' },
      { id: 4, title: 'Review Operating Agreement', status: 'in-progress', assignee: 'Client', dueDate: '2025-01-20' },
      { id: 5, title: 'Setup Business Banking', status: 'pending', assignee: 'Client', dueDate: '2025-01-25' },
      { id: 6, title: 'File Initial Tax Elections', status: 'pending', assignee: 'Michael Chen', dueDate: '2025-01-30' }
    ],
    documents: [
      { name: 'Articles of Organization - Filed', type: 'Legal', uploadDate: '2024-12-20', size: '2.4 MB' },
      { name: 'EIN Confirmation Letter', type: 'Tax', uploadDate: '2024-12-22', size: '156 KB' },
      { name: 'Operating Agreement - Draft v3', type: 'Legal', uploadDate: '2025-01-15', size: '890 KB' },
      { name: 'Banking Requirements Checklist', type: 'Admin', uploadDate: '2025-01-10', size: '245 KB' }
    ],
    updates: [
      { date: '2025-01-20', author: 'Sarah Johnson', content: 'Operating agreement review completed. Sent to client for final approval.' },
      { date: '2025-01-15', author: 'Michael Chen', content: 'EIN obtained successfully. Banking setup can now proceed.' },
      { date: '2025-01-10', author: 'Sarah Johnson', content: 'Articles of Organization filed with state. Confirmation received.' }
    ]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Project not found</h2>
          <Link href="/projects" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Projects
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
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

  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Project
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Team
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge className={getStatusColor(project.status)} >
                    {project.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{project.progress}%</p>
                </div>
                <div className="w-12 h-12">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray={`${project.progress * 0.88}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(project.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks</p>
                <p className="text-lg font-semibold text-gray-900">
                  {completedTasks}/{project.tasks.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-3" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {project.tasks.filter(t => t.status === 'in-progress').length}
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">
                          {project.tasks.filter(t => t.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.updates.map((update, idx) => (
                      <div key={idx} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{update.author}</p>
                          <p className="text-sm text-gray-500">{update.date}</p>
                        </div>
                        <p className="text-gray-700 mt-1">{update.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Project Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entity</p>
                      <p className="text-gray-900">{project.entity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Priority</p>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created</p>
                      <p className="text-gray-900">{new Date(project.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Est. Completion</p>
                      <p className="text-gray-900">{new Date(project.estimatedCompletion).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project Tasks</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            <div className="space-y-3">
              {project.tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {task.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {task.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-500" />}
                        {task.status === 'pending' && <AlertTriangle className="h-5 w-5 text-gray-400" />}
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project Documents</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
            <div className="grid gap-4">
              {project.documents.map((doc, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                        <Button variant="outline" size="sm" className="mt-1">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
            <div className="grid gap-4">
              {project.parties.map((party, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {party.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{party.name}</h4>
                          <p className="text-gray-600">{party.role}</p>
                          <p className="text-sm text-gray-500">{party.contact}</p>
                        </div>
                      </div>
                      <Badge className={party.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {party.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}