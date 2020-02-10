import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ComGoNavigationModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

import { NavbarVerticalStyle2Component } from './style-2.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        ComGoSharedModule,
        ComGoNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}
