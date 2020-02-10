import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from 'environments/environment';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';

@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    animations: ComGoAnimations
})
export class ProfileTimelineComponent implements OnInit {
    displayedColumns = ['Activity', 'Validator', 'Status'];
    timeline: any;
    timeLine: Array<any> = [];
    tableData: any;
    activities: any;
    projectId: any;
    urlPort = environment.urlPort;
    public role;
    public status;
    fundBudgeted;
    public lat: number;
    public lng: number;
    public flagForProject;
    project;
    fundGoalBC;
    projectOwner;
    milestone;
    milestones;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    validators;
    public loading1 = false;
    currency;
    username;
    donated = 1;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private router: Router,
        private httpClient: HttpClient,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
        private _translateService: TranslateService
    ) {
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    ngOnInit(): void {
        this.timeLine = []
        this.projectOwner = sessionStorage.getItem("projectOwnerForProjectProfile");
        this.lat = 41.399115;
        this.lng = 2.160962;
        this.currency = sessionStorage.getItem('currencyTypeForProjectProfile');
        this.username = sessionStorage.getItem("username");
        this.flagForProject = sessionStorage.getItem("flagForProjectProfile");
        this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
        this.fundBudgeted = sessionStorage.getItem('fundBudgeted');
        this.role = sessionStorage.getItem('role');
        this.status = sessionStorage.getItem('projectStatusForProjectProfile');
        if (this.role == 'donor') {
            var data = {
                projectId: this.projectId,
                username: this.username
            }
            this.httpClient.post(this.urlPort + "/api/alldonor/getDonorProjectDonation", data, { withCredentials: true })
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
                        this.openSnackBar("Failed to get list of donor");
                    }
                    return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                    this.donated = 0;
                    if (res["length"] > 0) {
                        this.donated = 1;
                    }
                })
        }

        /**
         * @author: Madhu
         * @argument:none
         * @description:Get allAudit
         */
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/milestone/BKCGetAll/" + this.projectId, { withCredentials: true })
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
            .subscribe((res: any[]) => {
                this.activities = res.reverse();

                this._profileService.timelineOnChanged
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(timeline => {
                        this.timeline = timeline.activities;
                        for (var i = 0; i < this.activities.length; i++) {
                            this.tableData = {}
                            var date = this.activities[i].Timestamp.toString();
                            var year = date.slice(0, 4)
                            var month = date.slice(5, 7)
                            var day = date.slice(8, 10)
                            var time = date.slice(11, 19)
                            if (this.activities[i].Value.flag.startsWith('Partial Validation for Activity')) {
                                var str1 = this.activities[i].Value.flag;
                                var activityId = str1.split("-", 3);
                                this.tableData["Status"] = 'Partial Validation done for Activity ' + activityId[1] +' by '+activityId[2];
                            } else if (this.activities[i].Value.flag.startsWith('Validation for Activity')) {
                                var str2 = this.activities[i].Value.flag;
                                var activityId = str2.split("-", 3);
                                this.tableData["Status"] = 'Validation done for Activity ' + activityId[1] +' by '+activityId[2];
                            } else if (this.activities[i].Value.flag.startsWith('Funds transferred from')) {
                                var str3 = this.activities[i].Value.flag;
                                var activityId = str3.split("-", 4);
                                this.tableData["Status"] = 'Fund Transferred from ' + activityId[1] + ' to ' + activityId[2] + ' for Activity ' + activityId[3];
                            } else if (this.activities[i].Value.flag.startsWith('Donation')) {
                                this.tableData["Status"] = this.activities[i].Value.flag;
                            } else {
                                var str4 = this.activities[i].Value.flag;
                                var Stat = str4.split(" ", 3);
                                var status = Stat[0] + " " + Stat[2]
                                this.tableData["Status"] = this.activities[i].Value.flag
                            }
                            this.tableData["fundGoal"] = this.activities[i].Value.fundGoal;
                            this.tableData["projectBudget"] = this.activities[i].Value.projectBudget;
                            this.tableData["timeStamp"] = new Date(year + "/" + month + "/" + day + " " + time + " UTC");
                            this.tableData["txnId"] = this.activities[i].TxId;
                            this.tableData["fundRaised"] = this.activities[i].Value.fundRaised;
                            this.tableData["fundAllocated"] = this.activities[i].Value.fundAllocated;
                            this.tableData["avatar"] = "assets/images/avatars/alice.jpg";
                            this.tableData["media"] = "assets/images/examples/shiba2.jpg"
                            this.timeLine.push(this.tableData);
                        }
                    });

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
}
