import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MapPin, Users, Calendar, MoreVertical, Eye, Edit, Trash2, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobContext';

export default function ManageJobs() {
  const navigate = useNavigate();
  const { jobs, removeJob } = useJobs();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Jobs</h1>
            <p className="text-muted-foreground mt-1">{jobs.length} active job postings</p>
          </div>
          <Button onClick={() => navigate('/organization/post-job')}>
            Post New Job
          </Button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <Badge variant="secondary">{job.subject}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Posted {job.postedAt}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => removeJob(job.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{job.applicationsCount} applications</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{job.experienceRequired} experience</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/organization/applications')}
                  >
                    View Applicants
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
              <FileWarning className="h-10 w-10" />
              <p>No jobs posted yet. Click "Post New Job" to create one.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
