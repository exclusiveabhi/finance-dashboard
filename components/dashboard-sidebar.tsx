'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Wallet, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ open = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: BarChart3,
    },
    {
      label: 'Transactions',
      href: '/transactions',
      icon: Wallet,
    },
    {
      label: 'Insights',
      href: '/insights',
      icon: TrendingUp,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar flex flex-col"
        initial={false}
        animate={{ x: open ? 0 : -256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">Finance Hub</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-sidebar-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-full flex-col flex-1">
          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3 transition-colors hover:bg-sidebar-accent',
                      isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary'
                    )}
                    onClick={onClose}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border px-4 py-4">
            <p className="text-xs text-muted-foreground">
              © 2026 FinanceHub. All rights reserved.
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
