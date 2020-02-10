import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[comgoWidgetToggle]'
})
export class comgoWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
