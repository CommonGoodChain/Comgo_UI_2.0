import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core'
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
var introJS = require('intro.js')
@Component({
  selector: 'app-viewallproject',
  templateUrl: './viewallproject.component.html',
  styleUrls: ['./viewallproject.component.scss'],
  animations: fuseAnimations
})
export class viewallprojectComponent implements OnInit {
  dataSource;
  getData;
  username;
  dialogRef;
  role;
  userRules;
  profileSubmit;
  projectUpdate;
  sdgUrl;
  routeParams;
  createdBy;
  imageExtenstion;
  organizationName;
  foundationCompany;
  lang;
  rulesOfUser;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  urlPort = environment.urlPort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns = ['projectType', 'projectName', 'SDG', 'projectBudget', 'fundGoal', 'status', 'operation'];
  public projectsAll;
  public loading1 = false;

  constructor(private _fuseConfigService: FuseConfigService,private _translateService: TranslateService,private route:ActivatedRoute, private http: Http, private httpClient: HttpClient, private _matSnackBar: MatSnackBar, private router: Router, public dialog: MatDialog, private _fuseTranslationLoaderService: FuseTranslationLoaderService) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
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
    this.route.params.subscribe( params =>
      this.routeParams = params['id']
  )
    var routesPathOrg = this.routeParams
    if(sessionStorage.getItem('userType') == 'Private User'){
    var body = {
      "username": sessionStorage.getItem("username"),
      "sessionCheck": false
  }
  this.http.post(this.urlPort + "/api/users/getUserDetails", body,{ withCredentials: true})
      .map(
          (response) => response.json()
      )
      .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
          } else {
          var snackBar = this._translateService.instant("Failed to get user");
          this.openSnackBar(snackBar)
          }
          return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.rulesOfUser = res["Rules"]
          for(var i=0;i<res["Rules"].length;i++){
            if(routesPathOrg == res["Rules"][i].orgName){
              var rulesArr = []
              rulesArr.push(res["Rules"][i]);
              var userRules = JSON.stringify(rulesArr);
               sessionStorage.setItem("userRules", userRules)
              this.userRules = res["Rules"][i] 
              sessionStorage.setItem("orgName", res["Rules"][i].orgName)
            }
          }
      })
    }
    this.lang = sessionStorage.getItem("lang");
    this.profileSubmit = sessionStorage.getItem("profileSubmit")
    this.projectUpdate = sessionStorage.getItem("projectUpdate")
    this.role = sessionStorage.getItem("role")
    this.foundationCompany = sessionStorage.getItem("foundationCompany");
    if (this.profileSubmit == 'done' || this.projectUpdate == 'done') {
      window.location.reload();
      sessionStorage.setItem("profileSubmit", 'notdone')
      sessionStorage.setItem("projectUpdate", 'notdone')
    }

    if (this.lang == 'en' || this.lang == null) {
      this.sdgUrl = "assets/SDG/";
      this.imageExtenstion = ".png";
    } else {
      this.sdgUrl = "assets/SDGSpanish/";
      this.imageExtenstion = ".jpg";
    }

    this.loading1 = true;
    this.organizationName = sessionStorage.getItem("organizationName")
    this.createdBy = sessionStorage.getItem("createdBy")
    this.username = sessionStorage.getItem("username")

    // this.httpClient.get(this.urlPort + "/api/projectcommunication/GetAllReceiveEmail", { withCredentials: true })
    //   .map(
    //     (response) => response
    //   )
    //   .catch((err) => {
    //     var error = err["_body"]
    //     if (error == "session expired") {
    //       this.sessionSnackBar(err["_body"]);
    //       this.router.navigate(['/pages/auth/login-2']);
    //     }
    //     return Observable.throw(err)
    //   })
    //   .subscribe(res => {
    //   })
    if(routesPathOrg == '' || routesPathOrg == undefined || routesPathOrg == null){
      routesPathOrg = sessionStorage.getItem('orgName')
    }
      this.httpClient.get(this.urlPort + '/api/projects/getAllProjects/'+routesPathOrg, { withCredentials: true})
        .map(
          (response) => response
        )
        .catch((err) => {
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Projects not found");
            this.openSnackBar(snackBar);
          }
          this.loading1 = false;
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.projectsAll = res;
          this.dataSource = new MatTableDataSource(this.projectsAll);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading1 = false;
        })
  }

  startTour() {
    var intro: any = introJS.introJs();
    intro.setOption('tooltipPosition', 'auto');
    intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
    if (this.role == 'foundation' || this.role == 'ngo') {
      intro.setOptions({
        steps: [
          {
            element: '#addProject',
            intro: 'Foundation or NGO can add project by clicking here.'
          },
          {
            element: '#viewallprojectSearch',
            intro: 'User can filter the projects from here.'
          }
        ],
        showBullets: true,
        showButtons: true,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      });
    } else {
      intro.setOptions({
        steps: [
          {
            element: '#viewallprojectSearch',
            intro: 'User can filter the projects from here.'
          },
          {
            element: '#viewallprojectProjectDetails',
            intro: 'Foundation or NGO can view project details by clicking here.'
          }
        ],
        showBullets: true,
        showButtons: true,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      });
    }
    intro.start();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  showProjectDetails(index): void {
    var routesBack = this.router.url.replace(/%20/g, " ");
    var sdg = JSON.stringify(index.SDG)
    sessionStorage.setItem("SDG",sdg)
    sessionStorage.setItem("projectStatusForProjectProfile", index.status);
    sessionStorage.setItem("projectProjectBudgetTillActivity", index.projectBudget);
    sessionStorage.setItem("projectCreatedBy", index.createdBy);
    sessionStorage.setItem("boardRemarks", index.remarks);
    sessionStorage.setItem("projId", index._id)
    sessionStorage.setItem("descriptionForProjectProfile", index.description);
    sessionStorage.setItem("startDateForMilestone", index.startDate);
    sessionStorage.setItem("endDateForMilestone", index.endDate);
    sessionStorage.setItem("flagForProjectProfile", "db");
    sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
    sessionStorage.setItem("projectFundGoalForProjectProfile", index.fundGoal);
    sessionStorage.setItem("projectOwnerForProjectProfile", index.projectOwner);
    sessionStorage.setItem("currencyTypeForProjectProfile", index.currency);
    sessionStorage.setItem("latForProjectProfile", index.projectLoc.latitude);
    sessionStorage.setItem("lngForProjectProfile", index.projectLoc.longitude);
    sessionStorage.setItem("fundRaisedForProjectProfile", index.fundRaised);
    sessionStorage.setItem("projectStatusForPublish", index.isPublished);
    sessionStorage.setItem("approveStatusForPublish", index.isApproved);
    // sessionStorage.setItem("projectApproveStatus", index.isApproved);
    sessionStorage.setItem("fundAllocationType", index.fundAllocationType);
    sessionStorage.setItem("fundNotAllocated",index.fundNotAllocated)
    sessionStorage.setItem('backRoute',routesBack)
    sessionStorage.setItem('organization',JSON.stringify(index.organization))
    this.router.navigate(["/pages/profile"]);
  }
  addNewProject(): void {
    var routesBack = this.router.url.replace(/%20/g, " ");
    sessionStorage.setItem('backRoute',routesBack)
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 0}]);
  }

  /**
    * @author:Akshay
    * @description: Open success snak bar
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

  hideSDGDialogue() {
    this.dialogRef.close();
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  editProject(projectId): void {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: projectId }]);
  }

}