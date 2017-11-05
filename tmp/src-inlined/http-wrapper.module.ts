import { NgModule, ModuleWithProviders,Optional } from '@angular/core';
import { HttpWrapperService, AppInterceptor } from './http-wrapper.service';
import { LocalStorageCacheService } from './local-storage-cache.service';
import { HTTP_WRAPPER_CONST } from  './http-constant';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
    imports: [
      HttpClientModule,
      CommonModule
    ],
    declarations: [
     ],
    providers: [
    ],
    schemas: [
     ],
    exports: [
     ]
  })
  export class HttpWrapperModule {
    public static forRoot(baseURL?:string, tokenKey?:string,tokenStorage?:string,headerKey?:string,keyPrefix?:string ) : ModuleWithProviders { 
         return {
            ngModule: HttpWrapperModule,
            providers: [
                {provide:HTTP_WRAPPER_CONST.API_BASE_URL, useValue:baseURL},
                {provide:HTTP_WRAPPER_CONST.TOKEN_KEY, useValue: tokenKey},
                {provide:HTTP_WRAPPER_CONST.TOKEN_HEADER_KEY, useValue: headerKey},
                {provide:HTTP_WRAPPER_CONST.PREFIX_TOKEN_KEY, useValue: keyPrefix},
                {provide:HTTP_WRAPPER_CONST.TOKEN_STORAGE, useValue:tokenStorage},
                HttpWrapperService,
                LocalStorageCacheService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppInterceptor,
                    multi: true,
                }]
        };
    }
}