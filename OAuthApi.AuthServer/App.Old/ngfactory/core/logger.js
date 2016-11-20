import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
export var LoggingBackend = (function () {
    function LoggingBackend() {
    }
    return LoggingBackend;
}());
export var Logger = (function () {
    function Logger(loggingBackend) {
        this.loggingBackend = loggingBackend;
    }
    Logger.prototype.log = function (payload) {
        this.loggingBackend.log(payload);
    };
    Logger.decorators = [
        { type: Injectable },
    ];
    Logger.ctorParameters = [
        { type: LoggingBackend, },
    ];
    return Logger;
}());
export var ConsoleLoggerBackend = (function () {
    function ConsoleLoggerBackend(store) {
        this.store = store;
    }
    ConsoleLoggerBackend.prototype.log = function (payload) {
        this.store
            .subscribe(function (state) {
            console.log("payload", payload);
            console.log("state", state);
        });
    };
    ConsoleLoggerBackend.decorators = [
        { type: Injectable },
    ];
    ConsoleLoggerBackend.ctorParameters = [
        { type: Store, },
    ];
    return ConsoleLoggerBackend;
}());
//# sourceMappingURL=logger.js.map