import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { mockJobs } from '@/lib/mockData';
import { Pin } from 'lucide-react';

export default function PinnedPage() {
  const pinnedJobs = mockJobs.slice(0, 2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pinned Jobs</h1>
          <p className="text-muted-foreground mt-1">Jobs you've pinned for quick access</p>
        </div>

        {pinnedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pinnedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isPinned={true}
                onApply={(id) => console.log('Apply:', id)}
                onViewDetails={(id) => console.log('View:', id)}
                onPin={(id) => console.log('Unpin:', id)}
                onFavorite={(id) => console.log('Favorite:', id)}
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
    </DashboardLayout>
  );
}
