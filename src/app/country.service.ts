import { Injectable } from '@angular/core';
import { Country } from './country'
import * as countryAPI from './country-api'


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getCountries(): Promise<Country[]> {
    return countryAPI.getAllCountries().then(cleanUpCountries)
  }

}



function cleanUpCountries(rawCountries: any[]): Country[] {
  return rawCountries.map((rawCountry) => {
    const { name, cca3: code } = rawCountry
    const {common: commonName, native: nativeName} = name

    return { commonName, nativeName, code}
  })
}