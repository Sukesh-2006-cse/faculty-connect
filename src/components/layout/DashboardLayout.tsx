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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Top Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6 lg:px-8 max-w-[2000px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mr-8">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-transform hover:scale-105">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                FacultyHub
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 bg-primary-foreground/50 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto mr-2 hover:bg-accent/50 transition-all hover:scale-105"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* User Profile Dropdown */}
          <div className="hidden lg:flex items-center ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent/50 transition-all duration-200 border border-transparent hover:border-border/50">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all group-hover:ring-primary/40">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-semibold truncate max-w-[150px] text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{getRoleLabel()}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden xl:block transition-transform group-hover:translate-y-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-lg">
                <DropdownMenuItem onClick={() => navigate(`/${user?.role}/profile`)} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                        : "text-foreground hover:bg-accent/50 active:scale-[0.98]"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile User Section */}
              <div className="pt-4 mt-4 border-t border-border/40">
                <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-accent/30">
                  <Avatar className="h-11 w-11 ring-2 ring-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{getRoleLabel()}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/${user?.role}/profile`);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-all active:scale-[0.98]"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-all active:scale-[0.98]"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all active:scale-[0.98]"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <div className="p-6 lg:p-8 max-w-[2000px] mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
