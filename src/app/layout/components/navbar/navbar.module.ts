import { NgModule } from '@angular/core';

import { ComGoSharedModule } from '@ComGo/shared.module';

import { NavbarComponent } from './navbar.component';
import { NavbarHorizontalStyle1Module } from './horizontal/style-1/style-1.module';
import { NavbarVerticalStyle1Module } from './vertical/style-1/style-1.module';
import { NavbarVerticalStyle2Module } from './vertical/style-2/style-2.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../main/authguard';
@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        ComGoSharedModule,
        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
