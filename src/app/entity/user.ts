import { Role } from './role';

export class User {
  id?: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  roles!: Role[];
  rollNumber!:string;
  email!: string;
  password?: string;
  mobileNumber!: string;
  fatherName!: string;
  motherName!: string;
  fatherMobileNumber!: string;
  dob!: Date;
  joiningDate!: Date;
  department!: string;
  gender!:string;
  collegeTenantId!:string;
  degreeType!:string;
  degreeName!:string;
}
