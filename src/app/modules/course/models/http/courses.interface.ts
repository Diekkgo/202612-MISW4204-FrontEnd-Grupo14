import { Course } from "../course.model";

export interface CourseReponse {
    courses: Course[];
    total: number;
}

// Temporal mientras se integra con los demás servicios

export interface AcademicPeriod {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

