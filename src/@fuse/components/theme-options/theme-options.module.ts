import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { comgoDirectivesModule } from '../../directives/directives';
import { comgoSidebarModule } from '../sidebar/sidebar.module';
import { comgoMaterialColorPickerModule } from '../material-color-picker/material-color-picker.module';

import { comgoThemeOptionsComponent } from './theme-options.component';

@NgModule({
    declarations: [
        comgoThemeOptionsComponent
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

        comgoDirectivesModule,
        comgoMaterialColorPickerModule,
        comgoSidebarModule
    ],
    exports     : [
        comgoThemeOptionsComponent
    ]
})
export class comgoThemeOptionsModule
{
}
