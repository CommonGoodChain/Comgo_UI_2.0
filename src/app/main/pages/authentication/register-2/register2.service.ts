import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class Register2Service {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @param: countryBody- JSON  consist of sessionCheck
 * @description This function will return all the country names
 */
getCountryNames(countryBody): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/country/all", countryBody)
    .map(
      (response) => response.json()
  )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

 /**
 * @author Kuldeep
 * @param: countryCodesBody- JSON  consist of sessionCheck
 * @description This function will return all the country codes
 */
getCountryCodes(countryCodesBody): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/country/countryCodes", countryCodesBody)
    .map(
      (response) => response.json()
  )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @param: data- JSON  consist of user data
 * @description This function will register user
 */
register(data): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/register", data, { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
    .map(
      (response) => response.json()
  )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @description This function will return Current Location of the system.
 */
getCurrentLocation(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.get("https://ipinfo.io/")
          .pipe(map(Response => Response))

          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
