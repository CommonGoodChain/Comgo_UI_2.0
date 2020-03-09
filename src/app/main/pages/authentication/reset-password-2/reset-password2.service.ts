import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ResetPassword2Service {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @param: body- JSON  consist of projectId
 * @description This function will check user old password
 */
checkPassword(body): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/checkPassword", body)
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
 * @param: body- JSON  consist of username, password, latitude, longitude, ip.
 * @description This function will change password
 */
changePassword(body): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/changePassword", body)
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
 * @description This function will check session
 */
getSessionData(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.get(this.urlPort + "/api/session/name", { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
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
