import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { mockJobs } from '@/lib/mockData';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const favoriteJobs = mockJobs.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Favorites</h1>
          <p className="text-muted-foreground mt-1">Jobs you've saved for later</p>
        </div>

        {favoriteJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favoriteJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isFavorite={true}
                onApply={(id) => console.log('Apply:', id)}
                onViewDetails={(id) => console.log('View:', id)}
                onPin={(id) => console.log('Pin:', id)}
                onFavorite={(id) => console.log('Remove favorite:', id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No favorite jobs yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
