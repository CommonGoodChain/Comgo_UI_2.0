import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';

@Component({
    selector: 'forgot-password-2',
    templateUrl: './forgot-password-2.component.html',
    styleUrls: ['./forgot-password-2.component.scss'],
    animations: fuseAnimations
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
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private routerData: ActivatedRoute,
        private router: Router,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        private _translateService: TranslateService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        // Configure the layout
        this._fuseConfigService.config = {
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
        this.httpClient.post(this.urlPort + "/api/users/validateUser", userdata, { withCredentials: true })
            .map(
                (response) => response
            )
            .catch((err) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("User not found");
                this.openSnackBar(snackBar)

                // this.notification.Info(err['_body']);
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
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
