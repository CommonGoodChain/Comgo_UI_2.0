import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ComGoConfigService } from '@ComGo/services/config.service';
import { navigation } from '../../../navigation/navigation';

@Component({
    selector     : 'vertical-layout-3',
    templateUrl  : './layout-3.component.html',
    styleUrls    : ['./layout-3.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout3Component implements OnInit, OnDestroy
{
    ComGoConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService
    )
    {
        // Set the defaults
        this.navigation = navigation;

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
            .subscribe((config) => {
                this.ComGoConfig = config;
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
}
