import { Component, ViewChild, OnInit } from '@angular/core';
import { AcademicCalendar } from '../entity/academicCalendar';
import { DegreeType } from '../entity/degree';
import { UserService } from '../services/user.service';
import { Terms } from '../entity/terms';
import { AdminService } from '../services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppComponent } from '../app.component';
import { NotificationService } from '../services/notification.service';
import { CommonPopupComponent } from '../common-popup/common-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-academic-calendar',
  templateUrl: './academic-calendar.component.html',
  styleUrls: ['./academic-calendar.component.css']
})
export class AcademicCalendarComponent implements OnInit {
  degreeTypes = Object.values(DegreeType);
  academicCalendar: AcademicCalendar = new AcademicCalendar();
  degrees: string[] = [];
  isForm = false;
  isUpdate = false;

  displayedColumns: string[] = ['serialNumber', 'academicYear', 'degreeName', 'degreeType', 'terms', 'actions'];
  dataSource = new MatTableDataSource<AcademicCalendar>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private adminService: AdminService,
    private notificationService: NotificationService,private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getAllAcademicCalendar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Fetch all Academic Calendar records */
  getAllAcademicCalendar() {
    this.adminService.getAllAcademicCalender().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Custom filter for nested properties
        this.dataSource.filterPredicate = (data: AcademicCalendar, filter: string) => {
          const searchString = filter.trim().toLowerCase();
          return (
            data.academicYear.toLowerCase().includes(searchString) ||
            data.degree.degreeName.toLowerCase().includes(searchString) ||
            data.degree.degreeType.toLowerCase().includes(searchString)
          );
        };
      },
      error => {
        console.error('Error fetching academic calendar:', error);
      }
    );
  }

  /** Apply search filter */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Fetch courses based on selected Degree Type */
  onCourseTypeChange() {
    const courseTypes = Array.isArray(this.academicCalendar.degree.degreeType)
      ? this.academicCalendar.degree.degreeType
      : [this.academicCalendar.degree.degreeType];

    if (courseTypes.length) {
      this.userService.getCoursesByType(courseTypes).subscribe(
        (data: any) => {
          this.degrees = data;
        },
        error => console.error('Error fetching degrees:', error)
      );
    } else {
      this.degrees = [];
    }
  }

  /** Show form to create new Academic Calendar */
  createAcademicCalendar() {
    this.isForm = true;
    this.isUpdate = false;
    this.academicCalendar = new AcademicCalendar(); // Reset form
  }

  /** Add a new term */
  addTerm() {
    this.academicCalendar.degree.terms.push(new Terms());
  }

  /** Remove a term by index */
  removeTerm(index: number) {
    this.academicCalendar.degree.terms.splice(index, 1);
  }

  /** Save or update Academic Calendar */

  saveAcademic() {
    if (this.isUpdate) {
      if (!this.academicCalendar.id) {
        console.error("Academic Calendar ID is undefined!");
        return;
      }
  
      console.log("Data being sent for update:", this.academicCalendar); // Log data
  
      this.adminService.updateAcademic(this.academicCalendar.id, this.academicCalendar).subscribe({
        next: (response) => {
          this.notificationService.showSuccess("Academic Calendar updated successfully!");
          this.getAllAcademicCalendar();
          this.isForm = false;
        },
        error: (err) => {
          this.notificationService.showError("Failed to update Academic Calendar!");
        }
      });
    } else {
      console.log("Data being sent for save:", this.academicCalendar); // Log data
  
      this.adminService.saveAcademic(this.academicCalendar).subscribe({
        next: (response) => {
          this.notificationService.showSuccess("Academic Calendar saved successfully!");
          this.getAllAcademicCalendar();
          this.isForm = false;
        },
        error: (err) => {
          this.notificationService.showError("Failed to save Academic Calendar!");
        }
      });
    }
  }
  
  

  
  

  /** Edit Academic Calendar */
  editAcademicCalendar(academicCalendar: AcademicCalendar) {
    this.isForm = true;
    this.isUpdate = true;
   
    this.academicCalendar = { ...academicCalendar }; // Clone object for editing
    if (this.academicCalendar.degree.degreeType) {
      this.onCourseTypeChange(); // This should populate `degrees` based on degreeType
  }
  }

  /** Delete Academic Calendar */
  deleteAcademicCalendar(id: string) {
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this academic calendar?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteAcademic(id).subscribe({
          next: () => {
            this.getAllAcademicCalendar(); // Refresh UI
          },
          error: err => console.error("Delete failed:", err)
        });
      }
    });
  }

  /** Cancel form */
  onCancel() {
    this.isForm = false;
  }
}
