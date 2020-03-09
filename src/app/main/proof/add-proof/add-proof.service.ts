import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AddProofService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

  /**
 * @author Kuldeep
 * @param activityId Activity Id of a Activity
 * @description This function will return activity Details
 */
getActivityData(activityId): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/activity/getActivityById/" + activityId , { withCredentials: true })
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
 * @description This function will return all the currencies
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
 * @description This function will return proof document types.
 */
getDocTypes(): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/proofs/getDocTypeForAddProof", { withCredentials: true })
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
 * @param countryCodesBody is a json consist of sessionCheck
 * @description This function will return all the Country Codes.
 */
getCountryCodes(countryCodesBody): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.post(this.urlPort + "/api/country/countryCodes", countryCodesBody, { withCredentials: true })
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
 * @param projectId Project Id of a Project
 * @description This function will return all the Proofs Submitted For Activity.
 */
getProofSubmittedForActivity(projectId): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/proofs/all/" + sessionStorage.getItem('activityIdForProfile') + '/' + projectId, { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
     * @author : Kuldeep.N
     * @param arr Array of Organizations whose Validator have to fetch
     * @description Get all validators of organization.
     */
getAllValidators(arr): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/users/getAllValidator/" + sessionStorage.getItem("username") + "/" + JSON.stringify(arr), { withCredentials: true })
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}

/**
     * @author : Kuldeep.N
     * @param projectId Project Id of a project.
     * @description Returns Transactions of a project.
     */
    getProjectTransactions(projectId): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.get(this.urlPort + "/api/milestone/BKCGetAll/" + projectId, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param proofId MongoId of Proof.
     * @description Returns Proof Details.
     */
    getProofDetails(proofId): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.get(this.urlPort + "/api/proofs/getProof/" + proofId, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param doc Data of Proof Document.
     * @description Submit Proof Document Data.
     */
    submitProofDocumentData(doc): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/documents/create", doc, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param proof Proof Data.
     * @description Returns Proof Details.
     */
    submitProof(proof): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/proofs/create", proof, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param milestoneId milestoneId.
     * @param status Status Value.
     * @description Changes Proof Status.
     */
    updateProofStatus(milestoneId,status): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.get(this.urlPort + "/api/milestone/updateProofStatus/" + milestoneId + '/' + status, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param proof Updated Proof Data.
     * @description Update Proof Details.
     */
    updateProof(proof): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.put(this.urlPort + "/api/proofs/updateProof", proof, { withCredentials: true })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
     * @author : Kuldeep.N
     * @param path Path where file will be stored.
     * @param projectId Project Id of a Project.
     * @param milestoneId Milestone Id of a Project
     * @param purpose Purpose of file upload.
     * @param fd File to upload.
     * @description Upload Proof File.
     */
    saveFile(path, projectId, milestoneId, purpose, fd): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&projectId=" + projectId + "&milestoneId=" + milestoneId + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map(
          (response) => response
        )
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }
}
