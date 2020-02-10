import { NgModule } from '@angular/core';

import { ComGoIfOnDomDirective } from './ComGo-if-on-dom/ComGo-if-on-dom.directive';
import { ComGoInnerScrollDirective } from './ComGo-inner-scroll/ComGo-inner-scroll.directive';
import { ComGoPerfectScrollbarDirective } from './ComGo-perfect-scrollbar/ComGo-perfect-scrollbar.directive';
import { ComGoMatSidenavHelperDirective, ComGoMatSidenavTogglerDirective } from './ComGo-mat-sidenav/ComGo-mat-sidenav.directive';

@NgModule({
    declarations: [
        ComGoIfOnDomDirective,
        ComGoInnerScrollDirective,
        ComGoMatSidenavHelperDirective,
        ComGoMatSidenavTogglerDirective,
        ComGoPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        ComGoIfOnDomDirective,
        ComGoInnerScrollDirective,
        ComGoMatSidenavHelperDirective,
        ComGoMatSidenavTogglerDirective,
        ComGoPerfectScrollbarDirective
    ]
})
export class ComGoDirectivesModule
{
}
