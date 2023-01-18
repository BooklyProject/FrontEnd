import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  url: string = 'https://localhost:8080';
}
