import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { MatPaginator,MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
var introJS = require('intro.js')
@Component({
  selector: 'app-publishproject',
  templateUrl: './publishproject.component.html',
  styleUrls: ['./publishproject.component.scss'],
  animations: ComGoAnimations
})
export class PublishprojectComponent implements OnInit {
  displayedColumns = ['projectType', 'projectName', 'SDG','projectBudget', 'fundGoal', 'fundRaised', 'status', 'operation'];
  profileSubmit;
  dialogRef
  projectData;
  dataSource;
  foundationCompany;
  getData;
  organizationName;
  createdBy;
  sdgUrl;
  imageExtenstion;
  username;
  role;
  lang;
  paramsData = {}
  projects = [];
  urlPort = environment.urlPort;
  public loading1 = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * @author: Madhu
   * @argument:none
   * @description:set snackbar position
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private httpClient : HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _translateService:TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
 ) { this.projectData = this.projects.slice();
  this._ComGoTranslationLoaderService.loadTranslations(english, spanish); }

  ngOnInit() {
    this.profileSubmit = sessionStorage.getItem("profileSubmit")
    this.role = sessionStorage.getItem("role")
    this.lang = sessionStorage.getItem("lang");
    this.foundationCompany = sessionStorage.getItem("foundationCompany");
    this.profileSubmit = sessionStorage.getItem("profileSubmit")
    this.organizationName = sessionStorage.getItem("organizationName")
    this.createdBy = sessionStorage.getItem("createdBy")
    this.username = sessionStorage.getItem("username")

    if (this.profileSubmit == 'done' || sessionStorage.getItem("projectUpdate") == 'done') {
      window.location.reload();
      sessionStorage.setItem("profileSubmit", 'notdone')
      sessionStorage.setItem("projectUpdate", 'notdone')
    }

    if(this.lang == 'en' || this.lang == null){
      this.sdgUrl = "assets/SDG/";
      this.imageExtenstion = ".png";
    }else{
      this.sdgUrl = "assets/SDGSpanish/";
      this.imageExtenstion = ".jpg";
    }

    this.loading1 = true;
    this.paramsData["username"] = sessionStorage.getItem("username")
    this.paramsData["role"] = sessionStorage.getItem("role")

    this.httpClient.get(this.urlPort + "/api/projectcommunication/GetAllReceiveEmail", { withCredentials: true})
    .map(
      (response) => response
    )
    .catch((err) => {

      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      }
      return Observable.throw(err)
    })
    .subscribe((res: any[]) => {
    })
    
    /**
     * @author: Madhu
     * @argument:none
     * @description:Get all Funds
     */
    if (this.role == 'board' || this.role == 'crm' || this.role == 'validator') {
      this.httpClient.get(this.urlPort + '/api/projectdonation/allFunds', { withCredentials: true})
        .map(
          (response) => response
        )
        .catch((err) => {
          var error = err["_body"]
          if(error == "session expired"){
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          }else{
          this.openSnackBar("Failed to get all funds");
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe(res => {
          var getData = res;
          this.getData = res;
          var set = [];
          var tableData;
          var subRole = sessionStorage.getItem("subRole")


          for (var i = 0; i < this.getData.length; i++) {
            if (this.role == 'board' && this.getData[i].Record.createdBy == this.foundationCompany && getData[i].Record.published == true) {
              tableData = getData[i].Record;
              set.push(tableData);
            }
            if (this.role == 'validator' && subRole == 'user' && getData[i].Record.createdBy == this.organizationName && getData[i].Record.published == true) {
              tableData = getData[i].Record;
              set.push(tableData);
            }
            if (this.role == 'validator' && subRole == 'user' && getData[i].Record.projectOwner == this.organizationName && getData[i].Record.published == true) {
              tableData = getData[i].Record;
              set.push(tableData);
            }
            // if (this.role == 'crm' && subRole == 'user' && getData[i].Record.projectOwner == this.createdBy && getData[i].Record.published == true) {
            //   tableData = getData[i].Record;
            //   set.push(tableData);
            // }
            if (this.role == 'crm' && subRole == 'user' && getData[i].Record.createdBy == this.foundationCompany && getData[i].Record.published == true) {
              tableData = getData[i].Record;
              set.push(tableData);
            }

          }
          this.projectData = set;
          // this.projects=this.projectData;
          this.dataSource = new MatTableDataSource(this.projectData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading1 = false;
        })
    } else if (this.role === 'foundation') {
      var functionName = 'getPostProjectsFoundation'
      this.httpClient.get(this.urlPort + '/api/projects/getProjectByFunctionName?functionName=' + functionName, { withCredentials: true })
        .map(
          (response) => response
        )
        .catch((err) => {
          var error = err["_body"]
          if(error == "session expired"){
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          }else{
          this.openSnackBar("Failed to get all the funds");
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe(res => {
          var set = [];
          var tableData;
          this.getData = res;
          var getData = res;

          var subRole = sessionStorage.getItem("subRole")


          for (var i = 0; i < this.getData.length; i++) {
            tableData = getData[i].Record;
            set.push(tableData);
          }


          this.projectData = set;
          this.dataSource = new MatTableDataSource(this.projectData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading1 = false;
        })
    } else {
      var functionName = 'getPostProjectsNGO'

      this.httpClient.get(this.urlPort + '/api/projects/getProjectByFunctionName?functionName=' + functionName, { withCredentials: true})
        .map(
          (response) => response
        )
        .catch((err) => {
          var error = err["_body"]
          if(error == "session expired"){
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          }else{
          this.openSnackBar("Failed to get all funds");
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe(res => {
          var set = [];
          var tableData;
          this.getData = res;
          var getData = res;

          var subRole = sessionStorage.getItem("subRole")


          for (var i = 0; i < this.getData.length; i++) {
            tableData = getData[i].Record;
            set.push(tableData);
          }

          this.projectData = set;
          this.dataSource = new MatTableDataSource(this.projectData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading1 = false;
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
            element: '#publishprojectSearch',
            intro: 'User can filter the projects from here.',
            position: 'right'
          }
        ],
        showBullets: true,
        showButtons: true,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      });
    intro.start();
  }
  /** 
       * @author:Madhu
       * @argument:none
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
  /** 
     * @author:Sagar
     * @argument:Flag,ProjectId
     * @description:show project profile
    */
  showProjectDetails(index) {
    sessionStorage.setItem("projectFoundationOrg",index.foundation)
    sessionStorage.setItem("projectCreatedBy", index.createdBy);
    sessionStorage.setItem("descriptionForProjectProfile", index.description);
    sessionStorage.setItem("projectProjectBudgetTillActivity", index.projectBudget);
    sessionStorage.setItem("startDateForMilestone", index.startDate);
    sessionStorage.setItem("endDateForMilestone", index.endDate);
    sessionStorage.setItem("boardRemarks",index.remarks);
    sessionStorage.setItem("flagForProjectProfile", "bc");
    sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
    sessionStorage.setItem("projectFundGoalForProjectProfile", index.fundGoal);
    sessionStorage.setItem("projectStatusForProjectProfile", index.status);
    sessionStorage.setItem("projectOwnerForProjectProfile", index.projectOwner);
    sessionStorage.setItem("currencyTypeForProjectProfile", index.currency);
    sessionStorage.setItem("latForProjectProfile", index.projectLoc.latitude);
    sessionStorage.setItem("lngForProjectProfile", index.projectLoc.longitude);
    sessionStorage.setItem("fundRaisedForProjectProfile", index.fundRaised);
    sessionStorage.setItem("projectStatusForPublish", index.published);
    sessionStorage.setItem("approveStatusForPublish", index.approved);
    sessionStorage.setItem("fundAllocationType", index.fundAllocationType);
    this.router.navigate(["/pages/profile"]);
  }
  /** 
    * @author:Sagar
    * @argument:Flag,ProjectId
    * @description:go to donor
   */
  goToDonor(index) {
    sessionStorage.setItem("projectProjectBudgetTillActivity", index.projectBudget);
    sessionStorage.setItem("projectCreatedBy", index.createdBy);
    sessionStorage.setItem("currency", index.currency);
    sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
    sessionStorage.setItem("currencyType", index.currency)
    sessionStorage.setItem("cameFrom", 'Published')
    sessionStorage.setItem("projectFundGoalForProjectProfile", index.fundGoal);
    sessionStorage.setItem("fundRaisedForProjectProfile", index.fundRaised);
    this.router.navigate(["/donor/donor/alldonor"])
  }
  /** 
    * @author:Madhu
    * @argument:filterValue
    * @description:filter the project
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /** 
    * @author:Kuldeep 
    * @argument:index :- Contains SDG
    * @description:it is used to open dialogue box and show all SDG
   */
  showSDGDialogue(index) {
    var width = index.SDG.length * 50;
    this.dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: "'" + width + "px'",
      height: '100px',
      data: { operation: 'showSDG', SDG: index.SDG }
    });
  }
  //End
  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
