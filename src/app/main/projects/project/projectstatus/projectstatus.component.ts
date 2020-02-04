import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projectstatus',
  templateUrl: './projectstatus.component.html',
  styleUrls: ['./projectstatus.component.scss'],
  animations: fuseAnimations
})
export class ProjectstatusComponent implements OnInit {
  fundGoal;
  dataSource;
  displayedColumns = ['milestone', 'activity', 'startDate', 'endDate', 'fund', 'status'];
  projectId;
  public project;
  projectOwner;
  public projectName;
  public loading1 = false;
  urlPort = environment.urlPort;
  public milestone: Array<any> = [];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;
  /**
   * @author: Madhu
   * @argument:none
   * @description:to fix position
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /** @param {Http}_http
      * @param {Router}_router
     * @param {FormBuilder} _formBuilder
     * @param {MatSnackBar} _matSnackBar
     */

  constructor(
    private httpClient : HttpClient,
    private router: Router,
    private _translateService:TranslateService,
    private _matSnackBar: MatSnackBar) { }
  ngOnInit() {
    this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
    this.fundGoal = sessionStorage.getItem("projectFundGoalForProjectProfile");
    /**
     * @author: sagar
     * @argument:none
     * @description:Get all data of donarlist
     */
    this.loading1 = true;
    this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + this.projectId, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get project status");
          
        }
        this.loading1 = true;
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        var milestoneArray = [];
        this.project = JSON.parse(res['data']);
        this.projectName = this.project.projectName;
        var milestones = this.project.milestones;
        this.projectOwner = this.project.projectOwner;
        if (milestones != 'null') {
          for (var i = 0; i < milestones.length; i++) {
            var activity = milestones[i].activities;
            var sum = 0;
            for (var j = 0; j < activity.length; j++) {
              var amount = 0;
              amount = parseFloat(activity[j].activityBudget);
              sum = sum + amount;
            }
            for (var j = 0; j < activity.length; j++) {
              var mySingleMilestone = {};
              mySingleMilestone["milestoneId"] = milestones[i].milestoneId;
              mySingleMilestone["fundBudgetedMil"] = sum;
              mySingleMilestone["fundBudgeted"] = activity[j].activityBudget;
              mySingleMilestone["fundAllocated"] = milestones[i].fundAllocated;
              mySingleMilestone["activityId"] = activity[j].activityId;
              mySingleMilestone["milestoneName"] = milestones[i].milestoneName;
              mySingleMilestone["activityName"] = activity[j].activityName;
              mySingleMilestone["startDate"] = activity[j].startDate;
              mySingleMilestone["endDate"] = activity[j].endDate;
              mySingleMilestone["validationCheck"] = activity[j].validation;
              mySingleMilestone["status"] = activity[j].status;
              if (milestones[i].fundAllocated > 0 && activity[j].status == 'Not Started') { //here
                mySingleMilestone["status"] = 'Fund Allocated';
              }
              var activityStatus = String(activity[j].status).trim();
              if (activityStatus == 'Request FundFund Released') {
                mySingleMilestone["status"] = 'Fund Released';
              } else if (activityStatus == 'Request Fund') {
                mySingleMilestone["status"] = 'Fund Requested';
              }
              milestoneArray.push(mySingleMilestone);
            }
          }
          this.milestone = milestoneArray;
          this.dataSource = new MatTableDataSource(this.milestone);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }
  /**
    * @author: Madhu
    * @argument:none
    * @description:filter function
    */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * @author:Madhu
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

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
