import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyCloakService {
  private keycloakBaseUrl = 'http://localhost:9090/admin/realms/gurukul_realm';
  
  constructor(private http: HttpClient) {}

  // 🔹 1️⃣ Get User ID by Username
  getUserId(username: string, token: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`${this.keycloakBaseUrl}/users?username=${username}`, { headers });
  }

  // 🔹 2️⃣ Get User Roles by User ID
  getUserRoles(userId: string, token: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`${this.keycloakBaseUrl}/users/${userId}/role-mappings/realm`, { headers });
  }
}
