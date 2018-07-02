import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let petrolservice: any[] = JSON.parse(localStorage.getItem('petrolservice')) || [];
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/api/tokenauthenticate') && request.method === 'POST') {
                let filteredPs = petrolservice.filter(ps => {
                    return ps.token === request.body.tocken;
                });
                if (filteredPs.length) {
                    let ps = filteredPs[0];
                    let body = {
                        tocken: ps.token,
                        retoken: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return throwError('provided token is not valid');
                }
            }
 
            if (request.url.endsWith('/api/petroledetail') && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: petrolservice }));
                } else {
                    return throwError('Unauthorised');
                }
            }
 
           
            return next.handle(request);
        })) 
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};