import { Pipe } from '@angular/core';
export var DefaultValuePipe = (function () {
    function DefaultValuePipe() {
    }
    DefaultValuePipe.prototype.transform = function (value, defaultValue) {
        if (value)
            return value;
        return defaultValue;
    };
    DefaultValuePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'defaultValue'
                },] },
    ];
    DefaultValuePipe.ctorParameters = [];
    return DefaultValuePipe;
}());
//# sourceMappingURL=default-value.pipe.js.map