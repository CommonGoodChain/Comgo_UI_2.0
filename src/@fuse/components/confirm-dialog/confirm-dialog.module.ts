import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { ComGoConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [
        ComGoConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        ComGoConfirmDialogComponent
    ],
})
export class ComGoConfirmDialogModule
{
}
