import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
export var FileUploadComponent = (function () {
    function FileUploadComponent(http, el) {
        this.http = http;
        this.el = el;
        this.multiple = false;
    }
    FileUploadComponent.prototype.upload = function () {
        var inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length == 0)
            return;
        var files = inputEl.files;
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }
        this.http
            .post('/api/test/fileupload', formData)
            .subscribe();
    };
    FileUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-upload',
                    template: '<input type="file" [attr.multiple]="multiple ? true : null" (change)="upload()" >'
                },] },
    ];
    FileUploadComponent.ctorParameters = [
        { type: Http, },
        { type: ElementRef, },
    ];
    FileUploadComponent.propDecorators = {
        'multiple': [{ type: Input },],
    };
    return FileUploadComponent;
}());
//# sourceMappingURL=file-upload.component.js.map