import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../dialog/dialog.component'
const MINUTES_UNITL_AUTO_LOGOUT = 15// in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  urlPort = environment.urlPort;
  regUser;
  myip;
  foundationName;
  role;
  addDialogResult;
  timerReset = true;

  public getLastAction() {
    return parseInt(sessionStorage.getItem(STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    sessionStorage.setItem(STORE_KEY, lastAction.toString());
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _translateService: TranslateService,
    private dialogRef: MatDialog,
    private _matSnackBar: MatSnackBar,
    private http: Http,
    public dialog: MatDialog
  ) {
    this.check();
    this.initListener();
    this.initInterval();
    sessionStorage.setItem(STORE_KEY, Date.now().toString());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    else {
      this.router.navigate([''], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    if (this.timerReset == true) {
      const now = Date.now();
      const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
      const diff = timeleft - now;

      if (this.router.url == '/pages/auth/login-2' || this.router.url == '/pages/auth/register-2' || this.router.url == '/pages/auth/forgot-password-2' || this.router.url == '/pages/auth/reset-password-2' || this.router.url.startsWith('/pages/auth/forgot-password-3/') || this.router.url.startsWith('/pages/auth/home-page') || this.router.url.startsWith('/pages/auth/find-workspace')) {
      } else {
        if (diff <= 600000) {
          this.timerReset = false;
          let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'resetSession', username: sessionStorage.getItem("username") },
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(result => {
            this.addDialogResult = result;
            if (this.addDialogResult == 'yes' || this.addDialogResult == undefined || this.addDialogResult == null) {
              var data = { "username": sessionStorage.getItem("username") }
              this.httpClient.post(this.urlPort + "/api/checkRegisterSession", data, { withCredentials: true })
                .map(
                  (response) => response
                )
                .catch((err) => {
                  this.timerReset = true;
                  return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                  this.reset()
                  this.timerReset = true;
                })
            } else if (this.addDialogResult == 'logout') {
              var data = { "username": sessionStorage.getItem("username") }
              this.httpClient.post(this.urlPort + "/api/users/logout", data, { withCredentials: true })
                .map(
                  (response) => response
                )
                .catch((err) => {
                  return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                  this.timerReset = true;
                  this.reset()
                  dialogRef.close;
                  sessionStorage.clear();
                  this.router.navigate(['/pages/auth/login-2']);
                })
            }
            this.timerReset = true;
          })
        }
      }
    }
  }

  /**
    * @author:Madhu
    * @description: Open snak bar
  */
  openSnackBar(data) {
    var snackBar = this._translateService.instant("End Now");
    this._matSnackBar.open(data, snackBar, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}