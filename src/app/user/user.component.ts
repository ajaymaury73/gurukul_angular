import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private cdRef: ChangeDetectorRef) {

    this.user.roles = []; 
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllTenats();
  }

  ngAfterViewInit() {
 this.pagination();
  }

  pagination(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.service.getAllUser().subscribe((data: any) => {
      this.dataSource.data = data;
     this.pagination();
    });
  }
 
  tenants:[]=[];
  getAllTenats() {
    this.service.getAllTenats().subscribe((data: any) => {
     this.tenants=data;
    });
  }
  saveUser() {
    if (this.isUpdate) {
      this.service.updateUser(this.user.id!, this.user).subscribe({
        next: () => {
        
        },
        error: err => console.error("Update failed:", err)
      });
    } else {
      this.service.saveUser(this.user).subscribe({
        next: () => {
    
        },
        error: err => console.error("Save failed:", err)
      });

    }
    this.refreshUserList();
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
}
