import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatTooltipModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatCheckboxModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatStepperModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { AddProofComponent } from './add-proof/add-proof.component';
import { ViewProofComponent } from './view-proof/view-proof.component';
import { LoadingModule } from 'ngx-loading';
import { NgxMatSelectSearchModule } from 'app/main/mat-select-search/ngx-mat-select-search.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
{
  path     : 'proof/addProof',
  component: AddProofComponent
},
{
  path     : 'proof/viewProof',
  component: ViewProofComponent
}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    CommonModule,
    MatTooltipModule,
    TranslateModule,
    NgxChartsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCa0WFUkd481foUKeLnUF9rLLlITdqSFNg'
    }),

    FuseSharedModule,
    FuseWidgetModule,

    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [AddProofComponent, ViewProofComponent]
})
export class ProofModule { }
