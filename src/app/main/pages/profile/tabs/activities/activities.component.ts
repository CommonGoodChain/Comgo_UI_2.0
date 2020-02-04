import 'rxjs/add/operator/map';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery'
import { Sort } from '@angular/material';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ActivitiesComponent implements OnInit {
  milestoneData = [];
  displayedColumns;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  urlPort = environment.urlPort;
  projectOwner;
  public milestone = [];
  fundBudgeted;
  dataOfProjectByProjectId;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  milestoneId;
  viewActivities = 0;
  milestoneName;
  userRules;
  activities;
  fundReq;
  fundAllocationType;
  dataOfProjectByMilestoneId;
  currency;
  milestoneStartDate;
  milestoneEndDate;
  donated = 1;
  fundNotAllocated;
  allActivities = [];
  backFromExpense;
  date = new Date();
  isActive = true
  username;
  projectStatusForPublish;
  public loading1 = false;
    
    // This path targets mat tab body. the ,,#mat-tab-content-0-0" needs to be changes, depending on 
    // child index position in the tabs (#mat-tab-content-0-0, #mat-tab-content-0-1, ...)
    private readonly elementPath = "#mat-tab-content-0-1 .mat-tab-body-content.ng-trigger.ng-trigger-translateTab";
  /** @param {Http}_http
      * @param {Router}_router
     * @param {FormBuilder} _formBuilder
     * @param {MatSnackBar} _matSnackBar
     * @param {TranslateService} _translateService
     */

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private _translateService: TranslateService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    this.milestone = this.milestoneData.slice()
  }

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
    if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
      }
    this.fundAllocationType = sessionStorage.getItem("fundAllocationType")
    this.currency = sessionStorage.getItem('currencyTypeForProjectProfile');
    this.projectOwner = sessionStorage.getItem('projectOwnerForProjectProfile');
    this.fundNotAllocated = Number(sessionStorage.getItem('fundNotAllocated'))
    this.viewActivities = 0;
    this.loading1 = true;
    this.fundBudgeted = sessionStorage.getItem('fundBudgeted');
    this.projectStatusForPublish = sessionStorage.getItem('projectStatusForPublish');
    this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + sessionStorage.getItem("projectIdForProjectProfile"), { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        var projectData;
        projectData = res
        this.loading1 = false;
        this.fundNotAllocated = projectData.fundNotAllocated
      })
    // this.httpClient.post(this.urlPort + "/api/alldonor/getDonorProjectDonation", data, { withCredentials: true })
    //   .map(
    //     (response) => response
    //   )
    //   .catch((err) => {
    //     this.loading1 = false;
    //     var error = err["_body"]
    //     if (error == "session expired") {
    //       this.sessionSnackBar(err["_body"]);
    //       this.router.navigate(['/pages/auth/login-2']);
    //     } else {
    //       this.openSnackBar("Failed to get list of donor");
    //     }
    //     return Observable.throw(err)
    //   })
    //   .subscribe((res: Response) => {
    //     this.donated = 0;
    //     if (res["length"] > 0) {
    //       this.donated = 1;
    //     }
    //   })


    if (this.viewActivities == 0) {
      this.displayedColumns = ['milestone', 'startDate', 'endDate', 'status', 'operation'];
    }
    if (this.viewActivities == 1) {
      this.displayedColumns = ['activity', 'startDate', 'endDate', 'funds', 'status', 'Remarks', 'operation'];
    }


    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    this.httpClient.get(this.urlPort + "/api/milestone/getProjectMilestones/" + projId, { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all details! Try again");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        this.dataOfProjectByProjectId = JSON.parse(res['data']);
        this.milestone = this.dataOfProjectByProjectId
        // this.dataSource = new MatTableDataSource(this.dataOfProjectByProjectId);
        // var tabledata = [];
        // // if (this.role != 'donor') {
        // this.milestone = this.dataOfProjectByProjectId.milestones;
        // this.milestone.sort((a, b) => {
        //   return <any>new Date(a.startDate) - <any>new Date(b.startDate);
        // });
        // this.dataSource = new MatTableDataSource(this.milestone);
        // this.dataSource.paginator = this.paginator;
        // var milestones = this.dataOfProjectByProjectId.milestones;
        // for (var i = 0; i < milestones.length; i++) {
        //   var activities = milestones[i].activities
        //   for (var j = 0; j < activities.length; j++) {
        //     activities[j].milestoneId = milestones[i].milestoneId
        //     this.allActivities.push(activities[j]);
        //   }
        // }
        // this.allActivities.sort((a, b) => {
        //   return <any>new Date(a.startDate) - <any>new Date(b.startDate);
        // });
        // // } 
        // // else {
        // var milestones = this.dataOfProjectByProjectId.milestones;
        // for (var i = 0; i < milestones.length; i++) {
        //   if (milestones[i].approved == true || milestones[i].fundAllocated > 0) {
        //     tabledata.push(milestones[i]);
        //   }
        // }
        // this.milestone = tabledata;
        // this.dataSource = new MatTableDataSource(this.milestone);
        // this.dataSource.paginator = this.paginator;
        // // }
        // sessionStorage.setItem("projectStatusForPublish", this.dataOfProjectByProjectId.published);
        // sessionStorage.setItem("approveStatusForPublish", this.dataOfProjectByProjectId.approved);
        // this.backFromExpense = sessionStorage.getItem("backFromMilestone");
        // if (this.backFromExpense == 'true') {
        //   $(document).ready(function () {
        //     var milestoneId = sessionStorage.getItem("milestoneIdTillActivity");
        //     $("#" + milestoneId).trigger("click");
        //   });
        //   sessionStorage.setItem("backFromMilestone", "false")
        // }
      })
  }

  getActivity(activityData){
      }

  validationApproved(val) {
    var check
    var validateApproveDialogResult;
    var validators = val.validatorId.split("-", 2);
    var projectId = sessionStorage.getItem("projectIdForProjectProfile");
    var financialValidator = validators[1];

    if (val.status == 'Proof Submitted' && financialValidator) {
      check = 'Partial Validation Successful-' + sessionStorage.getItem("username");
    } else {
      check = 'Validation Successful';
    }
    // var data = {
    //   projectId: projectId,
    //   milestoneId: this.milestoneId,
    //   activityId: val.activityId,
    //   check: check
    // }

    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'validateApprove' }
    });
    dialogRef.afterClosed().subscribe(result => {
      validateApproveDialogResult = result;
      if (validateApproveDialogResult == 'yes') {
        val.projectId = projectId
        val.milestoneId = this.milestoneId
        val.status = check
        val.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
        val.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/activity/BKCActivityValidation", val, { withCredentials: true })
          .catch((err) => {
            this.loading1 = false
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant("Validated");
            this.openSnackBar(snackBar)
            $('#approvalButtonForValidator').hide();
            $('#rejectButtonForValidator').hide();
            sessionStorage.setItem("flagForHitAPI", '1');
            this.ngOnInit()
          })
      } else if (validateApproveDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }


  validationRejected(val) {
    var check = 'Validation failed';
    var validateRejectDialogResult;
    var projectId = sessionStorage.getItem("projectIdForProjectProfile");
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'validateReject' }
    });
    dialogRef.afterClosed().subscribe(result => {
      validateRejectDialogResult = result;
      if (validateRejectDialogResult == 'yes') {
        val.projectId = projectId
        val.milestoneId = this.milestoneId
        val.status = check
        val.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
        val.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/activity/BKCActivityValidation", val, { withCredentials: true })
          .catch((err) => {
            this.loading1 = false
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant("Validated");
            this.openSnackBar(snackBar)
            $('#approvalButtonForValidator').hide();
            $('#rejectButtonForValidator').hide();
            sessionStorage.setItem("flagForHitAPI", '1')
            this.ngOnInit();
          })
      } else if (validateRejectDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }


  viewProof(val) {
    sessionStorage.setItem('activityStatusForProfile', val.status);
    sessionStorage.setItem('activityIdForProfile', val.activityId);
    sessionStorage.setItem('milestoneIdForProfile', this.milestoneId);
    sessionStorage.setItem("activityName", val.activityName)
    sessionStorage.setItem("activityFundReleased", val.fundReleased)
    this.router.navigate(["/expenses/expenses/viewexpenses"]);
  }

  viewExpenses(val) {
    sessionStorage.setItem('activityStatusForProfile', val.status);
    sessionStorage.setItem('activityIdForProfile', val.activityId);
    sessionStorage.setItem('milestoneIdForProfile', this.milestoneId);
    sessionStorage.setItem('activityFundRequested', val.fundAllocated);
    sessionStorage.setItem("activityName", val.activityName)
    this.router.navigate(["/expenses/expenses/viewexpenses"]);
  }

  releaseFund(val) {
    var releaseFundDialogResult;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'releaseFund' }
    });
    dialogRef.afterClosed().subscribe(result => {
      releaseFundDialogResult = result;
      if (releaseFundDialogResult == 'yes') {
        this.loading1 = true;
        var releaseData = {
          activityId: val.activityId,
          status: 'Request FundFund Released',
          fundReq: val.activityBudget,
          activityName: val.activityName,
          milestoneStatus: sessionStorage.getItem("milestoneStatusTillActivity"),
          projectStatus: sessionStorage.getItem("projectStatusForProjectProfile")
        }
        this.httpClient.post(this.urlPort + "/api/milestone/BKCFundReleased", releaseData, { withCredentials: true })
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            var fundReleased = this._translateService.instant('Fund Released!!!');
            this.loading1 = false;
            this.openSnackBar(fundReleased);
            this.ngOnInit()
          })
      } else if (releaseFundDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  backToMilestones() {
    this.viewActivities = 0;
    this.displayedColumns = ['milestone', 'startDate', 'endDate', 'status', 'operation'];
    sessionStorage.setItem('flagForHitAPI', '1')
    this.ngOnInit();
  }

  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  sendForApproval(activityData) {
    var sendForApprovalDialogResult;
    var organizations = JSON.parse(sessionStorage.getItem("organization"))
    var arr = []
    for(var i = 0;i<organizations.length; i++){
      arr.push(organizations[i].OrgName)
    }
    activityData.organization = arr
    activityData.projectId = sessionStorage.getItem('projectIdForProjectProfile');
    activityData.milestoneId = this.milestoneId;
    activityData.milestoneStatus = 'Budgeted'
    activityData.remarks = 'No Remarks Added'
    activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'sendForApprovalActivity' }
    });
    dialogRef.afterClosed().subscribe(result => {
      sendForApprovalDialogResult = result;
      if (sendForApprovalDialogResult == 'yes') {

        activityData.status = 'Budgeted';
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/activity/sendForApproval", activityData, { withCredentials: true })
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("getting some error on updating Activity");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant('Activity Budgeted!!!');
            this.openSnackBar(snackBar)
            this.ngOnInit();
          })
      } else if (sendForApprovalDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  viewActivitiesDetails(milestoneId, data) {
    sessionStorage.setItem("milestoneIdTillActivity", data.milestoneId);
    sessionStorage.setItem("milestoneStatusTillActivity", data.status);
    sessionStorage.setItem("milestoneNameTillActivity", data.milestoneName);
    sessionStorage.setItem("startDateForActivity", data.startDate);
    sessionStorage.setItem("endDateForActivity", data.endDate);
    sessionStorage.setItem("milestoneIdForValidator", data.milestoneId);
    this.milestoneStartDate = data.startDate
    this.milestoneEndDate = data.endDate
    this.viewActivities = 1;
    this.displayedColumns = ['activity', 'startDate', 'endDate', 'funds', 'status', 'Remarks', 'operation', 'exit'];
    this.loading1 = true;
    this.httpClient.get(this.urlPort + "/api/activity/getMilestoneActivities/" + data.milestoneId, { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all details! Try again");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        this.activities = JSON.parse(res['data']);
        this.activities.sort((a, b) =>  {
          return <any>new Date(a.Record.startDate) - <any>new Date(b.Record.startDate);
        });
      })
  }

  approveActivity(activityData, statusFlag) {
    var ApproveOrRejectActivityDialogResult;
    var activityDetails = activityData;
    activityDetails.projectId = sessionStorage.getItem('projectIdForProjectProfile')
    activityDetails.statusFlag = statusFlag;
    activityDetails.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")

    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'ApproveOrRejectActivity' }
    });
    dialogRef.afterClosed().subscribe(result => {
      ApproveOrRejectActivityDialogResult = result;
      if (ApproveOrRejectActivityDialogResult.ans == 'yes') {
        if (activityDetails.statusFlag == true) {
          activityDetails.status = 'Activity Approved'
        } else {
          activityDetails.status = 'Activity Rework'
        }
        activityDetails.remarks = ApproveOrRejectActivityDialogResult.remarks;
        activityDetails.isApproved = 'true'
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/activity/getMilestoneActivities/" + activityDetails.milestoneId, { withCredentials: true })
          .map(
            (response) => response
          ).catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to get all details! Try again");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.activities = JSON.parse(res['data']);
            for (var i = 0; i < this.activities.length; i++) {
              if ((this.activities[i].Record.status == 'Activity Created' || this.activities[i].Record.status == 'Activity Updated' || this.activities[i].Record.status == 'Activity Rework' || this.activities[i].Record.status == 'Budgeted') && (this.activities[i].Record.activityId != activityDetails.activityId)) {
                activityDetails.milestoneStatus = 'Pending'
                break;
              } else {
                if (activityDetails.statusFlag == true) {
                  activityDetails.milestoneStatus = 'Approved'
                } else {
                  activityDetails.milestoneStatus = 'Pending'
                }
              }
            }
            this.httpClient.post(this.urlPort + "/api/activity/approveActivity", activityDetails, { withCredentials: true })
              .map(
                (response) => response
              )
              .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("error while approving Activity");
                  this.openSnackBar(snackBar);
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                if (statusFlag == true) {
                  var snackBar = this._translateService.instant('Activity Approved');
                  this.openSnackBar(snackBar);
                  sessionStorage.setItem("flagForHitAPI", '1')
                  this.viewActivities = 0;
                } else {
                  var snackBar = this._translateService.instant('Activity Rejected');
                  this.openSnackBar(snackBar);
                  sessionStorage.setItem("flagForHitAPI", '1')
                  this.viewActivities = 0;
                }
                this.ngOnInit()
              })
          })
      } else {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  closeActivity(activityData,index) {
    activityData.status = "Activity Closed"
    activityData.projectOwner = sessionStorage.getItem('projectOwnerForProjectProfile');
    activityData.milestoneId = sessionStorage.getItem("milestoneIdTillActivity")
    activityData.projectId = sessionStorage.getItem("projectIdForProjectProfile");
    activityData.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
    activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'closeActivity' }
    });
    dialogRef.afterClosed().subscribe(result => {
      var closeActivityResult = result;
      if (closeActivityResult == 'yes') {
        this.loading1 = true
        activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
        this.loading1 = true;
            this.httpClient.get(this.urlPort + "/api/proofs/all/" + activityData.activityId + '/' + sessionStorage.getItem("projectIdForProjectProfile"), { withCredentials: true })
              .map(
                (response) => response
              ).catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("Failed to get proof details! Try again");
                  this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
              })
              .subscribe(res => {
                var totalProofAmount = 0;
                var funds = 0;
                for (var j = 0; j < res["length"]; j++) {
                  totalProofAmount = totalProofAmount + res[j].amount
                }
                funds = activityData.fundReleased - totalProofAmount;
                // this.ngOnInit();
                if (funds > 0) {
                  activityData.status = "Activity Closed";
                  activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
                  this.loading1 = true;
                  this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
                    .map(
                      (response) => response
                    )
                    .catch((err) => {
                      this.loading1 = false;
                      var error = err["_body"]
                      if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                      } else {
                        var snackBar = this._translateService.instant("error while closing Activity");
                        this.openSnackBar(snackBar)
                      }
                      return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                      this.openSnackBar('Activity Closed')
                      this.getNextActivity(activityData, funds, index)
                    })
                } else {
                  activityData.status = "Activity Closed";
                  activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
                  this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
                    .map(
                      (response) => response
                    )
                    .catch((err) => {
                      this.loading1 = false;
                      var error = err["_body"]
                      if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                      } else {
                        var snackBar = this._translateService.instant("error while closing Activity");
                        this.openSnackBar(snackBar)
                      }
                      return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                      this.loading1 = false;
                      this.openSnackBar('Activity Closed')
                      this.ngOnInit();
                    })
                }
              })
      } else {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  // closeActivity(activityData, index) {
  //   activityData.milestoneId = this.milestoneId
  //   activityData.projectId = sessionStorage.getItem("projectIdForProjectProfile");
  //   activityData.foundationCompany = sessionStorage.getItem("projectFoundationOrg")
  //   activityData.milestoneName = sessionStorage.getItem("milestoneNameTillActivity")
  //   let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
  //     width: '500px',
  //     height: '200px',
  //     data: { operation: 'closeActivity' }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     var closeActivityResult = result;
  //     if (closeActivityResult == 'yes') {
  //       var projId = sessionStorage.getItem("projectIdForProjectProfile");
  //       this.loading1 = true
  //       this.httpClient.get(this.urlPort + "/api/proofs/all/" + activityData.activityId + '/' + projId, { withCredentials: true })
  //         .map(
  //           (response) => response
  //         ).catch((err) => {
  //           this.loading1 = false;
  //           var error = err["_body"]
  //           if (error == "session expired") {
  //             this.sessionSnackBar(err["_body"]);
  //             this.router.navigate(['/pages/auth/login-2']);
  //           } else {
  //             var snackBar = this._translateService.instant("Failed to get proof details! Try again");
  //             this.openSnackBar(snackBar)
  //           }
  //           return Observable.throw(err)
  //         })
  //         .subscribe(res => {
  //           var totalProofAmount = 0;
  //           var funds = 0;
  //           for (var j = 0; j < res["length"]; j++) {
  //             totalProofAmount = totalProofAmount + res[j].amount
  //           }
  //           funds = activityData.activityFundReleased - totalProofAmount;
  //           if (funds > 0) {
  //             activityData.status = "Activity Closed";
  //             activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
  //             this.loading1 = true;
  //             this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
  //               .map(
  //                 (response) => response
  //               )
  //               .catch((err) => {
  //                 this.loading1 = false;
  //                 var error = err["_body"]
  //                 if (error == "session expired") {
  //                   this.sessionSnackBar(err["_body"]);
  //                   this.router.navigate(['/pages/auth/login-2']);
  //                 } else {
  //                   var snackBar = this._translateService.instant("error while closing Activity");
  //                   this.openSnackBar(snackBar)
  //                 }
  //                 return Observable.throw(err)
  //               })
  //               .subscribe((res: Response) => {
  //                 this.getNextActivity(activityData, funds, 1, index)
  //               })
  //           }
  //           else {
  //             activityData.status = "Activity Closed";
  //             activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
  //             this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
  //               .map(
  //                 (response) => response
  //               )
  //               .catch((err) => {
  //                 this.loading1 = false;
  //                 var error = err["_body"]
  //                 if (error == "session expired") {
  //                   this.sessionSnackBar(err["_body"]);
  //                   this.router.navigate(['/pages/auth/login-2']);
  //                 } else {
  //                   var snackBar = this._translateService.instant("error while closing Activity");
  //                   this.openSnackBar(snackBar)
  //                 }
  //                 return Observable.throw(err)
  //               })
  //               .subscribe((res: Response) => {
  //                 this.loading1 = false;
  //                 this.getActivities(activityData.milestoneId)
  //               })
  //           }
  //         })
  //     } else {
  //       this.loading1 = false;
  //       var snackBar = this._translateService.instant('operation cancelled!!!');
  //       this.openSnackBar(snackBar)
  //     }
  //   })
  // }

  getNextActivity(activityData, funds, index) {
    var nextActivity;
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    var activityDate = new Date(activityData.startDate);
    this.loading1 = true;
    this.httpClient.get(this.urlPort + "/api/projects/getProjectActivities/" + projId, { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all details! Try again");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.allActivities = JSON.parse(res['data']);
        this.allActivities.sort((a, b) =>  {
          return <any>new Date(a.Record.startDate) - <any>new Date(b.Record.startDate);
        });
        nextActivity = this.allActivities[index + 1].Record
        var requiredFunds = nextActivity.activityBudget - nextActivity.fundAllocated
        nextActivity.funds = funds
        // if(activityData.milestoneId == nextActivity.milestoneId){
        //   nextActivity.milestoneFundAllocated = 0;
        // } else {
        //   nextActivity.milestoneFundAllocated = funds
        // }
        this.httpClient.post(this.urlPort + "/api/activity/balancedFundAllocate", nextActivity, { withCredentials: true })
              .map(
                (response) => response
              )
              .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("error while Allocating Funds");
                  this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                this.ngOnInit();
      })
      })
    // this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + projId, { withCredentials: true })
    //   .map(
    //     (response) => response
    //   ).catch((err) => {
    //     this.loading1 = false;
    //     var error = err["_body"]
    //     if (error == "session expired") {
    //       this.sessionSnackBar(err["_body"]);
    //       this.router.navigate(['/pages/auth/login-2']);
    //     } else {
    //       var snackBar = this._translateService.instant("Failed to get all details! Try again");
    //       this.openSnackBar(snackBar)
    //     }
    //     return Observable.throw(err)
    //   })
    //   .subscribe(res => {
    //     nextActivity = this.allActivities[index + 1]
    //     if (nextActivity != undefined) {
    //       nextActivity.projectId = projId;
    //       var balanceFunds = 0;
    //       var requiredFunds = nextActivity.activityBudget - nextActivity.fundAllocated
    //       if (funds >= requiredFunds) {
    //         balanceFunds = funds - requiredFunds
    //         nextActivity.funds = funds
    //       }
    //       else {
    //         nextActivity.funds = funds
    //       }
    //       if (nextActivity.funds > 0) {
    //         this.httpClient.post(this.urlPort + "/api/activity/balancedFundAllocate", nextActivity, { withCredentials: true })
    //           .map(
    //             (response) => response
    //           )
    //           .catch((err) => {
    //             this.loading1 = false;
    //             var error = err["_body"]
    //             if (error == "session expired") {
    //               this.sessionSnackBar(err["_body"]);
    //               this.router.navigate(['/pages/auth/login-2']);
    //             } else {
    //               var snackBar = this._translateService.instant("error while Allocating Funds");
    //               this.openSnackBar(snackBar)
    //             }
    //             return Observable.throw(err)
    //           })
    //           .subscribe((res: Response) => {
    //             this.loading1 = false;
    //             if (res["BCStatus"].startsWith("fundAllocate")) {
    //               var snackBar = this._translateService.instant("Funds has been allocated to next activites.");
    //             } else {
    //               var snackBar = this._translateService.instant("Not enough fund to allocate to the next activity.");
    //             }
    //             this.openSnackBar(snackBar)
    //             this.ngOnInit();

    //           })
    //       }
    //     } else {
    //       this.loading1 = false;
    //       var snackBar = this._translateService.instant("Activities does not found to allocate funds.");
    //       this.openSnackBar(snackBar)
    //      this.ngOnInit();
    //     }
    //   })
  }

  getActivities(milestoneId) {
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + projId, { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all details! Try again");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        this.dataOfProjectByProjectId = JSON.parse(res['data']);
        this.fundNotAllocated = this.dataOfProjectByProjectId.fundNotAllocated
        this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + milestoneId, { withCredentials: true })
          .map(
            (response) => response
          ).catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to get all details by milestone! Try again");
              this.openSnackBar(snackBar);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.dataOfProjectByMilestoneId = JSON.parse(res['data']);

            this.activities = this.dataOfProjectByMilestoneId.activities;
            if (this.activities != null && this.activities != '' && this.activities != undefined) {
              this.activities.sort((a, b) => {
                return <any>new Date(a.startDate) - <any>new Date(b.startDate);
              });
            }
            this.viewActivities = 1;
            this.milestoneId = milestoneId;
            this.fundReq = this.dataOfProjectByMilestoneId.fundBudgeted;
            this.milestoneName = this.dataOfProjectByMilestoneId.milestoneName;
            this.fundBudgeted = this.dataOfProjectByMilestoneId.fundBudgeted;
          })
      })
  }

  allocateFunds(activityData) {
    var allocateFundsResults;
    var requiredAmount = activityData.activityBudget
    if (activityData.fundAllocated < activityData.activityBudget) {
      if (this.fundNotAllocated >= requiredAmount) {
        activityData.funds = requiredAmount;
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'AllocateFunds' }
        });
        dialogRef.afterClosed().subscribe(result => {
          allocateFundsResults = result;
          if (allocateFundsResults == 'yes') {
            if (this.fundNotAllocated > requiredAmount) {
              activityData.fundsNotAllocated = this.fundNotAllocated - requiredAmount
            } else {
              activityData.fundsNotAllocated = 0;
            }
            this.loading1 = true;
            activityData.milestoneStatus = "Fund Allocated"
            activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
            this.httpClient.post(this.urlPort + "/api/activity/allocateFunds", activityData, { withCredentials: true })
              .map(
                (response) => response
              )
              .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("error while Allocating Funds");
                  this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Fund Allocated");
                this.openSnackBar(snackBar)
                this.ngOnInit();
              })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      } else {
        var snackBar = this._translateService.instant('Amount is not present for Fund Allocation');
        this.openSnackBar(snackBar)
      }
    } else {
      var snackBar = this._translateService.instant('Cannot allocate Fund to this Activity.Fund Budget has been Accomplished');
      this.openSnackBar(snackBar)
    }
  }

  addNewMilestone(): void {
    this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 0, projectId: sessionStorage.getItem('projectIdForProjectProfile') }]);
  }

  addNewActivity(): void {
    this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 0, milestoneId: sessionStorage.getItem("milestoneIdTillActivity") }]);
  }

  forEditingMilestone(milestoneId) {
    sessionStorage.setItem("milestoneIdTillActivity", milestoneId);
    this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 1, projectId: sessionStorage.getItem('projectIdForProjectProfile'), milestoneId: milestoneId }]);
  }

  forUpdatingActivity(index) {
    this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 1, milestoneId: this.milestoneId, activityId: index.activityId }]);
  }

  compareDates(date) {
    var endDate = new Date(date);
    return endDate < this.date;
  }

  /** 
      * @author:Madhu
      * @argument:data
      * @description:sorting 
     */
  sortData(sort: Sort) {
    const data = this.milestoneData.slice();
    if (!sort.active || sort.direction == '') {
      this.milestone = data;
      return;
    }
    this.milestone = data.sort((a, b) => {
      var isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'milestone': return compare(a.milestone, b.milestone, isAsc);
        case 'activity': return compare(+a.activity, +b.activity, isAsc);
        case 'startDate': return compare(+a.startDate, +b.startDate, isAsc);
        case 'endDate': return compare(+a.endDate, +b.endDate, isAsc);
        case 'funds': return compare(+a.funds, +b.funds, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

