import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { comgoAnimations } from '@comgo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-projectcommunication',
  templateUrl: './projectcommunication.component.html',
  styleUrls: ['./projectcommunication.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: comgoAnimations
})
export class ProjectcommunicationComponent implements OnInit {
  pageType: string;
  productForm: FormGroup;

  form: FormGroup;
  formErrors: any;
  projectId;
  urlPort = environment.urlPort;
  reportType;
  file;
  fileName;
  emailData = {};
  organizationName;
  //for submitting email 
  resultOfProjectFromBlockchain;
  projectName;
  fundGoal;
  fundRaised;

  favoriteSeason: string;

  reportTypes = [
    "Final Report Only",
    "All updates",
    "Important Reports"
  ];
  public loading1 = false;
  addDialogResult;
  cancelDialogResult;
  updateDialogResult;
  // Private
  private _unsubscribeAll: Subject<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private http: Http,
    private httpClient: HttpClient,
    private _translateService: TranslateService,
    public dialog: MatDialog,
  ) {
    // Reactive form errors
    this.formErrors = {
      subject: {},
      email: {},
      sms: {},
    };
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      subject: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 .,À-ÿ]{1,200}")]],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 .,À-ÿ]{1,1000}")]],
      sms: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,1000}")]],
      finalRepOly: ['', [Validators.required]]
      // reportType:['', Validators.required],
    });
    this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
    this.loading1 = true;

    this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + this.projectId, { withCredentials: true })
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
        var projectsAll
        projectsAll = res
        this.loading1 = false;
        this.projectName = projectsAll.projectName;
        this.fundGoal = projectsAll.fundGoal;
        this.fundRaised = projectsAll.fundRaised;
      })

  }


  /** 
   * @author:sagar
   * @argument:milestone form data i.e. milestone name,start and end date
   * @description:it is method to add milestone for specific project
  */
  saveEmail(data) {
    var dataForEmail = data;
    dataForEmail.projectId = this.projectId;
    dataForEmail.projectName = this.projectName;
    dataForEmail.fundGoal = this.fundGoal;
    dataForEmail.fundRaised = this.fundRaised;
    if (this.file) {
      dataForEmail.fileName = this.file.name
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'add' }
      });
      dialogRef.afterClosed().subscribe(result => {

        this.addDialogResult = result;
        if (this.addDialogResult == 'yes') {
          this.loading1 = true;
          var filename = this.file.name;
          var fd = new FormData();
          fd.append('file', this.file);
          this.emailData["fileName"] = this.file.name;
          this.organizationName = sessionStorage.getItem("organizationName");
          var path = './crmFiles/'
          var purpose = 'saveCRMFile'
          this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
            .map(
              (response) => response.json()
            )
            .catch((err) => {
              var error = err["_body"]
              this.loading1 = false;
              if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
              }
              // this.notification.Info(err['_body']);
              return Observable.throw(err)
            })
            .subscribe((res: Response) => {
              this.httpClient.post(this.urlPort + "/api/projectcommunication/saveEmail", dataForEmail, { withCredentials: true })
                .map(
                  (response) => response
                )
                .catch((err) => {
                  var error = err["_body"]
                  this.loading1 = false;
                  if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                  } else {
                    var snackBar = this._translateService.instant("Donations have not been done to project !!!");
                    this.openSnackBar(snackBar);
                  }
                  // this.notification.Info(err['_body']);
                  return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                  this.loading1 = false;
                  var snackBar = this._translateService.instant("Email sent successfully!!!");
                  this.openSnackBar(snackBar);

                  this.router.navigate(['/pages/profile'])
                })
            })
        }
        else if (this.addDialogResult == 'no') {
          this.loading1 = false;
          var snackBar = this._translateService.instant("Operation cancelled!!!");
          this.openSnackBar(snackBar);
        }
      })
    } else {
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'add' }
      });
      dialogRef.afterClosed().subscribe(result => {

        this.addDialogResult = result;
        if (this.addDialogResult == 'yes') {
          this.loading1 = true;
          this.httpClient.post(this.urlPort + "/api/projectcommunication/saveEmail", dataForEmail, { withCredentials: true })
            .map(
              (response) => response
            )
            .catch((err) => {
              var error = err["_body"]
              this.loading1 = false;
              if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
              } else {
                var snackBar = this._translateService.instant("Donations have not been done to project !!!");
                this.openSnackBar(snackBar);
              }
              // this.notification.Info(err['_body']);
              return Observable.throw(err)
            })
            .subscribe((res: Response) => {
              this.loading1 = false;
              var snackBar = this._translateService.instant("Email sent successfully!!!");
              this.openSnackBar(snackBar);
              this.router.navigate(['/pages/profile'])
            })
        }
        else if (this.addDialogResult == 'no') {
          this.loading1 = false;
          var snackBar = this._translateService.instant("Operation cancelled!!!");
          this.openSnackBar(snackBar);
        }
      })
    }
  }

  /**
   * @author:sagar
   * @description:just stored the file data (temp)
   */
  uploadFile(event) {
    this.file = event.target.files[0];
    var filename = event.target.files[0].name
    this.fileName = event.target.files[0].name;
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(filename + " " + fileAdd);
  }

  /**
   * @author:Madhu
   * @description: Open snak bar
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

  cancel() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading1 = true;
      this.cancelDialogResult = result;
      if (this.cancelDialogResult == 'yes') {
        this.loading1 = false;
        var snackBar = this._translateService.instant("Operation cancelled!!!");
        this.openSnackBar(snackBar);
        this.router.navigate(['/pages/profile'])
      }
      else if (this.cancelDialogResult == 'no') {
        this.loading1 = false;
      }
    })
  }
}
