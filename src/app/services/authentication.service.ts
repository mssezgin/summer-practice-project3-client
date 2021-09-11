import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { first, map } from "rxjs/operators";

import { User } from "../models/user";
import { Config } from "../config/config";

interface LoginResponse {
    token: string,
    user: User
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public currentToken: string;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        const credentials: LoginResponse = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.currentToken = credentials.token;
        this.currentUserSubject = new BehaviorSubject<User>(credentials.user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentTokenValue(): string {
        return this.currentToken;
    }

    login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${Config.apiURL}/login`, { username, password })
            .pipe(map((value) => {
                localStorage.setItem('currentUser', JSON.stringify(value));
                this.currentUserSubject.next(value.user);
                this.currentToken = value.token;
                return value;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        // @ts-ignore
        this.currentUserSubject.next(null);
    }

    /* logout() {
        // localStorage.removeItem('currentUser');
        // const body = { username: this.currentUserValue.username };
        // @ts-ignore
        this.currentUserSubject.next(null);
        return this.http.get(`${Config.apiURL}/logout`)
            .pipe(first())
            .subscribe({
                next: value => {
                    // this.alertService.success('Logout successful', true);
                    localStorage.removeItem('currentUser');
                    console.log('Logout successful', value);
                },
                error: err => {
                    // this.alertService.error('Some error occurred while logging out', true);
                    localStorage.removeItem('currentUser');
                    console.log('Some error occurred while logging out', err);
                }
            });
    } */

    /* logoutCallback() {
        console.log('logoutCallback');
        localStorage.removeItem('currentUser');
        // @ts-ignore
        // this.currentUserSubject.next(null);
    } */

}
