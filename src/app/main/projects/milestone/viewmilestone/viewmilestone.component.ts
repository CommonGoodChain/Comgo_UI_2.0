import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatSort } from '@angular/material';
import { ComGoAnimations } from '@ComGo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Sort, MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component'
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { TranslateService } from "@ngx-translate/core"
var introJS = require('intro.js')

@Component({
    selector: 'app-viewmilestone',
    templateUrl: './viewmilestone.component.html',
    styleUrls: ['./viewmilestone.component.scss'],
    animations: ComGoAnimations
})
export class ViewmilestoneComponent implements OnInit {
    dataOfMilestoneByProjectId;
    projectId;
    projectName;
    role;
    dataSource;
    milestoneAll = [];
    projectsAll;
    fundGoal;
    currencyType;
    milestoneData = [];
    deleteDialogResult;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    urlPort = environment.urlPort;
    displayedColumns = ['Milestone', 'StartDate', 'EndDate', 'operations'];
    public loading1 = false;
    /**
  * @author: Madhu
  * @argument:none
  * @description:to fix position
  */
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private http: Http,
        private routerData: ActivatedRoute,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
        private _translateService: TranslateService
    ) {
        this.dataOfMilestoneByProjectId = this.milestoneData.slice(),
            this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    }
    /** 
     * @author:sagar
     * @argument:project id
     * @description:it is method to call function at initialize phase..calling get milestones list for specific project id
    */
    ngOnInit(): void {
        this.loading1 = true;
        this.currencyType = sessionStorage.getItem('currencyType')
        this.role = sessionStorage.getItem('role')
        this.projectId = sessionStorage.getItem('projectIdTillActivity');
        this.projectName = sessionStorage.getItem('projectNameTillActivity');
        this.fundGoal = sessionStorage.getItem('projectFundGoalTillActivity');


        /**
* @author: Kuldeep
* @argument:none
* @description:Get BKC Data
*/
        this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + this.projectId, { withCredentials: true })
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
                    var snackBar = this._translateService.instant("Failed to get milestones");
                    this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
            })
            .subscribe((res: any[]) => {
                this.projectsAll = JSON.parse(res['data'])
                this.loading1 = false;
                if (this.projectsAll.milestones == null) {
                    this.milestoneAll = [];
                } else {
                    this.milestoneAll = this.projectsAll.milestones;
                }
                this.milestoneAll.sort((a, b) =>  {
                    return <any>new Date(a.startDate) - <any>new Date(b.startDate);
                  });
                this.dataSource = new MatTableDataSource(this.milestoneAll);
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
                    element: '#viewMilestoneAddMilestone',
                    intro: 'Foundation or NGO can add milestone by clicking here.'
                },
                {
                    element: '#viewMilestoneSearch',
                    intro: 'User can filter the milestone from here.',
                    position: 'right'
                },
                {
                    element: '#viewMilestoneBackward',
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
     * @argument:operationalFlag
     * @description:it is method to open add milestone form
    */
    addNewMilestone(): void {
        this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 0, projectId: this.projectId }]);
    }

    /** 
     * @author:sagar
     * @argument:none
     * @description:it is method to open view activity page
    */
    forAddingActivity(index) {
        sessionStorage.setItem("milestoneIdTillActivity", index.milestoneId);
        sessionStorage.setItem("milestoneNameTillActivity", index.milestoneName);
        sessionStorage.setItem("startDateForActivity", index.startDate);
        sessionStorage.setItem("endDateForActivity", index.endDate);
        sessionStorage.setItem("milestoneIdForValidator", index.milestoneId);
        this.router.navigate(["/projects/activity/viewactivity"]);
    }

    /** 
     * @author:sagar
     * @argument:operationalFlag
     * @description:it is method to open edit milestone form
    */
    forEditingMilestone(index) {
        sessionStorage.setItem("milestoneIdTillActivity", index.milestoneId);
        this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 1, projectId: this.projectId }]);
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
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    /** 
         * @author:sagar
         * @argument:milestone id
         * @description:it is method to open delete milestone by id
        */
    onDelete(index) {
        index.projectId = this.projectId
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
                this.httpClient.delete(this.urlPort + "/api/milestone/" + index._id + "/" + index.projectId + "/" + index.milestoneId + "/" + index.milestoneName + "/" + index.role, { withCredentials: true })
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
                            var snackBar = this._translateService.instant("Failed to delete milestone");
                            this.openSnackBar(snackBar)
                        }
                        var snackBar = this._translateService.instant("Milestone is not deleted!!!");
                        this.openSnackBar(snackBar)
                        return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                        this.loading1 = false;
                        var snackBar = this._translateService.instant("Milestone Deleted ");
                        this.openSnackBar(snackBar)
                        this.ngOnInit();
                    })
            } else {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Operation cancelled!!!");
                this.openSnackBar(snackBar);
            }
        })
    }
    /**
   * @author:Madhu
   * @description: Open snackBar
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
        const data = this.milestoneData.slice();
        if (!sort.active || sort.direction == '') {
            this.dataOfMilestoneByProjectId = data;
            return;
        }
        this.dataOfMilestoneByProjectId = data.sort((a, b) => {
            var isAsc = sort.direction == 'asc';
            switch (sort.active) {
                case 'Milestone': return compare(a.Milestone, b.Milestone, isAsc);
                case 'StartDate': return compare(+a.StartDate, +b.StartDate, isAsc);
                case 'EndDate': return compare(+a.EndDate, +b.EndDate, isAsc);
                case 'BudgetedAmount': return compare(+a.BudgetedAmount, +b.BudgetedAmount, isAsc);
                case 'ActivityCount': return compare(+a.ActivityCount, +b.ActivityCount, isAsc);
                default: return 0;
            }
        });
    }
}
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

