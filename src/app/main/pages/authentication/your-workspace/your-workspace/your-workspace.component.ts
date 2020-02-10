import { Component, OnInit } from '@angular/core';
import { comgoConfigService } from '@comgo/services/config.service';
import {  ElementRef, ViewChild } from '@angular/core';
import { MatPaginator,MatSort } from '@angular/material';
import { comgoAnimations } from '@comgo/animations';
import { environment } from '../../../../../../environments/environment';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component'
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Sort, MatTableDataSource } from '@angular/material';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Http, Headers } from '@angular/http';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';
var introJS = require('intro.js')
@Component({
  selector: 'app-your-workspace',
  templateUrl: './your-workspace.component.html',
  styleUrls: ['./your-workspace.component.scss'],
  animations: comgoAnimations
})
export class YourWorkspaceComponent implements OnInit {
  dataSource;
  username;
  dataofOrganizations;
  expenseData = [];
  urlPort = environment.urlPort;
  angularIp = environment.angularIp;
  userOrganizations = undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns = ['OrganizationName', 'Domain', 'icons'];
  public loading1 = false;
  activityName;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;

  constructor(
      private router: Router,
      private _comgoConfigService: comgoConfigService,
      private httpClient: HttpClient,
      private http: Http,
      private route: ActivatedRoute,
      private _matSnackBar: MatSnackBar,
      public dialog: MatDialog,
      private _translateService: TranslateService,
      private _comgoTranslationLoaderService: comgoTranslationLoaderService
  ) {
      this._comgoTranslationLoaderService.loadTranslations(english, spanish);
      this.userOrganizations = this.expenseData.slice()
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
      this.getOrganizations();
  }


  getOrganizations() {
    this.username = this.route.snapshot.queryParams.username;
    var token = this.route.snapshot.queryParams.token;
          this.loading1 = true;
         var data = {
            username:this.username
          }
          // this.http.post(this.urlPort + "/api/users/yourWorkSpace", data, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
          this.http.post(this.urlPort + "/api/users/yourWorkSpace", data, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer '+token }) })
                .map(
                  (response) => response.json()
                )
                .catch((err) => {
                  if(err.status == 401){
                    this.openSnackBar("Token has been expired");
                    this.router.navigate(['/pages/auth/home-page'])
                  } else{
                  this.openSnackBar("Failed to get Organizations");
                  }
                  this.loading1 = false;
                  return Observable.throw(err)

                })
                .subscribe(res => {
                    this.loading1 = false;
            this.dataofOrganizations = res[0].Rules
          this.dataSource = new MatTableDataSource(this.dataofOrganizations);
        })
  }

  backToMilestone() {
      sessionStorage.setItem("backFromMilestone", "true")
      this.router.navigate(['/pages/profile'])
  }

  gotoWebsite(routerLink){
    var url = 'https://'+routerLink + '.ledgeropen.com/'
    window.location.href=url
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
