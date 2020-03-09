import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ComGoAnimations } from '@ComGo/animations';
import { MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { ViewProofService } from './view-proof.service'
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
var introJS = require('intro.js')
import { ComGoConfigService } from '@ComGo/services/config.service';
@Component({
    selector: 'app-view-proof',
    templateUrl: './view-proof.component.html',
    styleUrls: ['./view-proof.component.scss'],
    animations: ComGoAnimations
})
export class ViewProofComponent implements OnInit {
    dataOfProof;
    activityId;
    milestoneId;
    length = 0;
    projectId;
    defaultCategory;
    expenseId;
    filteredProjects;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    dataToShow;
    urlPort = environment.urlPort;
    currencyType;
    getDocTypes;
    proofData = [];
    proofFilteredByCategory: any[];
    dataSource;
    displayedColumns = ['Proof Type', 'Document Name', 'Doc Type', 'Remarks','Operation'];
    public loading1 = false;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    constructor(
        private viewProofService: ViewProofService,
        private _ComGoConfigService: ComGoConfigService,
        private router: Router,
        private routerData: ActivatedRoute,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private _translateService: TranslateService,
    ) {
        this.dataOfProof = this.proofData.slice()
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
        this.defaultCategory = 'All'
        this.expenseId = sessionStorage.getItem("expenseId")
        this.currencyType = sessionStorage.getItem("currencyTypeForProjectProfile")
        this.activityId = sessionStorage.getItem("activityIdForProfile")
        this.milestoneId = sessionStorage.getItem("milestoneIdTillActivity")
        this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
        
        /**
 * @author Kuldeep
 * @description This function will return Document Type of Proof.
 */
        this.viewProofService.getDocType()
            .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                }
                return Observable.throw(err)
            })
            .then(res => {
                this.getDocTypes = res;
            })
        if (this.activityId) {
            this.loading1 = true;

            /**
            * @author Kuldeep
            * @param activityId Activity Id of a Activity
            * @param projectId Project Id of a Project
            * @description This function will return all the Submitted Proof.
            */
            this.viewProofService.getAllProofs(this.activityId, this.projectId)
                .catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                })
                .then(res => {
                    this.loading1 = false;
                    // this.notification.Success(res['response']);
                    // this.router.navigate(['/components/collections'])
                    this.dataToShow = res;
                    var tableData = [];
                    for (var i = 0; i < this.dataToShow.length; i++) {
                        if (this.dataToShow[i].expenseId == this.expenseId) {
                            tableData.push(this.dataToShow[i]);
                        }
                    }
                    this.dataOfProof = tableData;
                    this.proofFilteredByCategory = this.dataOfProof
                    this.dataSource = new MatTableDataSource(this.dataOfProof);
                    this.length = this.proofFilteredByCategory.length
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                })
        }
    }

    /** 
     * @author:kuldeep
     * @argument:index
     * @description:it is method which navigates to edit proof page.
    */
    forUpdatingProof(index) {
        this.router.navigate(["/proof/proof/addProof", { proofId: index._id,operationalFlag: 1,id: this.routerData.snapshot.paramMap.get('id'), activityId: sessionStorage.getItem("activityIdForProfile") }]);
      }

    startTour() {
        var intro: any = introJS.introJs();
        intro.setOption('tooltipPosition', 'auto');
        intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
        intro.setOptions({
            steps: [
                {
                    element: '#viewproofSearch',
                    intro: 'User can filter the proof from here.'
                },
                {
                    element: '#viewproofBackward',
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
    * @author: Madhu
    * @argument:none
    * @description:filter function
    */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        // if (this.dataSource.paginator) {
        //     this.dataSource.paginator.firstPage();
        // }
        const searchTerm = filterValue.toLowerCase();

    // Search
    // if (searchTerm === '') {
    //   this.filteredProjects = this.proofFilteredByCategory;
    //   this.dataSource = new MatTableDataSource(this.filteredProjects);
    //   this.dataSource.sort = this.sort;
    // } else {
    //   this.filteredProjects = this.proofFilteredByCategory.filter((proof) => {
    //     return proof.proofType.toLowerCase().includes(searchTerm);
    //   });
    //   this.dataSource = new MatTableDataSource(this.filteredProjects);
    //   this.dataSource.sort = this.sort;
    // }
    }

    documentCategory(event) {
        var currentCategory = event.value
        if(currentCategory == "All"){
            this.proofFilteredByCategory = this.dataOfProof
        this.dataSource = new MatTableDataSource(this.proofFilteredByCategory);
        this.length = this.proofFilteredByCategory.length;
        this.dataSource.sort = this.sort;
        } else {
        this.proofFilteredByCategory = this.dataOfProof.filter((proof) => {
            return proof.docType === currentCategory;
        })
        this.length = this.proofFilteredByCategory.length;
        this.dataSource = new MatTableDataSource(this.proofFilteredByCategory);
        this.dataSource.sort = this.sort;
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

    openSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}

