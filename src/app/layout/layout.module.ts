import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from './vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from './vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from './vertical/layout-3/layout-3.module';

import { HorizontalLayout1Module } from './horizontal/layout-1/layout-1.module';
const token = sessionStorage.getItem("token"); 
@NgModule({
    imports: [
        token ? VerticalLayout1Module : [],
        token ? VerticalLayout2Module : [],
        token ? VerticalLayout3Module : [],

        HorizontalLayout1Module
    ],
    exports: [
        token ? VerticalLayout1Module : [],
        token ? VerticalLayout2Module : [],
        token ? VerticalLayout3Module : [],

        HorizontalLayout1Module
    ]
})
export class LayoutModule
{
}
