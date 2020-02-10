import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { comgoNavigationService } from '@comgo/components/navigation/navigation.service';
import { comgoPerfectScrollbarDirective } from '@comgo/directives/comgo-perfect-scrollbar/comgo-perfect-scrollbar.directive';
import { comgoSidebarService } from '@comgo/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-2',
    templateUrl  : './style-2.component.html',
    styleUrls    : ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy
{
    comgoPerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _comgoPerfectScrollbar: comgoPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {comgoNavigationService} _comgoNavigationService
     * @param {comgoSidebarService} _comgoSidebarService
     * @param {Router} _router
     */
    constructor(
        private _comgoNavigationService: comgoNavigationService,
        private _comgoSidebarService: comgoSidebarService,
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(comgoPerfectScrollbarDirective)
    set directive(theDirective: comgoPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._comgoPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._comgoNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.comgoPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._comgoPerfectScrollbar.update();
                }, 310);
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if ( activeNavItem )
                        {
                            const activeItemOffsetTop       = activeNavItem.offsetTop,
                                  activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                            this._comgoPerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._comgoSidebarService.getSidebar('navbar') )
                    {
                        this._comgoSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._comgoNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._comgoNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.comgoPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.comgoPerfectScrollbarUpdateTimeout);
        }

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._comgoSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._comgoSidebarService.getSidebar('navbar').toggleFold();
    }
}
