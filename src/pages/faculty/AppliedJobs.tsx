import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockJobs, mockApplications } from '@/lib/mockData';
import { StatusBadge } from '@/components/ui/status-badge';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AppliedJobs() {
  const applications = mockApplications.map((app) => ({
    ...app,
    job: mockJobs.find((job) => job.id === app.jobId),
  }));

  const statusCounts = {
    applied: applications.filter(a => a.status === 'applied').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    interview: applications.filter(a => a.status === 'interview').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applied Jobs</h1>
          <p className="text-muted-foreground mt-1">Track your job applications</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border border-border/50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Applied</span>
            </div>
            <p className="text-2xl font-bold mt-1">{statusCounts.applied}</p>
          </div>
          <div className="bg-card rounded-lg border border-border/50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Shortlisted</span>
            </div>
            <p className="text-2xl font-bold mt-1">{statusCounts.shortlisted}</p>
          </div>
          <div className="bg-card rounded-lg border border-border/50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Interview</span>
            </div>
            <p className="text-2xl font-bold mt-1">{statusCounts.interview}</p>
          </div>
          <div className="bg-card rounded-lg border border-border/50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Rejected</span>
            </div>
            <p className="text-2xl font-bold mt-1">{statusCounts.rejected}</p>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{application.job?.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {application.job?.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {application.job?.location}
                      </div>
                    </div>
                  </div>
                  <StatusBadge variant={application.status}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </StatusBadge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Applied on {application.appliedAt}
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
