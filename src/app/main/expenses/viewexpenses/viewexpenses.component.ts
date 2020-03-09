import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator,MatSort } from '@angular/material';
import { ComGoAnimations } from '@ComGo/animations';
import { environment } from '../../../../environments/environment';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Sort, MatTableDataSource } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ViewexpensesService } from './viewexpenses.service'
var introJS = require('intro.js')

@Component({
    selector: 'app-viewexpenses',
    templateUrl: './viewexpenses.component.html',
    styleUrls: ['./viewexpenses.component.scss'],
    animations: ComGoAnimations
})
export class ViewexpensesComponent implements OnInit {
    status;
    projectId;
    activityId;
    fundReq;
    dataSource;
    projName;
    activityStatus;
    fundGoal;
    role;
    deleteDialogResult;
    requestFundDialogResult;
    expenseStatus;
    expenseApproveDialogResult;
    expenseData = [];
    urlPort = environment.urlPort;
    dataOfExpenses = undefined;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    displayedColumns = ['ExpenseItem', 'Description', 'icons'];
    public loading1 = false;
    activityName;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    @ViewChild('filter')
    filter: ElementRef;
    userRules;

    constructor(
        private viewExpensesService: ViewexpensesService,
        private _ComGoConfigService: ComGoConfigService,
        private router: Router,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private _translateService: TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
        this.dataOfExpenses = this.expenseData.slice()
        this._ComGoConfigService.config = {
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /** 
     * @author:sagar
     * @argument:project id
     * @description:it is method to call function at initialize phase..calling get milestones list for specific project id
    */
    ngOnInit(): void {
        if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
            var rules = JSON.parse(sessionStorage.getItem("userRules"))
            this.userRules = rules[0]
            }
        this.expenseStatus = 0
        this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
        this.projName = sessionStorage.getItem("projectNameForProjectProfile");
        this.fundGoal = sessionStorage.getItem("projectFundGoalForProjectProfile");
        this.activityStatus = sessionStorage.getItem("activityStatusForProfile");
        this.activityId = sessionStorage.getItem("activityIdForProfile");
        this.role = sessionStorage.getItem("role");
        this.activityName = sessionStorage.getItem("activityName");
        this.getExpenses();
    }

    getExpense(expenseData){
    }

    startTour() {
        var intro: any = introJS.introJs();
        intro.setOption('tooltipPosition', 'auto');
        intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
        if (this.role == 'ngo') {
            if (this.expenseStatus == 0 && this.activityStatus == 'Fund Allocated') {
                intro.setOptions({
                    steps: [
                        {
                            element: '#viewExpensesRequestFund',
                            intro: 'NGO can request fund by clicking here.NGO gets this button only if all the expenses are approved by Foundation',
                        },
                        {
                            element: '#viewExpensesAddExpense',
                            intro: 'NGO can add expense by clicking here.After this Foundation needs to approve the expenses.',
                        },
                        {
                            element: '#viewExpensesSearch',
                            intro: 'User can filter the expense from here.',
                        },
                        {
                            element: '#viewExpensesBackward',
                            intro: 'User navigates back to previous page by clicking here.'
                        }
                    ],
                    showBullets: true,
                    showButtons: true,
                    exitOnOverlayClick: false,
                    keyboardNavigation: true,
                });
            } else if (this.activityStatus == 'Fund Allocated') {
                intro.setOptions({
                    steps: [
                        {
                            element: '#viewExpensesAddExpense',
                            intro: 'NGO can add expense by clicking here.',
                        },
                        {
                            element: '#viewExpensesSearch',
                            intro: 'User can filter the expense from here.',
                        },
                        {
                            element: '#viewExpensesBackward',
                            intro: 'User navigates back to previous page by clicking here.'
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
                            element: '#viewExpensesSearch',
                            intro: 'User can filter the expense from here.',
                        },
                        {
                            element: '#viewExpensesBackward',
                            intro: 'User navigates back to previous page by clicking here.'
                        }
                    ],
                    showBullets: true,
                    showButtons: true,
                    exitOnOverlayClick: false,
                    keyboardNavigation: true,
                });
            }
        } else {
            intro.setOptions({
                steps: [
                    {
                        element: '#viewExpensesSearch',
                        intro: 'User can filter the expense from here.',
                    },
                    {
                        element: '#viewExpensesBackward',
                        intro: 'User navigates back to previous page by clicking here.'
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

    getExpenses() {
            this.loading1 = true;

            /**
            * @author Kuldeep
            * @description This function will return all the Expenses of a activity
            */
            this.viewExpensesService.getExpenses().then(res=>{
                this.loading1 = false;
                    this.dataOfExpenses = res;
                    this.dataSource = new MatTableDataSource(this.dataOfExpenses);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
            }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    }

                    return Observable.throw(err)
                })
    }

    /** 
     * @author:sagar
     * @argument:operationalFlag
     * @description:it is method to open add milestone form
    */
    addNewExpense(): void {
        this.router.navigate(["/expenses/expenses/addexpense", { activityId: sessionStorage.getItem("activityIdForProfile"), purpose: 'Insert' }]);
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

    /** 
     * @author:sagar
     * @argument:operationalFlag
     * @description:it is method to open edit milestone form
    */
    forEditingExpense(index) {
        this.router.navigate(["/expenses/expenses/addexpense", { id: index._id, activityId: sessionStorage.getItem("activityIdForProfile"), purpose: 'Update' }]);

    }

    addProof(index) {
        sessionStorage.setItem("expenseId", index._id)
        this.router.navigate(["/proof/proof/addProof", { operationalFlag: 0, id: index._id, activityId: sessionStorage.getItem("activityIdForProfile") }]);

    }

    viewProof(index) {
        sessionStorage.setItem("expenseId", index._id)
        this.router.navigate(["/proof/proof/viewProof", { id: index._id, activityId: sessionStorage.getItem("activityIdForProfile") }]);

    }

    requestFund() {
        this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
        this.activityId = sessionStorage.getItem("activityIdForProfile");
        this.fundReq = Number(sessionStorage.getItem("activityFundRequested"));
        this.status = "Request Fund";
        
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'requestFund' }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.requestFundDialogResult = result;
            if (this.requestFundDialogResult == 'yes') {
                this.loading1 = true;
                var requestData = {
                activityId : sessionStorage.getItem("activityIdForProfile"),
                status : this.status,
                fundReq : this.fundReq,
                activityName : this.activityName,
                milestoneStatus : sessionStorage.getItem("milestoneStatusTillActivity"),
                projectStatus : sessionStorage.getItem("projectStatusForProjectProfile")
                }

                /**
                * @author Kuldeep
                * @param requestData is of type json contains activityId,status,Fund Amount,Activity Name, Milestone Status, Project Status
                * @description This function will request fund for activity
                */
                this.viewExpensesService.requestFund(requestData).then(res=>{
                    var fundRequested = this._translateService.instant('Fund Requested');
                        this.loading1 = false;
                        this.openSnackBar(fundRequested);
                        sessionStorage.setItem("backFromMilestone", "true")
                        this.router.navigate(['/pages/profile'])
                }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                })
            } else {
                this.loading1 = false;
                var snackBar = this._translateService.instant('operation cancelled!!!');
                this.openSnackBar(snackBar)
            }
        })
    }

//     requestFund() {

//         this.router.navigate(["/expenses/expenses/addexpense", { activityId: this.milestoneId, purpose: 'Insert' }]);
// }
    deleteDocument(document) {
        
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            data: { operation: 'delete' }
        });
        dialogRef.afterClosed().subscribe(result => {

            this.deleteDialogResult = result;
            if (this.deleteDialogResult == 'yes') {
                this.loading1 = true;

                /**
                * @author Kuldeep
                * @param id MongoId of a Expense
                * @description This function will delete the Expense
                */
                this.viewExpensesService.deleteExpense(document._id).then(res=>{
                    this.loading1 = false;
                        var snackbar = this._translateService.instant('Expense deleted!!!');
                        this.openSnackBar(snackbar)
                        this.ngOnInit();
                }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                })
            } else {
                this.loading1 = false;
                var snackBar = this._translateService.instant('operation cancelled!!!');
                this.openSnackBar(snackBar)
            }
        })
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

    backToMilestone() {
        sessionStorage.setItem("backFromMilestone", "true")
        this.router.navigate(['/pages/profile'])
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
        * @author:Madhu
        * @argument:data
        * @description:sorting 
       */
    sortData(sort: Sort) {
        const data = this.expenseData.slice();
        if (!sort.active || sort.direction == '') {
            this.dataOfExpenses = data;
            return;
        }
        this.dataOfExpenses = data.sort((a, b) => {
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

