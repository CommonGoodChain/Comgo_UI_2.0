import { Component, OnInit } from '@angular/core';
import { comgoAnimations } from '@comgo/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatRadioButton,MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../../../environments/environment';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component'
@Component({
  selector: 'app-project-visibility',
  templateUrl: './project-visibility.component.html',
  styleUrls: ['./project-visibility.component.scss'],
  animations: comgoAnimations
})
export class ProjectVisibilityComponent implements OnInit {
  form: FormGroup;
  radioStatus = [
    "Public",
    "Only Organizations",
    "Just Me"
  ];
  urlPort = environment.urlPort;
  loading1 = false;
  /**
* Constructor
* @param {FormBuilder} _formBuilder
* @param {Location} _location
* @param {MatSnackBar} _matSnackBar
*/
horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private routerData: ActivatedRoute,
    private http: Http,
    private _formBuilder: FormBuilder,
    private httpCLient :HttpClient,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private _comgoTranslationLoaderService: comgoTranslationLoaderService,
    private _translateService: TranslateService
    ) { 
     this._comgoTranslationLoaderService.loadTranslations(english, spanish);
    // this.product = new Product();
}

  ngOnInit() {

    this.form = this._formBuilder.group({
      visibility: ['', Validators.required]
   });

   this.httpCLient.get(this.urlPort + "/api/projects/getByProjId/" + sessionStorage.getItem("projectIdForProjectProfile"), { withCredentials: true })
   .map(
       (response) => response
   ).catch((err) => {
this.loading1 = false;
var error = err["_body"]
if (error == "session expired") {
this.sessionSnackBar(err["_body"]);
this.router.navigate(['/pages/auth/login-2']);
}
return Observable.throw(err)
})
.subscribe(res => {
var projectsAll = res
this.form.controls['visibility'].setValue(projectsAll["visibility"]);
  })
}


  checkVisibility(value){
    var reqBody = {
      visibility: value,
      projectId: sessionStorage.getItem("projectIdForProjectProfile")
    }
    this.loading1 = true;
            this.httpCLient.post(this.urlPort + "/api/projects/changeProjectVisibility", reqBody, { withCredentials: true })
                .catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                    this.loading1 = false;
                    var snackBar = this._translateService.instant("Project Visibility Changed");
                    this.openSnackBar(snackBar);
                    this.ngOnInit()
                })
    // let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    //     width: '500px',
    //     height: '200px',
    //     data: { operation: 'changeProjectVisibility' }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   dialogueStatus = result;
    //     if (dialogueStatus == 'yes') {
    //         this.loading1 = true;
    //         value.projectId = sessionStorage.getItem("projectIdForProjectProfile");
    //         this.httpCLient.post(this.urlPort + "/api/projects/changeProjectVisibility", value, { withCredentials: true })
    //             .catch((err) => {
    //                 this.loading1 = false;
    //                 var error = err["_body"]
    //                 if (error == "session expired") {
    //                     this.sessionSnackBar(err["_body"]);
    //                     this.router.navigate(['/pages/auth/login-2']);
    //                 }
    //                 return Observable.throw(err)
    //             })
    //             .subscribe((res: Response) => {
    //                 this.loading1 = false;
    //                 var snackBar = this._translateService.instant("Project Visibility Changed");
    //                 this.openSnackBar(snackBar);
    //                 this.ngOnInit()
    //             })
    //     } else {
    //         var snackBar = this._translateService.instant("Operation cancelled!!!");
    //         this.openSnackBar(snackBar);
    //     }
    // })
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
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
