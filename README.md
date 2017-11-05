HttpClient wrapper.


Install npm i angular4-http-warpper.

A wrapper for HttpClient .Thiis lib free you from learning the HttpCleint .It handle the error occur in the call and throw an Observable object.

Syntax for calling http get, post , put , delete and pactch.

 1.public get<T>( 
                   url: string, httpParams:HttpParams|{}=null,
                   httpHeadres:HttpHeaders|{}=null,
                   isFullResponse:boolean = false
                ): Observable<T>
Expect url ,all are optional.
url:The relative url or full url if base_ur not supplied at the module import as given below.
httpParams:use HttpParams directly or just JSON object like  {"name":"serial" }.
httpHeadres:use HttpHeaders or js object like {"Cached-Content" :"true"},
isFullResponse:If you want to receive the response after full fetch.
eg.Declare httpService: HttpWrapperService in your data service class.
Supposse modal like following your ar expecting.
class User{

    name:string;
    id:int;
}
1.httpService.get<User>("/getId?a=1");
2.httpService.get<User>("/getId",{"a":"1"});
3.httpService.get<User>("/getId",{"name":"raj"},{ "Cached-Content","true","Storage-type":"local","Cache-key":"user-details"});

2.public post<T>(   
                    url: string, body: any,
                    httpHeadres:HttpHeaders =null,
                    isFullResponse:boolean = false

                ): Observable<T>.
Expect url and body ,all are optional.

1.url:The relative url or full url if base_ur not supplied at the module import as given below.
2.body:JSON or string.
3.httpHeadres:use HttpHeaders or js object like {"Cached-Content" :"true"},
4.isFullResponse:If you want to receive the response after full fetch.
eg.Declare httpService: HttpWrapperService in your data service class.And suppose , you are expecting a modal like user described above.
1.httpService.post<User>("/getId",{"name":"raj","id":1});

2.httpService.post<User>("/getId",{"name":"raj","id":1},{ "Cached-Content","true","Storage-type":"local","Cache-key":"user-details"});

3.public put<T>(   
                    url: string, body: any,
                    httpHeadres:HttpHeaders =null,
                    isFullResponse:boolean = false

                ): Observable<T>.
Expect url and body ,all are optional.

1.url:The relative url or full url if base_ur not supplied at the module import as given below.
2.body:JSON or string.
3.httpHeadres:use HttpHeaders or js object like {"Cached-Content" :"true"},
4.isFullResponse:If you want to receive the response after full fetch.
eg.Declare httpService: HttpWrapperService in your data service class.And suppose , you are expecting a modal like user described above.
1.httpService.put<User>("/getId",{"name":"raj","id":1});

2.httpService.put<User>("/getId",{"name":"raj","id":1},{ "Cached-Content","true","Storage-type":"local","Cache-key":"user-details"});


4. public delete<T>( 
                      url: string,
                      httpParams:HttpParams=null,
                      httpHeadres:HttpHeaders=null,
                      isFullResponse:boolean = false

                    ): Observable<T> 
Expect url ,all are optional.

5. public patch<T>( 
                    url: string, body: any,
                    httpHeadres:HttpHeaders,
                    isFullResponse:boolean = false
                ): Observable<T> {

Expect url ,all are optional.

First  include  HttpWrapperModule.forRoot() in your module.
It has four optional parameter.This parameter should be supplied if need to be used.
1.API_BASE_URL:the base url for all the API call .
2.TOKEN_KEY:if auth-key value should be put in the header for the remote http call  , give the header value "TOKEN_KEY" .
3.TOKEN_STORAGE : toekn   storgae : session or local .
4.TOKEN_HEADER_KEY:The key name used for remote authorization .
5.PREFIX_TOKEN_KEY : Any prefix to be used with key value :eg "Bear" before toekn key in header.
             use relative URL for all call.
6.LOG_TIME:If need to log the time time to console, set value as true.


This support the  result storage in Session or  Local storage based on the header value supplied .
Usage :set following values in the header.
Cached-Content : true 
storage-type  : session or local.
Cache-key : Key used for  store in session or local storage.


