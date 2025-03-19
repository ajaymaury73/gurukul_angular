import { Terms } from "./terms";

export class Degree {
    degreeName!: string;
    degreeType!:string;
    terms:Terms[]=[];
  
  
  }

  export enum DegreeType {
    INTERMEDIATE_COURSE = 'INTERMEDIATE_COURSE',
    DEGREE_COURSE = 'DEGREE_COURSE',
    PG='PG'
  }
  
  