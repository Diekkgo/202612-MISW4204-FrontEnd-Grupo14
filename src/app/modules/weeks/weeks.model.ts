export interface Weeks {
  ID: string;
  PeriodID: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  IsClosed: boolean;
  IsLate: boolean;
  CreatedAt: string;
}

export interface Periods {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}