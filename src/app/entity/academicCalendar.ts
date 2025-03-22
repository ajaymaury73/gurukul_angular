import { Degree } from "./degree";
import { Terms } from "./terms";

export class AcademicCalendar{
    id!: string;
    academicYear!: string;
    degreeType!:string;
    degreeName!: string;
    deptId!: string;
    departmentName!: string;
    terms: Terms[] = [];
    collegeTenantId!:string;

}