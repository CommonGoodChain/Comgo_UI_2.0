import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DonorFormService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @description This function will return All donation types.
 */
getDonationType(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/donationType/all", { withCredentials: true })
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
 * @description This function will return All Notification Types.
 */
getAllNotification(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/donates/getAllNotification", { withCredentials: true })
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
 * @description This function will return All Mode of Payment.
 */
getModeOfPayment(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/modeofpayment/all", { withCredentials: true })
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
 * @description This function will return All Currencies.
 */
getAllCurrencies(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/currency/all", { withCredentials: true })
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
 * @description This function is used by user to donate to project.
 */
donorDonate(donationData): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/donates/create", donationData, { withCredentials: true })
          .pipe(map(Response => Response))

          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
 * @author Kuldeep
 * @description This function is used by user to donate to project if does not have donate permission.
 */
foundationDonate(donationData): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/donates/foundationDonate", donationData, { withCredentials: true })
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
 * @description This function is used by user to upload file while donation.
 */
donationFileUpload(path,purpose,fd): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&purpose=" +purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
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
 * @description This function is used by user to refresh session.
 */
checkRegisterSession(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.http.post(this.urlPort + "/api/checkRegisterSession", { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
    .map(
      (response) => response.json()
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
