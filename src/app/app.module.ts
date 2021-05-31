import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListCardComponent } from './country-list-card/country-list-card.component';
import { LabelsComponent } from './labels/labels.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CountryPageComponent } from './country-page/country-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryListCardComponent,
    LabelsComponent,
    FiltersComponent,
    SearchComponent,
    CountryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
