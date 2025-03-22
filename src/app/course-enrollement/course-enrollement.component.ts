import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { College } from '../entity/college';
import { AdminService } from '../services/admin.service';
import { Terms } from '../entity/terms';

@Component({
  selector: 'app-course-enrollement',
  templateUrl: './course-enrollement.component.html',
  styleUrls: ['./course-enrollement.component.css']
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
  constructor(private http: HttpClient, private adminService: AdminService) {}

  ngOnInit() {
    this.getAllCollege();
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
  
    const apiUrl = `http://localhost:8075/college-admin/template?academicYear=${this.selectedAcademicYear}&degreeName=${this.selectedDegreeName}&semester=${this.selectedTermName}&college=${this.selectedCollege}&degreeType=${this.selectedDegreeType}&department=${this.selectedDeptId}`;
  
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Course_Template.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Error downloading template:', error);
      alert('Failed to download template.');
    });
  }
  

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}
