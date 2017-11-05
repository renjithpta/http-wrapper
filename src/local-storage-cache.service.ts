import { HttpCache } from "./http.cache";
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpEvent , HttpHandler , HttpInterceptor, HttpRequest , HttpErrorResponse , HttpResponse } from '@angular/common/http';

@Injectable()
export class LocalStorageCacheService implements HttpCache {

    get(req: HttpRequest<any>): HttpResponse<any> {
        return <HttpResponse<any>>JSON.parse(localStorage.getItem(req.url))
    }

    put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
        if(req.headers.has("Cache-key"))
        localStorage.setItem(req.headers.get("Cache-key"), JSON.stringify(resp.body));
        else
        localStorage.setItem(req.url, JSON.stringify(resp.body));
    }

    
}