import { ClassOrCourse } from "./classOrCourse";

export class College {
    id!: string;
    collegeName!: string;
    collegeLogo!: string;
    address!: string;
    pincode!: number;
    mobileNumber!: number;
    email!: string;
    collegeTenantId!: string;
    principalName!: string;
    tagline!: string;
    accreditation!: string;
    accreditationStatus!: string;
    universityName!: string;
    establishedYear!: number;
    totalCourses!: number;
    totalFaculties!: number;
    websiteUrl!: string;
    collegeType!: string;
    collegeRanking!: string;
    campusSize!: number;
    hostelAvailable!: boolean;
    totalStudents!: number;
    departments!: string[];
    socialMediaLinks!: { [key: string]: string }; 
    libraryInfo!: string;
    eventCalendar!: string[];
    annualBudget!: number;
    alumniAssociationActive!: boolean;
    safetyFeatures!: string;
    recognizedByGovernment!: boolean;
    scholarshipsOffered!: string[];
    classOrCourse:ClassOrCourse[]=[];
}
