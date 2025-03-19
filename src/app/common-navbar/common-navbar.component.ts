import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css']
})
export class CommonNavbarComponent {
  roles: string[] = [];

  constructor(private router: Router, private keycloakService: KeycloakService) {
    this.loadUserRoles();
  }

  async loadUserRoles() {
    if (await this.keycloakService.isLoggedIn()) {
      const userRoles = this.keycloakService.getUserRoles();
      this.roles = userRoles;
    }
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  manageUser() {
    this.router.navigate(['/user']);
  }

  manageCollege() {
    this.router.navigate(['/college']);
  }
}
