import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComGoConfigService } from '../../services/config.service';
import { ComGoTranslationLoaderService } from '../../services/translation-loader.service';
import { locale as english } from 'app/layout/i18n/tr';
import { locale as spanish } from 'app/layout/i18n/tr';
import {TranslateService}from "@ngx-translate/core"

@Component({
    selector   : 'ComGo-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class ComGoSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    ComGoConfig: any;

    @Output()
    input: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
        private _translateService:TranslateService
    )
    {
        // Set the defaults
        this.input = new EventEmitter();
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
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
        this._ComGoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.ComGoConfig = config;
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
