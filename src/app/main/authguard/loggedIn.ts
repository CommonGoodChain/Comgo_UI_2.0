import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

const STORE_KEY = 'lastAction';
@Injectable({
  providedIn: 'root'
})
export class loggedIn implements CanActivate {
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
    private router: Router,
    public dialog: MatDialog
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('token')) {
      if (sessionStorage.getItem('role') == 'admin') {
        this.router.navigate(["/user/user/viewUsers"]);
      }

      if (sessionStorage.getItem('role') == 'donor') {
        if (sessionStorage.getItem('profile') == 'false') {
          this.router.navigate(['user/user/userProfile'])
        }
        else {
          this.router.navigate(["/donor/donor/otherproject"]);
        }
      }
      if (sessionStorage.getItem('role') == 'crm') {
        if (sessionStorage.getItem('profile') == 'false') {
          this.router.navigate(['user/user/userProfile'])
        }
        else {
          this.router.navigate(["/projects/project/publishproject"]);
        }
      }
      if (sessionStorage.getItem('role') == 'foundation') {
        if (sessionStorage.getItem('profile') == 'false') {
          this.router.navigate(['user/user/userProfile'])
        }
        else {
          this.router.navigate(["/projects/project/viewallproject"]);
        }

      }
      if (sessionStorage.getItem('role') == 'ngo' || sessionStorage.getItem('role') == 'board') {
        if (sessionStorage.getItem('profile') == 'false') {
          this.router.navigate(['user/user/userProfile'])
        }
        else {
          this.router.navigate(["/projects/project/viewallproject"]);
        }
      }
      if (sessionStorage.getItem('role') == 'validator') {
        if (sessionStorage.getItem('profile') == 'false') {
          this.router.navigate(['user/user/userProfile'])
        }
        else {
          this.router.navigate(['/projects/project/publishproject'])
        }
      }
      return true;
    }
    else {
      return true;
    }
  }
}