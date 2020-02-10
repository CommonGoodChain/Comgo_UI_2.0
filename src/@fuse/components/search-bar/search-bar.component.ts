import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { comgoConfigService } from '../../services/config.service';
import { comgoTranslationLoaderService } from '../../services/translation-loader.service';
import { locale as english } from 'app/layout/i18n/tr';
import { locale as spanish } from 'app/layout/i18n/tr';
import {TranslateService}from "@ngx-translate/core"

@Component({
    selector   : 'comgo-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class comgoSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    comgoConfig: any;

    @Output()
    input: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {comgoConfigService} _comgoConfigService
     */
    constructor(
        private _comgoConfigService: comgoConfigService,
        private _comgoTranslationLoaderService: comgoTranslationLoaderService,
        private _translateService:TranslateService
    )
    {
        // Set the defaults
        this.input = new EventEmitter();
        this._comgoTranslationLoaderService.loadTranslations(english, spanish);
        this.collapsed = true;

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
        // Subscribe to config changes
        this._comgoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.comgoConfig = config;
                }
            );
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
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        this.input.emit(event.target.value);
    }

}
