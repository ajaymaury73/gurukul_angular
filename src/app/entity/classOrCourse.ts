export class ClassOrCourse {
    classOrCourseId!: string;
    name!: string;
    courseType!: CourseType;
  
  
  }

  export enum CourseType {
    INTERMEDIATE_COURSE = 'INTERMEDIATE_COURSE',
    DEGREE_COURSE = 'DEGREE_COURSE',
    PG='PG'
  }
  
  