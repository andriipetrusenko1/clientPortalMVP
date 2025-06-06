'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar,
  User,
  Tag,
  FolderOpen
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

const documents = [
  {
    id: '1',
    name: '2024 Tax Return - Final',
    type: 'Tax Document',
    category: 'Tax',
    size: '2.4 MB',
    uploadDate: '2025-01-15',
    uploadedBy: 'Michael Chen (CPA)',
    project: 'Tax Optimization Strategy',
    tags: ['2024', 'Final', 'Personal'],
    status: 'Active'
  },
  {
    id: '2',
    name: 'LLC Operating Agreement - TechVentures',
    type: 'Legal Document',
    category: 'Legal',
    size: '890 KB',
    uploadDate: '2025-01-10',
    uploadedBy: 'Sarah Johnson (Attorney)',
    project: 'Tech Startup LLC Formation',
    tags: ['LLC', 'Operating Agreement', 'Draft'],
    status: 'Review'
  },
  {
    id: '3',
    name: 'Investment Agreement - Series A',
    type: 'Contract',
    category: 'Investment',
    size: '1.2 MB',
    uploadDate: '2025-01-08',
    uploadedBy: 'Investment Team',
    project: 'QSBS Rollover - Series A',
    tags: ['Series A', 'Investment', 'Contract'],
    status: 'Executed'
  },
  {
    id: '4',
    name: 'Bank Statements - Q4 2024',
    type: 'Financial Record',
    category: 'Financial',
    size: '3.1 MB',
    uploadDate: '2025-01-05',
    uploadedBy: 'Client Portal',
    project: 'Annual Compliance Review',
    tags: ['Q4', '2024', 'Banking'],
    status: 'Active'
  },
  {
    id: '5',
    name: 'Property Deed - Commercial Real Estate',
    type: 'Legal Document',
    category: 'Real Estate',
    size: '756 KB',
    uploadDate: '2024-12-28',
    uploadedBy: 'Real Estate Attorney',
    project: 'Real Estate Trust Setup',
    tags: ['Property', 'Deed', 'Commercial'],
    status: 'Active'
  },
  {
    id: '6',
    name: 'EIN Confirmation Letter',
    type: 'Government Document',
    category: 'Tax',
    size: '156 KB',
    uploadDate: '2024-12-22',
    uploadedBy: 'IRS Portal',
    project: 'Tech Startup LLC Formation',
    tags: ['EIN', 'IRS', 'Confirmation'],
    status: 'Active'
  }
];

const categories = ['All', 'Tax', 'Legal', 'Investment', 'Financial', 'Real Estate'];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Review':
        return 'bg-amber-100 text-amber-800';
      case 'Executed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tax':
        return 'bg-red-100 text-red-800';
      case 'Legal':
        return 'bg-blue-100 text-blue-800';
      case 'Investment':
        return 'bg-green-100 text-green-800';
      case 'Financial':
        return 'bg-purple-100 text-purple-800';
      case 'Real Estate':
        return 'bg-amber-100 text-amber-800';
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
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600 mt-1">Secure document storage and management</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Documents"
            value={documents.length.toString()}
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            color="blue"
          />
          <StatsCard
            title="Active"
            value={documents.filter(d => d.status === 'Active').length.toString()}
            icon={<FolderOpen className="h-5 w-5 text-green-600" />}
            color="green"
          />
          <StatsCard
            title="Under Review"
            value={documents.filter(d => d.status === 'Review').length.toString()}
            icon={<Eye className="h-5 w-5 text-amber-600" />}
            color="amber"
          />
          <StatsCard
            title="Total Size"
            value={`${(documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0)).toFixed(1)} MB`}
            icon={<Upload className="h-5 w-5 text-purple-600" />}
            color="purple"
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents, tags, or projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Upload Zone */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-8">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Select Files
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, DOC, DOCX, XLS, XLSX files up to 10MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {document.name}
                        </h3>
                        <Badge className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Tag className="h-4 w-4 mr-2" />
                            <Badge variant="outline" className={getCategoryColor(document.category)}>
                              {document.category}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            {document.uploadedBy}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <strong>Project:</strong> {document.project}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Size:</strong> {document.size}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {document.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or upload your first document.
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
    amber: 'bg-amber-50',
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