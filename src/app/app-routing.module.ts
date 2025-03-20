import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { AuthGuard } from './AuthGuard/auth.gaurd';
import { AdminComponent } from './admin/admin.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CollegeComponent } from './college/college.component';
import { UserComponent } from './user/user.component';
import { CollegeAdminComponent } from './college-admin/college-admin.component';
import { CourseEnrollementComponent } from './course-enrollement/course-enrollement.component';
import { Degree } from './entity/degree';
import { DegreeComponent } from './degree/degree.component';
import { AcademicCalendarComponent } from './academic-calendar/academic-calendar.component';



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
    path: 'college_admin', 
    component: CollegeAdminComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['COLLEGE_ADMIN'] } 
  },
  { 
    path: 'college', 
    component: CollegeComponent, 
  },
  { 
    path: 'course-enrollement', 
    component: CourseEnrollementComponent, 
  },
  { 
    path: 'user', 
    component: UserComponent, 
  },
  { 
    path: 'degree', 
    component: DegreeComponent, 
  },
  { 
    path: 'academic-calendar', 
    component: AcademicCalendarComponent, 
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
