export interface GenerateReportsRequest {
  week_id: string;
}

export interface ReportSummary {
  report_id: string;
  assignment_id: string;
  user_name: string;
  week_id: string;
  total_hours: number;
  file_url: string;
  generated_at: string;
}

export interface GenerateReportsResponse {
  week_id: string;
  total_generated: number;
  reports: ReportSummary[];
}

export interface ListReportsResponse {
  reports: ReportSummary[];
}

export interface ReportFileResponse {
  report_id: string;
  file_url: string;
}
