import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Response,Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from 'environments/environment';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material';
import { saveAs } from 'file-saver';
import { TranslateService }from '@ngx-translate/core';
import { FuseConfigService } from '@fuse/services/config.service';
@Component({
  selector: 'app-projectuploads',
  templateUrl: './projectuploads.component.html',
  styleUrls: ['./projectuploads.component.scss'],
  animations: fuseAnimations
})
export class ProjectuploadsComponent implements OnInit {
  dataSource
  urlPort = environment.urlPort;
  projectUploadsPurpose;
  projectId;
  projectSupporters;
  pastEventDocName;
  addDialogResult;
  filename;
  pastEvents;
  loading1;
  pastEventFile = undefined;
  displayedColumns = ['fileName', 'type', 'icon'];

  /**
   * Constructor
   *
  //  * @param {EcommerceProductService} _ecommerceProductService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _matSnackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private http: Http,
    private _translateService:TranslateService
  ) {
    this._fuseConfigService.config = {
      layout: {
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
  }

  ngOnInit() {
    this.projectId = sessionStorage.getItem("projectIdForProjectProfile");
    this.projectUploadsPurpose = sessionStorage.getItem("projectUploadsPurpose")
    /**
      * @author: Kuldeep
      * @argument:projectId
      * @description:Get data of projectFiles by Id
      */
    this.httpClient.get(this.urlPort + "/api/projects/projectFiles/" + this.projectId, { withCredentials: true})
    .map(
      (response) => response
    )
    .catch((err) => {
      this.loading1 = false;
      var error = err["_body"]
      if(error == "session expired"){
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      }else{
        if (this.projectUploadsPurpose == 'pastEvents') {
          this.pastEvents = []
          this.dataSource = new MatTableDataSource(this.pastEvents);
        }
        if (this.projectUploadsPurpose == 'projectSupporters') {
          this.projectSupporters = []
          this.dataSource = new MatTableDataSource(this.projectSupporters);
        }
      }
      return Observable.throw(err)
    })
    .subscribe((res: any[]) => {
      var getData = res;
         var pastEventSet = [];
         var projectSupporterSet = [];
         var pastEventSetTableData;
         var projectSupporterTableData;
         for (var i = 0; i < getData.length; i++) {
           if (getData[i].projectRelation == 'Past Event') {
             pastEventSetTableData = getData[i];
             pastEventSet.push(pastEventSetTableData);
           }
           if (getData[i].projectRelation == 'Project Supporter') {
             projectSupporterTableData = getData[i];
             projectSupporterSet.push(projectSupporterTableData);
           }
         }
         this.pastEvents = pastEventSet;
         this.projectSupporters = projectSupporterSet;
         if (this.projectUploadsPurpose == 'pastEvents') {
           this.dataSource = new MatTableDataSource(this.pastEvents);
         }
         if (this.projectUploadsPurpose == 'projectSupporters') {
           this.dataSource = new MatTableDataSource(this.projectSupporters);
         }
    })

