export interface Formation {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: FormationCategory;
  duration: string;
  durationInWeeks: number;
  level: 'debutant' | 'intermediaire' | 'avance';
  price: number;
  discountPrice?: number;
  thumbnail: string;
  coverImage: string;
  isActive: boolean;
  isFeatured: boolean;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  modules: CourseModule[];
  prerequisites: string[];
  learningObjectives: string[];
  targetAudience: string[];
  certification: boolean;
  mentorRequired: boolean;
  finalProjectRequired: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type FormationCategory = 
  | 'dev-web'
  | 'dev-mobile'
  | 'cybersecurite'
  | 'design'
  | 'data-science'
  | 'marketing-digital'
  | 'social-media'
  | 'ia'
  | 'gestion-projet'
  | 'ecommerce'
  | 'redaction'
  | 'blockchain';

export interface CourseModule {
  id: string;
  formationId: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  durationInHours: number;
  isLocked: boolean;
  prerequisites: string[];
  lessons: Lesson[];
  microProjects: MicroProject[];
  quiz?: ModuleQuiz;
  resources: Resource[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  type: 'video' | 'text' | 'interactive' | 'exercise';
  duration: string;
  durationInMinutes: number;
  content: LessonContent;
  isCompleted: boolean;
  isFree: boolean;
}

export interface LessonContent {
  videoUrl?: string;
  textContent?: string;
  codeExamples?: CodeExample[];
  interactiveElements?: InteractiveElement[];
  downloadableResources?: string[];
}

export interface CodeExample {
  id: string;
  language: string;
  code: string;
  description: string;
  isRunnable: boolean;
}

export interface InteractiveElement {
  id: string;
  type: 'quiz' | 'coding-challenge' | 'drag-drop' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface MicroProject {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  objectives: string[];
  estimatedTime: string;
  estimatedTimeInHours: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  deliverable: string;
  isGameified: boolean;
  gamificationPoints: number;
  instructions: string[];
  starterCode?: string;
  solution?: string;
  evaluationCriteria: EvaluationCriterion[];
  resources: Resource[];
  submissions: ProjectSubmission[];
}

export interface EvaluationCriterion {
  id: string;
  criterion: string;
  weight: number;
  description: string;
}

export interface ProjectSubmission {
  id: string;
  userId: string;
  projectId: string;
  submittedAt: Date;
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'needs-revision';
  submissionUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  description: string;
  feedback?: SubmissionFeedback;
  score?: number;
}

export interface SubmissionFeedback {
  mentorId: string;
  mentorName: string;
  reviewedAt: Date;
  overallComment: string;
  criteriaScores: { [criterionId: string]: number };
  suggestions: string[];
  strengths: string[];
  areasForImprovement: string[];
}

export interface ModuleQuiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit?: number;
  questions: ModuleQuizQuestion[];
  attempts: QuizAttempt[];
}

export interface ModuleQuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'true-false' | 'code';
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  startedAt: Date;
  completedAt?: Date;
  score: number;
  passed: boolean;
  answers: { [questionId: string]: string | string[] };
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'code' | 'tool';
  url: string;
  description: string;
  size?: string;
  duration?: string;
}

export interface FinalProject {
  id: string;
  formationId: string;
  title: string;
  description: string;
  objectives: string[];
  requirements: string[];
  estimatedTime: string;
  estimatedTimeInWeeks: number;
  isMonetizable: boolean;
  monetizationStrategy: string[];
  mentorGuidance: string[];
  milestones: ProjectMilestone[];
  deliverables: string[];
  evaluationCriteria: EvaluationCriterion[];
  clientSimulation: boolean;
  marketingSupport: boolean;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  dueInDays: number;
  deliverables: string[];
  isCompleted: boolean;
  completedAt?: Date;
}
