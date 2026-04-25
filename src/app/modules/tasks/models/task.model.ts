export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface CreateTaskRequest {
  assignmentId: string;
  weekId: string;
  title: string;
  description: string;
  hours: number;
  status: TaskStatus;
  observations: string;
  attachments: string[];
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  hours: number;
  observations: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface TaskResponse {
  id: string;
  assignmentId: string;
  weekId: string;
  title: string;
  description: string;
  hours: number;
  status: TaskStatus;
  observations: string;
  attachments: string[];
  isLateReport: boolean;
  createdAt: string;
  updatedAt: string;
}