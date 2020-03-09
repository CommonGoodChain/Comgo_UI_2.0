import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { TranslateService } from "@ngx-translate/core";
import { ResetPassword2Service } from './reset-password2.service'
@Component({
    selector: 'reset-password-2',
    templateUrl: './reset-password-2.component.html',
    styleUrls: ['./reset-password-2.component.scss'],
    animations: ComGoAnimations
})
export class ResetPassword2Component implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    username;
    userDeatils;
    subRole;
    myip;
    createFlag;
    role;
    orgName;
    urlPort = environment.urlPort;
    imageUrl = environment.imageUrl;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private resetPassword2Service: ResetPassword2Service,
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder,
        private routerData: ActivatedRoute,
        private router: Router,
        private http: Http,
        private _translateService: TranslateService,
        private _matSnackBar: MatSnackBar,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
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
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.username = sessionStorage.getItem('username')
        this.role = sessionStorage.getItem('role');
        this.createFlag = sessionStorage.getItem("createFlag");
        this.resetPasswordForm = this._formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
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


    /**
* @function checkPassword
* @author: Kuldeep.Ramesh.Narvekar
* @since:07/08/2018
* @argument: password :- contains password,
* @description:Used to check Password
* @version: 1.0.0
* */
    checkPassword(password) {
        var body = {
            "username": this.username,
            "password": password
        }

        /**
 * @author Kuldeep
 * @param: body- JSON  consist of projectId
 * @description This function will check user old password
 */
        this.resetPassword2Service.checkPassword(body)
        .catch((err) => {
                return Observable.throw(err)
            })
            .then(res => {
                //   $("#reset").prop("disabled",false)
            })
    }
    /**
     * function ends here
     */

    /**
* @function reset
* @author: Kuldeep.Ramesh.Narvekar
* @since:07/08/2018
* @argument: formData :- contains form data,
* @description:Used to Reset Password
* @version: 1.0.0
* */
    reset(formData) {
        var body = {
            "username": this.username,
            "password": formData.oldPassword
        }
        
        /**
 * @author Kuldeep
 * @param: body- JSON  consist of projectId
 * @description This function will check user old password
 */
        this.resetPassword2Service.checkPassword(body)
        .catch((err) => {
                this.openSnackBar("Incorrect Password");
                return Observable.throw(err)
            })
            .then(res => {
                formData.username = this.username;

                /**
                * @author Kuldeep
                * @description This function will return Current Location of the system.
                */
                this.resetPassword2Service.getCurrentLocation()
                    .then(res => {
                            this.myip = res.json().loc;
                            var body = {
                                "username": this.username,
                                "password": formData.password,
                                "latitude": parseFloat(this.myip.split(",")[0]),
                                "longitude": parseFloat(this.myip.split(",")[1]),
                                "ip": window.location.origin
                            }

                            /**
                            * @author Kuldeep
                            * @param: body- JSON  consist of username, password, latitude, longitude, ip.
                            * @description This function will change password
                            */
                            this.resetPassword2Service.changePassword(body)
                            .catch((err) => {
                                    return Observable.throw(err)
                                })
                                .then(res => {
                                    var body = res;
                                    if (this.createFlag == 1) {
                                        if (this.role == 'donor') {
                                            this.openSnackBar("Password Changed Successfully!!!");
                                            this.router.navigate(["/donor/donor/otherproject", { profileUpdate: 1 }]);
                                        }

                                        if (this.role == 'crm' || this.role == 'validator') {
                                            this.openSnackBar("Password Changed Successfully!!!");
                                            this.router.navigate(["/projects/project/publishproject", { profileUpdate: 1 }]);
                                        }
                                        if (this.role == 'foundation') {
                                            this.openSnackBar("Password Changed Successfully!!!");
                                            this.router.navigate(["/projects/project/viewallproject", { profileUpdate: 1 }]);
                                        }

                                        if (this.role == 'ngo') {
                                            this.openSnackBar("Password Changed Successfully!!!");
                                            this.router.navigate(["/projects/project/viewallproject", { profileUpdate: 1 }]);
                                        }
                                        if (this.role == 'board') {
                                            this.openSnackBar("Password Changed Successfully!!!");
                                            this.router.navigate(["/projects/project/viewallproject", { profileUpdate: 1 }]);
                                        }
                                    } else {
                                        sessionStorage.setItem("token", body["userToken"])
                                        this.openSnackBar("Password Changed Successfully!!!");
                                        this.router.navigate(["/pages/auth/login-2"]);
                                    };
                                })
                        })
            })
    }
    /**
     * function ends here
     */

     /**
 * @author Kuldeep
 * @description This function will check session
 */
    getSessionData() {

        this.resetPassword2Service.getSessionData()
        .catch((err) => {
                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .then(res => {
            })
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
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
