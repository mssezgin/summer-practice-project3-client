import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // REDUNDANT
    constructor(private http: HttpClient) { }

}
