import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { Http } from '@angular/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { NavigationEnd } from '@angular/router';

@Injectable()
export class Projects {
    translateService: TranslateService
    http: Http
    httpClient: HttpClient
    _matSnackBar: MatSnackBar
    dialog: MatDialog
    _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    constructor(private router: Router){
        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
           return false;
        }
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
               // trick the Router into believing it's last link wasn't previously loaded
               this.router.navigated = false;
               // if you need to scroll back to top, here is the right place
               window.scrollTo(0, 0);
            }
        });
    }

    resolve() {
            
    }
}
