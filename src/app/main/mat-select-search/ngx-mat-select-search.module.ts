import { NgModule } from '@angular/core';
import { MatSelectSearchComponent } from './mat-select-search.component';
import { MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    MatSelectSearchComponent,
    MatSelectSearchClearDirective
  ],
  exports: [
    MatSelectSearchComponent,
    MatSelectSearchClearDirective
  ]
})
export class NgxMatSelectSearchModule { }
