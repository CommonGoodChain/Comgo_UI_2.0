import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourWorkspaceComponent } from './your-workspace/your-workspace.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatFormFieldModule,MatInputModule,MatTooltipModule,
  MatIconModule, MatPaginatorModule,
  MatSnackBarModule, MatSortModule, MatTableModule
} from '@angular/material';
import { ComGoSharedModule } from '@ComGo/shared.module';
import { ComGoWidgetModule } from '@ComGo/components/widget/widget.module';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from 'ngx-loading';

const routes = [
  {
      path     : 'auth/your-workspace',
      component: YourWorkspaceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule, 
    MatTooltipModule,
  MatIconModule, 
  MatPaginatorModule,
  MatSnackBarModule,
   MatSortModule,
   MatFormFieldModule,
   MatInputModule,
    MatTableModule,
    ComGoSharedModule,
    ComGoWidgetModule,
    HttpModule,
    MatToolbarModule,
    TranslateModule,
    LoadingModule
  ],
  declarations: [YourWorkspaceComponent]
})
export class YourWorkspaceModule { }
