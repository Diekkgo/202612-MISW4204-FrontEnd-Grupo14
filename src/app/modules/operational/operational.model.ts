export interface UserParticipation {
  course_name: string;
  course_type: 'COURSE' | 'PROJECT';
  professor: string;
  start_date: string;
  end_date: string;
  status: string;
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