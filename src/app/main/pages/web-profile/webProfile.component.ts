import { Component } from '@angular/core';
import {  Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { comgoAnimations } from '@comgo/animations';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { comgoConfigService } from '@comgo/services/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'profile',
    templateUrl: './web-profile.component.html',
    styleUrls: ['./web-profile.component.scss'],
    animations: comgoAnimations
})

export class WebProfileComponent {
    projectName;
    project;
    ngoName;
    urlPort = environment.urlPort;
    imageUrl = environment.imageUrl;
    profileImageUrl = environment.profileImageUrl;

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    dataOfProjectByProjectId;
    file;
    sdg = [];
    SDGType;
    public projectId;
    public imageName;
    imageCollection;
    sdgUrl;
    imageExtenstion;
    default
    filesToUpload
    projectOwner
    defaultImageUrl
    bgImageUrl;
    public loading1 = false;
    addDialogResult;
    cancelDialogResult;
    defaultImg = environment.defaultImage;
    lang;
    donated = 1;
    dbStartDate;
    dbEndDate;
    dbDescription;
    projectBudget;
    dbRemarks;

    /**
     * Constructor
     */
    constructor(
        private _comgoConfigService: comgoConfigService,
        private router: Router,
        private http: Http,
        private _http: HttpClient,
        private _matSnackBar: MatSnackBar,
        private routerData: ActivatedRoute,
        public dialog: MatDialog,
        private _translateService: TranslateService,
        private _comgoTranslationLoaderService: comgoTranslationLoaderService
    ) {
        // Configure the layout
        this._comgoConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        }
        this._comgoTranslationLoaderService.loadTranslations(english, spanish);
    }
    ngOnInit() {
        this.routerData.queryParams.subscribe(params => {
            this.projectId = params['projectId'];
            // this.projectId = "Project1544594001098"
            this.lang = "en";
            // this.projectName = "kf sports";
            this.default = '/DefaultImage/default.jpg';
            this.defaultImageUrl = this.imageUrl + this.default;

            if (this.lang == 'en' || this.lang == null) {
                this.sdgUrl = "assets/SDG/";
                this.imageExtenstion = ".png";
            } else {
                this.sdgUrl = "assets/SDGSpanish/";
                this.imageExtenstion = ".jpg";
            }

            this.loading1 = true;
            // var projId = "Project1544594001098";


            var BKCAllByParamsData = {
                "projId": this.projectId
            }
            this.http.post(this.urlPort + "/api/projects/BKCGetAllDetailsByParamsWeb", BKCAllByParamsData, { withCredentials: true })
            .catch((err) => {
                    this.openSnackBar("Failed to get Project Details");
                    this.loading1 = false;
                    return Observable.throw(err)
                })
                .subscribe(res => {
                    this.loading1 = false;
                    this.dataOfProjectByProjectId = JSON.parse(res["_body"])
                    var dataSDGT = this.dataOfProjectByProjectId.SDG;
                    var sdgArr = []
                    if (dataSDGT.length < 10) {
                        this.SDGType = this.dataOfProjectByProjectId.SDG
                    } else {
                        for (var i = 0; i < 10; i++) {
                            sdgArr.push(dataSDGT[i])
                        }
                        this.SDGType = sdgArr
                    }
                    this.projectName = this.dataOfProjectByProjectId.projectName;
                    this.ngoName = this.dataOfProjectByProjectId.projectOwner
                    this.projectOwner = this.dataOfProjectByProjectId.projectOwner;
                    localStorage.setItem("longitudeProjectProfile", this.dataOfProjectByProjectId.transactionLoc.longitude);
                    localStorage.setItem("lattitudeForProjectProfile", this.dataOfProjectByProjectId.transactionLoc.latitude);
                    var arr = [];
                    for (var i = 0; i < this.dataOfProjectByProjectId.projectOwner.length; i++) {
                        arr.push(this.dataOfProjectByProjectId.projectOwner[i].OrgName)
                    }
                    this.ngoName = arr
    
                    this.projectOwner = this.dataOfProjectByProjectId.projectOwner;

                })

            var allByProjIdWebData = {
                "projId": this.projectId
            }
            this.http.post(this.urlPort + "/api/projectImage/allByProjIdWeb", allByProjIdWebData, { withCredentials: true })
                .catch((err) => {
                    this.bgImageUrl = ''
                    var snackBar = this._translateService.instant("Failed to get Project Image");
                    this.openSnackBar(snackBar);
                    this.loading1 = false;
                    return Observable.throw(err)
                })
                .subscribe(res  => {
                    var response = JSON.parse(res["_body"])
                    if (response == '') {
                        this.bgImageUrl = ''
                    }
                    else {
                        this.imageCollection = JSON.parse(res["_body"]);
                        this.imageName = this.imageCollection[this.imageCollection.length - 1].imageName;
                        this.bgImageUrl = this.imageUrl + '/' + this.projectId + '/' + 'img1';
                    }
                    this.loading1 = false;
                })
        })

    }

    /** 
       * @author:sagar
       * @argument:string
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

    sessionSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}


