import { Injectable } from '@angular/core';
Injectable();
export var FormValidationService = (function () {
    function FormValidationService() {
    }
    FormValidationService.prototype.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': "Minimum length " + validatorValue.requiredLength,
            'invalidCompare': 'Passwords must match'
        };
        return config[validatorName];
    };
    FormValidationService.prototype.passwordComparisonValidator = function (group) {
        var password = group.controls['password'];
        var confirmPassword = group.controls['confirmPassword'];
        if (password.dirty && confirmPassword.dirty) {
            if (password.value == confirmPassword.value) {
                return null;
            }
            else
                return { invalidCompare: true };
        }
        else
            return { invalidCompare: true };
    };
    FormValidationService.prototype.creditCardValidator = function (control) {
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { invalidCreditCard: true };
        }
    };
    FormValidationService.prototype.emailValidator = function (control) {
        if (control.value.match(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)) {
            return null;
        }
        else {
            return { invalidEmailAddress: true };
        }
    };
    FormValidationService.prototype.passwordValidator = function (control) {
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { invalidPassword: true };
        }
    };
    return FormValidationService;
}());
//# sourceMappingURL=form-validation.service.js.map