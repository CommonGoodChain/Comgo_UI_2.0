import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddexpenseService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient) { }

  /**
 * @author Kuldeep
 * @param id MongoId of Expense
 * @description This function will return expense details for editing expense
 */
getExpenseEdit(id): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/invoices/getExpenseEdit/" + id, { withCredentials: true })
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
 * @param inv Data of Expense
 * @description This function will return expense details for editing expense
 */
createExpense(inv): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/invoices/create", inv, { withCredentials: true })
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
 * @param inv Data of Expense
 * @description This function will return expense details for editing expense
 */
editExpense(inv): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.put(this.urlPort + "/api/invoices/", inv, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}
}
