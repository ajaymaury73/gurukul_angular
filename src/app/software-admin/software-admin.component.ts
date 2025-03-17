import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../services/admin.service';
import { NavbarItem, RoleNavbar } from '../entity/navbar-role';

@Component({
  selector: 'app-software-admin',
  templateUrl: './software-admin.component.html',
  styleUrls: ['./software-admin.component.css']
})
export class SoftwareAdminComponent implements OnInit {


  constructor(private navbarService: AdminService) {}

  ngOnInit() {
  }

  
}
