import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/status-badge';
import { Download, UserCheck, UserX, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useJobs } from '@/contexts/JobContext';

export default function Applications() {
  const { applications, jobs, updateApplicationStatus } = useJobs();
  const [filterJob, setFilterJob] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const filteredApplications = applications.filter((app) => {
    const matchesJob = filterJob === 'all' || app.jobId === filterJob;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesJob && matchesStatus;
  });

  const updateStatus = (appId: string, newStatus: 'applied' | 'shortlisted' | 'interview' | 'rejected') => {
    updateApplicationStatus(appId, newStatus);
    toast({
      title: 'Status Updated',
      description: `Application marked as ${newStatus}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-1">Review and manage job applications</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={filterJob} onValueChange={setFilterJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => {
                  const job = jobs.find(j => j.id === app.jobId);
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.applicantName}</p>
                          <p className="text-xs text-muted-foreground">{app.applicantEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{job?.title}</TableCell>
                      <TableCell className="text-sm">{app.qualification}</TableCell>
                      <TableCell className="text-sm">{app.experience}</TableCell>
                      <TableCell>
                        <StatusBadge variant={app.status}>
                          {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-accent"
                            onClick={() => updateStatus(app.id, 'shortlisted')}
                            title="Shortlist"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-warning"
                            onClick={() => updateStatus(app.id, 'interview')}
                            title="Schedule Interview"
                          >
                            <CalendarCheck className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => updateStatus(app.id, 'rejected')}
                            title="Reject"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No applications found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
