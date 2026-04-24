export type AssignmentRoleType = 'MONITOR' | 'ASSISTANT';

export interface CreateAssignmentRequest {
  userId: string;
  courseId: string;
  roleType: AssignmentRoleType;
  contractedHours: number;
}

export interface AssignmentResponse {
  id: string;
  userId: string;
  courseId: string;
  roleType: AssignmentRoleType;
  contractedHours: number;
}