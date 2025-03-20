import { Department } from "./department";
import { Terms } from "./terms";

export class Degree {
    id!:string;
    degreeName!: string;
    degreeType!:string;
    terms:Terms[]=[];
    departments:Department[]=[];
    collegeTenantId!:string;
  
  
  }

  export enum DegreeType {
    INTERMEDIATE_COURSE = 'INTERMEDIATE_COURSE',
    DEGREE_COURSE = 'DEGREE_COURSE',
    PG='PG'
  }
  
  