import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { College } from '../entity/college';
import { AdminService } from '../services/admin.service';
import { Terms } from '../entity/terms';
import { NotificationService } from '../services/notification.service';
import { CourseEnrollement } from '../entity/courseEnrollement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../entity/course';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-course-enrollement',
  templateUrl: './course-enrollement.component.html',
  styleUrls: ['./course-enrollement.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourseEnrollementComponent {
  selectedAcademicYear = '';
  selectedDegreeType = '';
  selectedDegreeName = '';
  selectedDeptId = '';
  selectedTermName = '';
  selectedCollege = '';


  colleges: College[] = [];
  academicYears: string[] = [];
  degreeTypes: string[] = [];
  degreeNames: string[] = [];
  deptIds: string[] = [];
  termsNames: Terms[] = [];
  showPopup = false;
  showUploadPopup = false;
  selectedFile: File | null = null;

  displayedColumns: string[] = [
    'academicYear',
    'degreeType',
    'degreeName',
    'deptId',
    'termName',
    'collegeTenantId',
    'courses'
  ];
  
    dataSource = new MatTableDataSource<CourseEnrollement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient, private adminService: AdminService,private notificationService: NotificationService) {}

  ngOnInit() {
    this.getAllCollege();
    this.getAllCourses()
  }

  getAllCollege() {
    this.adminService.getCollege().subscribe(
      (data: any[]) => this.colleges = data
    );
  }

  onSelectCollegeGetAcademicYear(collegeTenantId: string) {
    this.resetSelections(['AcademicYear', 'DegreeType', 'DegreeName', 'DeptId', 'TermName']);
    
    if (!collegeTenantId) {
      console.warn("No college selected");
      return;
    }

    this.adminService.onSelectCollegeGetAcademicYear(collegeTenantId).subscribe(
      (data: any[]) => {
        this.academicYears = data.length > 0 ? data : [];
      },
      error => console.error("Error fetching academic years:", error)
    );
  }

  onSelectAcademicYearGetDegreeTypes() {
    this.resetSelections(['DegreeType', 'DegreeName', 'DeptId', 'TermName']);

    if (!this.selectedCollege || !this.selectedAcademicYear) return;

    this.adminService.getDegreeTypes(this.selectedCollege, this.selectedAcademicYear).subscribe(
      (data: any[]) => {
        this.degreeTypes = data.length > 0 ? data : [];
      },
      error => console.error("Error fetching degree types:", error)
    );
  }

  onSelectDegreeTypeGetDegrees() {
    this.resetSelections(['DegreeName', 'DeptId', 'TermName']);

    if (!this.selectedCollege || !this.selectedAcademicYear || !this.selectedDegreeType) return;

    this.adminService.getDegrees(this.selectedCollege, this.selectedAcademicYear, this.selectedDegreeType).subscribe(
      (data: any[]) => {
        this.degreeNames = data.length > 0 ? data : [];
      },
      error => console.error("Error fetching degrees:", error)
    );
  }

  onSelectDegreeGetDepartments() {
    this.resetSelections(['DeptId', 'TermName']);

    if (!this.selectedCollege || !this.selectedAcademicYear || !this.selectedDegreeType || !this.selectedDegreeName) return;

    this.adminService.getDepartments(this.selectedCollege, this.selectedAcademicYear, this.selectedDegreeType, this.selectedDegreeName).subscribe(
      (data: any[]) => {
        this.deptIds = data.length > 0 ? data : [];
      },
      error => console.error("Error fetching departments:", error)
    );
  }

  onSelectDepartmentGetTerms() {
    this.resetSelections(['TermName']);

    if (!this.selectedCollege || !this.selectedAcademicYear || !this.selectedDegreeType || !this.selectedDegreeName || !this.selectedDeptId) return;

    this.adminService.getTerms(this.selectedCollege, this.selectedAcademicYear, this.selectedDegreeType, this.selectedDegreeName, this.selectedDeptId).subscribe(
      (data: any[]) => {
        this.termsNames = data.length > 0 ? data : [];
      },
      error => console.error("Error fetching terms:", error)
    );
  }

  resetSelections(fields: string[]) {
    fields.forEach(field => {
      (this as any)[`selected${field}`] = '';
    });
  }
  downloadTemplate() {
    if (!this.selectedAcademicYear || !this.selectedDegreeName || !this.selectedTermName || !this.selectedCollege || !this.selectedDegreeType || !this.selectedDeptId) {
      alert('Please select all fields before downloading.');
      return;
    }

    this.adminService.downloadTemplate(
      this.selectedAcademicYear,
      this.selectedDegreeName,
      this.selectedTermName,
      this.selectedCollege,
      this.selectedDegreeType,
      this.selectedDeptId
    ).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Course_Template.xlsx';
      document.body.appendChild(a);
      a.click();
      this.showPopup=false;
      document.body.removeChild(a);
    }, error => {
      console.error('Error downloading template:', error);
      alert('Failed to download template.');
    });
  }
  



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Upload file to backend
  uploadFile() {
    if (!this.selectedFile) {
      this.notificationService.showError("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", this.selectedFile);
  
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
  
    this.http.post('http://localhost:8075/college-admin/upload-course-template', formData, { headers })
      .subscribe({
        next: (response: any) => {
          const successMessage = response?.entity || "File uploaded successfully!";
          this.notificationService.showSuccess(successMessage);
          this.showUploadPopup = false;
          this.selectedFile = null;
          this.getAllCourses();
        },
        error: (error) => {
          const errorMessage = error.error?.entity || "Error uploading file!";
          this.notificationService.showError(errorMessage);
        }
      });
  }
  
  togglePopup(action: string) {
    if (action === 'download') {
      this.showPopup = true;
      this.showUploadPopup = false;
    } else if (action === 'upload') {
      this.showUploadPopup = true;
      this.showPopup = false;
    } else if (action === 'close') {
      this.showPopup = false;
      this.showUploadPopup = false;
    }
  }
  

  // Reset the form
  resetForm() {
    this.selectedFile = null;
  }

  courseEnrollement:CourseEnrollement[]=[];
  getAllCourses(): void {
    this.adminService.getAllCourses().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}






  

