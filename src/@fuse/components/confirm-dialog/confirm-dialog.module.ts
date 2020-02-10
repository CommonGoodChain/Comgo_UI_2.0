import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { comgoConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [
        comgoConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        comgoConfirmDialogComponent
    ],
})
export class comgoConfirmDialogModule
{
}
