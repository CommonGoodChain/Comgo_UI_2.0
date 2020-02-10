import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { comgoAnimations } from '@comgo/animations';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material';
import { saveAs } from 'file-saver';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: comgoAnimations
})
export class UserProfileComponent implements OnInit {
  dataSource;
  orgStatutes = undefined;
  lastAuditReport = undefined;
  lastActivityReport = undefined;
  foundationLogoFile = undefined;
  form: FormGroup;
  organizationName;
  imgUrl = '';
  urlPort = environment.urlPort;
  profileImageUrl = environment.profileImageUrl;
  regDocName;
  profile;
  userType;
  username;
  foundationCompany;
  public loading1 = false;
  addDialogResult;
  auditDocName;
  cancelDialogResult;
  getOrganizationDocs;
  imgUploaded = 0;
  updateDialogResult;
  file = undefined;
  filename;
  paypalType;
  regUser;
  userStatus;
  annualRepName;
  subRole;
  otherDoc =undefined;
  otherDocName;
  userDetails;
  orgStatutesName;
  lastAuditReportName;
  lastActivityReportName;
  filesToUpload;
  displayedColumns = ['fileName', 'type', 'icon'];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
  //  * @param {EcommerceProductService} _ecommerceProductService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private routerData: ActivatedRoute,
    private http: Http,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private _translateService: TranslateService,
    private _comgoTranslationLoaderService: comgoTranslationLoaderService
  ) {
    this._comgoTranslationLoaderService.loadTranslations(english, spanish);
    this._unsubscribeAll = new Subject();
  }
  /** * @author:Akshay * @description: Open success snak bar */
  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition,
    });
  }
  /**
   * On init
   */

  ngOnInit(): void {
    this.userType = sessionStorage.getItem('userType')
    this.regUser = sessionStorage.getItem('regUser')
    $(document).ready(function () {
      $("#orgTaxId").prop("disabled", true);
  });
    if (this.subRole == "user") {
      $("#documentDiv").hide();
    }
    if(sessionStorage.getItem('userType') == 'Organization'){
      this.organizationName = sessionStorage.getItem("orgName")
      this.username = sessionStorage.getItem('username')
      this.profile = sessionStorage.getItem('profile');
    } else {
      this.organizationName = this.routerData.snapshot.paramMap.get('organizationName');
      this.username = this.routerData.snapshot.paramMap.get('username');
      this.profile = this.routerData.snapshot.paramMap.get('profile');
    }
    this.form = this._formBuilder.group({
      orgLegalName: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,40}")]],
      orgTaxId: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 À-ÿ]{1,10}")]],
      paypal: ['']
    });

    if(this.profile == 'true'){
    this.httpClient.get(this.urlPort + "/api/users/getOrganizationDetails/" + this.organizationName, { withCredentials: true })
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
      .subscribe((res: Response) => {
        this.loading1 = false;
        this.userStatus = res[0].regUser
        this.userDetails = res
        console.log("orgLegalName: ",res[0].orgLegalName)
        this.form.controls['orgTaxId'].setValue(sessionStorage.getItem('idNumber'));
        // this.form.controls['orgTaxId'].setValue(res[0].orgTaxId);
        if(res[0].orgLegalName == null || res[0].orgLegalName == undefined || res[0].orgLegalName == ''){
          this.form.controls['orgLegalName'].setValue(sessionStorage.getItem('orgName'));
        } else {
        this.form.controls['orgLegalName'].setValue(res[0].orgLegalName);
        }
        this.form.controls['paypal'].setValue(res[0].paypal);
      })
    /**
   * @author: Kuldeep
   * @argument:none
   * @description:Get Uploaded File details
   */
    this.httpClient.get(this.urlPort + "/api/users/getUploadedFiles/" + this.organizationName, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get Uploaded files");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        var getOrganizationDocs;
        getOrganizationDocs = res;
        this.dataSource = new MatTableDataSource(getOrganizationDocs);
      })
    } else {
      this.form.controls['orgLegalName'].setValue(sessionStorage.getItem('orgName'));
      this.form.controls['orgTaxId'].setValue(sessionStorage.getItem('idNumber'));
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  /**
   * @author:Akshay
   * @description:just stored the file data (temp)
   */
  uploadOrgStatutes(event) {
    this.orgStatutes = event.target.files[0];
    this.orgStatutesName = event.target.files[0].name;
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(this.orgStatutesName + " " + fileAdd);
    // event='';
  }

  uploadLastAuditReport(event) {
    this.lastAuditReport = event.target.files[0];
    this.lastAuditReportName = event.target.files[0].name;
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(this.lastAuditReportName + " " + fileAdd);
  }

  uploadLastActivityReport(event) {
    this.lastActivityReport = event.target.files[0];
    this.lastActivityReportName = event.target.files[0].name;
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(this.lastActivityReportName + " " + fileAdd);
  }

  uploadOtherDoc(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    this.otherDoc = this.filesToUpload;
    // this.otherDocName = event.target.files[0].name;
    // var fileAdd = this._translateService.instant('File has been added');
    // this.openSnackBar(this.otherDocName + " " + fileAdd);
  }

  submit(value) {
    value.orgLegalName = this.form.get('orgLegalName').value;
    value.username = this.username
      if (this.profile == 'false') {
        if (this.orgStatutes || this.lastAuditReport || this.lastActivityReport || this.otherDoc) {
          let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'add' }
          });
          dialogRef.afterClosed().subscribe(result => {

            this.addDialogResult = result;
            if (this.addDialogResult == 'yes') {
              this.loading1 = true;
              if (value.paypal == '' || value.paypal == null || value.paypal == undefined) {
                value.paypal = "AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne"
              }
              this.httpClient.post(this.urlPort + "/api/users/updateProfile", value, { withCredentials: true })
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
                    this.updatePayPalToken(value)
                      if (this.orgStatutes) {
                        this.fileUpload(this.orgStatutes)
                      }
                      if (this.lastAuditReport) {
                        this.fileUpload(this.lastAuditReport)
                      }
                      if (this.lastActivityReport) {
                        this.fileUpload(this.lastActivityReport)
                      }
                      if (this.otherDoc) {
                        this.multipleFileUpload(this.otherDoc)
                      }
                      if (this.file){
                        this.savePhoto(this.file)
                      }
                      if(this.profile == 'true' && this.regUser == '1' && this.userType == 'Organization' && this.otherDoc == undefined){
                        this.router.navigate(['/user/user/searchUsers'])
                      } else {
                        if(this.otherDoc == undefined){
                        this.router.navigate(['/pages/auth/login-2'])
                        }
                      }
                })
            } else if (this.addDialogResult == 'no') {
              this.loading1 = false;
              var snackBar = this._translateService.instant("operation cancelled!!!");
              this.openSnackBar(snackBar);
            }
          })
        } else {
          var snackBar = this._translateService.instant("document is mandatory");
          this.openSnackBar(snackBar);

        }
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
            if (value.paypal == '' || value.paypal == null || value.paypal == undefined) {
              value.paypal = "AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne"
            }
            var fd = new FormData();
            fd.append('file', this.file);
            value.fd;
            this.httpClient.post(this.urlPort + "/api/users/updateProfile", value, { withCredentials: true })
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
                    this.updatePayPalToken(value)
                    if (this.orgStatutes != undefined) {
                      this.fileUpload(this.orgStatutes)
                    }
                    if (this.lastAuditReport != undefined) {
                      this.fileUpload(this.lastAuditReport)
                    }
                    if (this.lastActivityReport != undefined) {
                      this.fileUpload(this.lastActivityReport)
                    }
                    if (this.otherDoc) {
                      this.multipleFileUpload(this.otherDoc)
                    }
                    if (this.file){
                      this.savePhoto(this.file)
                    }
                    var snackBar = this._translateService.instant("Organization Profile Saved");
                    this.openSnackBar(snackBar);
                    sessionStorage.setItem("profileSubmit", 'done')
                    this.loading1 = false;
                    if(this.profile == 'true' && this.regUser == '1' && this.userType == 'Organization' && this.otherDoc == undefined){
                      this.router.navigate(['/user/user/searchUsers'])
                    } else {
                      if(this.otherDoc == undefined){
                      this.router.navigate(['/pages/auth/login-2'])
                      }
                    }
              })
          }
        })
      }
  }

  fileUpload(file) {
    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var fileName = randomImageId + file.name
    var fd = new FormData();
    fd.append('file', file, randomImageId + file['name']);
    var fileInformation = {
      filePath: '/uploadsattachment/emailattachment/' + this.organizationName + '/',
      organizationName: this.organizationName,
      fileName: fileName,
      type: file.type
    }
    fd.append('fileInformation', JSON.stringify(fileInformation));
    var purpose = "uploadOrgDoc"
    var path = './uploadsattachment/' + 'emailattachment' + '/' + this.organizationName + '/'
    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&organizationName=" + this.organizationName + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to save file");
          this.openSnackBar(snackBar);

        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.loading1 = false;
        var snackBar = this._translateService.instant("Organization Profile Saved");
        this.openSnackBar(snackBar);
        sessionStorage.setItem("profile", 'true')
        sessionStorage.setItem("profileSubmit", 'done')
      })

    // this.router.navigate(['/apps/dashboards/analytics'])
  }

  multipleFileUpload(otherDoc) {
    var filesToUpload = otherDoc;
    const files: Array<File> = filesToUpload;
        var fd = new FormData();
        var filesData = [];
        var tableData;
        this.loading1 = true;
        for (var i = 0; i < files.length; i++) {
            var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
            var fileName = randomImageId + files[i].name
            fd.append("files", files[i], randomImageId + files[i]['name']);
            tableData = {
              filePath: '/uploadsattachment/emailattachment/' + this.organizationName + '/',
              organizationName: this.organizationName,
              fileName: fileName,
                type: files[i].type
            }
            filesData.push(tableData);
        }
        var fileInformation = filesData
        fd.append('fileInformation', JSON.stringify(fileInformation));
        var purpose = 'uploadOrgProfileOtherDoc'
        var path = './uploadsattachment/' + 'emailattachment' + '/' + this.organizationName + '/'
        this.loading1 = true;
        // this.http.post(this.urlPort + "/api/filesUpload/saveFile/multiple" + "?path=" + path + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        //     .map((response) => response.json())
        //     .catch((err) => {
        //         this.loading1 = false;
        //         var error = err["_body"]
        //         if (error == "session expired") {
        //             this.sessionSnackBar(err["_body"]);
        //             this.router.navigate(['/pages/auth/login-2']);
        //         } else {
        //             this.openSnackBar("Failed to upload file");
        //         }
        //         return Observable.throw(err)
        //     })
        //     .subscribe(res => {
        //         this.loading1 = false;
        //         var fileUploaded = this._translateService.instant('File uploaded');
        //         this.openSnackBar(fileUploaded);
        //         // this.router.navigate(['/user/user/searchUsers'])
        //     })

        this.http.post(this.urlPort + "/api/uploadMultipleDoc/" + this.organizationName, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map((response) => response.json())
        .catch((err) => {
            this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    } else {
                        this.openSnackBar("Failed to upload file");
                    }
                    return Observable.throw(err)
        })
        .subscribe(res => {
            this.loading1 = false;
            var fileUploaded = this._translateService.instant('File uploaded');
            this.openSnackBar(fileUploaded);
            if(this.profile == 'true' && this.regUser == '1' && this.userType == 'Organization'){
              this.router.navigate(['/user/user/searchUsers'])
            } else {
              this.router.navigate(['/pages/auth/login-2'])
              }
        })
}

  foundationLogo() {
    this.router.navigate(['/user/user/searchUsers'])
  }

  cancel() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cancelDialogResult = result;
      if (this.cancelDialogResult == 'yes') {
        this.loading1 = false;
        var snackBar = this._translateService.instant("Operation cancelled!!!");
        this.openSnackBar(snackBar);
        if(this.userType == 'admin'){
          this.router.navigate(['/user/user/pendingUsers'])
        } else if(this.userType == 'Organization' && this.userDetails){
          this.router.navigate(['/user/user/searchUsers'])
        } else {
          this.router.navigate([''])
        }
      }
      else if (this.cancelDialogResult == 'no') {
        this.loading1 = false;
      }
    })
  }
  /**
     * @author: Kuldeep
     * @argument:event contains file
     * @description:to upload file
     */
  uploadFile(event) {
    if (event.target.files[0].type.startsWith("image")) {
      this.file = event.target.files[0];
      var fd = new FormData();
      fd.append('file', this.file);
      var snackBar = this._translateService.instant("image has been added");
      this.openSnackBar(snackBar);

    } else {
      var snackBar1 = this._translateService.instant("Only Image is accepted");
      this.openSnackBar(snackBar1);
    }
  }
  /** Function ends here */

  downloadFile(fileName) {
    this.filename = fileName;
    var body = { filename: this.filename, organizationName: this.organizationName }
    this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadOrgDoc", body, { responseType: "blob",withCredentials: true })
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed download file");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.loading1 = false;
        saveAs(res, this.filename)
      })
  }
  /**
     * @author:Kuldeep
     * @event:contains file
     * @description:used to upload image
     */
  onSelectFile(event) {
    if (event.target.files[0].type.startsWith("image")) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.imgUrl = event.target.result;
        }
      }
      this.file = event.target.files[0]
      this.imgUploaded = 1;
    } else {
      var snackBar = this._translateService.instant("Only Image is accepted");
      this.openSnackBar(snackBar);
    }
  }

  goBack() {
    this.router.navigate(['/user/user/searchUsers'])
    // this.router.navigate(['/user/user/pendingUsers'])
  }


  uploadFoundationLogo(event) {
    var filename = event.target.files[0].name
    this.foundationLogoFile = event.target.files[0];
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(filename + " " + fileAdd);
    // event='';
  }

  updatePayPalToken(value) {
    var paypal: string = value.paypal;
    if (this.profile == 'false') {
      if (paypal == 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne') {
        var body = {
          accountType: "sandbox",
          sandBoxtoken: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
          liveToken: '',
          orgName: sessionStorage.getItem("orgName")
        }
      } else {
        var body = {
          accountType: "production",
          sandBoxtoken: '',
          liveToken: paypal,
          orgName: sessionStorage.getItem("orgName")
        }
      }
      this.httpClient.post(this.urlPort + "/api/users/insertTokenDetails", body, { withCredentials: true })
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            return Observable.throw(err)
          }

        })
        .subscribe((res: Response) => {
          this.loading1 = false;
        })
    } else {
      if (paypal == 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne') {
        var body = {
          accountType: "sandbox",
          sandBoxtoken: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
          liveToken: '',
          orgName: sessionStorage.getItem("orgName")
        }
      } else {
        var body = {
          accountType: "production",
          sandBoxtoken: '',
          liveToken: paypal,
          orgName: sessionStorage.getItem("orgName")
        }
      }
      this.httpClient.post(this.urlPort + "/api/users/updateTokenDetails", body, { withCredentials: true })
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            return Observable.throw(err)
          }

        })
        .subscribe((res: Response) => {
          this.loading1 = false;
        })
    }
  }

  savePhoto(file) {
    var fd = new FormData();
    fd.append('file', file);
    var path = './profileImages/'
    var purpose = 'uploadUserProfileImage'
    var orgName = sessionStorage.getItem('orgName');
    // this.http.post(this.urlPort + "/api/uploadProfileImage/" + this.username, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&username=" + orgName + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .map((response) => response.json())
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to upload profile image");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        var snackBar = this._translateService.instant("Organization Profile Saved");
        this.openSnackBar(snackBar);
      })
  }

  sessionSnackBar(data) {
    var snackBar = this._translateService.instant("End Now");
    this._matSnackBar.open(data, snackBar, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openPaypal() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '700px',
      height: '450px',
      data: { operation: 'paypalInfo' }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

//   changeUserStatus(data, stat) {
//     var changeStatusResult;
//         let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
//             width: '500px',
//             height: '200px',
//             data: { operation: 'changeStat' }
//         });
//         dialogRef.afterClosed().subscribe(result => {

//             changeStatusResult = result;
//             if (changeStatusResult == 'yes') {
//                 if (stat == 'Activated') {
//                     data.regUser = 1;
//                 }
//                 if (stat == 'Deactivated') {
//                     data.regUser = 0;
//                 }
//                 data.username = this.username;
//                 data.email = this.userDetails[0].email
//                 data.regURL = environment.regUrl
//                 this.loading1 = true
//                 this.httpClient.post(this.urlPort + "/api/users/approveUser", data, { withCredentials: true })
//                     .catch((err) => {
//                       this.loading1 = false
//                         var error = err["_body"]
//                         if (error == "session expired") {
//                             this.sessionSnackBar(err["_body"]);
//                             this.router.navigate(['/pages/auth/login-2']);
//                         }
//                         return Observable.throw(err)
//                     })
//                     .subscribe((res: Response) => {
//                         if (stat == 'Activated') {
//                             var snackBar = this._translateService.instant("User Activated");
//                             this.openSnackBar(snackBar);
//                         }
//                         if (stat == 'Deactivated') {
//                             var snackBar = this._translateService.instant("User Deactivated");
//                             this.openSnackBar(snackBar);
//                         }
//                         this.loading1 = false
//                         this.router.navigate(['/user/user/viewUsers'])
//                     })
//             } else {
//                 var snackBar = this._translateService.instant("Operation cancelled!!!");
//                 this.openSnackBar(snackBar);
//             }
//         })
// }

changeUserStatus(data, stat) {
  var dialogueStatus;
  if (this.userType == 'admin') {
          dialogueStatus = stat;
          var changeStatusResult;
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'changeStat', statBody: dialogueStatus }
      });
      dialogRef.afterClosed().subscribe(result => {
        changeStatusResult = result;
          if (changeStatusResult == 'yes') {
              if (stat == 'activate') {
                  data.regUser = 1;
                  data.status = stat
              }
              if (stat == 'deactivate') {
                  data.regUser = 0;
                  data.status = stat
              }
              this.loading1 = true
              data.email = this.userDetails[0].email
              data.username = this.userDetails[0].username
              this.httpClient.post(this.urlPort + "/api/users/approveUser", data, { withCredentials: true })
                  .catch((err) => {
                      this.loading1 = false
                      var error = err["_body"]
                      if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                      }
                      return Observable.throw(err)
                  })
                  .subscribe((res: Response) => {
                      this.loading1 = false
                      if (stat == 'activate') {
                          var snackBar = this._translateService.instant("User Activated");
                          this.openSnackBar(snackBar);
                          this.router.navigate(['/user/user/registeredUsers'])
                      }
                      if (stat == 'deactivate') {
                          var snackBar = this._translateService.instant("User Deactivated");
                          this.openSnackBar(snackBar);
                          this.router.navigate(['/user/user/pendingUsers'])
                      }
                  })
          } else {
              var snackBar = this._translateService.instant("Operation cancelled!!!");
              this.openSnackBar(snackBar);
          }
      })
  } else {
      var snackBar = this._translateService.instant("This User Don't have right to Activate or Deactivate User");
      this.openSnackBar(snackBar);
  }
}

}
