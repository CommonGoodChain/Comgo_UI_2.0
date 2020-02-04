import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import {  ElementRef, ViewChild } from '@angular/core';
import { MatPaginator,MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../../environments/environment';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {  MatTableDataSource } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Http, Headers } from '@angular/http';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
var introJS = require('intro.js')
@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
  animations: fuseAnimations
})
export class MyOrganizationsComponent implements OnInit {
  dataSource;
  username;
  dataofOrganizations = [];
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
  getOrgData: any;

  constructor(
      private router: Router,
      private _fuseConfigService: FuseConfigService,
      private httpClient: HttpClient,
      private http: Http,
      private route: ActivatedRoute,
      private _matSnackBar: MatSnackBar,
      public dialog: MatDialog,
      private _translateService: TranslateService,
      private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
      this._fuseTranslationLoaderService.loadTranslations(english, spanish);
      this.userOrganizations = this.expenseData.slice()
      this._fuseConfigService.config = {
        layout: {
            footer: {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
    };
    //   this._fuseConfigService.config = {
    //     layout: {
    //         navbar: {
    //             hidden: true
    //         },
    //         toolbar: {
    //             hidden: true
    //         },
    //         footer: {
    //             hidden: true
    //         },
    //         sidepanel: {
    //             hidden: true
    //         }
    //     }
    // };
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
    var token = sessionStorage.getItem('token');
    console.log("sessionStorage.getItem('token') :",sessionStorage.getItem('token'))
    this.http.get(this.urlPort + "/api/projectcommunication/GetAllReceiveEmail", { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer '+token }) })
    .map(
      (response) => response
    )
    .catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      }
      return Observable.throw(err)
    })
    .subscribe(res => {
    })
    
    this.username = sessionStorage.getItem('username');
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
                    this.router.navigate(['/pages/auth/login-2'])
                  } else{
                  this.openSnackBar("Failed to get Organizations");
                  }
                  this.loading1 = false;
                  return Observable.throw(err)

                })
                .subscribe(res => {
                    this.loading1 = false;
            this.dataofOrganizations = res[0].Rules
            var dataofOrganizations  = res[0].Rules
          this.dataSource = new MatTableDataSource(dataofOrganizations);
          // this.http.get(this.urlPort + "/api/users/getAllOrganizations", { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
          // .map(
          //   (response) => response.json()
          // )
          // .subscribe(res => {
          // console.log("getAllOrganizations: ",res)
          // var allOrgs = res;
          // for(var i=0;i < dataofOrganizations.length; i++){
          //   console.log("organizations domain:",dataofOrganizations[i].orgName)
          //   var orgName = dataofOrganizations[i].orgName;
          //   this.getOrgData = allOrgs.filter(org => org.orgName.toLowerCase().indexOf(orgName.toLowerCase()) > -1);
          // }
          // console.log("getAllOrganizations data: ",this.dataofOrganizations)
          // })
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

viewUserPermissions(data){
    var username = sessionStorage.getItem('username')
    sessionStorage.setItem("rulesSetToUser", username)
    sessionStorage.setItem("userRulesOrg",data.orgName)
    this.router.navigate(["/user/user/userRules", { backTo: '/user/user/myOrganization'}]);
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
