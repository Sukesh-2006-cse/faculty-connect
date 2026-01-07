import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Heart,
  Pin,
  User,
  Building2,
  Users,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
}

const facultyNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty' },
  { label: 'Job Listings', icon: Briefcase, path: '/faculty/jobs' },
  { label: 'Applied Jobs', icon: FileText, path: '/faculty/applied' },
  { label: 'Favorites', icon: Heart, path: '/faculty/favorites' },
  { label: 'Pinned Jobs', icon: Pin, path: '/faculty/pinned' },
  { label: 'Profile', icon: User, path: '/faculty/profile' },
];

const organizationNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/organization' },
  { label: 'Post Job', icon: PlusCircle, path: '/organization/post-job' },
  { label: 'Manage Jobs', icon: Briefcase, path: '/organization/jobs' },
  { label: 'Applications', icon: Users, path: '/organization/applications' },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Organizations', icon: Building2, path: '/admin/organizations' },
  { label: 'Faculty', icon: GraduationCap, path: '/admin/faculty' },
  { label: 'All Jobs', icon: Briefcase, path: '/admin/jobs' },
  { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = () => {
    switch (user?.role) {
      case 'faculty':
        return facultyNav;
      case 'organization':
        return organizationNav;
      case 'admin':
        return adminNav;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'faculty':
        return 'Faculty';
      case 'organization':
        return 'Organization';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              {sidebarOpen && (
                <span className="font-semibold text-sidebar-accent-foreground">FacultyHub</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-sidebar-accent transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                    <>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-sidebar-foreground">{getRoleLabel()}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate(`/${user?.role}/profile`)}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
