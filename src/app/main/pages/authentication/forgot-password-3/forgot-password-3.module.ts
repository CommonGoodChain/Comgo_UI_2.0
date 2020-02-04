import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CommonModule } from '@angular/common';
import { ForgotPassword3Component } from './forgot-password3.component';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
      path     : 'auth/forgot-password-3/:username/:operation',
      component: ForgotPassword3Component
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,
    TranslateModule
  ],
  declarations: [ForgotPassword3Component]
})
export class ForgotPassword3Module { }
