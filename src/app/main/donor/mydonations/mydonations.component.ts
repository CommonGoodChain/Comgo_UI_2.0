import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { MatPaginator,MatSort } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TranslateService} from '@ngx-translate/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { MydonationsService } from './mydonations.service'

@Component({
  selector: 'app-mydonations',
  templateUrl: './mydonations.component.html',
  styleUrls: ['./mydonations.component.scss'],
  animations: ComGoAnimations
})
export class MydonationsComponent implements OnInit {

  displayedColumns
  urlPort = environment.urlPort;
  currency;
  dataSource;
  username;
  donationInfo;
  donorData = [];
  donorList = undefined;
  public loading1 = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;
  
  /**
   * @author: Kuldeep
   * @argument:none
   * @description:to fix position
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private myDonationsService: MydonationsService,
    private _ComGoConfigService: ComGoConfigService,
    private httpClient : HttpClient,
    private router: Router,
    private _translateService: TranslateService,
    private _matSnackBar: MatSnackBar, ) {
    this.donorList = this.donorData.slice()
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
  
  ngOnInit() {
    sessionStorage.setItem("userRules", '')
    this.loading1 = true;
    this.currency = sessionStorage.getItem('currencyTypeForProjectProfile');
    this.username = sessionStorage.getItem("username")
    this.displayedColumns = ['donorName','projectName', 'amount','operations'];

    var userdata = {
      userName: sessionStorage.getItem("username")
    }
    this.myDonationsService.getMyDonations(userdata).then(res => {
      this.loading1 = false;
        this.donationInfo = res.reverse();
        this.dataSource = new MatTableDataSource(this.donationInfo);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }).catch((err) => {
      this.loading1 = false;
      var error = err["_body"]
        if(error == "session expired"){
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }else{
          var snackBar = this._translateService.instant("Failed to get list of donor");
          this.openSnackBar(snackBar);          
        }
      return Observable.throw(err)
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

  audit(index) {
    this.loading1 = true;
    console.log("index: ",index)
    /**
    * @author Kuldeep
    * @description This function will return project Details
    */
    this.myDonationsService.getProjectDetails(index.projectId).then(res => {
      var projectData = res
      console.log("projectData: ",projectData["SDG"])
      var sdg = JSON.stringify(projectData["SDG"])
          sessionStorage.setItem("SDG",sdg)
          sessionStorage.setItem("projectProjectBudgetTillActivity", projectData["projectBudget"]);
          sessionStorage.setItem("projectCreatedBy", projectData["createdBy"]);
          sessionStorage.setItem("boardRemarks", projectData["remarks"]);
          sessionStorage.setItem("descriptionForProjectProfile", projectData["description"]);
          sessionStorage.setItem("startDateForMilestone", projectData["startDate"]);
          sessionStorage.setItem("endDateForMilestone", projectData["endDate"]);
          sessionStorage.setItem("flagForProjectProfile", "db");
          sessionStorage.setItem("projectIdForProjectProfile", projectData["projectId"]);
          sessionStorage.setItem("projectNameForProjectProfile", projectData["projectName"]);
          sessionStorage.setItem("projectFundGoalForProjectProfile", projectData["fundGoal"]);
          sessionStorage.setItem("projectOwnerForProjectProfile", projectData["owner"]);
          sessionStorage.setItem("currencyTypeForProjectProfile", projectData["currency"]);
          sessionStorage.setItem("latForProjectProfile", projectData["projectLoc"].latitude);
          sessionStorage.setItem("lngForProjectProfile", projectData["projectLoc"].longitude);
          sessionStorage.setItem("fundRaisedForProjectProfile", projectData["fundRaised"]);
          sessionStorage.setItem("projectStatusForPublish", projectData["isPublished"]);
          sessionStorage.setItem("approveStatusForPublish", projectData["isApproved"]);
          sessionStorage.setItem("fundAllocationType", projectData["fundAllocationType"]);
          sessionStorage.setItem("fundNotAllocated",projectData["fundNotAllocated"])
          sessionStorage.setItem("projectStatusForProjectProfile", projectData["status"]);
          sessionStorage.setItem('organization',JSON.stringify(projectData["organization"]))
          sessionStorage.setItem('backRoute','/donor/donor/mydonations')
          this.loading1 = false;
          this.router.navigate(['/pages/profile', { flag: 'BC'}])
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
}