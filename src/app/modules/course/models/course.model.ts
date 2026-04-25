export class Course {
    id?: string;
    name: string;
    type: string;
    professor_id?: string;
    period_id: string;
    start_date: string;
    end_date: string;
    status?: string;
    observations: string;
    created_at?: string;

    constructor(name: string, type: string, period_id: string, start_date: string, end_date: string, observations: string){
        this.name = name;
        this.type = type;
        this.period_id = period_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.observations = observations;
    }
}