import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoNavigationService } from '@ComGo/components/navigation/navigation.service';
import { ComGoSidebarService } from '@ComGo/components/sidebar/sidebar.service';
import { ComGoSplashScreenService } from '@ComGo/services/splash-screen.service';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';

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
    ComGoConfig: any;
    navigation: any;
    token;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {ComGoConfigService} _ComGoConfigService
     * @param {ComGoNavigationService} _ComGoNavigationService
     * @param {ComGoSidebarService} _ComGoSidebarService
     * @param {ComGoSplashScreenService} _ComGoSplashScreenService
     * @param {ComGoTranslationLoaderService} _ComGoTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _ComGoConfigService: ComGoConfigService,
        private _ComGoNavigationService: ComGoNavigationService,
        private _ComGoSidebarService: ComGoSidebarService,
        private _ComGoSplashScreenService: ComGoSplashScreenService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform
    )
    {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._ComGoNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._ComGoNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._ComGoTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

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
        this._ComGoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.ComGoConfig = config;

                if ( this.ComGoConfig.layout.width === 'boxed' )
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
        this._ComGoSidebarService.getSidebar(key).toggleOpen();
    }

    @HostListener('document:keypress', ['$event'])

    onKeyUp (event: KeyboardEvent) {
        // if (event.keyCode == 44 || event.keyCode == 123) {
        //   event.preventDefault()
        // }
      }
}
