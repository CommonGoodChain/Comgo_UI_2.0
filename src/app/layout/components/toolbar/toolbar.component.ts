import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoSidebarService } from '@ComGo/components/sidebar/sidebar.service';
import { navigation } from '../../../navigation/navigation';
import { Router } from '@angular/router';
import { config } from 'config';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../i18n/en';
import { locale as spanish } from '../../i18n/tr';
var introJS = require('intro.js')

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    profile;
    lang;
    urlPort = environment.urlPort;
    languages: any;
    navigation: any;
    subRole;
    role;
    language;
    userType;
    selectedLanguage: any;
    userStatusOptions: any[];
    public userName;
    private _unsubscribeAll: Subject<any>;
    profileImageUrl;
    // profileImageUrl = config.profileImageUrl
    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     * @param {ComGoSidebarService} _ComGoSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        private _ComGoSidebarService: ComGoSidebarService,
        private _translateService: TranslateService,
        private http: Http,
    private httpClient : HttpClient,

        private router: Router,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        this.userName = sessionStorage.getItem("username")
       if(this.userName != ''){
        this.profileImageUrl = environment.profileImageUrl
       }
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Spanish',
                flag: 'es'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.language = this._translateService.currentLang;
        this.lang = sessionStorage.getItem("lang");
        if (this.lang) {
            this._translateService.currentLang = this.lang;
        }
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
        this.userType = sessionStorage.getItem("userType")
        // Subscribe to the config changes
        this._ComGoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
    }


     /**
     * Set the language
     * @param lang
     */
    setLanguage(lang): void {
        sessionStorage.removeItem("lang");
        this.selectedLanguage = lang;
        this._translateService.use(lang.id);
        sessionStorage.setItem("lang", lang.id);
        window.location.reload();
    }
    


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._ComGoSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
    }

    
    /**
    * Logout
    */


    logout(): void {
        var data;
        data = { "username": this.userName }
        this.httpClient.post(this.urlPort + "/api/users/logout", data, { withCredentials: true })
            .map(
                (response) => response
            )
            .catch((err) => {
                return Observable.throw(err)
            })
            .subscribe((res: Response) => {
                sessionStorage.clear();
                this.router.navigate(["/pages/auth/login-2"]);
            })
    }

    gotoUserProfile() {
        this.router.navigate(["/user/user/userProfile"]);
    }

    changePassword() {
        this.router.navigate(["/pages/auth/reset-password-2"]);
    }

    updateUser() {
        this.router.navigate(["/user/user/updateUser"]);

    }
}