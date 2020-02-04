import { Component, Inject } from '@angular/core';
import * as $ from 'jquery'
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from 'environments/environment';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../layout/i18n/en';
import { locale as spanish } from '../../layout/i18n/tr';

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
  animations: fuseAnimations
})
export class DialogElementsExampleDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  sdgUrl;
  imageExtenstion;
  urlPort = environment.urlPort;
  regUser;
  public loading1 = false;
  myip;
  foundationName;
  role;
  lang;
  value;
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    private http: Http,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _matSnackBar: MatSnackBar) {
      $(document).ready(()=> {
        // Check Radio-box
        $(".rating input:radio").attr("checked", false);
    
        $('.rating input').click(()=> {
            $(".rating span").removeClass('checked');
            $(this).parent().addClass('checked');
        });
    
        $('input:radio').change(
          ()=>{
            var userRating = $('input[name="rate"]:checked').val();
           this.addRating(userRating)
        }); 
    });
      this.lang = sessionStorage.getItem("lang");
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    if (this.lang == 'en' || this.lang == null) {
      this.sdgUrl = "assets/SDG/";
      this.imageExtenstion = ".png";
    } else {
      this.sdgUrl = "assets/SDGSpanish/";
      this.imageExtenstion = ".jpg";
    }
  }

  addRating(rating): void {
    var username = sessionStorage.getItem("username")
    console.log("rating: ",rating,username)
    if (username) {

      this.loading1 = true;
      var body = {
        "username": username,
        "projectId": this.data.projectId,
        "projectName": this.data.projectname,
        "rating": rating
      }
      this.httpClient.post(this.urlPort + "/api/users/addRating", body,{ withCredentials: true})
        .catch((err) => {
          this.loading1 = false;
          var snackBar = this._translateService.instant("Failed to add rating");
          this.openSnackBar(snackBar)
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {
          console.log("addRating res: ",res)
          this.dialogRef.close('rating complete');
        })
    }
  }
  noForAddOperation(): void {
    this.dialogRef.close('no');
  }
  yesForAddOperation(): void {
    this.dialogRef.close('yes');
  }
  noForUpdateOperation(): void {
    this.dialogRef.close('no');
  }
  yesForUpdateOperation(): void {
    this.dialogRef.close('yes');
  }
  noForCancelOperation(): void {
    this.dialogRef.close('no');
  }
  yesForCancelOperation(): void {
    this.dialogRef.close('yes');
  }
  noForDeleteOperation(): void {
    this.dialogRef.close('no');
  }
  yesForDeleteOperation(): void {
    this.dialogRef.close('yes');
  }
  noForDonateOperation(): void {
    this.dialogRef.close('no');
  }
  yesForDonateOperation(): void {
    this.dialogRef.close('yes');
  }
  noForPublishProjectOperation(): void {
    this.dialogRef.close('no');
  }
  yesForPublishProjectOperation(): void {
    this.dialogRef.close('yes');
  }
  noForReleaseFundOperation(): void {
    this.dialogRef.close('no');
  }
  yesForReleaseFundOperation(): void {
    this.dialogRef.close('yes');
  }
  noForRequestFundOperation(): void {
    this.dialogRef.close('no');
  }
  yesForRequestFundOperation(): void {
    this.dialogRef.close('yes');
  }
  noForSendForApprovalOperation(): void {
    this.dialogRef.close('no');
  }
  yesForSendForApprovalOperation(): void {
    this.dialogRef.close('yes');
  }
  noForValidateApproveOperation(): void {
    this.dialogRef.close('no');
  }
  yesForValidateApproveOperation(): void {
    this.dialogRef.close('yes');
  }
  noForValidateRejectOperation(): void {
    this.dialogRef.close('no');
  }
  yesForValidateRejectOperation(): void {
    this.dialogRef.close('yes');
  }
  noForProjectRejectOperation(): void {
    this.dialogRef.close({ "ans": "no", "remarks": "nothing" });
  }

  yesForApproveRejectActivityOperation(): void {
    var remarksReject = $("#statusForApprove").val();
    if (remarksReject !== '') {
      this.dialogRef.close({ "ans": "yes", "remarks": remarksReject });
    } else {
      this.openSnackBar("Remarks is mandatory");
    }
  }
  noForApproveRejectActivityOperation(): void {
    this.dialogRef.close({ "ans": "no", "remarks": "nothing" });
  }

  yesForProjectRejectOperation(): void {
    var remarksReject = $("#statusForReject").val();
    if (remarksReject !== '') {
      this.dialogRef.close({ "ans": "yes", "remarks": remarksReject });
    } else {
      this.openSnackBar("Remarks is mandatory");
    }
  }
  noForProjectApproveOperation(): void {
    this.dialogRef.close({ "ans": "no", "remarks": "nothing" });
  }
  yesForProjectApproveOperation(): void {
    var remarksApprove = $("#statusForApprove").val();
    if (remarksApprove !== '') {
      this.dialogRef.close({ "ans": "yes", "remarks": remarksApprove });
    }
    else {
      this.openSnackBar("Remarks is mandatory");
    }
  }

  yesForChangeStatus(): void {
    this.dialogRef.close('yes');
  }

  noForChangeStatus(): void {
    this.dialogRef.close('no');
  }

  noForActivityApprovalOperation(): void {
    this.dialogRef.close('no');
  }

  yesForActivityApprovalOperation(): void {
    this.dialogRef.close('no');
  }
  noForActivityRejectionOperation(): void {
    this.dialogRef.close('no');
  }

  setProfile(): void {
    this.dialogRef.close('setProfile');
  }

  yesForActivityRejectionOperation(): void {
    this.dialogRef.close('no');
  }

  closePaypalDialog(): void {
    this.dialogRef.close('no');
  }

  yesForFundAllocation(): void {
    this.dialogRef.close('yes');
  }
  noForFundAllocation(): void {
    this.dialogRef.close('no');
  }

  yesForCloseActivity(): void {
    this.dialogRef.close('yes');
  }
  noForCloseActivity(): void {
    this.dialogRef.close('no');
  }
  noForExpenseApproveOperation(): void {
    this.dialogRef.close('no');
  }
  yesForchangeProjectVisibility(): void {
    this.dialogRef.close('yes');
  }

  noForchangeProjectVisibility(): void {
    this.dialogRef.close('no');
  }

  selfDonateOperation(): void {
    this.dialogRef.close('selfDonate');
  }
  donateOperation(): void {
    this.dialogRef.close('Donate');
  }

  yesForExpenseApproveOperation(): void {
    var remarksForExpenseApprove = $("#remarksForExpenseApprove").val();
    if (remarksForExpenseApprove !== '') {
      this.dialogRef.close({ "ans": "yes", "remarks": remarksForExpenseApprove });
    }
    else {
      this.openSnackBar("Remarks is mandatory");
    }
  }
  noForExpenseRejectOperation(): void {
    this.dialogRef.close('no');
  }
  yesForExpenseRejectOperation(): void {
    var remarksForExpenseRejection = $("#remarksForExpenseRejection").val();
    if (remarksForExpenseRejection !== '') {
      this.dialogRef.close({ "ans": "yes", "remarks": remarksForExpenseRejection });
    }
    else {
      this.openSnackBar("Remarks is mandatory");
    }
  }
  yesForSessionAddOperation(): void {

    if (this.data.username) {
      var data = {
        username: this.data.username
      }

      this.loading1 = true;
      var body = {
        "username": this.data.username,
        "sessionCheck": true
      }
      this.http.post(this.urlPort + "/api/users/getUserDetails", body,{ withCredentials: true})
        .map(
          (response) => response.json()
        )
        .catch((err) => {
          this.loading1 = false;
          var snackBar = this._translateService.instant("Your Username or Password is Incorrect");
          this.openSnackBar(snackBar)
          return Observable.throw(err)
        })
        .subscribe((res: Response) => {

          var userCheck = res['createFlag'];
          this.regUser = res['regUser'];
          sessionStorage.setItem("foundationName", res['foundationName'])
          this.foundationName = res['foundationName'];
          this.role = res['role'];

          if (userCheck == 0) {
            this.loading1 = false;
            sessionStorage.setItem("username", data.username)
            this.router.navigate(['/pages/auth/reset-password-2'])
          }

          this.http.get("https://ipinfo.io/")
            .subscribe(
              (res: Response) => {
                this.myip = res.json().loc;

                var data = {
                  username: this.data.username
                }
                  this.http.post(this.urlPort + "/api/users/updateSession", data, { withCredentials: true })
                  .map(
                      (response) => response.json()
                  )
                  .catch((err) => {
                      this.loading1 = false;
                      this.openSnackBar(err);
                      return Observable.throw(err)
                  })
                  .subscribe((res: Response) => {
                      sessionStorage.setItem("username", res["username"])
                      sessionStorage.setItem("token", res["userToken"])
                      sessionStorage.setItem("userType", res["userType"])
                      this.loading1 = false
                      if (res["userType"] == 'Organization') {
                          sessionStorage.setItem("domainName", res["domainName"])
                          sessionStorage.setItem("orgName", res["orgName"])
                          sessionStorage.setItem("profile", res["profile"])
                          sessionStorage.setItem("regUser", res["regUser"])
                      } else if (res["userType"] == 'Private User') {
                      }
                      this.dialogRef.close('yes');
                  })
              })

        })
    }
  }
  noForSessionAddOperation(): void {
    this.dialogRef.close('logout');
  }

  yesForSendInvitation(): void {
    var emailIdForInvitation = $("#emailIdForInvitation").val();
    if (emailIdForInvitation !== '') {
      this.dialogRef.close({ "ans": "yes", "email": emailIdForInvitation });
    } else {
      this.openSnackBar("Email Id is mandatory");
    }
  }
  noForSendInvitation(): void {
    this.dialogRef.close({ "ans": "no", "email": "nothing" });
  }
  /** 
         * @author:kuldeep
         * @argument:data
         * @description:open scankbar
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

