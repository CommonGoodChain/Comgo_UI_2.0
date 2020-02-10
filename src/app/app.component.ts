import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { comgoConfigService } from '@comgo/services/config.service';
import { comgoNavigationService } from '@comgo/components/navigation/navigation.service';
import { comgoSidebarService } from '@comgo/components/sidebar/sidebar.service';
import { comgoSplashScreenService } from '@comgo/services/splash-screen.service';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';

import { navigation } from './navigation/navigation';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import {HostListener,Directive,HostBinding,Input} from '@angular/core';
// import './_content/app.less';
// import './_content/modal.less';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    comgoConfig: any;
    navigation: any;
    token;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {comgoConfigService} _comgoConfigService
     * @param {comgoNavigationService} _comgoNavigationService
     * @param {comgoSidebarService} _comgoSidebarService
     * @param {comgoSplashScreenService} _comgoSplashScreenService
     * @param {comgoTranslationLoaderService} _comgoTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _comgoConfigService: comgoConfigService,
        private _comgoNavigationService: comgoNavigationService,
        private _comgoSidebarService: comgoSidebarService,
        private _comgoSplashScreenService: comgoSplashScreenService,
        private _comgoTranslationLoaderService: comgoTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform
    )
    {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._comgoNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._comgoNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._comgoTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.token = sessionStorage.getItem('token')
        // Subscribe to config changes
        this._comgoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.comgoConfig = config;

                if ( this.comgoConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
    toggleSidebarOpen(key): void
    {
        this._comgoSidebarService.getSidebar(key).toggleOpen();
    }

    @HostListener('document:keypress', ['$event'])

    onKeyUp (event: KeyboardEvent) {
        // if (event.keyCode == 44 || event.keyCode == 123) {
        //   event.preventDefault()
        // }
      }
}
