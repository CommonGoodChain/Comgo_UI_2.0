import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatTooltipModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatCheckboxModule
} from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { ViewexpensesComponent } from './viewexpenses/viewexpenses.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { ComGoWidgetModule } from '@ComGo/components/widget/widget.module';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatStepperModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from 'ngx-loading';
const routes = [
  
  {
    path     : 'expenses/viewexpenses',
    component: ViewexpensesComponent
},
{
  path     : 'expenses/addexpense',
  component: AddexpenseComponent
}];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComGoSharedModule,
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
    MatTooltipModule,
    NgxChartsModule,
    MatDialogModule,
    TranslateModule,
    ComGoSharedModule,
    ComGoWidgetModule,

    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    LoadingModule

  ],
  declarations: [ViewexpensesComponent,
    AddexpenseComponent,],
})
export class ExpensesModule { }
