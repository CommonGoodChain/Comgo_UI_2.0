import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { ComGoSearchBarComponent } from './search-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ComGoSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    exports     : [
        ComGoSearchBarComponent
    ]
})
export class ComGoSearchBarModule
{
}
