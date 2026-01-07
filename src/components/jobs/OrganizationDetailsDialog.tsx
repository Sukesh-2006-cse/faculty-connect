import { Job, mockOrganizations } from '@/lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Building2, MapPin, Globe, Mail, Phone, Users, Briefcase, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface OrganizationDetailsDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrganizationDetailsDialog({ job, open, onOpenChange }: OrganizationDetailsDialogProps) {
  const organization = job ? mockOrganizations.find(org => org.name === job.institution) : null;

  if (!organization) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Organization Details</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Organization information not available.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {organization.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* About Section */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">About</h4>
            <p className="text-foreground leading-relaxed">{organization.description}</p>
          </div>

          <Separator />

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{organization.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Est. {organization.establishedYear}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{organization.employeeCount} Employees</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{organization.activeJobs} Active Jobs</span>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${organization.email}`} className="text-primary hover:underline">
                  {organization.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{organization.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {organization.website}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Specializations */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {organization.specializations.map((spec) => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>

          {/* Job Details */}
          {job && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Current Position</h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm pt-2">
                    <span><strong>Experience:</strong> {job.experienceRequired}</span>
                    <span><strong>Qualification:</strong> {job.qualification}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
