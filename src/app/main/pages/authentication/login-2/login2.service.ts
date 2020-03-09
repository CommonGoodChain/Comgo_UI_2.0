import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class Login2Service {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @param: data- JSON  consist of projectId
 * @description This function will return Donations of a project
 */
getAllDonorListDB(data): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @param: body- JSON  consist of username
 * @description This function will return User Details
 */
getUserDetails(body): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/getUserDetails", body, { withCredentials: true })
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
 * @param: data- JSON  consist of projectId
 * @description This function will return Project Details
 */
getProjectDetails(BKCAllByParamsData): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/projects/BKCGetAllDetailsByParamsWeb", BKCAllByParamsData, { withCredentials: true })
          .pipe(map(Response => Response))

          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @param: data- JSON  consist of username and password
 * @description This function is used to authenticate user
 */
authenticate(data): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/authenticate", data, { withCredentials: true })
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
