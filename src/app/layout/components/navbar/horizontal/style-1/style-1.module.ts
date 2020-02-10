import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ComGoNavigationModule } from '@ComGo/components';
import { ComGoSharedModule } from '@ComGo/shared.module';

import { NavbarHorizontalStyle1Component } from './style-1.component';

@NgModule({
    declarations: [
        NavbarHorizontalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        ComGoSharedModule,
        ComGoNavigationModule
    ],
    exports     : [
        NavbarHorizontalStyle1Component
    ]
})
export class NavbarHorizontalStyle1Module
{
}
