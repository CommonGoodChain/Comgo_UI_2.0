import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Response } from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery'
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: fuseAnimations
})
export class InfoComponent implements OnInit {
  role;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  urlPort = environment.urlPort;
  dataOfProjectByProjectId;
  activities;
  projectId;
  routeBack;
  todoData = {};
  actCount;
  displayedColumns;
  public loading1 = false;
  publishDialogResult;
  sendForApprovalDialogResult;
  projectApproveResult;
  projectRejectResult;
  projectStatusForPublish;
  approveStatusForPublish;
  approvalResultForBoard;
  publishedStatus;
  projStatus
  projectPublishedStatus;
  activityApprovedStatus;
  projectName;
  projectApproveStatus;
  userRules;

  /** @param {Http}_http
       * @param {Router}_router
      * @param {FormBuilder} _formBuilder
      * @param {MatSnackBar} _matSnackBar
      */

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private _translateService: TranslateService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }
  ngOnInit() {
    this.routeBack = sessionStorage.getItem('backRoute')
    if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
      }
    this.projectName = sessionStorage.getItem('projectNameForProjectProfile')
    this.projectStatusForPublish = sessionStorage.getItem('projectStatusForPublish');
    this.projStatus = sessionStorage.getItem("projectStatusForProjectProfile");
    this.projectApproveStatus =  sessionStorage.getItem("projectApproveStatus")
    this.approveStatusForPublish = sessionStorage.getItem('approveStatusForPublish');
    this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
    this.displayedColumns = ['activity', 'status', 'operation'];
    this.role = sessionStorage.getItem('role');
    this.httpClient.get(this.urlPort + "/api/projects/getProjectActivities/" + this.projectId, { withCredentials: true })
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
        var dataOfActivitiesByProjectId;
        dataOfActivitiesByProjectId = JSON.parse(res['data']);
          this.activities = dataOfActivitiesByProjectId;
          if (this.activities != null) {
            for (var i = 0; i < this.activities.length; i++) {
              if(this.activities[i].Record.status != 'Activity Approved'){
                this.activityApprovedStatus = 1;
                break;
              } else {
                this.activityApprovedStatus = 0;
              }
            }
          }
      })

      // if(this.approveStatusForPublish == 'false'){
      // this.todoData = [
      //       {
      //         "activityName": "All the activities must be approved to approve the project",
      //         "currentStatus": "Not Approved",
      //       }]
      //     }
          if(this.approveStatusForPublish == 'true'){
            this.todoData = [
              {
                "activityName": "Project need to be Published",
                "currentStatus": "Approved",
              }]
          } else if(this.approveStatusForPublish == 'false'){
            this.todoData = [
                    {
                      "activityName": "All the activities must be approved to approve the project",
                      "currentStatus": "Not Approved",
                    }]
          }

    /**
        * @author: Madhu
        * @argument:none
        * @description:json object 
        */
    //    this.approveStatusForPublish == 'false'
    // if (this.approveStatusForPublish == 'false' && this.role == 'foundation') {
    //   this.todoData = [
    //     {
    //       "activityName": "Send all activities for approval",
    //       "currentStatus": "not approved",
    //     }]
    // }
    // else if (this.approveStatusForPublish == 'false' && this.role == 'ngo') {
    //   this.todoData = [
    //     {
    //       "activityName": "Send all activities for approval",
    //       "currentStatus": "not approved",
    //     }]
    // } else if (this.approveStatusForPublish == 'true' && this.role == 'foundation') {
    //   this.todoData = [
    //     {
    //       "activityName": "Publish Project",
    //       "currentStatus": "Project Approved",
    //     }]
    // } else  {
    //   this.todoData = [
    //     {
    //       "activityName": "Approve/Reject Project",
    //       "currentStatus": "Budgeted",
    //     }]
    // } 
    // else {
    //   this.todoData = [
    //     {
    //       "activityName": "No activities",
    //       "currentStatus": "No task pending",
    //     }]
    // }

    /**
         * @author: Madhu
         * @argument:none
         * @description:Get all Milestone for activity count
         */
    // this.loading1 = true;
    // this.httpClient.get(this.urlPort + "/api/milestone/allByName/" + this.projectId, { withCredentials: true })
    //   .map(
    //     (response) => response
    //   ).catch((err) => {
    //     var error = err["_body"]
    //     if (error == "session expired") {
    //       this.sessionSnackBar(err["_body"]);
    //       this.router.navigate(['/pages/auth/login-2']);
    //     }
    //     this.loading1 = false;
    //     return Observable.throw(err)
    //   })
    //   .subscribe((res: any[]) => {
    //     var milestone = res;
    //     this.httpClient.get(this.urlPort + "/api/activity/allByName/" + this.projectId, { withCredentials: true })
    //       .map(
    //         (response) => response
    //       ).catch((err) => {
    //         var error = err["_body"]
    //         if (error == "session expired") {
    //           this.sessionSnackBar(err["_body"]);
    //           this.router.navigate(['/pages/auth/login-2']);
    //         }
    //         this.loading1 = false;
    //         return Observable.throw(err)
    //       })
    //       .subscribe((res: any[]) => {
    //         this.loading1 = false;
    //         var activity = res;
    //         var milestoneArray = []
    //         var actCount = 0;
    //         for (var i = 0; i < milestone.length; i++) {
    //           var milestoneId = milestone[i].milestoneId;

    //           var obj = {};
    //           for (var j = 0; j < activity.length; j++) {
    //             this.activityLength = activity.length
    //             var actMilestoneId = activity[j].milestoneId;
    //             if (actMilestoneId == milestoneId) {
    //               if (obj[milestoneId]) {
    //                 var temp = obj[milestoneId] + actCount;
    //                 obj[milestoneId] = temp;
    //               } else {
    //                 actCount = 1;
    //                 this.actCount = actCount;
    //                 obj[milestoneId] = actCount;
    //               }

    //             }
    //           }

    //         }
    //         this.milestone = milestoneArray
    //       })
    //   })



  }


  /**
  * @author: Madhu
  * @argument:none
  * @description:navigate to alldonar page
  */
  allDonar() {
    sessionStorage.setItem("cameFrom", 'forCrm')
    this.router.navigate(["/donor/donor/alldonor"]);

  }
  /**
      * @author: Madhu
      * @argument:none
      * @description:navigate to projectstatus page
      */
  projectStatus() {
    this.router.navigate(["/projects/project/projectstatus"]);
  }

  communication() {
    this.router.navigate(["/notification/notification/projectcommunication"]);
  }
  /** 
        * @author:Madhu
        * @argument:project id
        * @description:get dat of project by project id
       */
  sendForApproval() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'sendForApproval' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.sendForApprovalDialogResult = result;
      if (this.sendForApprovalDialogResult == 'yes') {
        this.loading1 = true;
        var projectId = sessionStorage.getItem("projectIdForProjectProfile")
        this.httpClient.get(this.urlPort + "/api/milestone/allById/" + projectId, { withCredentials: true })
          .map(
            (response) => response
          )
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.dataOfProjectByProjectId = res;
            var milestoneId;
            if (this.dataOfProjectByProjectId.length > 0) {
              milestoneId = this.dataOfProjectByProjectId[0].milestoneId;
            }
            if (this.dataOfProjectByProjectId.length == 0) {
              milestoneId = 0;
            }
            // var actCount = this.dataOfProjectByProjectId[0].activityCount;
            var actCount = this.actCount;

            if (milestoneId && actCount > 0) {
              var status = 'Budgeted';
              var projId = projectId;
              var emptyData;
              this.httpClient.put(this.urlPort + "/api/projects/updateMilestoneStatus/" + projId + "/" + status, emptyData, { withCredentials: true })
                .catch((err) => {
                  var error = err["_body"]
                  if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                  } else {
                    var snackBar = this._translateService.instant("Failed To Send For Approval!!!");
                    this.openSnackBar(snackBar)

                  }
                  // this.notification.Info(err['_body']);
                  this.loading1 = false;
                  return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                  this.loading1 = false;
                  var snackBar = this._translateService.instant("Project Sent For Approval!!!");
                  this.openSnackBar(snackBar)
                  this.router.navigate([this.routeBack])
                  // this.router.navigate(["/expenses/expenses/viewexpenses"])
                  $('#approvalButtonForFoundation').hide();
                  $('#foundationApproveReject').hide();

                })
            } else {
              this.loading1 = false;
              var snackBar = this._translateService.instant('Activity should be added');
              this.openSnackBar(snackBar)
            }
          })

      } else if (this.sendForApprovalDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  /** 
          * @author:Madhu
          * @argument:data
          * @description:get data of BKCPublishproject by project id and status
         */
  publishProject(data) {
    var publishProject;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'publishProject' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.publishDialogResult = result;
      if (this.publishDialogResult == 'yes') {
        this.loading1 = true;
        publishProject = {
          remarks: sessionStorage.getItem("boardRemarks"),
          projectId: sessionStorage.getItem("projectIdForProjectProfile"),
          projectName: this.projectName,
          isPublished: 'true',
          isApproved:'true',
          status: 'Published'
        }
        this.httpClient.put(this.urlPort + "/api/projects/publishProject", publishProject, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackbar = this._translateService.instant("Project Not Published!!!");
              this.openSnackBar(snackbar)
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackbar = this._translateService.instant('Project Published');
            this.openSnackBar(snackbar)
            $('#publishProject').hide();
            this.router.navigate([this.routeBack])
          })

      } else if (this.publishDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })

  }
  /** 
    * @author:Madhu
    * @argument:data
    * @description:get data of updatedMilestoneStatus by project id ,status and emptyData
   */

  approveProject() {
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    var remarksData;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'projectApprove' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectApproveResult = result;
      if (this.projectApproveResult.ans == 'yes') {
        this.loading1 = true;
        remarksData = {
          remarks: this.projectApproveResult.remarks,
          projectId: projId,
          projectName: this.projectName,
          isPublished: 'false',
          isApproved:'true',
          status: 'Approved'
        }
        // var remarks = this.projectApproveResult
        this.httpClient.put(this.urlPort + "/api/projects/approveProject",remarksData, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;

            this.approvalResultForBoard = res;
            var index = this.approvalResultForBoard.errorCode;
            if (index == '2') {
              var approved = this._translateService.instant('Kindly ensure that all activities are approved!!');
              this.openSnackBar(approved)

            }
            else {
              var snack = this._translateService.instant("Project is successfully approved!");
              this.openSnackBar(snack)

            }
            this.router.navigate([this.routeBack])

          })
      } else if (this.projectApproveResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }
  rejectProject(statusFromBoard) {
    var status = statusFromBoard;
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    var remarksData;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'projectApprove' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectApproveResult = result;
      if (this.projectApproveResult.ans == 'yes') {
        this.loading1 = true;
        remarksData = {
          remarks: this.projectApproveResult.remarks
        }
        // var remarks = this.projectApproveResult
        this.httpClient.put(this.urlPort + "/api/projects/approveProject/" + projId + "/" + status, remarksData, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
            }
            this.loading1 = false;
            return Observable.throw(err)

          })
          .subscribe((res: Response) => {
            this.loading1 = false;

            this.approvalResultForBoard = res['status'];
            if (this.approvalResultForBoard == '200') {
              var snackBar = this._translateService.instant("Project is sent for rework!");
              this.openSnackBar(snackBar)

            }
            else {
              var approved = this._translateService.instant('Kindly ensure that all activities are approved!!');
              this.openSnackBar(approved)

            }
            this.router.navigate([this.routeBack])

          })
      } else if (this.projectApproveResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

  rejectMilestone(statusFromFoundation) {
    var status = statusFromFoundation;
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    var emptyData;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'projectReject' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectRejectResult = result;
      if (this.projectRejectResult != 'no') {
        this.loading1 = true;
        this.httpClient.put(this.urlPort + "/api/projects/updateMilestoneStatus/" + projId + "/" + status, emptyData, { withCredentials: true })
          .catch((err) => {
            // this.notification.Info(err['_body']);
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var remarks = this.projectRejectResult;
            var projId = sessionStorage.getItem("projectIdForProjectProfile");
            var emptyData;
            this.httpClient.put(this.urlPort + "/api/projects/updateMilestoneStatus/" + projId + "/" + status, emptyData, { withCredentials: true })
              .catch((err) => {
                // this.notification.Info(err['_body']);
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }
                this.loading1 = false;
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Project has been Rejected");
                this.openSnackBar(snackBar)
              })
          })

      } else if (this.projectRejectResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }


  /** 
         * @author:Madhu
         * @argument:none
         * @description:open scankbar
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

}
