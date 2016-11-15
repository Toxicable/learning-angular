import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth-store/auth.store';

@Injectable()
export class AuthHttp{
constructor (private http: Http,
            private store: Store<AppState>
    ) {}

    private globalHeaders = 
    {
        'Content-Type':'application/json',
        'Accept': 'application/json'
    }
        
    private getHeaders():Observable<Headers>{
        return this.store.map(state => state.auth)
                    .first((auth: AuthState) => auth.authReady)
                    .map((auth: AuthState) => auth.authTokens.access_token)
                    .map((accessToken: string) => new Headers(Object.assign({}, 
                        this.globalHeaders, 
                        {
                            Authorization: 'Bearer ' + accessToken
                        }
                    )))
    }

    get(url:string):Observable<Response>{
        return this.getHeaders()
                .flatMap((headers: Headers) =>{
                    let options = new RequestOptions({headers});
                    return this.http.get(url, options)
                })
    }

    post(url: string, data: any):Observable<Response>{
        return this.getHeaders()
            .flatMap((headers: Headers) =>{
                let options = new RequestOptions({headers});
                return this.http.post(url, data, options)
            })
    }
}