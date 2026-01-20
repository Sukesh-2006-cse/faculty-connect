import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Briefcase, Users, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobContext';

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const totalApplications = 0;
  const shortlistedCount = 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your job postings and applications</p>
          </div>
          <Button onClick={() => navigate('/organization/post-job')}>
            Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Jobs Posted"
            value={jobs.length}
            icon={Briefcase}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Applications"
            value={totalApplications}
            icon={Users}
            trend={{ value: 18, isPositive: true }}
          />
          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={UserCheck}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-card rounded-xl border border-border/50 shadow-sm">
            <div className="p-5 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Recent Applications</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/organization/applications')}>
                View All
              </Button>
            </div>
            <div className="divide-y divide-border/50">
              <div className="p-4 text-sm text-muted-foreground">No applications yet.</div>
            </div>
          </div>

          {/* Job Performance */}
          <div className="bg-card rounded-xl border border-border/50 shadow-sm">
            <div className="p-5 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Job Performance</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/organization/jobs')}>
                Manage Jobs
              </Button>
            </div>
            <div className="divide-y divide-border/50">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.subject} • {job.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{job.applicationsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground">No jobs posted yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
