import { FindWorkspaceComponent } from './find-workspace/find-workspace.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,MatIconModule, MatMenuModule, MatToolbarModule,MatTooltipModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
      path     : 'auth/find-workspace',
      component: FindWorkspaceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingModule,
    FuseSharedModule,
    MatIconModule,
    MatMenuModule, 
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule
  ],
  declarations: [FindWorkspaceComponent]
})
export class FindWorkspaceModule { }
