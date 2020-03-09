import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassword3Service {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private http: Http) { }

  /**
 * @author Kuldeep
 * @param: userdata- JSON  consist of username and new password.
 * @description This function will change user password.
 */
forgotPassword(userdata): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/users/forgotPassword", userdata, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
