import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConstant {
  constructor() {}

  public readonly SERVER_PORT = 'http://localhost:8075/';
}