export interface SupervisedPerson {
  userId: string;
  name: string;
  email: string;
  role: 'MONITOR' | 'ASISTENTE_GRADUADO';
  assignmentsCount: number;
  activeAssignments: number;
}

export interface AssignmentView {
  assignmentId: string;
  type: 'COURSE' | 'PROJECT';
  name: string;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface WeeklyTaskView {
  taskId: string;
  assignmentId: string;
  assignmentName: string;
  title: string;
  description: string;
  hours: number;
  status: string;
}

export interface WeeklyDetail {
  userId: string;
  name: string;
  weekStartDate: string;
  weekEndDate: string;
  tasks: WeeklyTaskView[];
  totalReportedHours: number;
}

export interface AssignmentSummaryItem {
  assignmentId: string;
  assignmentName: string;
  reportedHours: number;
  expectedHours: number;
}

export interface PersonSummary {
  userId: string;
  name: string;
  weeksReported: number;
  totalReportedHours: number;
  totalExpectedHours: number;
  differenceHours: number;
  compliancePercentage: number;
  byAssignment: AssignmentSummaryItem[];
}

export interface ProfessorTaskView {
  taskId: string;
  userName: string;
  assignmentName: string;
  weekStart: string;
  weekEnd: string;
  title: string;
  hours: number;
  status: string;
}

export interface ReportedVsContracted {
  userId: string;
  userName: string;
  assignmentId: string;
  assignmentName: string;
  contractedHours: number;
  reportedHours: number;
  differenceHours: number;
  status: 'NO_REPORT' | 'INCOMPLETE' | 'COMPLETE' | 'EXCEEDED';
}

export interface WeekOption {
  id: string;
  label: string;
}