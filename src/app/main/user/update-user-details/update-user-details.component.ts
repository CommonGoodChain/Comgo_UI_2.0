import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
import { ComGoAnimations } from '@ComGo/animations';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';


@Component({
    selector: 'app-update-user-details',
    templateUrl: './update-user-details.component.html',
    styleUrls: ['./update-user-details.component.scss'],
    animations: ComGoAnimations
})
export class UpdateUserDetailsComponent implements OnInit {

    role;
    userDetails;

    foundationCompany
    username;
    register = 'others';
    orgName
    getCountryCodes;
    anotherArray = [];
    countryArray = [];
    form: FormGroup;
    formErrors: any;
    adminRoleDetails: any;
    ngoRoleDetails: any;
    foundationRoleDetails: any;
    // url = config.url;
    // port = config.port;
    // foundation = config.foundation;
    // regURL = config.regURL;
    urlPort = environment.urlPort;
    foundation = environment.foundation;
    regURL = environment.regUrl;
    userType;
    myip;
    mylat;
    mylong;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    isDisabled: boolean;
    public loading1 = false;
    addDialogResult;
    donorRoleDetails;
    cancelDialogResult;
    getCountry;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder,
        private routerData: ActivatedRoute,
        private router: Router,
        private httpClient: HttpClient,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private _translateService: TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
        // Reactive form errors
        this.formErrors = {
            company: {},
            firstName: {},
            lastName: {},
            address: {},
            address2: {},
            city: {},
            state: {},
            postalCode: {},
            country: {}
        };

        // Horizontal Stepper form error


        // Horizontal Stepper form error


