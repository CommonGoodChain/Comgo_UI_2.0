import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { comgoNavigationComponent } from './navigation.component';
import { comgoNavVerticalItemComponent } from './vertical/item/item.component';
import { comgoNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { comgoNavVerticalGroupComponent } from './vertical/group/group.component';
import { comgoNavHorizontalItemComponent } from './horizontal/item/item.component';
import { comgoNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { HttpModule } from '@angular/http'
@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
        HttpModule,

        TranslateModule.forChild()
    ],
    exports     : [
        comgoNavigationComponent
    ],
    declarations: [
        comgoNavigationComponent,
        comgoNavVerticalGroupComponent,
        comgoNavVerticalItemComponent,
        comgoNavVerticalCollapsableComponent,
        comgoNavHorizontalItemComponent,
        comgoNavHorizontalCollapsableComponent
    ]
})
export class comgoNavigationModule
{
}
