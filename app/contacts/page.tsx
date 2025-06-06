'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  MessageCircle,
  Plus,
  Filter,
  MapPin,
  Briefcase,
  Clock
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

const contacts = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Lead Attorney',
    company: 'Johnson & Partners Law',
    specialty: 'Corporate Law',
    email: 'sarah@johnsonlaw.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    status: 'available',
    projects: ['Tech Startup LLC Formation', 'Real Estate Trust Setup'],
    lastContact: '2 hours ago',
    avatar: 'SJ'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Senior CPA',
    company: 'Chen Accounting Group',
    specialty: 'Tax Strategy',
    email: 'mchen@chenaccounting.com',
    phone: '(555) 234-5678',
    location: 'Palo Alto, CA',
    status: 'busy',
    projects: ['Tax Optimization Strategy', 'QSBS Rollover - Series A'],
    lastContact: '1 day ago',
    avatar: 'MC'
  },
  {
    id: '3',
    name: 'David Wilson',
    role: 'Estate Planner',
    company: 'Wilson Wealth Management',
    specialty: 'Estate Planning',
    email: 'dwilson@wilsonwealth.com',
    phone: '(555) 345-6789',
    location: 'Mountain View, CA',
    status: 'available',
    projects: ['Real Estate Trust Setup'],
    lastContact: '3 days ago',
    avatar: 'DW'
  },
  {
    id: '4',
    name: 'Jennifer Martinez',
    role: 'Securities Attorney',
    company: 'Martinez Legal LLC',
    specialty: 'Securities Law',
    email: 'jmartinez@martinezlegal.com',
    phone: '(555) 456-7890',
    location: 'Menlo Park, CA',
    status: 'available',
    projects: ['QSBS Rollover - Series A'],
    lastContact: '5 days ago',
    avatar: 'JM'
  },
  {
    id: '5',
    name: 'Robert Kim',
    role: 'Investment Advisor',
    company: 'Kim Capital Partners',
    specialty: 'Investment Management',
    email: 'rkim@kimcapital.com',
    phone: '(555) 567-8901',
    location: 'San Jose, CA',
    status: 'busy',
    projects: ['Tax Optimization Strategy'],
    lastContact: '1 week ago',
    avatar: 'RK'
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    role: 'Compliance Specialist',
    company: 'Thompson Compliance Services',
    specialty: 'Regulatory Compliance',
    email: 'lthompson@thompsoncompliance.com',
    phone: '(555) 678-9012',
    location: 'Redwood City, CA',
    status: 'available',
    projects: ['Annual Compliance Review'],
    lastContact: '2 weeks ago',
    avatar: 'LT'
  }
];

const specialties = ['All', 'Corporate Law', 'Tax Strategy', 'Estate Planning', 'Securities Law', 'Investment Management', 'Regulatory Compliance'];

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || contact.specialty === selectedSpecialty;
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      case 'away':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-400';
      case 'busy':
        return 'bg-red-400';
      case 'away':
        return 'bg-amber-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600 mt-1">Manage your professional network and team members</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Contacts"
            value={contacts.length.toString()}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            color="blue"
          />
          <StatsCard
            title="Available"
            value={contacts.filter(c => c.status === 'available').length.toString()}
            icon={<div className="w-5 h-5 bg-green-400 rounded-full"></div>}
            color="green"
          />
          <StatsCard
            title="Active Projects"
            value={contacts.reduce((acc, c) => acc + c.projects.length, 0).toString()}
            icon={<Briefcase className="h-5 w-5 text-purple-600" />}
            color="purple"
          />
          <StatsCard
            title="Specialties"
            value={(specialties.length - 1).toString()}
            icon={<Filter className="h-5 w-5 text-amber-600" />}
            color="amber"
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contacts, companies, or roles..."
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
              All Status
            </Button>
            <Button
              variant={statusFilter === 'available' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('available')}
              size="sm"
            >
              Available
            </Button>
            <Button
              variant={statusFilter === 'busy' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('busy')}
              size="sm"
            >
              Busy
            </Button>
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? 'default' : 'outline'}
              onClick={() => setSelectedSpecialty(specialty)}
              size="sm"
            >
              {specialty}
            </Button>
          ))}
        </div>

        {/* Contacts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {contact.avatar}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusDot(contact.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {contact.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {contact.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Last contact: {contact.lastContact}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Specialty</p>
                  <Badge variant="outline" className="text-xs">
                    {contact.specialty}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Active Projects</p>
                  <div className="space-y-1">
                    {contact.projects.slice(0, 2).map((project, idx) => (
                      <p key={idx} className="text-xs text-gray-600">• {project}</p>
                    ))}
                    {contact.projects.length > 2 && (
                      <p className="text-xs text-blue-600">+{contact.projects.length - 2} more</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find contacts.
              </p>
            </CardContent>
          </Card>
        )}
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
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    amber: 'bg-amber-50',
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