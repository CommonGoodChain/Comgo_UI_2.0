import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ComGoNavigationModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

import { NavbarVerticalStyle1Component } from './style-1.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        ComGoSharedModule,
        ComGoNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ]
})
export class NavbarVerticalStyle1Module
{
}
