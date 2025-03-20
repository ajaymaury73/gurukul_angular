import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-enrollement',
  templateUrl: './course-enrollement.component.html',
  styleUrls: ['./course-enrollement.component.css']
})
export class CourseEnrollementComponent {
  academicYears = ['2023-24', '2024-25', '2025-26'];
  degrees = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'];
  terms = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  selectedAcademicYear = '';
  selectedDegree = '';
  selectedTerm = '';
  showForm = false;


  constructor(private http: HttpClient) {}

  downloadTemplate() {
    if (!this.selectedAcademicYear || !this.selectedDegree || !this.selectedTerm) {
      alert('Please select all fields before downloading.');
      return;
    }

    const apiUrl = `http://localhost:8075/college-admin/template?academicYear=${this.selectedAcademicYear}&degreeName=${this.selectedDegree}&semester=${this.selectedTerm}`;
    
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

  toggleForm() {
    this.showForm = !this.showForm; // Toggle form visibility
  }
}
