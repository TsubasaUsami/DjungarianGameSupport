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

@NgModule({
  declarations: [
    AppComponent,
    FortniteComponent,
    Splatoon2Component,
    HeaderComponent,
    DashboardComponent,
    MyModalPreviewContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
