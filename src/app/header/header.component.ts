import { Component } from '@angular/core';
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
  http: any;
  userRoles: string[] = [];


  constructor(private keycloakService: KeycloakService, private adminService: AdminService) {
    this.loadUserDetails();
    //  this.loadUserRoles();
  }
  
  ngOnInit(){
  
  }
  
  async loadUserDetails() {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();
  
    if (this.isAuthenticated) {
      try {
        this.userProfile = await this.keycloakService.loadUserProfile();
        console.log("User Profile:", this.userProfile);
  
        const keycloakInstance = this.keycloakService.getKeycloakInstance();
        const decodedToken: any = keycloakInstance.tokenParsed;
  
        // Fetch Client Roles
        const clientId = 'gurukul_client';
        let clientRoles = decodedToken?.resource_access?.[clientId]?.roles || [];
  
        // Fetch Realm Roles
        let realmRoles = decodedToken?.realm_access?.roles || [];
  
        // Combine both roles
        this.userRoles = [...clientRoles, ...realmRoles];
  
        console.log(`All Roles for ${clientId}:`, this.userRoles);
  
        // Check if the user has a specific role (e.g., 'admin')
        const specificRole = "ADMIN"; // Change this to the role you want to check
        if (this.userRoles.includes(specificRole)) {
          console.log(`User has the role: ${specificRole}`);
        } else {
          console.log(`User does NOT have the role: ${specificRole}`);
        }
  
      } catch (error) {
        console.error("Error loading user profile", error);
      }
    }
  }
  
  

  

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

 
  
  
}
