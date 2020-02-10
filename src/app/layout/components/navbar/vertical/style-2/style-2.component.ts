import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { ComGoNavigationService } from '@ComGo/components/navigation/navigation.service';
import { ComGoPerfectScrollbarDirective } from '@ComGo/directives/ComGo-perfect-scrollbar/ComGo-perfect-scrollbar.directive';
import { ComGoSidebarService } from '@ComGo/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar-vertical-style-2',
    templateUrl  : './style-2.component.html',
    styleUrls    : ['./style-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy
{
    ComGoPerfectScrollbarUpdateTimeout: any;
    navigation: any;

    // Private
    private _ComGoPerfectScrollbar: ComGoPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ComGoNavigationService} _ComGoNavigationService
     * @param {ComGoSidebarService} _ComGoSidebarService
     * @param {Router} _router
     */
    constructor(
        private _ComGoNavigationService: ComGoNavigationService,
        private _ComGoSidebarService: ComGoSidebarService,
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
    @ViewChild(ComGoPerfectScrollbarDirective)
    set directive(theDirective: ComGoPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._ComGoPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._ComGoNavigationService.onItemCollapseToggled
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.ComGoPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this._ComGoPerfectScrollbar.update();
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

                            this._ComGoPerfectScrollbar.scrollToTop(scrollDistance);
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
                    if ( this._ComGoSidebarService.getSidebar('navbar') )
                    {
                        this._ComGoSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this._ComGoNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._ComGoNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        if ( this.ComGoPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.ComGoPerfectScrollbarUpdateTimeout);
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
        this._ComGoSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._ComGoSidebarService.getSidebar('navbar').toggleFold();
    }
}
