export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  quizCompleted: boolean;
  quizResult?: QuizResult;
  enrolledFormations: EnrolledFormation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizResult {
  objectif: string;
  interet: string[];
  experience: string;
  recommendedPathId: string;
  completedAt: Date;
}

export interface EnrolledFormation {
  formationId: string;
  enrolledAt: Date;
  progress: number;
  currentModuleId: string;
  completedModules: string[];
  mentorId?: string;
  finalProjectStatus?: 'not_started' | 'in_progress' | 'submitted' | 'approved';
}

export interface Mentor {
  id: string;
  userId: string;
  specialization: string[];
  experience: number;
  rating: number;
  availableSlots: number;
  bio: string;
}
