import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Country } from './country'
import * as countryAPI from './country-api'


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Observable<Country[]> = new Observable((observer) => {
    if(this.allCountries.length > 0) {
      observer.next(this.allCountries) 
    } else {
      countryAPI.getAllCountries()
        .then(cleanUpCountries)
        .then((countries) => this.allCountries = countries)
        .then(() => observer.next(this.allCountries))
    }
  })

  private allCountries: Country[] = [];

  constructor() {
  }

  getCountries(): Observable<Country[]> { 
    return this.countries
  }

  getCountry(code: string): any {

  }

}


function cleanUpCountries(rawCountries: any[]): Country[] {
  return rawCountries.map((rawCountry) => {
    const { name, cca3: code, flag, region, subregion, currency: currencies, languages, nativeLanguage } = rawCountry
    const {common: commonName, native} = name
    const {common: nativeName} = native

    return { 
      commonName, 
      nativeName, 
      code, 
      flag, 
      region, 
      subregion, 
      currencies, 
      languages: Object.values(languages),
      nativeLanguage: languages[nativeLanguage]  
    }
  })
}