        // Set the private defaults
        this._unsubscribeAll = new Subject();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.userType = sessionStorage.getItem("userType");
        this.username = sessionStorage.getItem("username");
        this.role = sessionStorage.getItem("role");
        if (this.routerData.snapshot.paramMap.get('register')) {
            this.register = this.routerData.snapshot.paramMap.get('register');
        }
        // Reactive Form
        // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
        if(this.userType == 'Private User'){
        this.form = this._formBuilder.group({
            firstName: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            firstSurname: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            secondSurname: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@.À-ÿ_-]{1,80}")]],
            countryCode: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern("[0-9]{8,15}")]],
            country: ['', Validators.required],
            address: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{2,80}")]],
            zipCode: ['',[Validators.pattern("[0-9]{5}")]],
            city:['',[Validators.pattern("[A-Za-z À-ÿ]{2,30}")]],
            idNumber:['',[Validators.required,Validators.pattern("[0-9A-Za-zÀ-ÿ]{2,15}")]]
        });
        $(document).ready(function () {
            $("#username").prop("disabled", true);
        });
    } else {
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@.À-ÿ_-]{1,80}")]],
            countryCode: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern("[0-9]{8,15}")]],
            country: ['', Validators.required],
            orgName: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,40}")]],
            idNumber:['',[Validators.required,Validators.pattern("[0-9A-Za-zÀ-ÿ]{2,15}")]],
            domainName: ['', [Validators.pattern("[a-zA-Z0-9-_À-ÿ:./]{1,200}")]]
        });
        $(document).ready(function () {
            $("#username").prop("disabled", true);
            $("#orgName").prop("disabled", true);
        });
    }
        // $(document).ready(function () {
        //     this.role = sessionStorage.getItem("role");
        //     if (this.role != "ngo") {
        //         $('#address').hide();
        //         $('#postalCode').hide();
        //         $('#city').hide();
        //         $('#state').hide();
        //         $("#urlForHide").hide()
        //     }
        //     $("#countryCode").prop("disabled", true);
        // })
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });

        // Horizontal Stepper form steps

        this.http.get("https://ipinfo.io/")
            .subscribe(
                (res: Response) => {
                    this.myip = res.json().loc;
                    this.mylat = parseFloat(this.myip.split(",")[0]);
                    this.mylong = parseFloat(this.myip.split(",")[1]);
                })

        $(document).ready(function () {
        });
        //   if(this.role=='ngo')
        //   {
        //     this.form.controls['orgName'].setValue(this.orgName);
        //   }
        /**
  * @author: Madhu
  * @argument:none
  * @description:Get data of Country
  */
        var countryBody = {
            sessionCheck: true
        }
        this.httpClient.post(this.urlPort + "/api/country/all", countryBody, { withCredentials: true })
            .map(
                (response) => response
            )
            .catch((err) => {
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                } else {
                    var snackBar = this._translateService.instant("Failed to get country data");
                    this.openSnackBar(snackBar);
                }
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.getCountry = res;
                this.countryArray = this.getCountry;
            })

        /**
        * @author: Kuldeep
        * @argument:none
        * @description:Get Country Codes
        */
        var countryCodesBody = {
            sessionCheck: true
        }
        this.http.post(this.urlPort + "/api/country/countryCodes", countryCodesBody,{ withCredentials: true})
            .map(
                (response) => response.json()
            )
            .catch((err) => {
                // var error = err["_body"]
                // if(error == "session expired"){
                //   this.sessionSnackBar(err["_body"]);
                //   this.router.navigate(['/pages/auth/login-2']);
                // }else{
                var snackBar = this._translateService.instant("Failed to get country codes");
                this.openSnackBar(snackBar);
                // }
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.getCountryCodes = res;
                this.anotherArray = this.getCountryCodes;
            })
        /** Function ends here */

        /**
   * @author: Kuldeep
   * @argument:none
   * @description:Used to get user details
   */
        var data = {
            username: sessionStorage.getItem("username")
        }
        this.loading1 = true;
        this.httpClient.post(this.urlPort + "/api/users/getUserDetails", data, { withCredentials: true })
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
                else {
                    var snackBar = this._translateService.instant("Failed to get userDetails!!");
                    this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                this.userDetails = res;
                var length = this.userDetails.countryCode.toString().length
                if(this.userType == 'Private User'){
                this.form.controls['firstName'].setValue(this.userDetails.firstName);
                this.form.controls['username'].setValue(this.userDetails.username);
                this.form.controls['country'].setValue(this.userDetails.country);
                this.form.controls['countryCode'].setValue(this.userDetails.countryCode);
                this.form.controls['firstSurname'].setValue(this.userDetails.firstSurname);
                this.form.controls['secondSurname'].setValue(this.userDetails.secondSurname);
                this.form.controls['email'].setValue(this.userDetails.email);
                this.form.controls['phone'].setValue(this.userDetails.phone.substring(length));
                this.form.controls['idNumber'].setValue(this.userDetails.idNumber);
                this.form.controls['address'].setValue(this.userDetails.address);
                this.form.controls['zipCode'].setValue(this.userDetails.zipCode);
                this.form.controls['city'].setValue(this.userDetails.city);
                } else {
                this.form.controls['orgName'].setValue(this.userDetails.orgName);
                this.form.controls['username'].setValue(this.userDetails.username);
                this.form.controls['email'].setValue(this.userDetails.email);
                this.form.controls['idNumber'].setValue(this.userDetails.idNumber);
                this.form.controls['country'].setValue(this.userDetails.country);
                this.form.controls['countryCode'].setValue(this.userDetails.countryCode);
                this.form.controls['phone'].setValue(this.userDetails.phone.substring(length));
                this.form.controls['domainName'].setValue(this.userDetails.domainName);
            }
                this.loading1 = false;
            })
    }
    

    updateUserDetails(data) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: "update" }
        });
        dialogRef.afterClosed().subscribe(result => {

            this.addDialogResult = result;
            if (this.addDialogResult == 'yes') {
        data.userType = sessionStorage.getItem("userType")
        
        data.mobileNoWithoutCountryCode = data.phone;
            this.loading1 = true;
            data.phone = data.countryCode + data.phone
            // data.sessionCheck = true
           this.httpClient.post(this.urlPort + "/api/users/updateUserDetails", data, { withCredentials: true })
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
                            this.openSnackBar(err["_body"]);
                        }
                        return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                        this.loading1 = false;
                        if (sessionStorage.getItem("userType") == 'Private User') {
                            this.router.navigate(["/user/user/myOrganization"]);
                        } else {
                            this.router.navigate(["/user/user/searchUsers"]);
                        }
                    })
                }
                })
    }/**

    /**
        * @author: Madhu
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
            this.cancelDialogResult = result;
            if (this.cancelDialogResult == 'yes') {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Operation cancelled!!!");
                this.openSnackBar(snackBar);
                if (sessionStorage.getItem("userType") == 'Private User') {
                    this.router.navigate(["/user/user/myOrganization"]);
                } else {
                    this.router.navigate(["/user/user/searchUsers"]);
                }
            }
            else if (this.cancelDialogResult == 'no') {
                this.loading1 = false;
            }
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    openSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On form values changed
     */
    onFormValuesChanged(): void {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    taxExemptionCheck() {
        if (this.form.get('taxExemptionCheck').value == true) {
            $('#address').show();
            $('#postalCode').show();
            $('#city').show();
            $('#state').show();
            $('#idNumber').show();
        }
        if (this.form.get('taxExemptionCheck').value == false) {
            $('#address').hide();
            $('#postalCode').hide();
            $('#city').hide();
            $('#state').hide();
            $('#idNumber').hide();

            this.form.controls['address'].setValue("");
            this.form.controls['postalCode'].setValue("");
            this.form.controls['city'].setValue("");
            this.form.controls['state'].setValue("");
            this.form.controls['country'].setValue("");
            this.form.controls['idNumber'].setValue("");
            this.form.controls['taxExemptionCheck'].setValue(false);
        }
    }

    goBack() {
        if (sessionStorage.getItem("userType") == 'Private User') {
            this.router.navigate(["/user/user/myOrganization"]);
        } else {
            this.router.navigate(["/user/user/searchUsers"]);
        }
    }

    filterListCareUnit(val) {
        this.getCountryCodes = this.anotherArray.filter(country => country.code.toLowerCase().indexOf(val.toLowerCase()) > -1);
    }


    filterListCountry(val) {
        this.getCountry = this.countryArray
        this.getCountry = this.countryArray.filter(country => country.countryName.toLowerCase().indexOf(val.toLowerCase()) > -1);
    }

    changedCountryName() {
        this.getCountry = this.countryArray;
    }

    changeCountry(event) {
        for (var i = 0; i < this.getCountryCodes.length; i++) {
            if (this.getCountryCodes[i].country == event.value) {
                this.form.controls['countryCode'].setValue(this.getCountryCodes[i].code);
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
}
