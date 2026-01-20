import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/contexts/JobContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApplyJobDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplySuccess: (jobId: string, applicantData: { name: string; email: string; qualification: string; experience: string }) => void;
}

export function ApplyJobDialog({ job, open, onOpenChange, onApplySuccess }: ApplyJobDialogProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { facultyProfile, isProfileComplete } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    subjectExpertise: '',
    yearsOfExperience: '',
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill form from profile when dialog opens
  useEffect(() => {
    if (open && facultyProfile) {
      setFormData({
        fullName: facultyProfile.fullName,
        email: facultyProfile.email,
        phone: facultyProfile.phone,
        qualification: facultyProfile.qualification,
        subjectExpertise: facultyProfile.subjectExpertise,
        yearsOfExperience: facultyProfile.yearsOfExperience,
        resume: null,
      });
    }
  }, [open, facultyProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if profile is complete
    if (!isProfileComplete()) {
      toast({
        title: 'Incomplete Profile',
        description: 'Please complete your profile before applying for jobs.',
        variant: 'destructive',
      });
      onOpenChange(false);
      navigate('/faculty/profile');
      return;
    }
    
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.qualification || !formData.subjectExpertise || !formData.yearsOfExperience) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (job) {
      onApplySuccess(job.id, {
        name: formData.fullName,
        email: formData.email,
        qualification: formData.qualification,
        experience: formData.yearsOfExperience,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Invalid File',
          description: 'Please upload a PDF file.',
          variant: 'destructive',
        });
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  // Show incomplete profile message
  if (!isProfileComplete()) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Profile First</DialogTitle>
            <DialogDescription>
              Set up your profile to apply for jobs
            </DialogDescription>
          </DialogHeader>
          <Alert className="border-amber-500/50 bg-amber-500/5 mt-4">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-700 dark:text-amber-400">Profile Incomplete</AlertTitle>
            <AlertDescription className="text-amber-700/80 dark:text-amber-400/80 mt-2">
              To apply for positions, please complete all required fields in your profile. This ensures employers have all the information they need to review your application.
            </AlertDescription>
          </Alert>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                navigate('/faculty/profile');
              }}
            >
              Complete Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Position</DialogTitle>
          <DialogDescription>
            {job?.title} at {job?.institution}
          </DialogDescription>
        </DialogHeader>
        
        {/* Profile Complete Status */}
        <Alert className="border-green-500/50 bg-green-500/5">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-700 dark:text-green-400 ml-2">
            Using your profile information. Update it from your Profile page.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label>Highest Qualification</Label>
            <Input
              value={formData.qualification}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label>Subject Expertise</Label>
            <Input
              value={formData.subjectExpertise}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input
              value={formData.yearsOfExperience}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Update from your Profile page</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume (PDF)</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {formData.resume && (
              <p className="text-sm text-muted-foreground">
                Selected: {formData.resume.name}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Apply Now'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
