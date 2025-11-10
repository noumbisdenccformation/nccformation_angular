export interface Mentor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  bio: string;
  specializations: string[];
  expertise: ExpertiseArea[];
  experience: number;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  completedProjects: number;
  availability: MentorAvailability;
  hourlyRate?: number;
  languages: string[];
  certifications: Certification[];
  socialLinks: SocialLinks;
  isActive: boolean;
  isVerified: boolean;
  joinedAt: Date;
}

export interface ExpertiseArea {
  domain: string;
  level: 'expert' | 'advanced' | 'intermediate';
  yearsOfExperience: number;
}

export interface MentorAvailability {
  availableSlots: number;
  maxStudents: number;
  currentStudents: number;
  schedule: WeeklySchedule;
  timezone: string;
}

export interface WeeklySchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialUrl?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  youtube?: string;
}

export interface MentorReview {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentImage?: string;
  rating: number;
  comment: string;
  formationId: string;
  formationTitle: string;
  createdAt: Date;
  helpful: number;
}

export interface MentorSession {
  id: string;
  mentorId: string;
  studentId: string;
  formationId: string;
  type: 'one-on-one' | 'group' | 'code-review' | 'project-guidance';
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  recording?: string;
  feedback?: SessionFeedback;
}

export interface SessionFeedback {
  rating: number;
  comment: string;
  studentProgress: string;
  nextSteps: string[];
  createdAt: Date;
}

export interface MentorAssignment {
  id: string;
  mentorId: string;
  studentId: string;
  formationId: string;
  assignedAt: Date;
  status: 'active' | 'completed' | 'paused';
  progressTracking: ProgressTracking;
  communicationLog: CommunicationEntry[];
}

export interface ProgressTracking {
  currentModule: string;
  completedModules: string[];
  completedProjects: string[];
  overallProgress: number;
  lastActivity: Date;
  strengths: string[];
  areasForImprovement: string[];
  goals: Goal[];
}

export interface Goal {
  id: string;
  description: string;
  targetDate: Date;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface CommunicationEntry {
  id: string;
  date: Date;
  type: 'message' | 'session' | 'feedback' | 'milestone';
  content: string;
  sender: 'mentor' | 'student';
}
