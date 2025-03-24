import { Course } from "./course";

export class CourseEnrollement{
    id!: string;
    academicYear!: string;
    degreeType!: string;
    degreeName!: string;
    deptId!: string;
    departmentName!: string;
    termNumber!: string;
    termName!: string;
    courses!: Course[];
    collegeTenantId!: string;
    expanded?: boolean;
}