import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { comgoSearchBarComponent } from './search-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        comgoSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    exports     : [
        comgoSearchBarComponent
    ]
})
export class comgoSearchBarModule
{
}
