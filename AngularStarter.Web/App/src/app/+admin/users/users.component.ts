import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from '../models/user';

@Component({
    selector: 'user',
    templateUrl: './users.component.html',
    styleUrls: ["./users.component.css"]
})
export class UsersComponent {
    @Input() user: User;
}