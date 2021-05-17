import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListCardComponent } from './country-list-card/country-list-card.component';
import { LabelsComponent } from './labels/labels.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryListCardComponent,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
