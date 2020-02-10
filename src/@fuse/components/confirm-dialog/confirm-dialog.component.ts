import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'comgo-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class comgoConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<comgoConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<comgoConfirmDialogComponent>
    )
    {
    }

}
