import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import * as $ from 'jquery';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
  animations: fuseAnimations
})
export class AddactivityComponent implements OnInit {
  form: FormGroup;
  operationalFlag;
  detailsOfValidators;
  createdBy;
  urlPort = environment.urlPort;
  activitySum = 0;
  financialValidators;
  activityName;
  isApproved;
  remarks;
  userRules;
  activityData;
  anotherArray = [];
  financialValidatorsArray = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public loading1 = false;
  public maxDate;
  public minDate;

  constructor(private _formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private httpClient : HttpClient,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    public dialog: MatDialog) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
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
  }

  ngOnInit() {
    if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
      }
    this.operationalFlag = this.routerData.snapshot.paramMap.get('operationalFlag');
    /**
   * @author: Madhu
   * @argument:none
   * @description:Date Validation
   */
    var activityStartDate = sessionStorage.getItem("startDateForActivity");
    var activityEndDate = sessionStorage.getItem("endDateForActivity");
    this.createdBy = sessionStorage.getItem("createdBy");
    this.minDate = new Date(activityStartDate);
    this.maxDate = new Date(activityEndDate);
    /** 
        * @author:Sagar
        * @argument:none
        * @description:form Validation
       */

    this.form = this._formBuilder.group({
      activityName: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{2,60}")]],
      startDate: [''],
      endDate: [''],
      technicalCriteria: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,500}")]],
      financialCriteria: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,20}")]],
      activityBudget: ['', [Validators.pattern("[0-9]{1,15}")]],
      secondaryValidation: [''],
      validatorId: ['',],
      financialValidator:['']
    });
    //End

    /**
   * @author: Kuldeep
   * @description:Used to get all activities related data;
   */
    this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + sessionStorage.getItem("projectIdForProjectProfile"), { withCredentials: true })
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
        var data = JSON.parse(res['data']);
        var milestones = data.milestones;
        for (var j = 0; j < milestones.length; j++) {
          var activities = milestones[j].activities;
          for (var i = 0; i < activities.length; i++) {
            if (activities[i].activityId !== this.routerData.snapshot.paramMap.get('activityId')) {
              this.activitySum = this.activitySum + activities[i].activityBudget;
            }
          }
        }
        this.loading1 = false;
      })
    //End

    /**
   * @author: Sagar
   * @argument:none
   * @description:get data of Validator
   */
  var organizations = JSON.parse(sessionStorage.getItem("organization"))
  var arr = []
  for(var i = 0;i<organizations.length; i++){
    arr.push(organizations[i].OrgName)
  }
        this.httpClient.get(this.urlPort + "/api/users/getAllValidator/"+sessionStorage.getItem("username")+"/"+JSON.stringify(arr), { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
            }else{
              var snackBar = this._translateService.instant(this.userRules.orgName + " organization has no validators");
            this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
        var getData = res;
        var set = []
        this.detailsOfValidators = getData;
        this.anotherArray = this.detailsOfValidators;
        this.financialValidators = getData;
        this.financialValidatorsArray = this.financialValidators
          })
    this.operationalFlag = this.routerData.snapshot.paramMap.get('operationalFlag');

    if (this.operationalFlag == 1) {
      this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/activity/getActivityById/" + this.routerData.snapshot.paramMap.get('activityId'), { withCredentials: true })
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
        .subscribe(res => {
          var result:any
          result = res
          var dataOfActivityByMilestoneId:any
          dataOfActivityByMilestoneId = result
          this.loading1 = false;
          if(dataOfActivityByMilestoneId.fundAllocated > 0){
            $("#activityBudget").attr("disabled",true)
          }else{
            $("#activityBudget").attr("disabled",false)
          }
          this.activityData = result;
          console.log("this.activityData: ",this.activityData)
          this.activityName = dataOfActivityByMilestoneId.activityName
          this.form.controls['activityName'].setValue(dataOfActivityByMilestoneId.activityName);
          this.form.controls['startDate'].setValue(dataOfActivityByMilestoneId.startDate);
          this.form.controls['endDate'].setValue(dataOfActivityByMilestoneId.endDate);
          this.form.controls['activityBudget'].setValue(dataOfActivityByMilestoneId.activityBudget);
          this.form.controls['secondaryValidation'].setValue(dataOfActivityByMilestoneId.secondaryValidation);
          var validators = dataOfActivityByMilestoneId.validatorId.split("-", 2);
          this.form.controls['validatorId'].setValue(String(validators[0]));
          this.form.controls['financialValidator'].setValue(String(validators[1]));
          this.form.controls['technicalCriteria'].setValue(dataOfActivityByMilestoneId.technicalCriteria);
          this.form.controls['financialCriteria'].setValue(dataOfActivityByMilestoneId.financialCriteria);
          this.loading1 = false;
          this.isApproved = dataOfActivityByMilestoneId.isApproved
          this.remarks =  dataOfActivityByMilestoneId.remarks
        })
    }

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
  /** 
          * @author:Sagar
          * @argument:activityData
          * @description:Add Activity
         */

  addActivityData(activityData) {
    activityData.role = sessionStorage.getItem("role");
    if (Number(sessionStorage.getItem("projectProjectBudgetTillActivity")) >= activityData.activityBudget && Number(sessionStorage.getItem("projectProjectBudgetTillActivity")) >= this.activitySum + activityData.activityBudget) {
      var activityData = activityData;
      if (activityData.startDate < activityData.endDate) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'add' }
        });
        dialogRef.afterClosed().subscribe(result => {
          var addDialogResult;
          addDialogResult = result;
          if (addDialogResult == 'yes') {
            this.loading1 = true;
            var newActivityData = activityData;
            newActivityData.milestoneId = this.routerData.snapshot.paramMap.get('milestoneId');
            newActivityData.projectId = sessionStorage.getItem("projectIdForProjectProfile");;
            newActivityData.validatorId = newActivityData.validatorId+"-"+newActivityData.financialValidator
            var validators = activityData.validatorId.split("-", 2);
          if (validators[0] && validators[1]) {
            newActivityData.secondaryValidation = 'true';
          } else {
            newActivityData.secondaryValidation = 'false';
          }
          newActivityData.remarks = 'No Remarks Added'
          newActivityData.isApproved = 'false'
          newActivityData.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
          newActivityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile");
          this.httpClient.post(this.urlPort + "/api/activity/create", newActivityData, { withCredentials: true })
              .map(
                (response) => response
              )
              .catch((err) => {
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                }else{
                  var snackBar = this._translateService.instant("Failed to Create Activity");
            this.openSnackBar(snackBar)
                
                }
                this.loading1 = false;
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Activity added successfully!!!");
            this.openSnackBar(snackBar)
                sessionStorage.setItem("backFromMilestone", "true")
                this.router.navigate(["/pages/profile"]);
                sessionStorage.setItem('flagForHitAPI', '1')

              })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })

      }
      else {
        this.openSnackBar("EndDate should be greater than StartDate!!!")
      }

    } else {
      var snackBar = this._translateService.instant('Activity budget should not be greater than Project Budget');
        this.openSnackBar(snackBar)
    }
  }
  editActivityData(activityData) {
    var activityData = activityData;
    activityData.startDate = new Date(activityData.startDate);
    activityData.endDate = new Date(activityData.endDate);
    if (Number(sessionStorage.getItem("projectProjectBudgetTillActivity")) >= activityData.activityBudget && Number(sessionStorage.getItem("projectProjectBudgetTillActivity")) >= this.activitySum + activityData.activityBudget) {
      if (activityData.startDate < activityData.endDate) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: "update" }
        });
        dialogRef.afterClosed().subscribe(result => {
          var updateDialogResult;
          updateDialogResult = result;
          if (updateDialogResult == 'yes') {
            this.loading1 = true;
            var detailsOfActivity;
            activityData.projectId = sessionStorage.getItem("projectIdForProjectProfile");
            activityData.milestoneId = this.routerData.snapshot.paramMap.get('milestoneId');
            activityData.activityId = this.routerData.snapshot.paramMap.get('activityId');
            activityData.role = sessionStorage.getItem("role");
            // activityData._id = detailsOfActivity[0]._id;
            if(this.activityData.fundAllocated == 0){
            activityData.status = 'Activity Updated';
            } else{
              activityData.status = this.activityData.status
            }
            activityData.validatorId = activityData.validatorId+"-"+activityData.financialValidator
            var validators = activityData.validatorId.split("-", 2);
          if (validators[0] && validators[1]) {
            activityData.secondaryValidation = true;
          } else {
            activityData.secondaryValidation = false;
          }
          activityData.remarks = this.remarks
          activityData.isApproved = this.isApproved.toString()
          activityData.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
          activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile");
            this.httpClient.post(this.urlPort + "/api/activity/updateActivity", activityData, { withCredentials: true})
              .map(
                (response) => response
              )
              .catch((err) => {
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                }else{
                  var snackBar = this._translateService.instant("getting some error on updating Activity");
                  this.openSnackBar(snackBar)                }
                this.loading1 = false;
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant('Activity updated successfully!!!');
                this.openSnackBar(snackBar)
                sessionStorage.setItem('flagForHitAPI', '1')
                sessionStorage.setItem("backFromMilestone", "true")
                this.router.navigate(["/pages/profile"]);
              })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
                this.openSnackBar(snackBar)
          }
        })
      } else {
        this.openSnackBar("EndDate should be greater than StartDate!!!")
      }
    } else {
      var snackBar = this._translateService.instant('Activity budget should not be greater than Project Budget');
        this.openSnackBar(snackBar)
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

  /** 
          * @author:Sagar
          * @argument:none
          * @description:Cancel
         */

  cancel() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {
      var cancelDialogResult;
      cancelDialogResult = result;
      if (cancelDialogResult == 'yes') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
                this.openSnackBar(snackBar)
                this.router.navigate(["/pages/profile"]);
      } else {
        this.loading1 = false;
      }
    })
  }

  backToMilestone() {
    sessionStorage.setItem("backFromMilestone", "true")
    this.router.navigate(['/pages/profile'])
}

  filterListValidator(val) {
    this.detailsOfValidators = this.anotherArray.filter(ngo => ngo.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  filterFinancialValidator(val) {
    this.financialValidators = this.financialValidatorsArray.filter(ngo => ngo.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }
}
