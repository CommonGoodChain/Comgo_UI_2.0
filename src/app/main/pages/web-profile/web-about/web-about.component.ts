import 'rxjs/add/operator/map';
import { ProfileService } from '../../profile/profile.service';
// import { config } from '../../../../../../config';
import { environment } from 'environments/environment'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/map';
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-web-about',
  templateUrl: './web-about.component.html',
  styleUrls: ['./web-about.component.scss']
})
export class WebAboutComponent implements OnInit {

  public loading1 = false;
  lang = "en";
  urlPort = environment.urlPort;
  regUrl = environment.regUrl;
  dataOfProjectByProjectId = [];
  dbRemarks;
  fundRaised;
  fundGoal;
  balance;
  percentage;
  projectBudget;
  j;
  k;
  pastEvents;
  dbStartDate;
  projectSupporters;
  dbEndDate;
  dbDescription;
  lat;
  lng;
  projectDocument;
  projectId;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private routerData: ActivatedRoute,
    private http: Http,
    private _http: HttpClient,
    private _translateService: TranslateService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) { }

  ngOnInit() {

    this.loading1 = true;
    this.routerData.queryParams.subscribe(params => {
      this.projectId = params['projectId'];

      // this.projectId = "Project1544594001098";

      var publishedProjectFilesWeb = {
        "projId": this.projectId
      }

      this.http.post(this.urlPort + "/api/projects/publishedProjectFilesWeb", publishedProjectFilesWeb, { withCredentials: true })
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          var snackBar = this._translateService.instant("Failed to get project files");
          this.openSnackBar(snackBar);

          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          var getData = res;
          var pastEventSet = [];
          var projectSupporterSet = [];
          var pastEventSetTableData;
          var projectSupporterTableData;
          var length = getData["length"]
          this.j = 0;
          this.k = 0;
          for (var i = 0; i < length; i++) {
            if (getData[i].projectRelation == 'Past Event') {
              if (this.j < 3) {
                pastEventSetTableData = getData[i];
                pastEventSet.push(pastEventSetTableData);
                this.j++;
              }
            }
            if (getData[i].projectRelation == 'Project Supporter') {
              if (this.k < 3) {
                projectSupporterTableData = getData[i];
                projectSupporterSet.push(projectSupporterTableData);
                this.k++;
              }
            }
          }
          this.pastEvents = pastEventSet;
          this.projectSupporters = projectSupporterSet;
          this.loading1 = false;
        })

      var allByProjIdWeb = {
        "projId": this.projectId
      }

      this.http.post(this.urlPort + "/api/projectdoc/allByProjIdWeb", allByProjIdWeb, { withCredentials: true })
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          this.loading1 = false;
          this.projectDocument = res;
        })

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
          this.dataOfProjectByProjectId.push(JSON.parse(res["_body"]));
          this.lat = parseFloat(this.dataOfProjectByProjectId[0].projectLoc.latitude);
          this.lng = parseFloat(this.dataOfProjectByProjectId[0].projectLoc.longitude);
          this.dbStartDate = this.dataOfProjectByProjectId[0].startDate
          this.dbEndDate = this.dataOfProjectByProjectId[0].endDate
          this.dbDescription = this.dataOfProjectByProjectId[0].description
          this.projectBudget = this.dataOfProjectByProjectId[0].projectBudget
          this.dbRemarks = this.dataOfProjectByProjectId[0].remarks;
          this.fundGoal = this.dataOfProjectByProjectId[0].fundGoal;
          this.fundRaised = this.dataOfProjectByProjectId[0].fundRaised;
          this.balance = this.dataOfProjectByProjectId[0].projectBudget - this.dataOfProjectByProjectId[0].fundRaised
          this.percentage = (this.fundRaised) * 100 / this.projectBudget
          this.loading1 = false;
        })
    });
  }


  towardsDonation() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'projectId': this.projectId }
    };
    this.router.navigate(['/pages/auth/login-2'], navigationExtras);
  }

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
