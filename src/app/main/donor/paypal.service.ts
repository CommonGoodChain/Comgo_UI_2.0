import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl: string = environment.urlPort + '/api/users/getPaymentDetails';

@Injectable({
  providedIn: 'root'
})

export class PaypalService {

  routeParams: any;
  orgData: any;

  constructor(public _httpClient: HttpClient, public http: Http) {

  }

  /**
  * Resolver
  *
  * @param {ActivatedRouteSnapshot} route
  * @param {RouterStateSnapshot} state
  * @returns {Observable<any> | Promise<any> | any}
  */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getOrg()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });

  }


  getOrg(): Promise<any> {
    return new Promise((resolve, reject) => {
      var owner = sessionStorage.getItem("owner");
      this._httpClient.get(environment.urlPort + "/api/users/getPaymentDetails/" + owner, { withCredentials: true})
      .map(
        (response) => response
      )
      .catch((err) => {
        return Observable.throw(err)
      })
      .subscribe((response: any) => {
          var paypalData = response[0];
          if(paypalData.accountType === 'sandbox'){
            sessionStorage.setItem("sandBoxtoken",paypalData.sandBoxtoken)
            sessionStorage.setItem("accountType",paypalData.accountType)
            sessionStorage.setItem("liveToken",'xxxxxxx')
          }
          
          if(paypalData.accountType === 'production'){
            sessionStorage.setItem("liveToken",paypalData.liveToken)
            sessionStorage.setItem("accountType",paypalData.accountType)
            sessionStorage.setItem("sandBoxtoken",'xxxxxx')
          }          
          resolve(paypalData);
        }, reject);

    });
  }
}
