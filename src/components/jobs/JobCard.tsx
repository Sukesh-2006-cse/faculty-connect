import { Job } from '@/lib/mockData';
import { MapPin, Clock, GraduationCap, Building2, Heart, Pin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  onPin?: (jobId: string) => void;
  onFavorite?: (jobId: string) => void;
  isPinned?: boolean;
  isFavorite?: boolean;
  isApplied?: boolean;
}

export function JobCard({
  job,
  onApply,
  onViewDetails,
  onPin,
  onFavorite,
  isPinned = false,
  isFavorite = false,
  isApplied = false,
}: JobCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">{job.institution}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", isPinned && "text-primary")}
              onClick={() => onPin?.(job.id)}
            >
              <Pin className={cn("h-4 w-4", isPinned && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", isFavorite && "text-destructive")}
              onClick={() => onFavorite?.(job.id)}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{job.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{job.experienceRequired}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="pt-3 border-t gap-2">
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onApply?.(job.id)}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails?.(job.id)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
