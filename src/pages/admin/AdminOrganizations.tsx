import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Building2, Check, X, MoreVertical, Mail } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

interface Organization {
  id: string;
  name: string;
  email: string;
  jobCount: number;
  status: 'active' | 'pending' | 'blocked';
  joinedAt: string;
}

const mockOrganizations: Organization[] = [
  { id: '1', name: 'MIT University', email: 'hr@mit.edu', jobCount: 12, status: 'active', joinedAt: '2023-06-15' },
  { id: '2', name: 'Stanford University', email: 'hr@stanford.edu', jobCount: 8, status: 'active', joinedAt: '2023-07-20' },
  { id: '3', name: 'Harvard University', email: 'hr@harvard.edu', jobCount: 15, status: 'active', joinedAt: '2023-05-10' },
  { id: '4', name: 'Yale University', email: 'hr@yale.edu', jobCount: 6, status: 'pending', joinedAt: '2024-01-05' },
  { id: '5', name: 'Princeton University', email: 'hr@princeton.edu', jobCount: 10, status: 'blocked', joinedAt: '2023-08-25' },
];

export default function AdminOrganizations() {
  const [organizations, setOrganizations] = useState(mockOrganizations);
  const { toast } = useToast();

  const updateStatus = (orgId: string, newStatus: Organization['status']) => {
    setOrganizations(orgs =>
      orgs.map(org => org.id === orgId ? { ...org, status: newStatus } : org)
    );
    toast({
      title: 'Status Updated',
      description: `Organization ${newStatus === 'active' ? 'approved' : newStatus}`,
    });
  };

  const getStatusVariant = (status: Organization['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'blocked': return 'destructive';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground mt-1">Manage registered organizations</p>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Jobs Posted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{org.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{org.email}</TableCell>
                    <TableCell>{org.jobCount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(org.status)}>
                        {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{org.joinedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatus(org.id, 'active')}>
                            <Check className="h-4 w-4 mr-2 text-success" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(org.id, 'blocked')}>
                            <X className="h-4 w-4 mr-2 text-destructive" />
                            Block
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
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
