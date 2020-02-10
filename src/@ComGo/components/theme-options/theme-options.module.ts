import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { ComGoDirectivesModule } from '../../directives/directives';
import { ComGoSidebarModule } from '../sidebar/sidebar.module';
import { ComGoMaterialColorPickerModule } from '../material-color-picker/material-color-picker.module';

import { ComGoThemeOptionsComponent } from './theme-options.component';

@NgModule({
    declarations: [
        ComGoThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        ComGoDirectivesModule,
        ComGoMaterialColorPickerModule,
        ComGoSidebarModule
    ],
    exports     : [
        ComGoThemeOptionsComponent
    ]
})
export class ComGoThemeOptionsModule
{
}
