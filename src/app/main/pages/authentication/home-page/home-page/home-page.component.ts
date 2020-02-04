import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: fuseAnimations
})
export class HomePageComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    loginForm: FormGroup;

  constructor( private _fuseConfigService: FuseConfigService, private _formBuilder: FormBuilder,private router: Router) {
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
    orgName: {}
};
   }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
        orgName: ['',Validators.required]
    });
  }

  submit(data){
    // this.router.navigate(['pages/auth/login-2'])
    var url = 'https://'+data.orgName + '.ledgeropen.com/'
    window.location.href=url
  }

  findWorkspace(){
    this.router.navigate(['pages/auth/find-workspace'])
  }

  register(){
    this.router.navigate(['pages/auth/register-2'])
  }
}
