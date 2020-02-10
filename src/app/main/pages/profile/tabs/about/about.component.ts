import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { Observable } from 'rxjs/Rx';
import { saveAs } from 'file-saver';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
var introJS = require('intro.js')

@Component({
  selector: 'profile-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: ComGoAnimations
})
export class ProfileAboutComponent implements OnInit {
  projectId;
  lat;
  fundAmount;
  projectsAll;
  projectDocument;
  balance;
  lng;
  percentage;
  filename;
  projectSupporters;
  fundRaised;
  projectFile;
  j;
  k;
  userRules;
  pastEvents;
  routeBack;
  donorList = undefined;
  doc = undefined;
  file = undefined;
  donatedAmount: number = 0;
  foundationAmount: number = 0;
  urlPort = environment.urlPort;
  sdgUrl = "assets/SDG/";
  imageExtenstion = ".png";
  docName = 'Not available';
  public loading1 = false;
  lang;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private readonly elementPath = "#mat-tab-content-0-0 .mat-tab-body-content.ng-trigger.ng-trigger-translateTab";
  /** 
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private http: Http,
    private routerData: ActivatedRoute,
    private httpClient: HttpClient,
    private _translateService:TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
      this._ComGoTranslationLoaderService.loadTranslations(english, spanish); }

  ngOnInit() {
    this.routeBack  = sessionStorage.getItem('backRoute');
    if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
      }
    this.projectId = sessionStorage.getItem("projectIdForProjectProfile");
    this.lang = sessionStorage.getItem("lang");
    this.lat = parseFloat(sessionStorage.getItem("latForProjectProfile"));
    this.lng = parseFloat(sessionStorage.getItem("lngForProjectProfile"));
  
    /**
     * @author: Kuldeep
     * @argument:none
     * @description:Get BKC Data
     */

