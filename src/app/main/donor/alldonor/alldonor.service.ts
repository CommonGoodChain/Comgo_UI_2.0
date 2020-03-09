import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlldonorService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

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

/**
 * @author Kuldeep
 * @description This function will return user details
 */
getUserDetails(body): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/users/getUserDetails", body,{ withCredentials: true})
    .map(
      (response) => response
      )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
