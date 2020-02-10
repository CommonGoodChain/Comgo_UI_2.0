import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ComGoWidgetToggle]'
})
export class ComGoWidgetToggleDirective
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
