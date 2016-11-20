import { Component, Input } from '@angular/core';
import { FormValidationService } from '../../core/services/form-validation.service';
export var ControlMessagesComponent = (function () {
    function ControlMessagesComponent(validator) {
        this.validator = validator;
    }
    Object.defineProperty(ControlMessagesComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return this.validator.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ControlMessagesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'control-messages',
                    template: "<div *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
                },] },
    ];
    ControlMessagesComponent.ctorParameters = [
        { type: FormValidationService, },
    ];
    ControlMessagesComponent.propDecorators = {
        'control': [{ type: Input },],
    };
    return ControlMessagesComponent;
}());
//# sourceMappingURL=control-messages.component.js.map