    this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + this.projectId, { withCredentials: true })
    .map(
        (response) => response
    ).catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      } else {
        var snackBar = this._translateService.instant("Failed to get project details");
        this.openSnackBar(snackBar);
      }
        this.loading1 = false;
        return Observable.throw(err)
    })
    .subscribe(res => {
            this.projectsAll = res;
            this.percentage = (this.projectsAll.fundRaised) * 100 / this.projectsAll.projectBudget
            this.balance = this.projectsAll.projectBudget - this.projectsAll.fundRaised
            this.loading1 = false;
          })
  
    /**
    * @author: Kuldeep
    * @argument:projectId
    * @description:Get data of projectFiles by Id
    */
        this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.projectDocument = res;
            if(this.projectDocument.length > 0){
            this.projectFile = this.projectDocument[0].docName
            }
            
          })
    //End

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
              // var snackBar = this._translateService.instant("Failed to get project files");
            // this.openSnackBar(snackBar);
            }
            return Observable.throw(err)
          })
          .subscribe((res: any[]) => {
            var getData = res;
            var pastEventSet = [];
            var projectSupporterSet = [];
            var pastEventSetTableData;
            var projectSupporterTableData;
            this.j = 0;
            this.k = 0;
            for (var i = 0; i < getData.length; i++) {
              if (getData[i].projectRelation == 'Past Event') {
                if (this.j < 3) {
                  pastEventSetTableData = getData[i];
                  pastEventSet.push(pastEventSetTableData);
                  this.j++;
                }
              }
              if (getData[i].projectRelation == 'Project Supporter') {
                if (this.k < 3) {
                  projectSupporterTableData = getData[i];
                  projectSupporterSet.push(projectSupporterTableData);
                  this.k++;
                }
              }
            }
            this.pastEvents = pastEventSet;
            this.projectSupporters = projectSupporterSet;
            this.loading1 = false;
          })
    //End

    /**
      * @author: Madhu
      * @argument:projectId
      * @description:Get data of project by Id
      */
    //  if (this.projectFlag == "bc") {
    //   this.loading1 = true;
    //   var projId = sessionStorage.getItem("projectIdForProjectProfile");
    //       this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + projId, { withCredentials: true })
    //         .map(
    //           (response) => response
    //         ).catch((err) => {
    //           this.loading1 = false;
    //           var error = err["_body"]
    //           if(error == "session expired"){
    //             this.sessionSnackBar(err["_body"]);
    //             this.router.navigate(['/pages/auth/login-2']);
    //           }else{
    //             var snackBar = this._translateService.instant("Failed to get project details");
    //             this.openSnackBar(snackBar);
    //           }
    //           return Observable.throw(err)
    //         })
    //         .subscribe(res => { 
    //           this.dataOfProjectByProjectId.push(JSON.parse(res['data']));
    //           this.dbRemarks = this.dataOfProjectByProjectId[0].remarks;
    //           this.fundGoal = this.dataOfProjectByProjectId[0].fundGoal
    //           this.fundRaised = this.dataOfProjectByProjectId[0].fundRaised;
    //           this.balance = this.dataOfProjectByProjectId[0].projectBudget - this.dataOfProjectByProjectId[0].fundRaised
    //           this.percentage = (this.fundRaised) * 100 / this.projectBudget
    //           this.loading1 = false;
    //         })
    // }
  }

  /**
   * @author: Kuldeep.N
   * @method: rateProject
   * @description: opens dialogue to rate project
   */
  rateProject(){
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'addReview',projectName:sessionStorage.getItem("projectNameForProjectProfile"), projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'rating complete'){
        window.location.reload();
      }
    })
  }


  editProjectDocuments(event) {
    this.doc = event.target.files[0];
    this.docName = event.target.files[0].name
    var fileInformation1
    if (this.projectDocument.length == 0) {
      var fileName = this.doc.name;
      var extension = fileName.split('.').pop();
      var fd = new FormData();
      this.file = this.doc
      fd.append('file', this.file);
      var _projId = this.projectId;
      fileInformation1 = {
        docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
        projectId: this.projectId,
        docName: 'projectDocument.' + extension,
        docInserted: 0
      }
      fd.append('fileInformation', JSON.stringify(fileInformation1));
      this.loading1 = false;
      var purpose = "uploadProjectDoc"
      var path = './projectDocuments/' + _projId + '/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + purpose,fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map((response) => response.json())
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Failed to add project doc");
            this.openSnackBar(snackBar);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.loading1 = false;
          var projectDocSnackBar = this._translateService.instant("Project Document uploaded");    
          this.openSnackBar(projectDocSnackBar);
          this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.projectDocument = res;
            if(this.projectDocument.length > 0){
              this.projectFile = this.projectDocument[0].docName
              }
          })
        })
    } 
    else {
      var fileName = this.doc.name;
      var extension = fileName.split('.').pop();
      var fd = new FormData();
      this.file = this.doc
      fd.append('file', this.file);
      var _projId = this.projectId;
      fileInformation1 = {
        docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
        projectId: this.projectId,
        docName: 'projectDocument.' + extension,
        docInserted: 1
      }
      fd.append('fileInformation', JSON.stringify(fileInformation1));
      this.loading1 = false;
      var fileId = this.projectDocument[0]._id
      var purpose = 'updateProjectDoc'
      var path = './projectDocuments/' + _projId + '/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ _projId +"&purpose="+purpose+"&oldDocName="+ this.projectFile +"&fileId="+ fileId,fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map((response) => response.json())
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Failed to add project doc");
            this.openSnackBar(snackBar);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.loading1 = false;
          var projectDocSnackBar = this._translateService.instant("Project Document updated");    
            this.openSnackBar(projectDocSnackBar);
          this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.projectDocument = res;
            if(this.projectDocument.length > 0){
              this.projectFile = this.projectDocument[0].docName
              }
          })
        })
    }
  }

  startTour() {
    var intro: any = introJS.introJs();
    intro.setOption('tooltipPosition', 'auto');
			intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
    intro.setOptions({
      steps: [
        {
          element: '#addMilestone',
          intro: 'Foundation or NGO can add and edit milestone and activities by clicking here.'
        },
        {
          element: '#editProject',
          intro: 'Foundation or NGO can edit project by clicking here.'
        }
      ],
      showBullets: true,
      showButtons: true,
      exitOnOverlayClick: false,
      keyboardNavigation: true,
    });
    intro.start();
  }

  viewMilestone() {
    sessionStorage.setItem("projectIdTillActivity", this.projectId);
    this.router.navigate(["/projects/milestone/viewmilestone"]);
  }
  editProject() {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: this.projectId }]);
  }
  /** 
        * @author:sagar
        * @argument:string
        * @description:open snackbar
       */
  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /** 
       * @author:Kuldeep
       * @argument:none
       * @description:Download Uploaded Project Document
      */
  downloadFile() {
    var projId = this.projectId;
        this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + projId, { withCredentials: true})
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
              var snackBar = this._translateService.instant("Failed to download file");
                this.openSnackBar(snackBar);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            if (res) {
              this.filename = res[0].docName;
              var body = { filename: this.filename, projectId: this.projectId }
              // this._http.post("http")
              this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/download", body, { responseType: "blob",withCredentials: true })
                .catch((err) => {
                  var snackBar = this._translateService.instant("Failed to download file");
                  this.openSnackBar(snackBar);                  
                  return Observable.throw(err)
                })
                .subscribe(res => {
                  saveAs(res, this.filename)
                })
            }
            else {
              var snackBar = this._translateService.instant("No file has been uploaded");
              this.openSnackBar(snackBar);
              }
            this.loading1 = false;
          })

  }
  //End

  editPublishedProject() {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: this.projectId }]);
  }

  downloadProjectPastEvents(fileName) {
    this.filename = fileName;
    var body = { filename: this.filename, projectId: this.projectId }
        this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectPastEvents", body, { responseType: "blob",withCredentials: true })
          .catch((err) => {
            this.loading1 = false;
             var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }else{
              var snackBar = this._translateService.instant("Failed to download file");
              this.openSnackBar(snackBar);            
            }
              var snackBar = this._translateService.instant("Failed to download file");
              this.openSnackBar(snackBar);            
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            saveAs(res, this.filename)
          })
  }

  gotoProjectUploads(projectUploadsPurpose) {
    sessionStorage.setItem("projectUploadsPurpose", projectUploadsPurpose)
    this.router.navigate(["project-uploads/project-uploads/updateProjectUploads"])
  }

  towardsDonation(index) {
    var data = {
      projectId: index.projectId
    }
    this.loading1 = true;
    this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true})
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if(error == "session expired"){
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }else{
          var snackBar = this._translateService.instant("Failed to get list of donor");
          this.openSnackBar(snackBar);        }
        this.loading1 = false;
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.donorList = res;
        for (var i = 0; i < this.donorList.length; i++) {
          if (this.donorList[i].role == "donor") {
            this.donatedAmount = this.donorList[i].amount + this.donatedAmount;
          }
          if (this.donorList[i].role == "foundation") {

            this.foundationAmount = this.donorList[i].amount + this.foundationAmount;
          }
        }
        sessionStorage.setItem("projectOwnerForProjectProfile", index.projectOwner);
        sessionStorage.setItem("currency", index.currency);
        sessionStorage.setItem("projectCreatedBy", index.createdBy);
        var projectId = index.projectId;
        var projectName = index.projectName;
        if (this.foundationAmount > index.projectBudget - index.fundGoal) {
          this.fundAmount = index.projectBudget - index.fundRaised;
        } else {
          this.fundAmount = index.fundGoal - this.donatedAmount;
        }
        this.loading1 = false;
        this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount }])
      })
  }

}
