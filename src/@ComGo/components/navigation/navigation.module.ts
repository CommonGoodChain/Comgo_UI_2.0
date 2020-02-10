import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { ComGoNavigationComponent } from './navigation.component';
import { ComGoNavVerticalItemComponent } from './vertical/item/item.component';
import { ComGoNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { ComGoNavVerticalGroupComponent } from './vertical/group/group.component';
import { ComGoNavHorizontalItemComponent } from './horizontal/item/item.component';
import { ComGoNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
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
        ComGoNavigationComponent
    ],
    declarations: [
        ComGoNavigationComponent,
        ComGoNavVerticalGroupComponent,
        ComGoNavVerticalItemComponent,
        ComGoNavVerticalCollapsableComponent,
        ComGoNavHorizontalItemComponent,
        ComGoNavHorizontalCollapsableComponent
    ]
})
export class ComGoNavigationModule
{
}
