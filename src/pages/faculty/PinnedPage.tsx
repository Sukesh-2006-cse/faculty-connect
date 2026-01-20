import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { Pin } from 'lucide-react';
import { useJobs } from '@/contexts/JobContext';
import { useToast } from '@/hooks/use-toast';
import { ApplyJobDialog } from '@/components/jobs/ApplyJobDialog';
import { OrganizationDetailsDialog } from '@/components/jobs/OrganizationDetailsDialog';
import { Job } from '@/contexts/JobContext';

export default function PinnedPage() {
  const { jobs, favoriteJobs, toggleFavorite, togglePinned, pinnedJobs, appliedJobs, applyToJob } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const pinnedJobsList = jobs.filter((job) => pinnedJobs.includes(job.id));

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setApplyDialogOpen(true);
    }
  };

  const handleApplySuccess = (jobId: string, applicantData: { name: string; email: string; qualification: string; experience: string }) => {
    applyToJob(jobId, applicantData);
    toast({ description: 'Application submitted successfully!' });
  };

  const handleViewDetails = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setDetailsDialogOpen(true);
    }
  };

  const handlePin = (jobId: string) => {
    togglePinned(jobId);
    toast({ description: 'Job unpinned' });
  };

  const handleFavorite = (jobId: string) => {
    toggleFavorite(jobId);
    toast({ description: favoriteJobs.includes(jobId) ? 'Removed from favorites' : 'Added to favorites' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pinned Jobs</h1>
          <p className="text-muted-foreground mt-1">Jobs you've pinned for quick access</p>
        </div>

        {pinnedJobsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pinnedJobsList.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isPinned={true}
                isFavorite={favoriteJobs.includes(job.id)}
                isApplied={appliedJobs.includes(job.id)}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
                onPin={handlePin}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Pin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pinned jobs yet.</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <>
          <ApplyJobDialog
            job={selectedJob}
            open={applyDialogOpen}
            onOpenChange={setApplyDialogOpen}
            onApplySuccess={handleApplySuccess}
          />
          <OrganizationDetailsDialog
            job={selectedJob}
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
          />
        </>
      )}
    </DashboardLayout>
  );
}
