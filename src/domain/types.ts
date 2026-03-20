export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string; // ISO date string (yyyy-mm-dd)
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
}

export interface TaskDraft {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
}

