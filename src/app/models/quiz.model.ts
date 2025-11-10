export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: QuizOption[];
  category: 'objectif' | 'interet' | 'experience';
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface QuizResponse {
  questionId: number;
  answer: string | string[];
}

export interface QuizResult {
  objectif: string;
  interet: string[];
  experience: string;
  recommendedPath: FormationPath;
  personalizedMessage: string;
}

export interface FormationPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: Module[];
  mentorRequired: boolean;
  difficulty: 'debutant' | 'intermediaire' | 'avance';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  microProjects: MicroProject[];
  prerequisites?: string[];
}

export interface MicroProject {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  deliverable: string;
  isGameified: boolean;
}
