import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViewexpensesService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

  /**
 * @author Kuldeep
 * @description This function will return all the Expenses of a activity
 */
getExpenses(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/invoices/allById/" + sessionStorage.getItem("activityIdForProfile"), { withCredentials: true })
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
 * @param requestData is of type json contains activityId,status,Fund Amount,Activity Name, Milestone Status, Project Status
 * @description This function will request fund for activity
 */
requestFund(requestData): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/milestone/BKCFundRequest", requestData, { withCredentials: true })
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
 * @param id MongoId of a Expense
 * @description This function will delete the Expense
 */
deleteExpense(id): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.delete(this.urlPort + "/api/invoices/" + id, { withCredentials: true })
          .pipe(map(Response => Response))

          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
