import { Component, OnInit, OnDestroy } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { FormControl } from '@angular/forms';
//added by sagar
import * as $ from 'jquery';
import { JQuery } from 'jquery';
//added by sagar
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material'

@Component({
  selector: 'app-forgot-password3',
  templateUrl: './forgot-password3.component.html',
  styleUrls: ['./forgot-password3.component.scss']
})
export class ForgotPassword3Component implements OnInit {

  forgotPasswordForm: FormGroup;
  urlPort = environment.urlPort;
  public loading1 = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  username;
  operation;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private routerData: ActivatedRoute,
    private router: Router,
    private http: Http,
    private _translateService: TranslateService,
    private _matSnackBar: MatSnackBar,
  ) {
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

    this.username = this.routerData.snapshot.paramMap.get('username');
    this.operation = this.routerData.snapshot.paramMap.get('operation');

    if (this.operation == 'fp2') {
      this.forgotPasswordForm = this._formBuilder.group({
        password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@.À-ÿ_-]{1,80}")]],
        confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
      });
    } else {
      this.openSnackBar("Some error occurs");
      this.router.navigate(['/pages/auth/login-2'])
    }

  }
  changePassword(formValue) {
    var userdata = {
      password: formValue.password,
      username: this.username

    }
    this.http.post(this.urlPort + "/api/users/forgotPassword", userdata, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .map(
        (response) => response.json()
      )
      .catch((err) => {
        this.loading1 = false;
        this.openSnackBar("Some error occurs");
        // this.notification.Info(err['_body']);
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.openSnackBar("Password reset successfully!!");
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