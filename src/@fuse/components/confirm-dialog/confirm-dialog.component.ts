import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'ComGo-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class ComGoConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ComGoConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ComGoConfirmDialogComponent>
    )
    {
    }

}
