import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor , HttpRequest , HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import  { LocalStorageCacheService } from "./local-storage-cache.service";
import  { HTTP_WRAPPER_CONST } from   "./http-constant";
@Injectable()
export class HttpWrapperService {

   private url:string;

   constructor(private http: HttpClient ,@Optional() @Inject(HTTP_WRAPPER_CONST.API_BASE_URL) private baseUrl?: string) { 
   
        if(this.baseUrl === null || this.baseUrl === undefined) this.baseUrl = "";

    }

   public  setRelativeUrl(urlConetxt:string):void{
         this.url =this.baseUrl + urlConetxt;
   }

   public get<T>( 
                   url: string, httpParams:HttpParams|{}=null,
                   httpHeadres:HttpHeaders|{}=null,
                   isFullResponse:boolean = false
                ): Observable<T> {

        let serverURL        =  (url)? this.baseUrl+url : this.url; 
        let addtionalValues  =  this.createOptional(httpParams,httpHeadres,isFullResponse);
        return   this.http.get<T>(serverURL,addtionalValues).
                 shareReplay().
                 catch(this.handleError); 
       
                
    }
  

   public post<T>(   
                    url: string, body: any,
                    httpHeadres:HttpHeaders =null,
                    isFullResponse:boolean = false

                ): Observable<T> {

       let serverURL        =  (url)? this.baseUrl+url : this.url; 
       let addtionalValues  =  this.createOptional(null , httpHeadres , isFullResponse);
       return   this.http
                 .post<T>(serverURL,body,addtionalValues)
                 .shareReplay().catch(this.handleError);
                 
    }


   public put<T>(  
                    url: string, body: any,
                    httpHeadres:HttpHeaders = null,
                    isFullResponse:boolean = false

                  ): Observable<T> {
          
        let serverURL        =  (url)? this.baseUrl+url : this.url; 
        let addtionalValues  =  this.createOptional(null , httpHeadres , isFullResponse);
        return   this.http.put<T>( serverURL , body , addtionalValues )
                 .shareReplay().catch(this.handleError);
       
            
    }

    public delete<T>( 
                      url: string,
                      httpParams:HttpParams=null,
                      httpHeadres:HttpHeaders=null,
                      isFullResponse:boolean = false

                    ): Observable<T> {

    let serverURL        =  (url)? this.baseUrl+url : this.url; 
    let addtionalValues  =  this.createOptional(httpParams, httpHeadres, isFullResponse);
    return  this.http.delete<T>(this.baseUrl+url,addtionalValues).shareReplay().catch(this.handleError);
     
    }

    
    public patch<T>( 
                    url: string, body: any,
                    httpHeadres:HttpHeaders,
                    isFullResponse:boolean = false
                ): Observable<T> {

    let serverURL        =  (url)?this.baseUrl+url:this.url; 
    let addtionalValues  =  this.createOptional(null, httpHeadres, isFullResponse);
    return   this.http.patch<T>(serverURL,body,addtionalValues).shareReplay().catch(this.handleError);

    }


    private  createOptional( 
                                   httpParams:HttpParams|{},
                                   httpHeadres:HttpHeaders|{},
                                   isFullResponse:boolean = false

                                  ):any {

    let addtionalValues:any = { };
    addtionalValues["reportProgress"]  = true;
    if(httpParams)     addtionalValues["params"]  = this.createHttpPrams(  httpParams  );
    if(httpHeadres)    addtionalValues["headers"] = this.createHttpHeader( httpHeadres );
    if(isFullResponse) addtionalValues["observe"] = "response";
    return addtionalValues;
    
    }

   private createHttpPrams(params:any):HttpParams{

    if( params instanceof HttpParams) return params;
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
     httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
   }


  private createHttpHeader(header:any): HttpHeaders{

    if( header instanceof HttpHeaders) return header;
     return  new HttpHeaders(header);
   }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            if (err instanceof HttpErrorResponse) {
                console.log('interceptor error');
                console.log(err);
                errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
                if (err.status === 401) {
                  // Token  expired, can be setted to go to login
                  return Observable.throw(err);
                } 
              }
        }

        return Observable.throw(errorMessage);
    }

}


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor( public localStorageCacheService: LocalStorageCacheService , 
                @Optional()  @Inject(HTTP_WRAPPER_CONST.TOKEN_KEY)        public  tokenKey?:  string ,
                @Optional()  @Inject(HTTP_WRAPPER_CONST.TOKEN_STORAGE)    public  tokenStorage?:  string ,
                @Optional()  @Inject(HTTP_WRAPPER_CONST.TOKEN_HEADER_KEY) public  headerKey?: string ,
                @Optional()  @Inject(HTTP_WRAPPER_CONST.PREFIX_TOKEN_KEY) public  prefixKey?: string ,
                 @Optional()  @Inject(HTTP_WRAPPER_CONST.PREFIX_TOKEN_KEY) public  logTime?: boolean ) { }
    
    private getTokenKey(){
        if(this.tokenStorage !== null && this.tokenStorage === undefined && this.tokenStorage ==='session' )
        return sessionStorage.getItem(this.tokenKey);
        else
        return  localStorage.getItem(this.tokenKey);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const started = Date.now();

        if (this.tokenKey  && this.getTokenKey() !== null) {

            if( this.prefixKey === null || this.prefixKey === undefined )  this.prefixKey  = "";
            req = req.clone({ headers: req.headers.set( this.headerKey, this.prefixKey + this.getTokenKey()) });

        }

        if (!req.headers.has(HTTP_WRAPPER_CONST.CONTENT_TYPE)) {

            req = req.clone({ headers: req.headers.set(HTTP_WRAPPER_CONST.CONTENT_TYPE, HTTP_WRAPPER_CONST.JSON_MIME) });

        }

        if (!req.headers.has(HTTP_WRAPPER_CONST.ACCEPT)) {

           req = req.clone({ headers: req.headers.set(HTTP_WRAPPER_CONST.ACCEPT, HTTP_WRAPPER_CONST.JSON_MIME ) });

        }

        return next.handle(req).do((event: HttpEvent<any>) => {

           if( event instanceof HttpResponse) { 
              
            if(req.headers.has(HTTP_WRAPPER_CONST.CACHED_CONTENT))
               this.localStorageCacheService.put(req, event);
               const elapsed = Date.now() - started;
               if(this.logTime)console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            } }
            , (err: any) => {

                if (err instanceof HttpErrorResponse) {
                   const elapsed = Date.now() - started;
                    if(this.logTime) console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
                }
                
              }
              
        );

    }
}