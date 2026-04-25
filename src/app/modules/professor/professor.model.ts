export interface Student {
  UserID: string;
  Name: string;
  Email: string;
  Role: string;
}

export interface Course {
  ID: string;
  Name: string;
  Type: string;
  ProfessorID: string;
  PeriodID: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  Observations: string;
  CreatedAt: string;
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
  Name: string;
  assignmentId: string;
  CourseName: string;
  ContractedHours: number;
  ReportedHours: number;
  DifferenceHours: number;
  status: 'NO_REPORT' | 'INCOMPLETE' | 'COMPLETE' | 'EXCEEDED';
}

export interface WeekOption {
  id: string;
  label: string;
}