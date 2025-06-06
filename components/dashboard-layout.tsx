'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Home, 
  Building2, 
  FileText, 
  MessageCircle, 
  Eye, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Mind Map', href: '/mindmap', icon: Eye },
  { name: 'Projects', href: '/projects', icon: Building2 },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'AI Assistant', href: '/chat', icon: MessageCircle },
  { name: 'Contacts', href: '/contacts', icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <SidebarContent onClose={() => setSidebarOpen(false)} pathname={pathname} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">SC</span>
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:block">Sarah Chen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onClose, pathname }: { onClose?: () => void; pathname: string }) {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">FinanceHub</span>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto lg:hidden"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col px-6 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-l-md p-3 text-sm leading-6 font-medium transition-colors'
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              href="/"
              className="group -mx-2 flex gap-x-3 rounded-md p-3 text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}