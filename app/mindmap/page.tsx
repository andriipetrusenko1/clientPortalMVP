'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Briefcase, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

// Mock data for the mind map
const mindMapData = {
  trusts: [
    {
      id: 'trust-1',
      name: 'Chen Family Trust',
      type: 'Revocable Living Trust',
      status: 'active',
      position: { x: 100, y: 200 },
      entities: ['entity-1', 'entity-2']
    },
    {
      id: 'trust-2',
      name: 'Investment Holdings Trust',
      type: 'Irrevocable Trust',
      status: 'active',
      position: { x: 100, y: 400 },
      entities: ['entity-3']
    }
  ],
  entities: [
    {
      id: 'entity-1',
      name: 'TechVentures LLC',
      type: 'LLC',
      status: 'active',
      position: { x: 400, y: 150 },
      projects: ['project-1', 'project-2']
    },
    {
      id: 'entity-2',
      name: 'Real Estate Holdings Inc',
      type: 'Corporation',
      status: 'active',
      position: { x: 400, y: 250 },
      projects: ['project-3']
    },
    {
      id: 'entity-3',
      name: 'Growth Capital Partners',
      type: 'Partnership',
      status: 'active',
      position: { x: 400, y: 400 },
      projects: ['project-4']
    }
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Series A Fundraising',
      status: 'in-progress',
      progress: 75,
      position: { x: 700, y: 100 }
    },
    {
      id: 'project-2',
      name: 'QSBS Optimization',
      status: 'review',
      progress: 90,
      position: { x: 700, y: 180 }
    },
    {
      id: 'project-3',
      name: 'Property Acquisition',
      status: 'pending',
      progress: 30,
      position: { x: 700, y: 250 }
    },
    {
      id: 'project-4',
      name: 'Portfolio Rebalancing',
      status: 'completed',
      progress: 100,
      position: { x: 700, y: 400 }
    }
  ]
};

export default function MindMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Generate connections between nodes
  const connections = [
    // Trust to Entity connections
    ...mindMapData.trusts.flatMap(trust =>
      trust.entities.map(entityId => {
        const entity = mindMapData.entities.find(e => e.id === entityId);
        return entity ? {
          from: trust.position,
          to: entity.position,
          type: 'trust-entity'
        } : null;
      }).filter(Boolean)
    ),
    // Entity to Project connections
    ...mindMapData.entities.flatMap(entity =>
      entity.projects.map(projectId => {
        const project = mindMapData.projects.find(p => p.id === projectId);
        return project ? {
          from: entity.position,
          to: project.position,
          type: 'entity-project'
        } : null;
      }).filter(Boolean)
    )
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Mind Map</h1>
            <p className="text-gray-600 mt-1">Visual overview of your financial structure</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Mind Map Visualization */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <svg
                    ref={svgRef}
                    className="w-full h-full"
                    viewBox="0 0 1000 600"
                    style={{
                      transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
                    }}
                  >
                    {/* Connection lines */}
                  {connection && (
  <line
    key={idx}
    x1={connection.from.x + 80}
    y1={connection.from.y + 40}
    x2={connection.to.x}
    y2={connection.to.y + 40}
    stroke="#ccc"
    strokeWidth={2}
  />
)}
                    {/* Trust nodes */}
                    {mindMapData.trusts.map(trust => (
                      <g key={trust.id}>
                        <rect
                          x={trust.position.x}
                          y={trust.position.y}
                          width="160"
                          height="80"
                          rx="8"
                          fill="#dbeafe"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          className="cursor-pointer hover:fill-blue-100 transition-colors"
                          onClick={() => setSelectedNode(trust.id)}
                        />
                        <text
                          x={trust.position.x + 80}
                          y={trust.position.y + 25}
                          textAnchor="middle"
                          className="text-sm font-semibold fill-blue-900"
                        >
                          {trust.name}
                        </text>
                        <text
                          x={trust.position.x + 80}
                          y={trust.position.y + 45}
                          textAnchor="middle"
                          className="text-xs fill-blue-700"
                        >
                          {trust.type}
                        </text>
                        <circle
                          cx={trust.position.x + 140}
                          cy={trust.position.y + 20}
                          r="6"
                          fill="#10b981"
                        />
                      </g>
                    ))}

                    {/* Entity nodes */}
                    {mindMapData.entities.map(entity => (
                      <g key={entity.id}>
                        <rect
                          x={entity.position.x}
                          y={entity.position.y}
                          width="160"
                          height="80"
                          rx="8"
                          fill="#f3e8ff"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          className="cursor-pointer hover:fill-purple-100 transition-colors"
                          onClick={() => setSelectedNode(entity.id)}
                        />
                        <text
                          x={entity.position.x + 80}
                          y={entity.position.y + 25}
                          textAnchor="middle"
                          className="text-sm font-semibold fill-purple-900"
                        >
                          {entity.name}
                        </text>
                        <text
                          x={entity.position.x + 80}
                          y={entity.position.y + 45}
                          textAnchor="middle"
                          className="text-xs fill-purple-700"
                        >
                          {entity.type}
                        </text>
                        <circle
                          cx={entity.position.x + 140}
                          cy={entity.position.y + 20}
                          r="6"
                          fill="#10b981"
                        />
                      </g>
                    ))}

                    {/* Project nodes */}
                    {mindMapData.projects.map(project => (
                      <g key={project.id}>
                        <rect
                          x={project.position.x}
                          y={project.position.y}
                          width="160"
                          height="80"
                          rx="8"
                          fill={project.status === 'completed' ? '#d1fae5' : project.status === 'in-progress' ? '#fef3c7' : '#fee2e2'}
                          stroke={project.status === 'completed' ? '#10b981' : project.status === 'in-progress' ? '#f59e0b' : '#ef4444'}
                          strokeWidth="2"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedNode(project.id)}
                        />
                        <text
                          x={project.position.x + 80}
                          y={project.position.y + 25}
                          textAnchor="middle"
                          className="text-sm font-semibold"
                          fill={project.status === 'completed' ? '#065f46' : project.status === 'in-progress' ? '#92400e' : '#991b1b'}
                        >
                          {project.name}
                        </text>
                        <text
                          x={project.position.x + 80}
                          y={project.position.y + 45}
                          textAnchor="middle"
                          className="text-xs"
                          fill={project.status === 'completed' ? '#065f46' : project.status === 'in-progress' ? '#92400e' : '#991b1b'}
                        >
                          {project.progress}% Complete
                        </text>
                        <circle
                          cx={project.position.x + 140}
                          cy={project.position.y + 20}
                          r="6"
                          fill={project.status === 'completed' ? '#10b981' : project.status === 'in-progress' ? '#f59e0b' : '#ef4444'}
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
                  <span className="text-sm">Trusts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded"></div>
                  <span className="text-sm">Entities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-amber-100 border-2 border-amber-500 rounded"></div>
                  <span className="text-sm">Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Active/Completed</span>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Trusts</span>
                  </div>
                  <Badge variant="outline">{mindMapData.trusts.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Entities</span>
                  </div>
                  <Badge variant="outline">{mindMapData.entities.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">Projects</span>
                  </div>
                  <Badge variant="outline">{mindMapData.projects.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <Badge variant="outline">
                    {mindMapData.projects.filter(p => p.status === 'completed').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Building2 className="h-4 w-4 mr-2" />
                  Add New Entity
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}