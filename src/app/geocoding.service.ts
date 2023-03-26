import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeocoderResponse } from './model/geocoder-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  googleApiKey: string = 'INSERT HERE YOUR API KEY';

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${this.googleApiKey}`;
    return this.http.get<GeocoderResponse>(url);
  }

  constructor(private http: HttpClient) { }
}
