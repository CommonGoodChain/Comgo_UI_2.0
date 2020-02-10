import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatRippleModule } from '@angular/material';

import { comgoPipesModule } from '../../pipes/pipes.module';

import { comgoMaterialColorPickerComponent } from './material-color-picker.component';

@NgModule({
    declarations: [
        comgoMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,

        comgoPipesModule
    ],
    exports: [
        comgoMaterialColorPickerComponent
    ],
})
export class comgoMaterialColorPickerModule
{
}
