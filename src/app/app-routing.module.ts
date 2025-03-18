import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { AuthGuard } from './AuthGuard/auth.gaurd';
import { SoftwareAdminComponent } from './software-admin/software-admin.component';
import { AdminComponent } from './admin/admin.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CollegeComponent } from './college/college.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['ADMIN'] } 
  },
  { 
    path: 'faculty', 
    component: FacultyComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['TEACHER'] } 
  },
  { 
    path: 'college', 
    component: CollegeComponent, 
  },
  { 
    path: 'user', 
    component: UserComponent, 
  },
  { 
    path: 'secure', 
    component: SecureComponent, 
    canActivate: [AuthGuard] 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
