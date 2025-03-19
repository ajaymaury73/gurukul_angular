import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SoftwareAdminComponent } from './software-admin/software-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { UrlConstant } from './services/url-constant.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin/admin.component';
import { CommonPopupComponent } from './common-popup/common-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonNavbarComponent } from './common-navbar/common-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CollegeComponent } from './college/college.component';
import { StudentComponent } from './student/student.component';
import { FacultyComponent } from './faculty/faculty.component';
import { UserComponent } from './user/user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonFooterComponent } from './common-footer/common-footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CollegeAdminComponent } from './college-admin/college-admin.component';
import { AcademicCalendarComponent } from './academic-calendar/academic-calendar.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';






function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'gurukul_realm',
        clientId: 'gurukul_client',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecureComponent,
    HeaderComponent,
    SoftwareAdminComponent,
    AdminComponent,
    CommonPopupComponent,
    CommonNavbarComponent,
    CollegeComponent,
    StudentComponent,
    FacultyComponent,
    UserComponent,
    CommonFooterComponent,
    CollegeAdminComponent,
    AcademicCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSortModule,
    MatSnackBarModule




  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },DataService,UrlConstant
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
