import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MydonationsService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

  /**
 * @author Kuldeep
 * @description This function will return user donations to the projects
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
 * @description This function will return project Details
 */
getProjectDetails(projectId): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + projectId, { withCredentials: true })
    .map(
      (response) => response
      )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
