import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { subjects, experienceLevels, locations } from '@/lib/mockData';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { ApplyJobDialog } from '@/components/jobs/ApplyJobDialog';
import { OrganizationDetailsDialog } from '@/components/jobs/OrganizationDetailsDialog';
import { Job, useJobs } from '@/contexts/JobContext';

export default function JobListings() {
  const { jobs, loading, toggleFavorite, togglePinned, favoriteJobs, pinnedJobs, appliedJobs, applyToJob } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

  const normalizedSubject = selectedSubject === 'all' ? '' : selectedSubject;
  const normalizedExperience = selectedExperience === 'all' ? '' : selectedExperience;
  const normalizedLocation = selectedLocation === 'all' ? '' : selectedLocation;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !normalizedSubject || job.subject === normalizedSubject;
    const matchesExperience = !normalizedExperience || job.experienceRequired === normalizedExperience;
    const matchesLocation = !normalizedLocation || job.location === normalizedLocation;
    return matchesSearch && matchesSubject && matchesExperience && matchesLocation;
  });

  const activeFilters = [selectedSubject, selectedExperience, selectedLocation].filter(Boolean);

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedExperience('');
    setSelectedLocation('');
  };

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
    toast({ description: pinnedJobs.includes(jobId) ? 'Job unpinned' : 'Job pinned' });
  };

  const handleFavorite = (jobId: string) => {
    toggleFavorite(jobId);
    toast({ description: favoriteJobs.includes(jobId) ? 'Removed from favorites' : 'Added to favorites' });
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Subject</label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Experience</label>
        <Select value={selectedExperience} onValueChange={setSelectedExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Any Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Experience</SelectItem>
            {experienceLevels.map((exp) => (
              <SelectItem key={exp} value={exp}>{exp}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Listings</h1>
          <p className="text-muted-foreground mt-1">Explore {jobs.length} open positions</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, institutions, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Experience</SelectItem>
                {experienceLevels.map((exp) => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{activeFilters.length}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down your job search</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedSubject && selectedSubject !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {selectedSubject}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSubject('')} />
              </Badge>
            )}
            {selectedExperience && selectedExperience !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {selectedExperience}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedExperience('')} />
              </Badge>
            )}
            {selectedLocation && selectedLocation !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {selectedLocation}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation('')} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear all</Button>
          </div>
        )}

        {/* Results */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/40 rounded-full" />
            <p className="text-sm font-semibold text-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            from {jobs.length} total
          </p>
        </div>

        {/* Job List - Vertical Feed Style */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading jobs...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="bg-gradient-to-br from-card via-card to-muted/10 rounded-xl border-2 border-border/50 shadow-xl shadow-black/5 overflow-hidden backdrop-blur-sm p-6">
            <div className="grid grid-cols-1 gap-5">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard
                    job={job}
                    onApply={handleApply}
                    onViewDetails={handleViewDetails}
                    onPin={handlePin}
                    onFavorite={handleFavorite}
                    isPinned={pinnedJobs.includes(job.id)}
                    isFavorite={favoriteJobs.includes(job.id)}
                    isApplied={appliedJobs.includes(job.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto space-y-4">
              <div className="h-24 w-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">No jobs found</p>
                <p className="text-sm text-muted-foreground">
                  We couldn't find any positions matching your criteria. Try adjusting your filters.
                </p>
              </div>
              <Button variant="outline" onClick={clearFilters} className="shadow-sm">
                Clear all filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Apply Job Dialog */}
      <ApplyJobDialog
        job={selectedJob}
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        onApplySuccess={handleApplySuccess}
      />

      {/* Organization Details Dialog */}
      <OrganizationDetailsDialog
        job={selectedJob}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </DashboardLayout>
  );
}
