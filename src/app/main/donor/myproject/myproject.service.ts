import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MyprojectService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

  /**
 * @author Kuldeep
 * @description This function will return user donations
 */
getMyDonations(userdata): Promise<any> {
  return new Promise((resolve, reject) => {
    this.httpClient.post(this.urlPort + "/api/alldonor/getMyDonations", userdata, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((res: any[]) => {
              resolve(res);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @description This function will return Published Projects to organization user
 */
getMyProjects(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.httpClient.get(this.urlPort + '/api/projects/getMyProjects/'+sessionStorage.getItem('userType'), { withCredentials: true})
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
