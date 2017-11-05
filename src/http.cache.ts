import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse,HttpResponse } from '@angular/common/http';
export abstract class HttpCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any>|null;
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}