import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Auth pages
import Index from "./pages/Index";
import RegisterPage from "./pages/auth/RegisterPage";

// Faculty pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import JobListings from "./pages/faculty/JobListings";
import AppliedJobs from "./pages/faculty/AppliedJobs";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import FavoritesPage from "./pages/faculty/FavoritesPage";
import PinnedPage from "./pages/faculty/PinnedPage";

// Organization pages
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import PostJob from "./pages/organization/PostJob";
import ManageJobs from "./pages/organization/ManageJobs";
import Applications from "./pages/organization/Applications";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrganizations from "./pages/admin/AdminOrganizations";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Faculty routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <FacultyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/faculty/jobs" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <JobListings />
        </ProtectedRoute>
      } />
      <Route path="/faculty/applied" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <AppliedJobs />
        </ProtectedRoute>
      } />
      <Route path="/faculty/favorites" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <FavoritesPage />
        </ProtectedRoute>
      } />
      <Route path="/faculty/pinned" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <PinnedPage />
        </ProtectedRoute>
      } />
      <Route path="/faculty/profile" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <FacultyProfile />
        </ProtectedRoute>
      } />
      
      {/* Organization routes */}
      <Route path="/organization" element={
        <ProtectedRoute allowedRoles={['organization']}>
          <OrganizationDashboard />
        </ProtectedRoute>
      } />
      <Route path="/organization/post-job" element={
        <ProtectedRoute allowedRoles={['organization']}>
          <PostJob />
        </ProtectedRoute>
      } />
      <Route path="/organization/jobs" element={
        <ProtectedRoute allowedRoles={['organization']}>
          <ManageJobs />
        </ProtectedRoute>
      } />
      <Route path="/organization/applications" element={
        <ProtectedRoute allowedRoles={['organization']}>
          <Applications />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/organizations" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminOrganizations />
        </ProtectedRoute>
      } />
      <Route path="/admin/faculty" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminFaculty />
        </ProtectedRoute>
      } />
      <Route path="/admin/jobs" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminJobs />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminAnalytics />
        </ProtectedRoute>
      } />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
