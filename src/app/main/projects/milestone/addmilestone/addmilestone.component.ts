import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComGoAnimations } from '@ComGo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component'
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { ComGoConfigService } from '@ComGo/services/config.service';

@Component({
  selector: 'app-addmilestone',
  templateUrl: './addmilestone.component.html',
  styleUrls: ['./addmilestone.component.scss'],
  animations: ComGoAnimations


})
export class AddmilestoneComponent implements OnInit {
  projectId
  operationalFlag;
  responseAfterAddingMilestone;
  detailsOfMilestone;
  milestoneStartDate;
  milestoneEndDate;
  form: FormGroup;
  urlPort = environment.urlPort;
  public loading1 = false;
  public milestone = [];
  public minDate;
  public maxDate;
  /**
   * @author: Madhu
   * @argument:none
   * @description:to fix position
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  /**
   * Constructor
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
    private _ComGoConfigService: ComGoConfigService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private httpClient : HttpClient,
    public dialog: MatDialog,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
    private _translateService: TranslateService
  ) {
    this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
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

  /**
   * On init
   */
  ngOnInit(): void {

    /**
  * @author: Madhu
  * @argument:none
  * @description:Date Validation
  */
    this.milestoneStartDate = sessionStorage.getItem("startDateForMilestone");
    this.milestoneEndDate = sessionStorage.getItem("endDateForMilestone");
    this.minDate = new Date(this.milestoneStartDate);
    this.maxDate = new Date(this.milestoneEndDate);
    this.form = this._formBuilder.group({
      milestone: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{2,60}")]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.operationalFlag = this.routerData.snapshot.paramMap.get('operationalFlag');
    if (this.operationalFlag == 1) {
      var milestoneId =  this.routerData.snapshot.paramMap.get('milestoneId');
      this.loading1 = true;

      /**
   * @author: Kuldeep
   * @argument:none
   * @description:Get BKC Data
   */
      this.httpClient.get(this.urlPort + "/api/milestone/getMilestoneById/" + milestoneId, { withCredentials: true })
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
          this.detailsOfMilestone = res
          this.loading1 = false;
          this.form.controls['milestone'].setValue(this.detailsOfMilestone.milestoneName);
          this.form.controls['startDate'].setValue(this.detailsOfMilestone.startDate);
          this.form.controls['endDate'].setValue(this.detailsOfMilestone.endDate);
          this.milestone = this.detailsOfMilestone.milestone;

        })
    }
    else {
      sessionStorage.removeItem("MilestoneName");
      sessionStorage.removeItem("periodFrom");
      sessionStorage.removeItem("periodTo");
    }
  }
  /**
   * @author:Madhu
   * @param:none
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

  /** 
   * @author:sagar
   * @argument:milestone form data i.e. milestone name,start and end date
   * @description:it is method to add milestone for specific project
  */
  addMilestoneData(milestoneData) {
    var addDialogResult;
    milestoneData.isApproved = 'false'
    milestoneData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile");
      if (milestoneData.startDate < milestoneData.endDate) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'add' }
        });
        dialogRef.afterClosed().subscribe(result => {

          addDialogResult = result;
          if (addDialogResult == 'yes') {
            this.loading1 = true;
            milestoneData.projectId = this.routerData.snapshot.paramMap.get('projectId');
            this.httpClient.post(this.urlPort + "/api/milestone/create", milestoneData, { withCredentials: true })
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
                  var snackBar = this._translateService.instant("Failed to create Milestone");        
                  this.openSnackBar(snackBar)                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                this.responseAfterAddingMilestone = res;
                var snackBar = this._translateService.instant('Milestone added successfully!!!');
                this.openSnackBar(snackBar)
                sessionStorage.setItem('flagForHitAPI', '1')

                this.router.navigate(["/pages/profile"]);
              })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        });
      } else {
        var snackBar = this._translateService.instant("End Date should be greater than Start Date!!!");
            this.openSnackBar(snackBar)
      }
  }

  /** 
          * @author:Madhu
          * @argument:milestoneData and Id
          * @description:Edit Milestone
         */
  editMilestoneData(milestoneData) {
    var updateDialogResult;
    milestoneData = milestoneData;
    milestoneData.startDate = new Date(milestoneData.startDate)
    milestoneData.endDate = new Date(milestoneData.endDate)
    if (milestoneData.startDate < milestoneData.endDate) {
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'update' }
      });
      dialogRef.afterClosed().subscribe(result => {

        updateDialogResult = result;
        if (updateDialogResult == 'yes') {
          this.loading1 = true;
          milestoneData.projectId = this.routerData.snapshot.paramMap.get('projectId');
          milestoneData.milestoneId = this.routerData.snapshot.paramMap.get('milestoneId');
          milestoneData.status = "Milestone Updated"
          milestoneData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile");
          this.httpClient.put(this.urlPort + "/api/milestone/", milestoneData, { withCredentials: true})
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
                var snackBar = this._translateService.instant("Failed to edit Milestone");        
                this.openSnackBar(snackBar)              }
              return Observable.throw(err)
            })
            .subscribe((res: Response) => {
              this.loading1 = false;
              var snackbar = this._translateService.instant('Milestone updated successfully!!!');
              this.openSnackBar(snackbar)
              sessionStorage.setItem('flagForHitAPI', '1')

              this.router.navigate(["/pages/profile"]);
            })
        } else {
          this.loading1 = false;
          var snackBar = this._translateService.instant('operation cancelled!!!');
          this.openSnackBar(snackBar)
        }
      })
    } else {
      var snackBar = this._translateService.instant("End Date should be greater than Start Date!!!");
      this.openSnackBar(snackBar)    }
  }
  /**
    * @author: Madhu
    * @argument:none
    * @description:Cancel 
    */
  cancel() {
    var cancelDialogResult;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading1 = true;
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

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  backToProfile(){
    // sessionStorage.setItem("backFromMilestone", "true")
    this.router.navigate(["/pages/profile"]);
  }

}
