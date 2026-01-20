import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { JobCard } from '@/components/jobs/JobCard';
import { Briefcase, FileText, Heart, Pin, TrendingUp } from 'lucide-react';
import { useJobs } from '@/contexts/JobContext';

export default function FacultyDashboard() {
  const { jobs } = useJobs();
  const recentApplications: any[] = [];
  const recommendedJobs = jobs.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your job search overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Applied Jobs"
            value={0}
            icon={FileText}
          />
          <StatCard
            title="Available Jobs"
            value={jobs.length}
            icon={Briefcase}
          />
          <StatCard
            title="Favorites"
            value={0}
            icon={Heart}
          />
          <StatCard
            title="Pinned"
            value={0}
            icon={Pin}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border/50 shadow-sm">
              <div className="p-5 border-b border-border/50">
                <h2 className="font-semibold text-lg">Recent Applications</h2>
              </div>
              <div className="divide-y divide-border/50">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return (
                      <div key={app.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm text-foreground">{job?.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{job?.institution}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Applied {app.appliedAt}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-sm text-muted-foreground">No applications yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recommended Jobs</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Based on your profile
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.length > 0 ? (
                recommendedJobs.slice(0, 2).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(id) => console.log('Apply:', id)}
                    onViewDetails={(id) => console.log('View:', id)}
                    onPin={(id) => console.log('Pin:', id)}
                    onFavorite={(id) => console.log('Favorite:', id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No jobs available yet. Check back later!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
