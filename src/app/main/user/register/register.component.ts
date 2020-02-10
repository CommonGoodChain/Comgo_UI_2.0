import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
import { ComGoAnimations } from '@ComGo/animations';
import { environment } from '../../../../environments/environment';
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
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: ComGoAnimations
})
export class RegisterComponent implements OnInit {

    role;
    regURL = environment.regUrl;
    urlPort = environment.urlPort;
    foundation = environment.foundation;
    file = undefined;
    fileName = '';
    foundationCompany
    username;
    register = 'others';
    orgName
    getCountryCodes;
    form: FormGroup;
    formErrors: any;
    countryArray = [];
    adminRoleDetails: any;
    ngoRoleDetails: any;
    foundationRoleDetails: any;
    myip;
    mylat;
    mylong;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    isDisabled = true;
    public loading1 = false;
    addDialogResult;
    donorRoleDetails;
    cancelDialogResult;
    getOrganizationName;
    getCountry;
    userDetails;
    userType;

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
            this.form = this._formBuilder.group({
            firstName: [''],
            firstSurname: [''],
            secondSurname: [''],
            email: [''],
            username: [''],
            countryCode: [''],
            phone: [''],
            country: [''],
            userType: [''],
            orgName: [''],
            domainName: [''],
            address: [''],
            zipCode: [''],
            city: [''],
            idNumber: ['']
            });
        /**
  * @author: Madhu
  * @argument:none
  * @description:Get data of Country
  */
        var sessionCheck = true
        var countryBody = {
            sessionCheck: true
        }
        this.httpClient.post(this.urlPort + "/api/country/all", countryBody, { withCredentials: true })
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
                    var snackBar = this._translateService.instant("Failed to get country data");
                    this.openSnackBar(snackBar);
                }
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.loading1 = false;
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
        this.httpClient.post(this.urlPort + "/api/country/countryCodes", countryCodesBody,{ withCredentials: true})
            .map(
                (response) => response
            )
            .catch((err) => {
                this.loading1 = false;
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
                this.loading1 = false;
                this.getCountryCodes = res;
            })

            var data = {
                username: this.routerData.snapshot.paramMap.get('username')
            }
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
                    // this.openSnackBar("Failed to get userDetails!!");
                    return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                    this.userDetails = res;
                    this.userType = this.userDetails.userType
                    console.log("user Details: ",this.userDetails)
                    var length = this.userDetails.countryCode.toString().length
                    if(this.userDetails.userType == 'Private User'){
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
                } else{
                    this.form.controls['domainName'].setValue(this.userDetails.domainName);
                    this.form.controls['orgName'].setValue(this.userDetails.orgName);
                    this.form.controls['username'].setValue(this.userDetails.username);
                    this.form.controls['country'].setValue(this.userDetails.country);
                    this.form.controls['countryCode'].setValue(this.userDetails.countryCode);
                    this.form.controls['email'].setValue(this.userDetails.email);
                    this.form.controls['phone'].setValue(this.userDetails.phone.substring(length));
                    this.form.controls['idNumber'].setValue(this.userDetails.idNumber);
                }
                $(document).ready(function () {
                    $("#domainName").prop("disabled", true);
                    $("#orgName").prop("disabled", true);
                    $("#firstName").prop("disabled", true);
                    $("#firstSurname").prop("disabled", true);
                    $("#secondSurname").prop("disabled", true);
                    $("#email").prop("disabled", true);
                    $("#username").prop("disabled", true);
                    $("#countryCode").prop("disabled", true);
                    $("#phone").prop("disabled", true);
                    $("#address").prop("disabled", true);
                    $("#zipCode").prop("disabled", true);
                    $("#city").prop("disabled", true);
                    $("#country").prop("disabled", true);
                    $("#idNumber").prop("disabled", true);
                });
                    this.loading1 = false;
                })
    }

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

    back(){
        this.router.navigate([sessionStorage.getItem('backRoutes')])
    }
}
