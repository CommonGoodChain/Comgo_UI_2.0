import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { AlldonorService } from './alldonor.service'

@Component({
  selector: 'app-alldonor',
  templateUrl: './alldonor.component.html',
  styleUrls: ['./alldonor.component.scss'],
  animations: ComGoAnimations
})
export class AlldonorComponent implements OnInit {
  displayedColumns
  projectName;
  projectId;
  currencyType;
  dataSource;
  projectBudget;
  donation;
  cameFrom;
  fundGoal;
  fundRaised;
  fundAmount;
  donorData = [];
  urlPort = environment.urlPort;
  donorList = undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public loading1 = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;

  constructor(
    private alldonorService: AlldonorService,
    private httpClient: HttpClient,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService) {
    this.donorList = this.donorData.slice()
    this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
  }
  ngOnInit() {
    this.projectBudget = sessionStorage.getItem("projectProjectBudgetTillActivity")
    this.projectName = sessionStorage.getItem("projectNameForProjectProfile")
    this.fundGoal = sessionStorage.getItem("projectFundGoalForProjectProfile");
    this.fundRaised = sessionStorage.getItem("fundRaisedForProjectProfile");
    this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
    this.currencyType = sessionStorage.getItem("currencyType")
    this.cameFrom = sessionStorage.getItem("cameFrom");
    this.displayedColumns = ['donarAmount', 'amount', 'Document Name', 'Operation'];
    var data = {
      projectId: this.projectId
    }
    this.loading1 = true;
    /**
    * @author Kuldeep
    * @param It contains project Id in JSON format
    * @description This function will return All the Donations to a Project.
    */
    this.alldonorService.getAllDonorListDB(data).then(res =>{
      this.loading1 = false;
        this.donorList = res.reverse();
        this.dataSource = new MatTableDataSource(this.donorList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }).catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Donation is not done to this project");
            this.openSnackBar(snackBar);
          }
          return Observable.throw(err)
        })
    if (this.fundRaised == this.projectBudget) {
      this.donation = 1;
    } else {
      this.donation = 0;
    }
  }

  /**
  * @author: Madhu
  * @argument:operationFlag,projectname
  * @description:navigate to addsingleproject
  */
  addNewProject(): void {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 0, ProjectName: "comgo" }]);
  }

  /**
  * @author: Madhu
  * @argument:projectId,flag
  * @description:navigate to profile
  */
  showProjectDetails(val): void {
    this.router.navigate(["/pages/profile", { projectId: val, flag: 'DB' }]);
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
   * @author:Madhu
   * @argument:operationalFlag
   * @description:it is method to  edit addproject form
  */
  editProject(data): void {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: data.projectId }]);
  }

  /** 
   * @author:Madhu
   * @argument:projectId,projectName,fundGoal
   * @description:it is method to  navigate to viewmilestone form
  */
  viewMilestone(index) {
    sessionStorage.setItem("projectId", index.projectId);
    sessionStorage.setItem("projectName", index.projectName);
    sessionStorage.setItem("fundGoal", index.fundGoal);
    this.router.navigate(["/projects/milestone/viewmilestone", { projectId: index.projectId, projectName: index.projectName, fundGoal: index.fundGoal }]);
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

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
   * @author:Kuldeep
   * @description: Used to go to donor
   */
  towardsDonation() {
    var projectId = this.projectId;
    var projectName = this.projectName;
    this.fundAmount = this.projectBudget - this.fundRaised;
    this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donorName: sessionStorage.getItem("username") }])
  }

  towardsDonorInfo(data) {
    sessionStorage.setItem("DonorNameForDetails", data.aliasName)
    sessionStorage.getItem("projectCreatedBy")
    sessionStorage.getItem("DonorNameForDetails")
    this.router.navigate(["/user/user/register", { register: 'crm' }])
  }

  viewUserProfile(userData) {
    sessionStorage.setItem("backRoutes", '/donor/donor/alldonor')
    this.alldonorService.getUserDetails(userData).then(res =>{
      var userDetails = res;
      if (userDetails["userType"] == 'Private User') {
        this.router.navigate(["/user/user/userDetails", { username: userData.username }]);
      } else {
        this.router.navigate(["/user/user/userDetails", { username: userData.username }]);
      }
    }).catch((err) => {
      this.loading1 = false;
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      }
      // this.openSnackBar("Failed to get userDetails!!");
      return Observable.throw(err)
    })
  }

}
