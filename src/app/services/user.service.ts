import { Injectable } from '@angular/core';
import { UrlConstant } from './url-constant.service';
import { DataService } from './data.service';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private dataService: DataService, private urlConstant: UrlConstant) {
  }

 

saveUser(user:User){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + 'user/add-user', JSON.stringify(user));
}

getAllUser() {
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'user/get-users');
}


deleteUser(id: string) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);

  return this.dataService.getObjects(url + 'user/delete-user?' + params);
}

updateUser(id: string, user: User) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);
  return this.dataService.addObject(url + 'user/update-user?' + params, JSON.stringify(user));
}

getAllTenats(){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'user/get-tenantId');
}

getCoursesByType(courseTypes: string[]) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();

  courseTypes.forEach(type => params.append('courseType', type));

  return this.dataService.getObjects(`${url}user/get-courses?${params.toString()}`);
}

}