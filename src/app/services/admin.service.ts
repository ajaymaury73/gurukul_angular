import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleNavbar } from '../entity/navbar-role';
import { UrlConstant } from './url-constant.service';
import { DataService } from './data.service';
import { College } from '../entity/college';
import { AcademicCalendar } from '../entity/academicCalendar';
import { Degree } from '../entity/degree';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private dataService: DataService, private urlConstant: UrlConstant,private http: HttpClient) {
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

saveAcademic(academicCalendar:AcademicCalendar){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + 'college-admin/create-academic-calendar', JSON.stringify(academicCalendar));
}

getAllAcademicCalender() {
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'college-admin/get-academic-calendar');
}

updateAcademic(id: string, academicCalendar: AcademicCalendar) {
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + `college-admin/update-academic-calendar?`+params, JSON.stringify(academicCalendar));
}

/** Delete an Academic Calendar */
deleteAcademic(id: string) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();

  params.set('id', id);

  return this.dataService.getObjects(url + `college-admin/delete-academic-calendar?`+ params);
}

getAllDegree() {
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'college-admin/get-all-degree');
}

saveOrUpdate(degree:Degree){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + 'college-admin/save-update-degree', JSON.stringify(degree));
}

updateDegree(id: string, degree: Degree) {
  const params: URLSearchParams = new URLSearchParams();
  params.set('id', id);
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.addObject(url + `college-admin/update-degree?`+params, JSON.stringify(degree));
}

deleteDegree(id: string,collegeTenantId:string) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();

  params.set('id', id);
  params.set('collegeTenantId', collegeTenantId);

  return this.dataService.getObjects(url + `college-admin/delete-degree?`+ params);
}

getDepartmentsByDegree(collegeTenantId: string, courseType: string, degreeName: string) {
  const url = `${this.urlConstant.SERVER_PORT}college-admin/get-departments`;
  const params: URLSearchParams = new URLSearchParams();

  params.append('collegeTenantId', collegeTenantId);
  params.append('courseType', courseType);
  params.append('degreeName', degreeName);

  return this.dataService.getObjects(`${url}?${params.toString()}`);
}

onSelectCollegeGetAcademicYear(collegeTenantId:string){
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('collegeTenantId', collegeTenantId);
  return this.dataService.getObjects(url + `college-admin/get-academicYear?`+ params);

}
getDegreeTypes(collegeTenantId:string,academicYear:string){
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('collegeTenantId', collegeTenantId);
  params.set('academicYear', academicYear);

  return this.dataService.getObjects(url + `college-admin/get-degreeType?`+ params);
}

getDegrees(collegeTenantId: string, academicYear: string, degreeType: string) {
  const url = `${this.urlConstant.SERVER_PORT}`;
  const params: URLSearchParams = new URLSearchParams();
  params.set('collegeTenantId', collegeTenantId);
  params.set('academicYear', academicYear);
  params.set('degreeType', degreeType);
  return this.dataService.getObjects(url + `college-admin/get-degrees?` + params);
}

getDepartments(collegeTenantId: string, academicYear: string, degreeType: string, degreeName: string) {
  const url = `${this.urlConstant.SERVER_PORT}`

  const params: URLSearchParams = new URLSearchParams();
  params.set('collegeTenantId', collegeTenantId);
  params.set('academicYear', academicYear);
  params.set('degreeType', degreeType);
  params.set('degreeName', degreeName);
  return this.dataService.getObjects(url + `college-admin/get-departementIds?` + params);
}

getTerms(collegeTenantId: string, academicYear: string, degreeType: string, degreeName: string, deptId: string) {
  const url = `${this.urlConstant.SERVER_PORT}`
  const params: URLSearchParams = new URLSearchParams();
  params.set('collegeTenantId', collegeTenantId);
  params.set('academicYear', academicYear);
  params.set('degreeType', degreeType);
  params.set('degreeName', degreeName);
  params.set('deptId', deptId);
  return this.dataService.getObjects(url+ `college-admin/get-terms?` + params);
}
downloadTemplate(
  academicYear: string, 
  degreeName: string, 
  semester: string, 
  college: string, 
  degreeType: string, 
  department: string
): Observable<Blob> {
  const url = `${this.urlConstant.SERVER_PORT}`


  const apiUrl = `${url}college-admin/template?academicYear=${academicYear}&degreeName=${degreeName}&semester=${semester}&college=${college}&degreeType=${degreeType}&department=${department}`;
  
  return this.http.get(apiUrl, { responseType: 'blob' });
}

getAllCourses(){
  const url = `${this.urlConstant.SERVER_PORT}`;
  return this.dataService.getObjects(url + 'college-admin/get-courses');
}



}