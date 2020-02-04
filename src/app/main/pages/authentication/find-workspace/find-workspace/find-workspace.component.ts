import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Response, Http, Headers } from '@angular/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
@Component({
  selector: 'app-find-workspace',
  templateUrl: './find-workspace.component.html',
  styleUrls: ['./find-workspace.component.scss'],
  animations: fuseAnimations
})
export class FindWorkspaceComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    urlPort = environment.urlPort;
    loginForm: FormGroup;
    public loading1 = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private _fuseConfigService: FuseConfigService,  private _matSnackBar: MatSnackBar,private _formBuilder: FormBuilder,private router: Router,private http: Http) {
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
  this.formErrors = {
    username: {}
};
   }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
        username: ['']
    });
  }

  confirm(data){
    this.router.navigate(['pages/auth/login-2'])

  }

  findWorkspace(data){
    this.loading1 = true;
      data.viewWorkSpaceUrl= environment.viewWorkSpaceUrl
      this.http.post(this.urlPort + "/api/users/mailToFindWorkspace", data, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .map(
          (response) => response.json()
      )
      .catch((err) => {
          this.loading1 = false;
              this.openSnackBar(err["_body"])
          return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.loading1 = false;
        this.openSnackBar('Link has been sent to the user')
        this.router.navigate(['/pages/auth/home-page'])
    })
    // this.router.navigate(['pages/auth/find-workspace'])
  }

  openSnackBar(data) {
    var endNow = 'End now';
this._matSnackBar.open(data, endNow, {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}
}
