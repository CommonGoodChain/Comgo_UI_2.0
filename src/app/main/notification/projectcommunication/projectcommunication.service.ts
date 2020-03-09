import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectcommunicationService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @param: projectId- Project Id of a Project
 * @description This function will return Project Details
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

/**
 * @author Kuldeep
 * @param: dataForEmail- Notification Data
 * @description This function will send Notification to Donors.
 */
sendNotification(dataForEmail): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/projectcommunication/saveEmail", dataForEmail, { withCredentials: true })
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
 * @param: path- Path where file should upload
 * @param: purpose- Purpose of file upload
 * @param: fd- File to upload
 * @description This function is used to upload file.
 */
uploadFile(path,purpose,fd): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
    .map(
      (response) => response.json()
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
