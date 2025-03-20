import { Component, ViewChild } from '@angular/core';
import { Degree, DegreeType } from '../entity/degree';
import { College } from '../entity/college';
import { AdminService } from '../services/admin.service';
import { Department } from '../entity/department';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent {
  isForm = false;
  degree: Degree = new Degree();
  degrees: Degree[] = [];
  colleges: College[] = [];

  degreeTypes = Object.values(DegreeType);
  selectedCollege: any;
  isUpdate = false;
  displayedColumns: string[] = ['id', 'degreeName', 'degreeType', 'departments', 'collegeTenantId', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(); // Initialize dataSource properly


  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllDegrees();
    this.getAllCollege();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }
  

  getAllDegrees() {
    this.adminService.getAllDegree().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  getAllCollege() {
    this.adminService.getCollege().subscribe(data => {
      this.colleges = data as College[];
    });
  }

  resetForm() {
    if (this.isUpdate) {
      // Restore original degree data from the list
      const originalDegree = this.dataSource.data.find(d => d.id === this.degree.id);
      if (originalDegree) {
        this.degree = { ...originalDegree };
        this.selectedCollege = originalDegree.collegeTenantId;
      }
    } else {
      // Clear form fields but keep it open
      this.degree = new Degree();
      this.selectedCollege = null;
    }
  }
  
  
  createDegree() {
    this.isForm = true;
    this.isUpdate = false;
    this.degree = new Degree();
    this.selectedCollege = null; 
  }
  
  editDegree(degree: Degree) {
    this.isForm = true;
    this.isUpdate = true;
    this.degree = { ...degree };
    this.selectedCollege = degree.collegeTenantId;
  }

  deleteDegree(degreeId: string,collegeTenantId:string) {
    if (confirm("Are you sure you want to delete this degree?")) {
      this.adminService.deleteDegree(degreeId,collegeTenantId).subscribe({
        next: () => {
          this.notificationService.showSuccess("Degree deleted successfully!");
          this.getAllDegrees();
        },
        error: () => {
          this.notificationService.showError("Failed to delete degree!");
        }
      });
    }
  }

  saveOrUpdateDegree() {
    if (!this.selectedCollege) {
      this.notificationService.showError("Please select a college!");
      return;
    }
  
    this.degree.collegeTenantId = this.selectedCollege;
  
    this.adminService.saveOrUpdate(this.degree).subscribe({
      next: () => {
        this.notificationService.showSuccess(this.isUpdate ? "Degree updated successfully!" : "Degree saved successfully!");
        this.getAllDegrees();
        this.resetForm();
       
      },
      error: () => {
        this.notificationService.showError(this.isUpdate ? "Failed to update degree!" : "Failed to save degree!");
      }
    });
  }

  addDepartment() {
    this.degree.departments.push(new Department());
  }

  removeDepartment(index: number) {
    this.degree.departments.splice(index, 1);
  }
  
  cancelForm() {
    this.isForm = false;
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}








}
