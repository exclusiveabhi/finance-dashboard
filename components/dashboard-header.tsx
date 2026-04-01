'use client';

import { useState, useEffect } from 'react';
import { useFinanceStore, type UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Settings, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  onSidebarToggle?: () => void;
}

export function DashboardHeader({ onMenuClick, onSidebarToggle }: DashboardHeaderProps) {
  const { userRole, setUserRole } = useFinanceStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true);
    // Load stored role from localStorage after hydration
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    if (storedRole && storedRole !== userRole) {
      setUserRole(storedRole);
    }
  }, [userRole]);

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Finance Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              By <a href="https://github.com/exclusiveabhi" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Abhishek 
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 min-h-8">
          {isHydrated ? (
            <Badge 
              variant={userRole === 'admin' ? 'default' : 'secondary'}
              className="text-xs font-semibold px-3 py-1 whitespace-nowrap"
            >
              {userRole === 'admin' ? 'Admin' : 'Viewer'} Mode
            </Badge>
          ) : (
            <div className="w-32 h-6" />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-muted transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Role Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUserRole('admin')}>
                {userRole === 'admin' && '✓ '}Admin Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserRole('viewer')}>
                {userRole === 'viewer' && '✓ '}Viewer Mode
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
