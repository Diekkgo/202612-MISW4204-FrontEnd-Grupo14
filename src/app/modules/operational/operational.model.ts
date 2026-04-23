export interface UserParticipation {
  assignmentId: string;
  type: 'COURSE' | 'PROJECT';
  name: string;
  professorName: string;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface UserTaskRecord {
  taskId: string;
  assignmentId: string;
  assignmentName: string;
  weekId: string;
  weekLabel: string;
  title: string;
  description: string;
  hours: number;
  status: string;
  createdAt: string;
}

export interface WeeklyHistoryItem {
  weekId: string;
  weekStartDate: string;
  weekEndDate: string;
  totalReportedHours: number;
  totalTasks: number;
  status: string;
}

export interface WeeklyHistoryDetail {
  weekId: string;
  weekStartDate: string;
  weekEndDate: string;
  totalReportedHours: number;
  tasks: UserTaskRecord[];
}

export interface WeekOption {
  id: string;
  label: string;
}