import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DegreeType } from '../entity/degree';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = new User();
  roles = Object.values(Role);
  isUpdate = false;
  isShowForm = false;

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'mobileNumber', 'roles', 'actions'];
  degreeTypes = Object.values(DegreeType);
  courses: string[] = []; // Holds courses based on selected courseType

  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Role = Role;

  tenants: [] = [];

  constructor(private service: UserService, private cdRef: ChangeDetectorRef,public notificationService:NotificationService) {
    this.user.roles = [];
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllTenats();
  }

  ngAfterViewInit() {
    this.pagination();
  }

  pagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.service.getAllUser().subscribe((data: any) => {
      this.dataSource.data = data;
      this.pagination();
    });
  }

  getAllTenats() {
    this.service.getAllTenats().subscribe((data: any) => {
      this.tenants = data;
    });
  }

  saveUser() {
    if (this.isUpdate) {
      if (!this.user.id) {
        console.error("User ID is undefined!");
        return;
      }
  
      console.log("Data being sent for update:", this.user); // Log data
  
      this.service.updateUser(this.user.id, this.user).subscribe({
        next: (response) => {
          console.log("Update successful", response);
          this.notificationService.showSuccess("User updated successfully!");
          this.refreshUserList();
        },
        error: (err) => {
          console.error("Update failed:", err);
          console.error("Error details:", err.message, err.status, err.error); // Log more details
          this.notificationService.showError("Failed to update User!");
        }
      });
    } else {
      console.log("Data being sent for save:", this.user); // Log data
  
      this.service.saveUser(this.user).subscribe({
        next: (response) => {
          console.log("Save successful", response);
          this.notificationService.showSuccess("User saved successfully!");
          this.refreshUserList();
        },
        error: (err) => {
          console.error("Save failed:", err);
          console.error("Error details:", err.message, err.status, err.error); // Log more details
          this.notificationService.showError("Failed to save User!");
        }
      });
    }
  }
  

  refreshUserList() {
    this.getAllUsers();
    this.onReset();
    this.isShowForm = false;
    this.isUpdate = false;
  }

  addUser() {
    this.isShowForm = true;
    this.isUpdate = false;
    this.onReset();
  }

  onReset() {
    if (this.isUpdate) {
      const originalUser = this.dataSource.data.find(u => u.id === this.user.id);
      if (originalUser) {
        this.user = { ...originalUser };
      }
    } else {
      this.user = new User();
    }
  }

  onCancel() {
    this.isShowForm = false;
    this.onReset();
  }

  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  editUser(user: User) {
    this.user = { ...user };
    this.isUpdate = true;
    this.isShowForm = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


onCourseTypeChange() {
  const courseTypes = Array.isArray(this.user.degreeType) ? this.user.degreeType : [this.user.degreeType];

  if (courseTypes.length) {
    this.service.getCoursesByType(courseTypes).subscribe((data: any) => {
        this.courses = data;
      },
    );
  } else {
    this.courses = []; 
  }
}

}
