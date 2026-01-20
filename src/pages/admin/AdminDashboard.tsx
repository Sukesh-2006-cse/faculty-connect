import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { analyticsData } from '@/lib/mockData';
import { StatusBadge } from '@/components/ui/status-badge';
import { Users, Building2, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useJobs } from '@/contexts/JobContext';

const COLORS = ['hsl(226, 70%, 45%)', 'hsl(174, 60%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(142, 70%, 45%)', 'hsl(0, 72%, 51%)'];

export default function AdminDashboard() {
  const { jobs } = useJobs();
  const recentApplications: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Faculty"
            value={analyticsData.totalFaculty.toLocaleString()}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Organizations"
            value={analyticsData.totalOrganizations}
            icon={Building2}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Job Posts"
            value={jobs.length}
            icon={Briefcase}
            trend={{ value: 0, isPositive: true }}
          />
          <StatCard
            title="Applications"
            value={analyticsData.totalApplications.toLocaleString()}
            icon={FileText}
            trend={{ value: 22, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Application Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={analyticsData.applicationTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Jobs vs Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Jobs vs Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={analyticsData.jobsVsApplications}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="jobs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="applications" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Applied Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={analyticsData.topSubjects}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {analyticsData.topSubjects.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                 {recentApplications.length === 0 && (
                   <p className="text-sm text-muted-foreground">No applications yet.</p>
                 )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Active Organizations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Most Active Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.length > 0 ? (
                jobs.slice(0, 6).map((job) => (
                  <div key={job.id} className="flex items-center gap-3 p-4 rounded-lg border border-border/50">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{job.institution}</p>
                      <p className="text-xs text-muted-foreground">{job.applicationsCount} applications</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground col-span-3">No organizations yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
