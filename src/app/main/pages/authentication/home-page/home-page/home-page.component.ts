import { Component, OnInit } from '@angular/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComGoAnimations } from '@ComGo/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: ComGoAnimations
})
export class HomePageComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    loginForm: FormGroup;

  constructor( private _ComGoConfigService: ComGoConfigService, private _formBuilder: FormBuilder,private router: Router) {
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
