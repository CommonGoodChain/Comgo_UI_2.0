import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Http, Headers } from '@angular/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProjectuploadsService {
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  constructor(private httpClient: HttpClient,private http: Http) { }

/**
      * @author: Kuldeep
      * @argument:projectId
      * @description:Get data of projectFiles by projectId
      */
getProjectFiles(projectId): Promise<any> {
  return new Promise((resolve, reject) => {
    
    this.httpClient.get(this.urlPort + "/api/projects/projectFiles/" + projectId, { withCredentials: true})
    .map(
      (response) => response
    )
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
  });
}


/**
      * @author: Kuldeep
      * @param:fileInformation- consist of file path, MongoId of file Info and file name.
      * @description:Delete Past Event Files
      */
     deletePastEvent(fileInformation): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/filesUpload/deletePastEvent", fileInformation, { withCredentials: true})
              .pipe(map(Response => Response))
    
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }


    /**
      * @author: Kuldeep
      * @argument:fileInformation- consist of file path, MongoId of file Info and file name.
      * @description:Delete Project Supporter Files
      */
     deleteProjectSupporter(fileInformation): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/filesUpload/deleteProjectSupporter", fileInformation, { withCredentials: true })
              .pipe(map(Response => Response))
    
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }

    /**
      * @author: Kuldeep
      * @param: body- json consist of filename and project id.
      * @argument:filename- File to download
      * @description:Download Past Events Files
      */
     downloadProjectPastEvents(body, filename): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectPastEvents", body, { responseType: "blob",withCredentials: true })
              .pipe(map(Response => Response))
    
              .subscribe((res: any) => {
                saveAs(res, filename)
                  resolve(res);
              }, reject);
      });
    }

    /**
      * @author: Kuldeep
      * @argument:body- json consist of filename and project id.
      * @argument:filename- File to download
      * @description:Download Project Supporter Files
      */
     downloadProjectSupporter(body, filename): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectSupporter", body, { responseType: "blob",withCredentials: true })
              .pipe(map(Response => Response))
    
              .subscribe((res: any) => {
                saveAs(res, filename)
                  resolve(res);
              }, reject);
      });
    }

    /**
      * @author: Kuldeep
      * @param:path- path where file should upload
      * @param:projectId- project id of project
      * @param:purpose- purpose of file upload
      * @param:fd- file to upload
      * @description: Upload Project Files
      */
     uploadProjectFiles(path,projectId,purpose,fd): Promise<any> {
      return new Promise((resolve, reject) => {
        
        this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
              .pipe(map(Response => Response))
    
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
    }
}
