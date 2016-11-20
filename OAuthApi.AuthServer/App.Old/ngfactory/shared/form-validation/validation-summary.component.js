import { Component, Input } from '@angular/core';
export var ValidationSummaryComponent = (function () {
    function ValidationSummaryComponent() {
    }
    ValidationSummaryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'validation-summary',
                    template: "\n<div>\n    <div *ngFor=\"let error of errorMessages\">\n        - {{error}}\n    </div>\n</div>"
                },] },
    ];
    ValidationSummaryComponent.ctorParameters = [];
    ValidationSummaryComponent.propDecorators = {
        'errorMessages': [{ type: Input },],
    };
    return ValidationSummaryComponent;
}());
//# sourceMappingURL=validation-summary.component.js.map