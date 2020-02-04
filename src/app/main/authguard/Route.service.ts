import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import {SimpleCrypt} from "ngx-simple-crypt";
// import { config } from "../../config";
// import { encryptService } from './../services/encrypt.service';

@Injectable()
export class NewsResolver implements Resolve<any> {
    constructor(private http: HttpClient, private router: Router) { }

    resolve() {
        if(window.location.host != 'ledgeropen.com'){
            this.router.navigate(['pages/auth/login-2'])
            // this.router.navigate(['/pages/auth/home-page'])
        } 
        // if (localStorage.getItem('Token')) {
        //     var role = 'Lender'
        //     if (role == 'Lender') {
        //         this.router.navigate(["/Marketplace/Lenders"]);
        //     } if (role == 'Admin') {
        //         this.router.navigate(["/Users/Activation"])
        //     } else if (role == 'DataContributor') {
        //         this.router.navigate(["/Marketplace/DataContributors"]);
        //     }
        // } else {
        //     localStorage.clear();
        //     // this.router.navigate(['/authentication/login2']);
        // }
    }
}