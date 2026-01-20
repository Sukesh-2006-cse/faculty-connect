import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type JobStatus = 'active' | 'closed';
export type ApplicationStatus = 'applied' | 'shortlisted' | 'interview' | 'rejected';

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
  status: JobStatus;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  qualification: string;
  experience: string;
  appliedAt: string;
  status: ApplicationStatus;
}

interface JobInput {
  title: string;
  subject: string;
  institution: string;
  location: string;
  experienceRequired: string;
  qualification: string;
  description: string;
}

interface JobContextValue {
  jobs: Job[];
  loading: boolean;
  addJob: (job: JobInput) => Job;
  updateJob: (id: string, update: Partial<Job>) => void;
  removeJob: (id: string) => void;
  refresh: () => void;
  // Applications
  applications: Application[];
  applyToJob: (jobId: string, applicantData: { name: string; email: string; qualification: string; experience: string }) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
  // Favorites & Pinned
  favoriteJobs: string[];
  pinnedJobs: string[];
  appliedJobs: string[];
  toggleFavorite: (jobId: string) => void;
  togglePinned: (jobId: string) => void;
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

const STORAGE_KEY = 'faculty-connect-jobs';
const APPLICATIONS_KEY = 'faculty-connect-applications';
const FAVORITES_KEY = 'faculty-connect-favorites';
const PINNED_KEY = 'faculty-connect-pinned';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `job-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [favoriteJobs, setFavoriteJobs] = useState<string[]>([]);
  const [pinnedJobs, setPinnedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const persist = (next: Job[]) => {
    setJobs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Job[];
        setJobs(parsed);
      }
      
      const appsRaw = localStorage.getItem(APPLICATIONS_KEY);
      if (appsRaw) {
        const parsedApps = JSON.parse(appsRaw) as Application[];
        setApplications(parsedApps);
      }
      
      const favsRaw = localStorage.getItem(FAVORITES_KEY);
      if (favsRaw) {
        const parsedFavs = JSON.parse(favsRaw) as string[];
        setFavoriteJobs(parsedFavs);
      }
      
      const pinnedRaw = localStorage.getItem(PINNED_KEY);
      if (pinnedRaw) {
        const parsedPinned = JSON.parse(pinnedRaw) as string[];
        setPinnedJobs(parsedPinned);
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = (job: JobInput): Job => {
    const newJob: Job = {
      ...job,
      id: generateId(),
      postedAt: new Date().toISOString(),
      status: 'active',
      applicationsCount: 0,
    };
    persist([newJob, ...jobs]);
    return newJob;
  };

  const updateJob = (id: string, update: Partial<Job>) => {
    persist(jobs.map((job) => (job.id === id ? { ...job, ...update } : job)));
  };

  const removeJob = (id: string) => {
    persist(jobs.filter((job) => job.id !== id));
  };

  const refresh = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Job[];
        setJobs(parsed);
      }
    } catch (error) {
      console.error('Failed to refresh jobs from storage:', error);
    }
  };
  
  const applyToJob = (jobId: string, applicantData: { name: string; email: string; qualification: string; experience: string }) => {
    const newApplication: Application = {
      id: generateId(),
      jobId,
      applicantName: applicantData.name,
      applicantEmail: applicantData.email,
      qualification: applicantData.qualification,
      experience: applicantData.experience,
      appliedAt: new Date().toISOString(),
      status: 'applied',
    };
    
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApplications));
    
    // Update job application count
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, applicationsCount: job.applicationsCount + 1 } : job
    );
    persist(updatedJobs);
  };
  
  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    const updatedApplications = applications.map((app) =>
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApplications));
  };
  
  const toggleFavorite = (jobId: string) => {
    const updated = favoriteJobs.includes(jobId)
      ? favoriteJobs.filter((id) => id !== jobId)
      : [...favoriteJobs, jobId];
    setFavoriteJobs(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };
  
  const togglePinned = (jobId: string) => {
    const updated = pinnedJobs.includes(jobId)
      ? pinnedJobs.filter((id) => id !== jobId)
      : [...pinnedJobs, jobId];
    setPinnedJobs(updated);
    localStorage.setItem(PINNED_KEY, JSON.stringify(updated));
  };
  
  const appliedJobs = useMemo(() => {
    return Array.from(new Set(applications.map((app) => app.jobId)));
  }, [applications]);

  const value = useMemo(
    () => ({ 
      jobs, 
      loading, 
      addJob, 
      updateJob, 
      removeJob, 
      refresh,
      applications,
      applyToJob,
      updateApplicationStatus,
      favoriteJobs,
      pinnedJobs,
      appliedJobs,
      toggleFavorite,
      togglePinned,
    }),
    [jobs, loading, applications, favoriteJobs, pinnedJobs, appliedJobs]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used within a JobProvider');
  return ctx;
};
