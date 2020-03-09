import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComGoAnimations } from '@ComGo/animations';
import * as $ from 'jquery';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { environment } from '../../../../environments/environment';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
import { DonorFormService } from './donor-form.service'

declare let paypal: any;

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.scss'],
  animations: ComGoAnimations
})

export class DonorFormComponent implements OnInit {
  form: FormGroup;
  donation;
  notification;
  username;
  currencyArray = [];
  modeOfPaymentForFoun;
  getCurrency;
  notificationMode: any;
  urlPort = environment.urlPort;
  fileName;
  donationType;
  file;
  routeBack;
  fundAmount;
  error = 1;
  projectName;
  projectIdForLogin;
  paypalEnv = sessionStorage.getItem("accountType");
  paypalSandbox = sessionStorage.getItem("sandBoxtoken");
  paypalLive = sessionStorage.getItem("liveToken");
  public didPaypalScriptLoad: boolean = false;
  public loading1 = false;

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
    private donorFormService:  DonorFormService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private http: Http,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private _translateService: TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
  ) {
    this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
  }

  /** * @author:Akshay * @description: Open success snak bar */
  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow,
      {
        duration: 10000,
        horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition,
      });
  }

  /**
   * On init
   */
  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectNameForProjectProfile");
    this.projectIdForLogin = sessionStorage.getItem("projectIdForLogin")
    this.routeBack = sessionStorage.getItem('backRoute')
    this.username = sessionStorage.getItem('username')
    this.fundAmount = this.routerData.snapshot.paramMap.get('fundAmount');
    this.donationType = this.routerData.snapshot.paramMap.get('donationType');
    if(this.donationType == 'Donation'){
      this.form = this._formBuilder.group({
        donationType: ['', Validators.required],
        notificationPreference: ['', Validators.required],
        notificationMode: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        modeOfPayment: [{
          value: "Credit Card",
          disabled: true
        }, Validators.required,],
        currencyType: [{
          value: sessionStorage.getItem("currency"),
          disabled: true
        }, Validators.required],
        anonymousUser: ['']
      });
    } else {
      this.form = this._formBuilder.group({
        referenceNo: ['', { disabled: true }, [Validators.required, Validators.pattern("[A-Za-z0-9@. À-ÿ]{1,30}")]],
        donorName: [
              {
                value: this.routerData.snapshot.paramMap.get('donorName'),
                disabled: true
              }, Validators.required
            ],
        amount: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        modeOfPayment: ['', Validators.required],
        currencyType: [{
          value: sessionStorage.getItem("currency"),
          disabled: true
        }, Validators.required],
        anonymousUser: ['']
      });
    }

    this.getDropDowns();
    $('#paypal-button').hide();

    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
      });
    }
  }

  getDropDowns() {
    this.notificationMode = [{
      "notificationMode": "SMS & Email",
      "value": "both"
    },
    {
      "notificationMode": "SMS",
      "value": "sms"
    },
    {
      "notificationMode": "Email",
      "value": "email"
    }
    ]

    /**
    * @author Kuldeep
    * @description This function will return All donation types.
    */
    this.donorFormService.getDonationType().then(res => {
      this.donation = res;
    }).catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      } else {
        var snackBar = this._translateService.instant("Failed to get Donation Type");
        this.openSnackBar(snackBar);
      }
      return Observable.throw(err)
    })

    /**
    * @author Kuldeep
    * @description This function will return All Notification Types.
    */
    this.donorFormService.getAllNotification().then(res => {
      this.notification = res;
    }).catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      } else {
        var snackBar = this._translateService.instant("Failed to get Notification");
        this.openSnackBar(snackBar);
      }
      return Observable.throw(err)
    })

    /**
    * @author Kuldeep
    * @description This function will return All Mode of Payment.
    */
    this.donorFormService.getModeOfPayment().then(res => {
        this.modeOfPaymentForFoun = res;
    }).catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get Mode of Payment");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })

      /**
      * @author Kuldeep
      * @description This function will return All Currencies.
      */
      this.donorFormService.getAllCurrencies().then(res => {
        this.getCurrency = res;
        this.currencyArray = this.getCurrency
      }).catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
        var snackBar = this._translateService.instant("Failed to get Currency");
        this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
  }

  changePaymentMode(event) {
    if (event.value == 'Credit Card') {
      $('#save').hide();
      if (this.form.get('modeOfPayment').value != '' && this.form.get('amount').value && this.form.get('amount').value <= Number(this.fundAmount) && this.form.get('referenceNo').value != '' && this.form.get('amount').value != '') {
        $('#paypal-button').show();
      } else {
        $('#paypal-button').hide();
      }
    } else {
      $('#save').show();
      $('#paypal-button').hide()
      $('#paypal-button').hide()
    }
  }

  donate(value) {
    value.fromDate = new Date();
    var donationDate = new Date();
    var donationData;
    var cancelDialogResult;
    var hash;
    if(this.donationType == 'Donation'){
      donationData = value
      donationData.donationDate = donationDate;
      donationData.donorId = Date.now();
      donationData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
      donationData.projectId = this.routerData.snapshot.paramMap.get('projectId');

      if (value.donationType !== '' && value.notificationPreference !== '' && value.notificationMode !== '' && value.amount !== '' && value.modeOfPayment !== '') {
        if (value.amount <= this.fundAmount) {
          if (donationData.anonymousUser == true) {
            donationData.aliasName = 'Anonymous';
          }
          else {
            donationData.aliasName = this.username;
          }
          this.loading1 = true;
          donationData.projectOwner = sessionStorage.getItem("projectOwnerForProjectProfile");
          donationData.projectCurrency = sessionStorage.getItem("currency");
          donationData.donationType = this.donationType

          /**
          * @author Kuldeep
          * @description This function is used by user to donate to project.
          */
          this.donorFormService.donorDonate(donationData).then(res => {
            var donationSuccessful = this._translateService.instant('Donation Successful');
                  this.loading1 = false;
                  if(this.projectIdForLogin != undefined && this.projectIdForLogin != null && this.projectIdForLogin != ''){
                    this.router.navigate(['/user/user/myOrganization'])
                  } else {
                  // this.router.navigate([this.routeBack])
                  history.back()
                  }
                  this.openSnackBar(donationSuccessful);
          }).catch((err) => {
                  this.loading1 = false;
                  var error = err["_body"]
                  if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                  } else {
                    var snackBar = this._translateService.instant("Donation Unsuccessful");
                    this.openSnackBar(snackBar)
                  }
                  return Observable.throw(err)
                })
        }
        else {
          var donateUpto = this._translateService.instant('You can donate upto');
          this.openSnackBar(donateUpto + " " + this.fundAmount);
        }
      } else {
        var snackBar = this._translateService.instant("All Fields are mandatory");
        this.openSnackBar(snackBar)
      }
    }
    else {
      donationData = value
      donationData.donationDate = donationDate;
      donationData.donorName = this.form.get("donorName").value;
      donationData.donorId = Date.now();
      donationData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
      donationData.projectId = this.routerData.snapshot.paramMap.get('projectId');
      if (this.file) {
        if (value.amount !== '' && value.amount != 0 && value.modeOfPayment !== '' && value.referenceNo !== '') {
          if (this.form.get('amount').value <= Number(this.fundAmount)) {
            if (donationData.anonymousUser == true) {
              donationData.aliasName = 'Anonymous';
            }
            else {
              donationData.aliasName = this.form.get("donorName").value;
            }

            if (donationData.modeOfPayment == 'Self') {
              let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
                width: '500px',
                height: '200px',
                data: { operation: 'donate' }
              });
              dialogRef.afterClosed().subscribe(result => {
                cancelDialogResult = result;
                if (cancelDialogResult == 'yes') {
                  this.loading1 = true;
                  var purpose = "uploadDonationDoc"
                  var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                  var path = './donorUploads/' + this.routerData.snapshot.paramMap.get('projectId') + '/'+ sessionStorage.getItem("username")+ '/'
                  var fd = new FormData();
                  fd.append('file', this.file, randomImageId + this.file['name'])

                  /**
                  * @author Kuldeep
                  * @description This function is used by user to upload file while donation.
                  */
                  this.donorFormService.donationFileUpload(path,purpose,fd).then(res => {
                    var result = res;
                      hash = result["hash"];
                    donationData.fileHash =  hash
                  donationData.fileName = randomImageId + this.file['name'];
                  donationData.filePath = '/donorUploads/' + this.routerData.snapshot.paramMap.get('projectId') + '/'+ sessionStorage.getItem("username")+ '/';
                  donationData.projectCurrency = sessionStorage.getItem("currency");
                  donationData.donationType = this.donationType

                  /**
                  * @author Kuldeep
                  * @description This function is used by user to donate to project if does not have donate permission.
                  */
                  this.donorFormService.foundationDonate(donationData).then(res => {
                    var donationSuccessful = this._translateService.instant('Donation Successful');
                      this.loading1 = false;
                      // this.router.navigate([this.routeBack])
                      history.back()
                      this.openSnackBar(donationSuccessful);
                  }).catch((err) => {
                      this.loading1 = false;
                      var error = err["_body"]
                      if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                      } else {
                        var snackBar = this._translateService.instant("Donation Unsuccessful");
                        this.openSnackBar(snackBar)
                      }
                      return Observable.throw(err)
                    })
                  }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                      this.sessionSnackBar(err["_body"]);
                      this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                  })
                } else {
                  this.loading1 = false;
                }
              })
            } else {
              this.loading1 = true;
              donationData.fileName = this.fileName;
              donationData.projectCurrency = sessionStorage.getItem("currency");
                  var purpose = "uploadDonationDoc"
                  var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                  var path = './donorUploads/' + this.routerData.snapshot.paramMap.get('projectId') + '/'+ sessionStorage.getItem("username")+ '/'
                  var fd = new FormData();
                  fd.append('file', this.file, randomImageId + this.file['name'])

                  /**
                  * @author Kuldeep
                  * @description This function is used by user to upload file while donation.
                  */
                  this.donorFormService.donationFileUpload(path,purpose,fd).then(res => {
                    var result = res;
                    hash = result["hash"];
                  donationData.fileHash =  hash
                donationData.fileName = randomImageId + this.file['name'];
                donationData.filePath = '/donorUploads/' + this.routerData.snapshot.paramMap.get('projectId') + '/'+ sessionStorage.getItem("username")+ '/';
                
                /**
                * @author Kuldeep
                * @description This function is used by user to donate to project if does not have donate permission.
                */
                this.donorFormService.foundationDonate(donationData).then(res => {
                  var donationSuccessful = this._translateService.instant('Donation Successful');
                    this.loading1 = false;
                    // this.router.navigate([this.routeBack])
                    history.back()
                    this.openSnackBar(donationSuccessful);
                }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                      this.sessionSnackBar(err["_body"]);
                      this.router.navigate(['/pages/auth/login-2']);
                    } else {
                      var snackBar = this._translateService.instant("Donation Unsuccessful");
                      this.openSnackBar(snackBar)
                    }
                    return Observable.throw(err)
                  })
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
          } else {
            var donateUpto = this._translateService.instant('You can donate upto');
            this.openSnackBar(donateUpto + " " + this.fundAmount);
          }
        } else {
          var snackBar = this._translateService.instant("All Fields are mandatory");
          this.openSnackBar(snackBar)
        }
      } 
      else {
        if (value.amount !== '' && value.amount != 0 && value.modeOfPayment !== '' && value.referenceNo !== '') {
          if (this.form.get('amount').value <= Number(this.fundAmount)) {
            if (donationData.anonymousUser == true) {
              donationData.aliasName = 'Anonymous';
            }
            else {
              donationData.aliasName = this.form.get("donorName").value;
            }

            if (donationData.modeOfPayment == 'Self') {
              let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
                width: '500px',
                height: '200px',
                data: { operation: 'donate' }
              });
              dialogRef.afterClosed().subscribe(result => {
                cancelDialogResult = result;
                if (cancelDialogResult == 'yes') {
                  this.loading1 = true;
                  donationData.donationType = this.donationType
                  donationData.projectCurrency = sessionStorage.getItem("currency");

                  this.donorFormService.foundationDonate(donationData).then(res => {
                    var donationSuccessful = this._translateService.instant('Donation Successful');
                      this.loading1 = false;
                      // this.router.navigate([this.routeBack])
                      history.back()
                      this.openSnackBar(donationSuccessful);
                  }).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                      this.sessionSnackBar(err["_body"]);
                      this.router.navigate(['/pages/auth/login-2']);
                    } else {
                      var snackBar = this._translateService.instant("Donation Unsuccessful");
                      this.openSnackBar(snackBar)
                    }
                    return Observable.throw(err)
                  })
                } else {
                  this.loading1 = false;
                }
              })
            } else {
              this.loading1 = true;
              donationData.fileName = this.fileName;
              donationData.projectCurrency = sessionStorage.getItem("currency");
              donationData.donationType = this.donationType

              this.donorFormService.foundationDonate(donationData).then(res => {
                var donationSuccessful = this._translateService.instant('Donation Successful');
                this.loading1 = false;
                // this.router.navigate([this.routeBack])
                history.back()
                this.openSnackBar(donationSuccessful);
              }).catch((err) => {
                      this.loading1 = false;
                      var error = err["_body"]
                      if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                      } else {
                        var snackBar = this._translateService.instant("Donation Unsuccessful");
                        this.openSnackBar(snackBar)
                      }
                      return Observable.throw(err)
                    })
            }
          } else {
            var donateUpto = this._translateService.instant('You can donate upto');
            this.openSnackBar(donateUpto + " " + this.fundAmount);
          }
        } else {
          var snackBar = this._translateService.instant("All Fields are mandatory");
          this.openSnackBar(snackBar)
        }
      }
    }
  }

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
          if(this.projectIdForLogin != undefined && this.projectIdForLogin != null && this.projectIdForLogin != ''){
            let navigationExtras: NavigationExtras = {
              queryParams: { 'projectId': sessionStorage.getItem("projectIdForLogin") }
            };
            this.router.navigate(['/pages/projectProfile'], navigationExtras);
          } else{
            // this.router.navigate([this.routeBack])
            history.back()
          }
      } else {
        this.loading1 = false;
      }
    })
  }

  amountCheck(donationAmount) {
    if (this.donationType == "Self Donation") {
      if (donationAmount != '' && this.form.get('modeOfPayment').value != '' && this.form.get('amount').value != '' && this.form.get('amount').value <= Number(this.fundAmount) && this.form.get('referenceNo').value != '' && this.form.get('modeOfPayment').value == 'Credit Card') {
        this.error = 0;
        $('#paypal-button').show();
      }
      else {
        this.error = 1;
        $('#paypal-button').hide();
      }
    } else {
      if (this.form.get('donationType').value != '' && donationAmount != '' && this.form.get('notificationPreference').value != '' && this.form.get('notificationMode').value != '' && this.form.get('amount').value != '' && this.form.get('amount').value <= Number(this.fundAmount)) {
        this.error = 0;
        $('#paypal-button').show();
      }
      else {
        this.error = 1;
        $('#paypal-button').hide();
      }
    }
  }

  /** 
  * @author:kuldeep
  * @argument:donate form data
  * @description:it is method to submit donate form value  
 */
  public paypalConfig: any = {
    env: this.paypalEnv,
    client: {
      sandbox: this.paypalSandbox,
      production: this.paypalLive
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.form.get('amount').value, currency: this.form.get('currencyType').value } }
          ]
        }
      })
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        $("#save").click();
      });
    }
  };

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  checkPayPalLogo() {
    if (this.donationType == "Self Donation") {
      if (this.form.get('modeOfPayment').value != '' && this.form.get('amount').value <= Number(this.fundAmount) && this.form.get('referenceNo').value != '' && this.form.get('modeOfPayment').value == 'Credit Card' && this.form.get('amount').value != '') {
        $('#paypal-button').show();
      } else {
        $('#paypal-button').hide();
      }
    } else {
      if (this.form.get('donationType').value != '' && this.form.get('notificationPreference').value != '' && this.form.get('notificationMode').value != '' && this.form.get('amount').value != '' && this.form.get('amount').value <= Number(this.fundAmount)) {
        $('#paypal-button').show();
      } else {
        $('#paypal-button').hide();
      }
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

  filterListCurrency(val) {
    this.getCurrency = this.currencyArray
    this.getCurrency = this.currencyArray.filter(currency => currency.currencyCode.toLowerCase().indexOf(val) > -1);
  }

  changedCurrency() {
    this.getCurrency = this.currencyArray;
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(this.fileName + " " + fileAdd);
  }

  getCurrncy() {
    if (this.donationType == "Self Donation") {
      if (this.form.get('modeOfPayment').value != '' && this.form.get('amount').value <= Number(this.fundAmount) && this.form.get('referenceNo').value != '' && this.form.get('modeOfPayment').value == 'Credit Card' && this.form.get('amount').value != '') {
        $('#paypal-button').show();
      } else {
        $('#paypal-button').hide();
      }
    } else {
      if (this.form.get('donationType').value != '' && this.form.get('notificationPreference').value != '' && this.form.get('notificationMode').value != '' && this.form.get('amount').value != '' && this.form.get('amount').value <= Number(this.fundAmount) && this.form.get('amount').value != '') {
        $('#paypal-button').show();
      } else {
        $('#paypal-button').hide();
      }
    }
  }

  checkPaypalSession() {
    /**
    * @author Kuldeep
    * @description This function is used by user to refresh session.
    */
    this.donorFormService.checkRegisterSession().then(res => {

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

  backToProjectAbout(){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'projectId': sessionStorage.getItem("projectIdForLogin") }
    };
    this.router.navigate(['/pages/projectProfile'], navigationExtras);
  }

  back(){
    console.log("back")
    history.back()
  }

}