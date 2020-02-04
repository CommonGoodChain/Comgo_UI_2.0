import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//added by sagar
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

//newly added by sagar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HttpModule } from "@angular/http";
import { DialogElementsExampleDialog } from "./dialog.component";
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
// import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [  
      LoadingModule,
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
      MatCheckboxModule,
      NgxChartsModule,
      TranslateModule,
      MatDialogModule,     
      MatToolbarModule,
      MatStepperModule,
      MatDatepickerModule,
      MatNativeDateModule,
      HttpModule,
      // ModalModule.forRoot()
    ],
    declarations: [ DialogElementsExampleDialog],
    entryComponents: [ DialogElementsExampleDialog ],
    providers: []
  })
  export class dialogModule { }
  