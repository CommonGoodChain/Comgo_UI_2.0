import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PendingUsersService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpCLient: HttpClient,private http: Http) { }
  
  /**
 * @author Kuldeep
 * @description This function will return users which are not yet approved.
 */
getPendingUsers(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpCLient.get(this.urlPort + "/api/users/getAllUser/" + sessionStorage.getItem('userType') + "/pendingUser/noOrg", { withCredentials: true })
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
 * @description This function is used to approve or reject user.
 */
approveRejectUser(data): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpCLient.post(this.urlPort + "/api/users/approveUser", data, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
