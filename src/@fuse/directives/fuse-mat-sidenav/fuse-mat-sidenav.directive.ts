import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { comgoMatchMediaService } from '../../services/match-media.service';
import { comgoMatSidenavHelperService } from './comgo-mat-sidenav.service';

@Directive({
    selector: '[comgoMatSidenavHelper]'
})
export class comgoMatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input('comgoMatSidenavHelper')
    id: string;

    @Input('mat-is-locked-open')
    matIsLockedOpenBreakpoint: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {comgoMatchMediaService} _comgoMatchMediaService
     * @param {comgoMatSidenavHelperService} _comgoMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _comgoMatchMediaService: comgoMatchMediaService,
        private _comgoMatSidenavHelperService: comgoMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _observableMedia: ObservableMedia
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

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
        // Register the sidenav to the service
        this._comgoMatSidenavHelperService.setSidenav(this.id, this._matSidenav);

        if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._comgoMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
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
}

@Directive({
    selector: '[comgoMatSidenavToggler]'
})
export class comgoMatSidenavTogglerDirective
{
    @Input('comgoMatSidenavToggler')
    id;

    /**
     * Constructor
     *
     * @param {comgoMatSidenavHelperService} _comgoMatSidenavHelperService
     */
    constructor(
        private _comgoMatSidenavHelperService: comgoMatSidenavHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick()
    {
        this._comgoMatSidenavHelperService.getSidenav(this.id).toggle();
    }
}
