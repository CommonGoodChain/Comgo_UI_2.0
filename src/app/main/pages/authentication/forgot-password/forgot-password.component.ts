import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';

@Component({
    selector   : 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : ComGoAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {ComGoConfigService} _ComGoConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder
    )
    {
        // Configure the layout
        this._ComGoConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        
    }
}
