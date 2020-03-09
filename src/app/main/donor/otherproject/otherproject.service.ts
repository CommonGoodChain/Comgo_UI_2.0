import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class OtherprojectService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @description This function will return published projects
 */
getAllPublishedProjects(): Promise<any> {
  return new Promise((resolve, reject) => {
    
      this.httpClient.get(this.urlPort + '/api/projects/getAllPublishedProjects/'+sessionStorage.getItem('userType'), { withCredentials: true})
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
 * @description This function will return Published Projects of Organization
 */
getOrgPublishedProjects(searchCondition): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + '/api/projects/getOrgPublishedProjects/'+searchCondition, { withCredentials: true})
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
 * @description This function will return user details
 */
getUserDetails(body): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/getUserDetails", body,{ withCredentials: true})
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
 * @description This function will return All the SDG's
 */
getAllSDG(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/projects/getAllSDG", { withCredentials: true })
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
 * @param It contains project Id in JSON format
 * @description This function will return All the Donations to a Project.
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

}
