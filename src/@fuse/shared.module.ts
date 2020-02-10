import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ComGoDirectivesModule } from './directives/directives';
import { ComGoPipesModule } from './pipes/pipes.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        ComGoDirectivesModule,
        ComGoPipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        ComGoDirectivesModule,
        ComGoPipesModule
    ]
})
export class ComGoSharedModule
{
}
