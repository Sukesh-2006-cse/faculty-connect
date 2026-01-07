import { useState } from 'react';
import { Job, subjects, experienceLevels } from '@/lib/mockData';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ApplyJobDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplySuccess: (jobId: string) => void;
}

const qualifications = [
  'B.A.',
  'B.Sc.',
  'M.A.',
  'M.Sc.',
  'M.Phil.',
  'Ph.D.',
  'Post-Doctoral',
];

export function ApplyJobDialog({ job, open, onOpenChange, onApplySuccess }: ApplyJobDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    subjectExpertise: '',
    experience: '',
    resume: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.qualification || !formData.subjectExpertise || !formData.experience) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (job) {
      onApplySuccess(job.id);
      toast({
        title: 'Application Submitted!',
        description: `Your application for ${job.title} at ${job.institution} has been submitted successfully.`,
      });
      onOpenChange(false);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        subjectExpertise: '',
        experience: '',
        resume: null,
      });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Position</DialogTitle>
          <DialogDescription>
            {job?.title} at {job?.institution}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Highest Qualification *</Label>
            <Select
              value={formData.qualification}
              onValueChange={(value) => setFormData({ ...formData, qualification: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                {qualifications.map((qual) => (
                  <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Subject Expertise *</Label>
            <Select
              value={formData.subjectExpertise}
              onValueChange={(value) => setFormData({ ...formData, subjectExpertise: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience (Years) *</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData({ ...formData, experience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((exp) => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button type="submit" className="flex-1">
              Apply Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