    //End
  }

  deletePastEventsDocs(element) {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'delete' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addDialogResult = result;
      if (this.addDialogResult == 'yes') {
        var fileInformation = {
          element: element.fileName,
          oldFilePath: '/ProjectFiles/' + this.projectId + '/ProjectPastEvents/' + element.fileName,
          id: element._id
        }
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/filesUpload/deletePastEvent", fileInformation, { withCredentials: true})
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Past Event File Not Deleted");
              this.openSnackBar(snackBar);
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant("Past Event File Deleted");
            this.openSnackBar(snackBar);
            this.ngOnInit();
          })
      } else {
        var snackBar = this._translateService.instant("Operation cancelled!!!");
        this.openSnackBar(snackBar);
      }
    })
  }

  deleteProjectSupporterDocs(element) {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'delete' }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.addDialogResult = result;
      if (this.addDialogResult == 'yes') {
        var fileInformation = {
          element: element.fileName,
          oldFilePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + element.fileName,
          id: element._id
        }
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/filesUpload/deleteProjectSupporter", fileInformation, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Project Supporters not deleted");
            this.openSnackBar(snackBar);
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant("Project Supporter file deleted");
            this.openSnackBar(snackBar);
            this.ngOnInit();
          })
      } else {
        var snackBar = this._translateService.instant("Operation cancelled!!!");
        this.openSnackBar(snackBar);
      }
    })
  }


  updatePastEventsDocs(event, element) {
    var file = event.target.files[0];
    if (file.type == 'application/pdf') {
      var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      var pasteventFileName = randomImageId + file.name
      var fd = new FormData();
      fd.append('file', file, randomImageId + file['name']);
      var fileInformation = {
        filePath: '/ProjectFiles/' + this.projectId + '/ProjectPastEvents/' + pasteventFileName,
        projectId: this.projectId,
        fileName: pasteventFileName,
        type: file.type,
        projectRelation: 'Past Event',
        purpose: 'updatePastEvent',
        element: element.fileName,
        oldFilePath: '/ProjectFiles/' + this.projectId + '/ProjectPastEvents/' + element.fileName,
        id: element._id
      }
      fd.append('fileInformation', JSON.stringify(fileInformation));
      this.loading1 = true;
      var purpose = 'updatePastEvent'
      var path = './ProjectFiles/'+this.projectId+'/ProjectPastEvents/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .catch((err) => {
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Past Events Not Saved");
          this.openSnackBar(snackBar);
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          this.loading1 = false;
          var snackBar = this._translateService.instant('Past Event File Updated');
          this.openSnackBar(snackBar);
          this.ngOnInit();
        })
    } else {
      var snackBar = this._translateService.instant('File Type must be a pdf');
      this.openSnackBar(snackBar)    }
  }

  updateProjectSupportersDocs(event, element) {
    var file = event.target.files[0];
    if (file.type.startsWith("image")) {
      var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      var projectSupportersFileName = randomImageId + file.name
      var fd = new FormData();
      fd.append('file', file, randomImageId + file['name']);
      var fileInformation = {
        filePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + projectSupportersFileName,
        projectId: this.projectId,
        fileName: projectSupportersFileName,
        type: file.type,
        projectRelation: 'Project Supporter',
        purpose: 'updateProjectSupporter',
        element: element.fileName,
        oldFilePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + element.fileName,
        id: element._id
      }
      fd.append('fileInformation', JSON.stringify(fileInformation));
      this.loading1 = true;
      var purpose = 'updateProjectSupporter'
      var path = './ProjectFiles/'+this.projectId+'/ProjectSupporters/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant('Project Supporters not saved');
          this.openSnackBar(snackBar);
        }
        this.loading1 = false;
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        var snackBar = this._translateService.instant("Project Supporters file updated");
          this.openSnackBar(snackBar);
        this.loading1 = false;
        this.ngOnInit();
      })
    } else {
      var snackBar = this._translateService.instant('File Type must be a image');
      this.openSnackBar(snackBar)    }
  }

  downloadProjectPastEvents(fileName) {
    this.filename = fileName;
    var body = { filename: this.filename, projectId: this.projectId }
    this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectPastEvents", body, { responseType: "blob",withCredentials: true })
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }else{
          var snackBar = this._translateService.instant("Failed download file");
            this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        var URL = window.URL.createObjectURL(res);
        saveAs(res, this.filename)
      })
  }

  downloadProjectSupporter(fileName) {

    this.filename = fileName;
    var body = { filename: this.filename, projectId: this.projectId }
    this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectSupporter", body, { responseType: "blob",withCredentials: true })
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }else{
          var snackBar = this._translateService.instant("Failed download file");
          this.openSnackBar(snackBar);        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        saveAs(res, this.filename)
      })
  }

  uploadPastEvents(event) {
    var file = event.target.files[0];
    var fileName = file.name;
    this.pastEventFile = event.target.files[0];
    this.pastEventDocName = event.target.files[0].name;
    if (file.type == 'application/pdf') {
      var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      var pasteventFileName = randomImageId + file.name
      var fd = new FormData();
      fd.append('file', file, randomImageId + file['name']);
      var fileInformation = {
        filePath: '/ProjectFiles/' + this.projectId + '/ProjectPastEvents/' + pasteventFileName,
        projectId: this.projectId,
        fileName: pasteventFileName,
        type: file.type,
        projectRelation: 'Past Event'
      }
      fd.append('fileInformation', JSON.stringify(fileInformation));
      this.loading1 = true;
      var purpose = 'uploadProjectPastEvents'
      var path = './ProjectFiles/'+this.projectId+'/ProjectPastEvents/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .catch((err) => {
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Past Event Not Saved");
            this.openSnackBar(snackBar);
            
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          var snackBar = this._translateService.instant("Past Event File Uploaded");
          this.openSnackBar(snackBar);
          
          this.loading1 = false;
          this.ngOnInit();
        })
    } else {
      var snackBar = this._translateService.instant('File Type must be a pdf');
      this.openSnackBar(snackBar)    }
  }

  uploadProjectSupporters(event) {
    var file = event.target.files[0];
    if (file.type.startsWith("image")) {
      var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      var projectSupportersFileName = randomImageId + file.name
      var fd = new FormData();
      fd.append('file', file, randomImageId + file['name']);
      var fileInformation = {
        filePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + projectSupportersFileName,
        projectId: this.projectId,
        fileName: projectSupportersFileName,
        type: file.type,
        projectRelation: 'Project Supporter'
      }
      fd.append('fileInformation', JSON.stringify(fileInformation));
      const headers = new HttpHeaders({ 'contentType': 'multipart/form-data' });
      this.loading1 = true;
      var purpose = "uploadProjectSupporters";
      var path = './ProjectFiles/'+this.projectId+'/ProjectSupporters/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .catch((err) => {
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Project Supporter not saved");
          this.openSnackBar(snackBar);
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          var snackBar = this._translateService.instant("Project Supporter file uploaded");
          this.openSnackBar(snackBar);
          
          this.loading1 = false;
          this.ngOnInit();
        })
    } else {
      var snackBar = this._translateService.instant('File Type must be a image');
      this.openSnackBar(snackBar)    }

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /** * @author:Kuldeep * @description: Open success snak bar */ 
  openSnackBar(data) { 
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, }); }
  /**
   * On init
   */
}
