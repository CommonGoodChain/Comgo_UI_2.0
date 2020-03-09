import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ViewProofService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

/**
 * @author Kuldeep
 * @description This function will return Document Type of Proof.
 */
getDocType(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/proofs/getDocType", { withCredentials: true })
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
 * @param activityId Activity Id of a Activity
 * @param projectId Project Id of a Project
 * @description This function will return all the Submitted Proof.
 */
getAllProofs(activityId,projectId): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/proofs/all/" + activityId + '/' + projectId, { withCredentials: true })
    .map(
      (response) => response
  )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
