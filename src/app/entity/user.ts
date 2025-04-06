import { Role } from "./role";

export class User {
  id!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string; // Store BCrypt hashed password
  userProfileImage!: Uint8Array;
  userImageType!: string;
  section!: string;
  rollNumber!: string;
  employeeId!: string;
  applicationNumber!: string;
  gender!: string;
  yearDetails!: YearDetails[];
  bloodGroup!: string;
  roles!: Role[];
  userAddressDetails!: UserAddress[];
  qualificationDetails!: UserQualification[];
  userDocuments!: UserDocument[];
  mobileNumber!: string;
  fatherName!: string;
  fatherMobileNumber!: string;
  motherName!: string;
  dob!: Date;
  joiningDate!: Date;
  collegeTenantId!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  
}


export class YearDetails {
  id!: string;
  academicYear!: string;
  currentYear!: number;
  degreeYear!: number;
  deptId!: string;
  termNumber!: number;
  termName!: string;
  termType!: string;
  section!: string;
  degreeBatch!: string;
  scheme!: string;
  rollNumber!: string;

  constructor(init?: Partial<YearDetails>) {
      Object.assign(this, init);
  }
}

export class UserAddress {
  type!: string;
  street!: string;
  city!: string;
  state!: string;
  country!: string;
  pinCode!: string;

  constructor(init?: Partial<UserAddress>) {
      Object.assign(this, init);
  }
}

export class UserDocument {
  id!: string;
  documentName!: string;
  documentNumber!: string;
  fileData!: Uint8Array; 
  fileType!: string;

  constructor(init?: Partial<UserDocument>) {
      Object.assign(this, init);
  }
}

export class UserQualification {
  qualificationLevel!: string;
  boardOrUniversity!: string;
  maxMarks!: number;
  obtainedMarks!: number;
  percentage!: number;
  cgpa!: number;

  constructor(init?: Partial<UserQualification>) {
      Object.assign(this, init);
      this.calculatePercentageAndCGPA();
  }

  public calculatePercentageAndCGPA(): void {
      if (this.maxMarks > 0) {
          this.percentage = (this.obtainedMarks * 100.0) / this.maxMarks;
          this.cgpa = this.percentage / 9.5; // Approximate CGPA formula
      }
  }

  setMaxMarks(maxMarks: number): void {
      this.maxMarks = maxMarks;
      this.calculatePercentageAndCGPA();
  }

  setObtainedMarks(obtainedMarks: number): void {
      this.obtainedMarks = obtainedMarks;
      this.calculatePercentageAndCGPA();
  }
}


