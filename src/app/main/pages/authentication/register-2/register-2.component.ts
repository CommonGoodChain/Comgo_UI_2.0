import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { environment } from 'environments/environment';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { Register2Service } from './register2.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
@Component({
    selector: 'register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    animations: ComGoAnimations
})
export class Register2Component implements OnInit {
    registerForm: FormGroup;
    getUserType;
    urlPort = environment.urlPort;
    regURL = environment.regUrl
    imageUrl = environment.imageUrl;
    foundation = environment.foundation;
    countryArray = [];
    formErrors: any;
    languages: any;
    selectedLanguage: any;
    myip;
    getCountryCodes;
    mylat;
    getCountry;
    mylong;
    lang;
    projectId;
    language;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    public loading1 = false;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private register2Service: Register2Service,
        private httpClient: HttpClient,
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder,
        private routerData: ActivatedRoute,
        private router: Router,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        private _translateService: TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
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

        // Configure the layout
        this._ComGoConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Spanish',
                flag: 'es'
            }
        ];

        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);

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
        this.projectId = sessionStorage.getItem("projectIdForLogin");
        console.log("projectId: ",this.projectId)
        this.language = this._translateService.currentLang;
        this.lang = sessionStorage.getItem("lang");
        if (this.lang) {
            this._translateService.currentLang = this.lang;
        }
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

        this.registerForm = this._formBuilder.group({
            firstName: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            firstSurname: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            secondSurname: ['', [Validators.pattern("[A-Za-zÀ-ÿ]{1,80}")]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@.À-ÿ_-]{1,80}")]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
            countryCode: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern("[0-9]{8,15}")]],
            country: ['', Validators.required],
            userType: ['', Validators.required],
            orgName: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,40}")]],
            domainName: ['', [Validators.pattern("[a-zA-Z0-9-_À-ÿ:./]{1,200}")]],
            address: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{2,80}")]],
            zipCode: ['', [Validators.pattern("[0-9]{5}")]],
            city: ['', [Validators.pattern("[A-Za-z À-ÿ]{2,30}")]],
            idNumber: ['', [Validators.required, Validators.pattern("[0-9A-Za-zÀ-ÿ]{2,15}")]]
        });
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
        $('#organization').hide();
        $('#domainName').hide();
        $('#domainExtension').hide();
        // $('#postalCode').hide();
        // $('#city').hide();
        // $('#state').hide();
        // $('#idNumber').hide();
        // $("#countryCode").prop("disabled", true);
        // $('#country').hide();
        var countryBody = {
            sessionCheck: false
        }
        
        /**
 * @author Kuldeep
 * @param: countryBody- JSON  consist of sessionCheck
 * @description This function will return all the country names
 */
        this.register2Service.getCountryNames(countryBody)
        .catch((err) => {
                var snackBar = this._translateService.instant("Failed to get country data");
                this.openSnackBar(snackBar);
                return Observable.throw(err)
            })
            .then(res => {
                this.getCountry = res;
                this.countryArray = this.getCountry
            })

        /**
        * @author: Kuldeep
        * @argument:none
        * @description:Get Country Codes
        */
        var countryCodesBody = {
            sessionCheck: false
        }

        /**
 * @author Kuldeep
 * @param: countryCodesBody- JSON  consist of sessionCheck
 * @description This function will return all the country codes
 */
        this.register2Service.getCountryCodes(countryCodesBody)
        .catch((err) => {
                var snackBar = this._translateService.instant("Failed to get country codes");
                this.openSnackBar(snackBar);
                return Observable.throw(err)
            })
            .then(res => {
                this.getCountryCodes = res;
            })



        this.getUserType = [
            { "userType": "Organization" },
            { "userType": "Private User" }
        ]


        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('confirmPassword').updateValueAndValidity();
            });
    }

    /**
    * Set the language
    * @param lang
    */
    setLanguage(lang): void {
        sessionStorage.removeItem("lang");
        this.selectedLanguage = lang;
        this._translateService.use(lang.id);
        sessionStorage.setItem("lang", lang.id);
        window.location.reload();
    }

    onFormValuesChanged(): void {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    registration(data) {
        data.mobileNoWithoutCountryCode = data.phone;
        data.role = data.userType;
        data.createFlag = 1; //does not check if user first login
        // this.loading1 = true;

        /**
        * @author Kuldeep
        * @description This function will return Current Location of the system.
        */
        this.register2Service.getCurrentLocation()
            .then(res => {
                    this.myip = res.json().loc;
                    data.location = this.myip;
                    this.mylat = parseFloat(this.myip.split(",")[0]);
                    this.mylong = parseFloat(this.myip.split(",")[1]);
                    data.lat = this.mylat.toString();
                    data.long = this.mylong.toString();
                    data.regURL = this.regURL;
                    if (data.userType == 'Organization') {
                        if (data.domainName != '' && data.orgName!= '') {
                            this.loading1 = true;
                            data.phone = data.countryCode + data.phone
                            data.sessionCheck = true

                            /**
                            * @author Kuldeep
                            * @param: data- JSON  consist of user data
                            * @description This function will register user
                            */
                            this.register2Service.register(data)
                            .catch((err) => {
                                    this.loading1 = false;
                                    var snackBar = this._translateService.instant(err['_body']);
                                    this.openSnackBar(snackBar)
                                    return Observable.throw(err)
                                })
                                .then(res => {

                                    if (res["error"]) {
                                        this.loading1 = false;
                                        this.openSnackBar(res['error']);
                                    } else {
                                        this.loading1 = false;
                                        var snackBar = this._translateService.instant("Username and Password has been send to your email");
                                        this.openSnackBar(snackBar)
                                        this.openSnackBar("Registration Successfully!!!");
                                        this.router.navigate(['/pages/auth/login-2'])
                                    }
                                })
                        } else {
                            var snackBar = this._translateService.instant("Please fill all the fields.");
                            this.openSnackBar(snackBar)
                        }
                    } else {
                        this.loading1 = true;
                        data.phone = data.countryCode + data.phone
                        data.sessionCheck = true

                        /**
                        * @author Kuldeep
                        * @param: data- JSON  consist of user data
                        * @description This function will register user
                        */
                        this.register2Service.register(data)
                        .catch((err) => {
                                this.loading1 = false;
                                var snackBar = this._translateService.instant(err['_body']);
                                this.openSnackBar(snackBar)
                                return Observable.throw(err)
                            })
                            .then(res => {

                                if (res["error"]) {
                                    this.loading1 = false;
                                    this.openSnackBar(res['error']);
                                } else {
                                    this.loading1 = false;
                                    var snackBar = this._translateService.instant("Username and Password has been send to your email");
                                    this.openSnackBar(snackBar)
                                    this.openSnackBar("Registration Successfully!!!");
                                    if(this.projectId != undefined && this.projectId != null && this.projectId != ''){
                                        let navigationExtras: NavigationExtras = {
                                            queryParams: { 'projectId': sessionStorage.getItem("projectIdForLogin") }
                                          };
                                          this.router.navigate(['/pages/auth/login-2'], navigationExtras);
                                    } else {
                                          this.router.navigate(['/pages/auth/login-2']);
                                    }
                                    // this.router.navigate(['/pages/auth/login-2'])
                                }
                            })
                    }
                })
    }/**
* @author:Sagar
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

    changeUserType(event) {
        if (event.value == 'Organization') {
            $('#organization').show();
            $('#domainName').show();
            $('#domainExtension').show();
            $('#firstName').hide();
            $('#firstSurname').hide();
            $('#secondSurname').hide();
            $('#address').hide();
            $('#zipCode').hide();
            $('#city').hide();
        } else {
            $('#organization').hide();
            $('#domainName').hide();
            $('#domainExtension').hide();
            $('#firstName').show();
            $('#firstSurname').show();
            $('#secondSurname').show();
            $('#address').show();
            $('#zipCode').show();
            $('#city').show();
        }
    }




    //Kuldeep 
    filterListCountry(val) {
        this.getCountry = this.countryArray;
        this.getCountry = this.countryArray.filter(country => country.countryName.toLowerCase().indexOf(val.toLowerCase()) > -1);

    }
    //end

    changedCountryName() {
        this.getCountry = this.countryArray;
    }

    changeCountry(event) {
        for (var i = 0; i < this.getCountryCodes.length; i++) {
            if (this.getCountryCodes[i].country == event.value) {
                this.registerForm.controls['countryCode'].setValue(this.getCountryCodes[i].code);
            }
        }
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const confirmPassword = control.parent.get('confirmPassword');

    if (!password || !confirmPassword) {
        return null;
    }

    if (confirmPassword.value === '') {
        return null;
    }

    if (password.value === confirmPassword.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };


};



