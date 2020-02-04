import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Sort, MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component'
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
var introJS = require('intro.js')

@Component({
  selector: 'app-viewactivity',
  templateUrl: './viewactivity.component.html',
  styleUrls: ['./viewactivity.component.scss'],
  animations: fuseAnimations
})
export class ViewactivityComponent implements OnInit {
  dataSource;
  dataOfActivityByMilestoneId;
  milestone;
  activities = [];
  milestoneId;
  milestoneName;
  role;
  projectId;
  fundGoal;
  projectName;
  deleteDialogResult;
  currency
  activityData = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  urlPort = environment.urlPort;
  displayedColumns = ['Activityname', 'StartDate', 'EndDate', 'Activitybudget', 'Operations'];
  public loading1 = false;

  /**
  * @author: Madhu
  * @argument:none
  * @description:to fix position
  * @param {TranslateService} _translateService
  */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarText;


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService
  ) {
    this.dataOfActivityByMilestoneId = this.activityData.slice()
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.loading1 = true;
    this.milestoneId = sessionStorage.getItem("milestoneIdTillActivity")
    this.role = sessionStorage.getItem("role")
    this.milestoneName = sessionStorage.getItem("milestoneNameTillActivity")
    this.projectId = sessionStorage.getItem("projectIdTillActivity");
    this.fundGoal = sessionStorage.getItem("projectFundGoalTillActivity");
    this.projectName = sessionStorage.getItem("projectNameTillActivity");
    this.currency = sessionStorage.getItem('currencyTypeForProjectProfile');


    /* author: Kuldeep
     * @argument:none
     * @description:Get BKC Data
     */
    this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + this.milestoneId, { withCredentials: true })
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
          var snackBar = this._translateService.instant("Failed to get activity");
          this.openSnackBar(snackBar)

        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        this.milestone = JSON.parse(res['data']);

        this.dataOfActivityByMilestoneId = this.milestone.activities;
        if (this.dataOfActivityByMilestoneId == null) {
          this.activities = [];
        } else {
          this.activities = this.dataOfActivityByMilestoneId;
        }
        this.dataOfActivityByMilestoneId.sort((a, b) =>  {
          return <any>new Date(a.startDate) - <any>new Date(b.startDate);
        });
        this.dataSource = new MatTableDataSource(this.dataOfActivityByMilestoneId);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  startTour() {
    var intro: any = introJS.introJs();
    intro.setOption('tooltipPosition', 'auto');
    intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
    intro.setOptions({
      steps: [
        {
          element: '#viewactivityAddActivity',
          intro: 'Foundation or NGO can add activity by clicking here.'
        },
        {
          element: '#viewactivitySearch',
          intro: 'User can filter the activity from here.'
        },
        {
          element: '#viewactivityBackward',
          intro: 'User navigates back to previous page by clicking here.'
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
    * @author:sagar
    * @argument:operationalFlag,milestoneId
    * @description:it is method to open add activity form
   */
  addNewActivity(): void {
    this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 0, milestoneId: this.milestoneId }]);
  }

  forAddingActivity(index) {
    this.router.navigate(["/projects/activity/viewactivity"]);
  }
  /** 
      * @author:sagar
      * @argument:operationalFlag,milestoneId and activityId
      * @description:it is method to update activity
     */

  forUpdatingActivity(index) {
    this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 1, milestoneId: this.milestoneId, activityId: index.activityId }]);
  }
  /** 
    * @author:sagar
    * @argument:indexId,milestoneId,activityId,projectId,milestoneName and ActivityName
    * @description:it is method to update activity
   */
  deleteActivity(index) {
    index.milestoneId = this.milestoneId;
    index.milestoneName = this.milestoneName;
    index.projectId = this.projectId;
    index.role = this.role;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'delete' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteDialogResult = result;
      if (this.deleteDialogResult == 'yes') {
        this.loading1 = true;
        this.httpClient.delete(this.urlPort + "/api/activity/" + index.activityId + "/" + index.projectId + "/" + index.milestoneId + "/" + index.milestoneName + "/" + index.activityName + "/" + index.role, { withCredentials: true })
          .map(
            (response) => response
          )
          .catch((err) => {

            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Activity Is Not deleted!!!");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackBar = this._translateService.instant("Activity Deleted!!!");
            this.openSnackBar(snackBar)
            this.ngOnInit()
          })
      } else {
        this.loading1 = false;

        if (sessionStorage.getItem("lang") == 'tr') {
          this.snackBarText = "¡¡¡Operación cancelada!!!";
        } else {
          this.snackBarText = "operation cancelled!!!";
        }
        this.openSnackBar(this.snackBarText)
      }
    })
  }
  /**
    * @author: Madhu
    * @argument:none
    * @description:filter function
    */

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  sessionSnackBar(data) {
    var snackBar = this._translateService.instant('End now');
    this._matSnackBar.open(data, snackBar, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /** 
   * @author:Madhu
   * @argument:none
   * @description:open SnackBar
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
      * @author:Madhu
      * @argument:data
      * @description:sorting 
     */
  sortData(sort: Sort) {
    const data = this.activityData.slice();
    if (!sort.active || sort.direction == '') {
      this.dataOfActivityByMilestoneId = data;
      return;
    }
    this.dataOfActivityByMilestoneId = data.sort((a, b) => {
      var isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Activityname': return compare(a.Activityname, b.Activityname, isAsc);
        case 'StartDate': return compare(+a.StartDate, +b.StartDate, isAsc);
        case 'EndDate': return compare(+a.EndDate, +b.EndDate, isAsc);
        case 'criteria': return compare(+a.criteria, +b.criteria, isAsc);
        case 'Validationcheck': return compare(+a.Validationcheck, +b.Validationcheck, isAsc);
        case 'Activitybudget': return compare(+a.Activitybudget, +b.Activitybudget, isAsc);
        case 'ProofRqd': return compare(+a.ProofRqd, +b.ProofRqd, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

