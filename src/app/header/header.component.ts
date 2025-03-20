import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AdminService } from '../services/admin.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  userProfile: KeycloakProfile | null = null;
  userRoles: string[] = [];

  constructor(private keycloakService: KeycloakService, private adminService: AdminService, private router: Router) {
    this.loadUserDetails();
  }

  async loadUserDetails() {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    if (this.isAuthenticated) {
      try {
        this.userProfile = await this.keycloakService.loadUserProfile();
        const keycloakInstance = this.keycloakService.getKeycloakInstance();
        const decodedToken: any = keycloakInstance.tokenParsed;

        // Fetch client-specific roles
        const clientId = 'gurukul_client'; // Update with your actual Keycloak client ID
        let clientRoles = decodedToken?.resource_access?.[clientId]?.roles || [];

        // Fetch realm roles
        let realmRoles = decodedToken?.realm_access?.roles || [];

        // Combine roles
        this.userRoles = [...clientRoles, ...realmRoles];

        console.log("User Roles:", this.userRoles);

        // Redirect based on role
        this.redirectUser();
      } catch (error) {
        console.error("Error loading user profile", error);
      }
    }
  }

  redirectUser() {
    if (this.userRoles.includes('ADMIN')) {
      this.router.navigate(['/admin']);
    } else if (this.userRoles.includes('TEACHER')) {
      this.router.navigate(['/faculty']);
    } else if (this.userRoles.includes('COLLEGE')) {
      this.router.navigate(['/college']);
    } else if (this.userRoles.includes('COLLEGE_ADMIN')) {
      this.router.navigate(['/college_admin']);
    }
       else {
      this.router.navigate(['/']); // Default fallback
    }
  }

  login() {
    this.keycloakService.login().then(() => {
      this.loadUserDetails(); // Reload details and redirect after login
    });
  }

  logout() {
    this.keycloakService.logout();
  }

  themes = [
    { bgColor: 'rgb(255, 255, 255)', textColor: 'black' },
    { bgColor: 'rgb(136, 214, 26)', textColor: 'black' },   // Green
    { bgColor: 'rgb(52, 152, 219)', textColor: 'white' },   // Blue
    { bgColor: 'rgb(231, 76, 60)', textColor: 'white' },    // Red
    { bgColor: 'rgb(231, 153, 255)', textColor: 'black' }   // Yellow
  ];

  currentThemeIndex = 0;
  currentTheme = this.themes[this.currentThemeIndex]; // Default theme

  changeTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    this.currentTheme = this.themes[this.currentThemeIndex]; // Update theme
  }
}
