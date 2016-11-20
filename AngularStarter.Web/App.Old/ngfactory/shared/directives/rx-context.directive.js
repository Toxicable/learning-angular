import { Directive, TemplateRef, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
export var RxContextDirective = (function () {
    function RxContextDirective(templateRef, vcr, _cdr) {
        this.templateRef = templateRef;
        this.vcr = vcr;
        this._cdr = _cdr;
        this._cdr.detach();
    }
    RxContextDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.rxContextOn.subscribe(function (state) {
            if (!_this._viewRef) {
                _this._viewRef = _this.vcr.createEmbeddedView(_this.templateRef, { '$implicit': state });
            }
            _this._viewRef.context.$implicit = state;
            _this._cdr.detectChanges();
        });
    };
    RxContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rxContext][rxContextOn]'
                },] },
    ];
    RxContextDirective.ctorParameters = [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ChangeDetectorRef, },
    ];
    RxContextDirective.propDecorators = {
        'rxContextOn': [{ type: Input },],
    };
    return RxContextDirective;
}());
//# sourceMappingURL=rx-context.directive.js.map