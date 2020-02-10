import { NgModule } from '@angular/core';
import { AddmilestoneComponent } from './addmilestone/addmilestone.component';
import { ViewmilestoneComponent } from './viewmilestone/viewmilestone.component';
import { RouterModule, Routes } from '@angular/router';
//added by sagar
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { comgoSharedModule } from '@comgo/shared.module';
import { comgoWidgetModule } from '@comgo/components/widget/widget.module';
//newly added by sagar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HttpModule } from "@angular/http";
// import { ModalModule } from 'ngx-bootstrap/modal'
// import { ModalComponent } from '../../../_directives';
// import { ModalService } from '../../../_services';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  
  {
    path     : 'milestone/addmilestone',
    component: AddmilestoneComponent
},
{
  path     : 'milestone/viewmilestone',
  component: ViewmilestoneComponent
},

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    comgoSharedModule,
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
    MatTooltipModule,
    TranslateModule,
    MatCheckboxModule,
    NgxChartsModule,
    MatDialogModule,
    comgoSharedModule,
    comgoWidgetModule,
    MatToolbarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    // ModalModule.forRoot(),
    LoadingModule
  ],
  // declarations: [AddmilestoneComponent, ModalComponent, ViewmilestoneComponent],
  declarations: [AddmilestoneComponent,ViewmilestoneComponent],
  providers: []
})
export class MilestoneModule { }
