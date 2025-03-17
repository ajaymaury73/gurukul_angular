import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { College } from '../entity/college';
import { CommonPopupComponent } from '../common-popup/common-popup.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

 college:College=new College();

constructor(private service: AdminService,private dialog: MatDialog, ){

}

}
