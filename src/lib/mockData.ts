export type UserRole = 'faculty' | 'organization' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  subject: string;
  institution: string;
  location: string;
  experienceRequired: string;
  qualification: string;
  description: string;
  postedAt: string;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  qualification: string;
  experience: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'rejected';
  appliedAt: string;
  resumeUrl?: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Assistant Professor - Computer Science',
    subject: 'Computer Science',
    institution: 'MIT University',
    location: 'Cambridge, MA',
    experienceRequired: '3-5 years',
    qualification: 'Ph.D. in Computer Science',
    description: 'Looking for a dynamic educator to teach undergraduate and graduate courses in computer science.',
    postedAt: '2024-01-15',
    applicationsCount: 45,
  },
  {
    id: '2',
    title: 'Associate Professor - Mathematics',
    subject: 'Mathematics',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    experienceRequired: '5-8 years',
    qualification: 'Ph.D. in Mathematics',
    description: 'Seeking an experienced mathematician to lead research initiatives and teach advanced courses.',
    postedAt: '2024-01-12',
    applicationsCount: 32,
  },
  {
    id: '3',
    title: 'Professor - Physics',
    subject: 'Physics',
    institution: 'Harvard University',
    location: 'Cambridge, MA',
    experienceRequired: '8+ years',
    qualification: 'Ph.D. in Physics',
    description: 'Senior faculty position for leading groundbreaking research in quantum mechanics.',
    postedAt: '2024-01-10',
    applicationsCount: 28,
  },
  {
    id: '4',
    title: 'Lecturer - English Literature',
    subject: 'English',
    institution: 'Yale University',
    location: 'New Haven, CT',
    experienceRequired: '2-4 years',
    qualification: 'M.A. or Ph.D. in English',
    description: 'Teaching position focused on undergraduate English literature courses.',
    postedAt: '2024-01-08',
    applicationsCount: 56,
  },
  {
    id: '5',
    title: 'Assistant Professor - Chemistry',
    subject: 'Chemistry',
    institution: 'Princeton University',
    location: 'Princeton, NJ',
    experienceRequired: '3-5 years',
    qualification: 'Ph.D. in Chemistry',
    description: 'Research-focused position with teaching responsibilities in organic chemistry.',
    postedAt: '2024-01-05',
    applicationsCount: 38,
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    applicantName: 'Dr. Sarah Johnson',
    applicantEmail: 'sarah.j@email.com',
    qualification: 'Ph.D. Computer Science',
    experience: '4 years',
    status: 'shortlisted',
    appliedAt: '2024-01-16',
  },
  {
    id: '2',
    jobId: '1',
    applicantName: 'Dr. Michael Chen',
    applicantEmail: 'michael.c@email.com',
    qualification: 'Ph.D. Computer Science',
    experience: '5 years',
    status: 'interview',
    appliedAt: '2024-01-17',
  },
  {
    id: '3',
    jobId: '2',
    applicantName: 'Dr. Emily Watson',
    applicantEmail: 'emily.w@email.com',
    qualification: 'Ph.D. Mathematics',
    experience: '6 years',
    status: 'applied',
    appliedAt: '2024-01-14',
  },
  {
    id: '4',
    jobId: '3',
    applicantName: 'Dr. James Miller',
    applicantEmail: 'james.m@email.com',
    qualification: 'Ph.D. Physics',
    experience: '10 years',
    status: 'rejected',
    appliedAt: '2024-01-11',
  },
  {
    id: '5',
    jobId: '4',
    applicantName: 'Prof. Lisa Brown',
    applicantEmail: 'lisa.b@email.com',
    qualification: 'Ph.D. English Literature',
    experience: '3 years',
    status: 'shortlisted',
    appliedAt: '2024-01-09',
  },
];

export const analyticsData = {
  totalFaculty: 1248,
  totalOrganizations: 156,
  totalJobPosts: 423,
  totalApplications: 3847,
  applicationTrend: [
    { date: 'Jan 1', applications: 45 },
    { date: 'Jan 2', applications: 52 },
    { date: 'Jan 3', applications: 38 },
    { date: 'Jan 4', applications: 65 },
    { date: 'Jan 5', applications: 78 },
    { date: 'Jan 6', applications: 56 },
    { date: 'Jan 7', applications: 89 },
  ],
  jobsVsApplications: [
    { month: 'Sep', jobs: 35, applications: 320 },
    { month: 'Oct', jobs: 42, applications: 410 },
    { month: 'Nov', jobs: 38, applications: 380 },
    { month: 'Dec', jobs: 55, applications: 520 },
    { month: 'Jan', jobs: 48, applications: 480 },
  ],
  topSubjects: [
    { name: 'Computer Science', value: 35 },
    { name: 'Mathematics', value: 25 },
    { name: 'Physics', value: 18 },
    { name: 'English', value: 12 },
    { name: 'Chemistry', value: 10 },
  ],
};

