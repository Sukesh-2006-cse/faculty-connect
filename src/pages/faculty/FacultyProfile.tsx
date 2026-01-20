import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth, FacultyProfile as FacultyProfileType } from '@/contexts/AuthContext';
import { User, Mail, Phone, FileText, Upload, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const qualifications = [
  'B.A.',
  'B.Sc.',
  'M.A.',
  'M.Sc.',
  'M.Phil.',
  'Ph.D.',
  'Post-Doctoral',
];

const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English', 'History', 'Biology'];

const experienceLevels = ['0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'];

const requiredFields = ['fullName', 'email', 'phone', 'qualification', 'subjectExpertise', 'yearsOfExperience'];

export default function FacultyProfile() {
  const { user, facultyProfile, updateFacultyProfile, isProfileComplete } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FacultyProfileType>({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    subjectExpertise: '',
    yearsOfExperience: '',
    skills: '',
    bio: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (facultyProfile) {
      setFormData(facultyProfile);
    }
  }, [facultyProfile]);

  const getMissingFields = (): string[] => {
    return requiredFields.filter((field) => {
      const value = formData[field as keyof FacultyProfileType];
      return !value || String(value).trim().length === 0;
    });
  };

  const missingFields = getMissingFields();
  const isComplete = missingFields.length === 0;

  const handleSave = async () => {
    if (!isComplete) {
      toast({
        title: 'Incomplete Profile',
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateFacultyProfile(formData);
    setIsSaving(false);
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully. You can now apply for jobs!',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Completion Status */}
            {isComplete ? (
              <Alert className="border-green-500/50 bg-green-500/5">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-700 dark:text-green-400 ml-2">
                  Your profile is complete! You can now apply for jobs.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-amber-500/50 bg-amber-500/5">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-700 dark:text-amber-400 ml-2">
                  Please complete the following fields: {missingFields.map(f => f.replace(/([A-Z])/g, ' $1').trim()).join(', ')}
                </AlertDescription>
              </Alert>
            )}

            {/* Required Fields Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Required Fields: {requiredFields.length - missingFields.length}/{requiredFields.length}
              </Badge>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  Highest Qualification <span className="text-destructive">*</span>
                </Label>
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
                <Label>
                  Subject Expertise <span className="text-destructive">*</span>
                </Label>
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
                <Label>
                  Years of Experience <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.yearsOfExperience}
                  onValueChange={(value) => setFormData({ ...formData, yearsOfExperience: value })}
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
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g., Machine Learning, Data Science, Software Engineering"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
                rows={4}
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label>Resume</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-dashed border-border bg-muted/30">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">resume_john_doe.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded Jan 15, 2024</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reset Changes
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !isComplete}
                className={isComplete ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : isComplete ? 'Save Profile' : 'Complete Required Fields'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
