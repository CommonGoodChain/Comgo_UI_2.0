import { NgModule } from '@angular/core';

import { comgoIfOnDomDirective } from './comgo-if-on-dom/comgo-if-on-dom.directive';
import { comgoInnerScrollDirective } from './comgo-inner-scroll/comgo-inner-scroll.directive';
import { comgoPerfectScrollbarDirective } from './comgo-perfect-scrollbar/comgo-perfect-scrollbar.directive';
import { comgoMatSidenavHelperDirective, comgoMatSidenavTogglerDirective } from './comgo-mat-sidenav/comgo-mat-sidenav.directive';

@NgModule({
    declarations: [
        comgoIfOnDomDirective,
        comgoInnerScrollDirective,
        comgoMatSidenavHelperDirective,
        comgoMatSidenavTogglerDirective,
        comgoPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        comgoIfOnDomDirective,
        comgoInnerScrollDirective,
        comgoMatSidenavHelperDirective,
        comgoMatSidenavTogglerDirective,
        comgoPerfectScrollbarDirective
    ]
})
export class comgoDirectivesModule
{
}
