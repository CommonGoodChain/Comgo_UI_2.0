import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import * as crypto from 'crypto';
import { appConst } from 'config';
import { stringify } from 'config';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../layout/i18n/en';
import { locale as spanish } from '../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( private router: Router, 
        private _matSnackBar: MatSnackBar,
        private _translateService:TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService) {
            this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
         }


    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken =  sessionStorage.getItem('token');
        // Clone the request and set the new header in one step.
        if (this.router.url == '/' || this.router.url == '/pages/auth/login-2'|| req.url.endsWith('/pages/auth/login-2') || req.url.endsWith('/api/users/validateUser') || req.url.indexOf('/pages/auth/register-2') > -1) {
            return next.handle(req);
        } else {
            let reqBody;
            if (req.body) {
                if (req.body.permission) {
                    delete req.body.permission;
                }
                if (Object.keys(req.body).length > 0) {
                    reqBody = stringify(req.body);
                } else {
                    reqBody = null;
                }
            } else {
                reqBody = null;
            }

            let microTime = new Date().getTime();

           
            let hmac = crypto.createHmac("SHA256", authToken);
            hmac.update(req.urlWithParams + appConst.saperator + reqBody + appConst.saperator + microTime.toString(), "utf8");

            let newHeader = new HttpHeaders({
                'Authorization': 'Bearer '+authToken,
                'X-MICRO-TIME': microTime.toString(),
                'X-HMAC-HASH': hmac.digest("hex"),
                'Content-Type' : "application/json",
                'response-Type' : 'text'
            });
            
            const authReq = req.clone({ headers: newHeader });
            // send cloned request with header to the next handler.
            
            return next.handle(authReq)
                .pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            if (event.body.code) {
                                if (event.body["code"] === 401) {
                                    this.router.navigateByUrl('/logout');
                                    this.openSnackBar("Your session has been timed out. Please login again.");
                                }                                
                            }

                            let responseHeaders = event.headers;

                            if (responseHeaders && responseHeaders.has('Authorization')) {
                                let token = responseHeaders.get('Authorization');
                                sessionStorage.setItem('token',token)
                            }
                        }
                    }, error => {
                        // this.openSnackBar(error.message);
                        var err = error["error"]
                        // if(err == "session expired"){
                        //     this.sessionSnackBar("session expired");
                        //     this.router.navigate(['/pages/auth/login-2']);
                        //   }
                          if (err == "session expired") {
                            this.sessionSnackBar("session expired");
                            error["_body"] = "session expired"
                            return Observable.throw(error);
                         } 
                        // this.router.navigateByUrl('/logout');
                    })
                );
            }

    }

    openSnackBar(data) {
        this._matSnackBar.open(data, 'Close', {
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
}
