import { Job } from '@/contexts/JobContext';
import { MapPin, Clock, Building2, Heart, Pin, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

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
    <article className="group relative p-6 border border-border/40 rounded-xl bg-gradient-to-br from-background via-background to-muted/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
      {/* Accent corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-50" />
      
      {/* Accent bar on left */}
      <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full" />
      
      <div className="relative flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Job Title - Clickable */}
          <button
            onClick={() => onViewDetails?.(job.id)}
            className="text-left w-full group/title mb-2"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary group-hover/title:bg-primary group-hover/title:text-primary-foreground transition-all duration-300 group-hover/title:scale-110 shrink-0 shadow-sm">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-foreground leading-tight group-hover/title:text-primary transition-colors mb-1 group-hover/title:translate-x-1 duration-200">
                  {job.title}
                </h3>
                {isApplied && (
                  <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Applied
                  </Badge>
                )}
              </div>
            </div>
          </button>
          
          {/* Posted Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 ml-11">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 border border-border/30">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={job.postedAt}>
                Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
              </time>
            </div>
          </div>
          
          {/* Institution and Location */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-4 ml-11">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 hover:border-primary/20 transition-colors shadow-sm">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{job.institution}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50 hover:bg-accent transition-colors border border-border/30 shadow-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/30 shadow-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">{job.experienceRequired}</span>
            </div>
          </div>
          
          {/* Job Description */}
          <p className="text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed mb-5 ml-11 italic">
            "{job.description}"
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 ml-11">
            <Button
              size="sm"
              onClick={() => onApply?.(job.id)}
              disabled={isApplied}
              className={cn(
                "shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 font-semibold",
                isApplied && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isApplied ? '✓ Applied' : 'Apply Now'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(job.id)}
              className="shadow-sm hover:bg-accent/50 transition-all hover:scale-105 font-medium border-border/50"
            >
              View Details
            </Button>
            
            {/* Subject Badge */}
            <Badge variant="secondary" className="ml-auto text-xs font-medium px-3 py-1 shadow-sm">
              {job.subject}
            </Badge>
          </div>
        </div>
        
        {/* Action Icons */}
        <div className="flex flex-col gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-xl transition-all duration-200 hover:scale-110 border",
              isPinned 
                ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-md border-primary/20" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/5 border-transparent hover:border-border"
            )}
            onClick={() => onPin?.(job.id)}
            title={isPinned ? "Unpin job" : "Pin job"}
          >
            <Pin className={cn("h-4 w-4 transition-transform", isPinned && "fill-current rotate-45")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-xl transition-all duration-200 hover:scale-110 border",
              isFavorite 
                ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white shadow-md border-red-500/20" 
                : "text-muted-foreground hover:text-red-500 hover:bg-red-500/5 border-transparent hover:border-border"
            )}
            onClick={() => onFavorite?.(job.id)}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4 transition-all", isFavorite && "fill-current scale-110")} />
          </Button>
        </div>
      </div>
      
      {/* Application count indicator */}
      {job.applicationsCount > 0 && (
        <div className="absolute bottom-4 right-6 text-xs text-muted-foreground/70 font-medium px-2 py-1 rounded-md bg-muted/30 border border-border/20">
          {job.applicationsCount} applicants
        </div>
      )}
    </article>
  );
}
