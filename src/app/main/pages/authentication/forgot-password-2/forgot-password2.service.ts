import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassword2Service {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

  /**
 * @author Kuldeep
 * @param: userdata- JSON  consist of username and url.
 * @description This function will check if user presents.
 */
validateUser(userdata): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/users/validateUser", userdata, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
