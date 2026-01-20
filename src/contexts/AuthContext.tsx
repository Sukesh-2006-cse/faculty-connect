import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/lib/mockData';

export interface FacultyProfile {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  subjectExpertise: string;
  yearsOfExperience: string;
  skills: string;
  bio: string;
  resumeUrl?: string;
}

interface AuthContextType {
  user: User | null;
  facultyProfile: FacultyProfile | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateFacultyProfile: (profile: Partial<FacultyProfile>) => void;
  isAuthenticated: boolean;
  isProfileComplete: () => boolean;
}

interface RegisterData {
  role: UserRole;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  institutionName?: string;
  contactNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const REQUIRED_PROFILE_FIELDS: (keyof FacultyProfile)[] = [
  'fullName',
  'email',
  'phone',
  'qualification',
  'subjectExpertise',
  'yearsOfExperience',
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [facultyProfile, setFacultyProfile] = useState<FacultyProfile | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      email,
      role,
      name: role === 'organization' ? 'MIT University' : role === 'admin' ? 'Admin User' : 'John Doe',
    };
    
    setUser(mockUser);
    
    if (role === 'faculty') {
      setFacultyProfile({
        fullName: mockUser.name,
        email: mockUser.email,
        phone: '',
        qualification: '',
        subjectExpertise: '',
        yearsOfExperience: '',
        skills: '',
        bio: '',
      });
    }
    
    return true;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      email: data.email,
      role: data.role,
      name: data.name || data.institutionName || 'New User',
    };
    
    setUser(mockUser);
    
    if (data.role === 'faculty') {
      setFacultyProfile({
        fullName: mockUser.name,
        email: mockUser.email,
        phone: data.phone || '',
        qualification: '',
        subjectExpertise: '',
        yearsOfExperience: '',
        skills: '',
        bio: '',
      });
    }
    
    return true;
  };

  const updateFacultyProfile = (profile: Partial<FacultyProfile>) => {
    if (facultyProfile) {
      setFacultyProfile({ ...facultyProfile, ...profile });
    }
  };

  const isProfileComplete = (): boolean => {
    if (!facultyProfile) return false;
    return REQUIRED_PROFILE_FIELDS.every(field => {
      const value = facultyProfile[field];
      return value && String(value).trim().length > 0;
    });
  };

  const logout = () => {
    setUser(null);
    setFacultyProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        facultyProfile,
        login,
        register,
        logout,
        updateFacultyProfile,
        isAuthenticated: !!user,
        isProfileComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
