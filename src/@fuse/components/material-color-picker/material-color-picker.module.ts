import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatRippleModule } from '@angular/material';

import { ComGoPipesModule } from '../../pipes/pipes.module';

import { ComGoMaterialColorPickerComponent } from './material-color-picker.component';

@NgModule({
    declarations: [
        ComGoMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,

        ComGoPipesModule
    ],
    exports: [
        ComGoMaterialColorPickerComponent
    ],
})
export class ComGoMaterialColorPickerModule
{
}
