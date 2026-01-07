import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { mockJobs, subjects, experienceLevels, locations } from '@/lib/mockData';
import { Search, Filter, X } from 'lucide-react';
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

export default function JobListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [pinnedJobs, setPinnedJobs] = useState<string[]>([]);
  const [favoriteJobs, setFavoriteJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || job.subject === selectedSubject;
    const matchesExperience = !selectedExperience || job.experienceRequired === selectedExperience;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    return matchesSearch && matchesSubject && matchesExperience && matchesLocation;
  });

  const activeFilters = [selectedSubject, selectedExperience, selectedLocation].filter(Boolean);

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedExperience('');
    setSelectedLocation('');
  };

  const handleApply = (jobId: string) => {
    setAppliedJobs([...appliedJobs, jobId]);
    toast({
      title: 'Application Submitted',
      description: 'Your application has been submitted successfully.',
    });
  };

  const handlePin = (jobId: string) => {
    if (pinnedJobs.includes(jobId)) {
      setPinnedJobs(pinnedJobs.filter(id => id !== jobId));
      toast({ description: 'Job unpinned' });
    } else {
      setPinnedJobs([...pinnedJobs, jobId]);
      toast({ description: 'Job pinned' });
    }
  };

  const handleFavorite = (jobId: string) => {
    if (favoriteJobs.includes(jobId)) {
      setFavoriteJobs(favoriteJobs.filter(id => id !== jobId));
      toast({ description: 'Removed from favorites' });
    } else {
      setFavoriteJobs([...favoriteJobs, jobId]);
      toast({ description: 'Added to favorites' });
    }
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
          <p className="text-muted-foreground mt-1">Explore {mockJobs.length} open positions</p>
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              onViewDetails={(id) => console.log('View:', id)}
              onPin={handlePin}
              onFavorite={handleFavorite}
              isPinned={pinnedJobs.includes(job.id)}
              isFavorite={favoriteJobs.includes(job.id)}
              isApplied={appliedJobs.includes(job.id)}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
