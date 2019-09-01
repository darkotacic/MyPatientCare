import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { RouterExtensions } from "nativescript-angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    readonly appSettings = require("tns-core-modules/application-settings");

    constructor(private router: RouterExtensions) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.appSettings.hasKey("token")){
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization','Bearer '+this.appSettings.getString("token")),
            });
            return next.handle(clonedRequest).pipe(
                tap(
                    succ => {

                    },
                    err => {
                        if(err.status == 401) {
                            this.appSettings.remove("token");
                            this.router.navigate(["login"], { clearHistory: true });
                        }
                        else if (err.status == 403){
                            this.appSettings.remove("token");
                            this.router.navigate(["login"], { clearHistory: true });
                        }
                    }
                )
            )
        } else {
            return next.handle(req.clone());
        }
    }

    
}