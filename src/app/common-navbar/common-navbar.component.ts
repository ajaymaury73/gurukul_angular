import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css']
})
export class CommonNavbarComponent {

  constructor(private router: Router) {}

  manageUser() {
    this.router.navigate(['/user']); 
  }
  manageCollege(){
    this.router.navigate(['/college']); 
      
  }

}