export const subjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'English',
  'Biology',
  'Economics',
  'Psychology',
];

export const experienceLevels = [
  '0-2 years',
  '2-4 years',
  '3-5 years',
  '5-8 years',
  '8+ years',
];

export const locations = [
  'Cambridge, MA',
  'Stanford, CA',
  'New Haven, CT',
  'Princeton, NJ',
  'New York, NY',
  'Chicago, IL',
  'Los Angeles, CA',
];

export interface Organization {
  id: string;
  name: string;
  description: string;
  location: string;
  establishedYear: number;
  employeeCount: string;
  activeJobs: number;
  email: string;
  phone: string;
  website: string;
  specializations: string[];
}

export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'MIT University',
    description: 'The Massachusetts Institute of Technology is a private research university renowned for its cutting-edge research and education in science, technology, engineering, and mathematics. MIT has been ranked among the top universities in the world and continues to lead in innovation and academic excellence.',
    location: 'Cambridge, MA',
    establishedYear: 1861,
    employeeCount: '12,000+',
    activeJobs: 15,
    email: 'careers@mit.edu',
    phone: '+1 (617) 253-1000',
    website: 'https://www.mit.edu',
    specializations: ['Computer Science', 'Engineering', 'Physics', 'Mathematics', 'AI Research'],
  },
  {
    id: '2',
    name: 'Stanford University',
    description: 'Stanford University is a leading private research university located in Silicon Valley. Known for its entrepreneurial spirit and proximity to tech industry leaders, Stanford excels in research, innovation, and producing world-class graduates who go on to shape the future.',
    location: 'Stanford, CA',
    establishedYear: 1885,
    employeeCount: '15,000+',
    activeJobs: 12,
    email: 'hr@stanford.edu',
    phone: '+1 (650) 723-2300',
    website: 'https://www.stanford.edu',
    specializations: ['Computer Science', 'Business', 'Medicine', 'Law', 'Engineering'],
  },
  {
    id: '3',
    name: 'Harvard University',
    description: 'Harvard University is the oldest institution of higher education in the United States. As a world-renowned research university, Harvard is committed to excellence in teaching, learning, and research, and to developing leaders who make a difference globally.',
    location: 'Cambridge, MA',
    establishedYear: 1636,
    employeeCount: '18,000+',
    activeJobs: 20,
    email: 'faculty@harvard.edu',
    phone: '+1 (617) 495-1000',
    website: 'https://www.harvard.edu',
    specializations: ['Law', 'Medicine', 'Business', 'Physics', 'Liberal Arts'],
  },
  {
    id: '4',
    name: 'Yale University',
    description: 'Yale University is a distinguished private Ivy League research university known for its outstanding liberal arts education, professional schools, and commitment to research across all disciplines. Yale has produced numerous leaders in arts, sciences, and public service.',
    location: 'New Haven, CT',
    establishedYear: 1701,
    employeeCount: '14,000+',
    activeJobs: 10,
    email: 'careers@yale.edu',
    phone: '+1 (203) 432-4771',
    website: 'https://www.yale.edu',
    specializations: ['English', 'Drama', 'Law', 'Medicine', 'History'],
  },
  {
    id: '5',
    name: 'Princeton University',
    description: 'Princeton University is a prestigious private Ivy League university with a strong emphasis on undergraduate education and groundbreaking research. The university is known for its beautiful campus, distinguished faculty, and commitment to academic excellence.',
    location: 'Princeton, NJ',
    establishedYear: 1746,
    employeeCount: '8,000+',
    activeJobs: 8,
    email: 'jobs@princeton.edu',
    phone: '+1 (609) 258-3000',
    website: 'https://www.princeton.edu',
    specializations: ['Mathematics', 'Chemistry', 'Economics', 'Physics', 'Public Policy'],
  },
];
