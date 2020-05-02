import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FortniteComponent } from './pages/fortnite/fortnite.component';
import { Splatoon2Component } from './pages/splatoon2/splatoon2.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyModalPreviewContent } from './parts/modals/preview.service';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SplatoonService } from './services/splatoon.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CustomHttpInterceptor } from './services/CustomHttpInterceptor';
import { LoadingComponent } from './parts/loading/loading.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FortniteComponent,
    Splatoon2Component,
    HeaderComponent,
    DashboardComponent,
    MyModalPreviewContent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      enableHtml: true,
      progressBar: true,
      toastClass: 'ngx-toastr w-100'
    })
  ],
  providers: [
    SplatoonService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoTにはfactory向けのメソッドが必要
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/dgs/', '.json');
}
