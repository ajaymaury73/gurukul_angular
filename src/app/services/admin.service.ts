import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleNavbar } from '../entity/navbar-role';
import { UrlConstant } from './url-constant.service';
import { DataService } from './data.service';
import { College } from '../entity/college';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private dataService: DataService, private urlConstant: UrlConstant) {
  }

 

  saveNavbar(navbarConfig: RoleNavbar){
    const url = `${this.urlConstant.SERVER_PORT}`;
    return this.dataService.addObject(url + 'software-admin/add-navbar', JSON.stringify(navbarConfig));

  }

  getAllNavbars() {
    const url = `${this.urlConstant.SERVER_PORT}`;
    return this.dataService.getObjects(url + 'software-admin/get-navbar');
}
saveCollege(college:College){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + 'admin/add-college', JSON.stringify(college));
}

getCollege() {
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'admin/get-college');
}


deleteCollege(id: string) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);

  return this.dataService.getObjects(url + 'admin/delete-college?' + params);
}

updateCollege(id: string, colege: College) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);
  return this.dataService.addObject(url + 'admin/update-college?' + params, JSON.stringify(colege));
}

}