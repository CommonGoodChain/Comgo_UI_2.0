import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { ForgotPassword2Service } from './forgot-password2.service'

@Component({
    selector: 'forgot-password-2',
    templateUrl: './forgot-password-2.component.html',
    styleUrls: ['./forgot-password-2.component.scss'],
    animations: ComGoAnimations
})
export class ForgotPassword2Component implements OnInit {
    forgotPasswordForm: FormGroup;
    urlPort = environment.urlPort;
    public loading1 = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private forgotPassword2Service: ForgotPassword2Service,
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private routerData: ActivatedRoute,
        private router: Router,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        private _translateService: TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@.À-ÿ_-]{1,80}")]],
        });
    }
    validateUser(formValue) {
        var userdata = {
            username: formValue.username,
            forgetPasswordUrl: environment.forgetPasswordUrl
        }


        // this.http.post(this.urlPort + "/api/users/validateUser", userdata, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        this.loading1 = true;

        /**
 * @author Kuldeep
 * @param: userdata- JSON  consist of username and url.
 * @description This function will check if user presents.
 */
        this.forgotPassword2Service.validateUser(userdata)
        .catch((err) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("User not found");
                this.openSnackBar(snackBar)

                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .then(res => {
                var passwordReset = this._translateService.instant('Password reset link has been sent on');
                var mailId = res['accepted'][0];
                var secureIdStart = mailId.substring(0, 3);
                var secureEnd = mailId.split("@")[1];
                secureEnd = "@" + secureEnd;
                this.openSnackBar(passwordReset + " " + secureIdStart + "*******" + secureEnd);
                this.loading1 = false;
                this.router.navigate(['/pages/auth/login-2'])
            })
    }
    /*
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

}
