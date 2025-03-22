import { Component, ViewChild, OnInit } from '@angular/core';
import { AcademicCalendar } from '../entity/academicCalendar';
import { Degree, DegreeType } from '../entity/degree';
import { UserService } from '../services/user.service';
import { Terms } from '../entity/terms';
import { AdminService } from '../services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../services/notification.service';
import { CommonPopupComponent } from '../common-popup/common-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { College } from '../entity/college';
import { Department } from '../entity/department';

@Component({
  selector: 'app-academic-calendar',
  templateUrl: './academic-calendar.component.html',
  styleUrls: ['./academic-calendar.component.css']
})
export class AcademicCalendarComponent implements OnInit {
  degreeTypes = Object.values(DegreeType);
  academicCalendar: AcademicCalendar = new AcademicCalendar();
  degrees: string[] = [];
  departments: Department[] = [];
  isForm = false;
  isUpdate = false;
  selectedCollege: any;
  selectedDepartment: any;
  
  displayedColumns: string[] = ['serialNumber', 'academicYear', 'degreeName','deptId', 'terms', 'actions'];
  dataSource = new MatTableDataSource<AcademicCalendar>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private adminService: AdminService,
    private notificationService: NotificationService, private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllAcademicCalendar();
    this.getAllCollege();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAcademicCalendar() {
    this.adminService.getAllAcademicCalender().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.error('Error fetching academic calendar:', error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onCourseTypeChange() {
    console.log("is is called");
    if (!this.academicCalendar.collegeTenantId || !this.academicCalendar.degreeType) {
      this.degrees = [];
      return;
    }

    this.userService.getDegreeByDegreeType(this.academicCalendar.collegeTenantId, this.academicCalendar.degreeType)
      .subscribe(
        (data: any[]) => this.degrees = data,
        error => console.error('Error fetching degrees:', error)
      );
  }

  createAcademicCalendar() {
    this.isForm = true;
    this.isUpdate = false;
    this.academicCalendar = new AcademicCalendar();
  }

  addTerm() {
    if (!this.academicCalendar.terms) {
      this.academicCalendar.terms = [];
    }
    this.academicCalendar.terms.push(new Terms());
  }

  removeTerm(index: number) {
    if (this.academicCalendar.terms) {
      this.academicCalendar.terms.splice(index, 1);
    }
  }

  saveAcademic() {
    if (this.isUpdate) {
      this.adminService.updateAcademic(this.academicCalendar.id, this.academicCalendar).subscribe({
        next: (response:any) => {
          const successMessage = response?.entity || "Academic Calendar updated successfully!";
          this.notificationService.showSuccess(successMessage);
          this.getAllAcademicCalendar();
          this.isForm = false;
        },
        error: (error) => {
          const errorMessage = error.error?.entity || "Failed to update Academic Calendar!";
          this.notificationService.showError(errorMessage);
        }
      });
    } else {
      this.adminService.saveAcademic(this.academicCalendar).subscribe({
        next: (response:any) => {
          const successMessage = response?.entity || "Academic Calendar saved successfully!";
          this.notificationService.showSuccess(successMessage);
          this.getAllAcademicCalendar();
          this.isForm = false;
        },
        error: (error) => {
          const errorMessage = error.error?.entity || "Failed to save Academic Calendar!";
          this.notificationService.showError(errorMessage);
        }
      });
    }
  }
  
  

  editAcademicCalendar(academicCalendar: AcademicCalendar) {
    this.isForm = true;
    this.isUpdate = true;
    this.academicCalendar = { ...academicCalendar };
    if (this.academicCalendar.degreeType) {
      this.onCourseTypeChange();
    }
  }

  deleteAcademicCalendar(id: string) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this academic calendar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteAcademic(id).subscribe({
          next: () => this.getAllAcademicCalendar(),
          error: err => console.error("Delete failed:", err)
        });
      }
    });
  }

  onCancel() {
    this.isForm = false;
  }

  colleges: College[] = [];
  getAllCollege() {
    this.adminService.getCollege().subscribe(
      (data: any[]) => this.colleges = data
    );
  }

  onDegreeChange() {
    if (!this.academicCalendar.collegeTenantId || !this.academicCalendar.degreeType || !this.academicCalendar.degreeName) {
      this.departments = [];
      return;
    }

    this.adminService.getDepartmentsByDegree(
      this.academicCalendar.collegeTenantId,
      this.academicCalendar.degreeType,
      this.academicCalendar.degreeName
    ).subscribe(
      (data: any[]) => this.departments = data,
      error => console.error('Error fetching departments:', error)
    );
  }


}
