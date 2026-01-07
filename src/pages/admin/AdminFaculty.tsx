import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GraduationCap, MoreVertical, Mail, Ban, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

interface Faculty {
  id: string;
  name: string;
  email: string;
  qualification: string;
  applicationsCount: number;
  status: 'active' | 'inactive';
  joinedAt: string;
}

const mockFaculty: Faculty[] = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.j@email.com', qualification: 'Ph.D. Computer Science', applicationsCount: 8, status: 'active', joinedAt: '2023-09-15' },
  { id: '2', name: 'Dr. Michael Chen', email: 'michael.c@email.com', qualification: 'Ph.D. Computer Science', applicationsCount: 12, status: 'active', joinedAt: '2023-08-20' },
  { id: '3', name: 'Dr. Emily Watson', email: 'emily.w@email.com', qualification: 'Ph.D. Mathematics', applicationsCount: 5, status: 'active', joinedAt: '2023-10-10' },
  { id: '4', name: 'Dr. James Miller', email: 'james.m@email.com', qualification: 'Ph.D. Physics', applicationsCount: 3, status: 'inactive', joinedAt: '2023-07-05' },
  { id: '5', name: 'Prof. Lisa Brown', email: 'lisa.b@email.com', qualification: 'Ph.D. English Literature', applicationsCount: 7, status: 'active', joinedAt: '2023-11-25' },
];

export default function AdminFaculty() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Members</h1>
          <p className="text-muted-foreground mt-1">View and manage registered faculty</p>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFaculty.map((faculty) => (
                  <TableRow key={faculty.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-accent" />
                        </div>
                        <span className="font-medium">{faculty.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell className="text-sm">{faculty.qualification}</TableCell>
                    <TableCell>{faculty.applicationsCount}</TableCell>
                    <TableCell>
                      <Badge variant={faculty.status === 'active' ? 'default' : 'secondary'}>
                        {faculty.status.charAt(0).toUpperCase() + faculty.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{faculty.joinedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
