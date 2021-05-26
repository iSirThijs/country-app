import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable,  } from 'rxjs';
import { tap, map, concatMap, count } from 'rxjs/operators'
import { Country } from './country'
import {getAllCountries, getAllCurrencies, getAllRegions, getAllSubRegions} from './country-api'
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private allCountries :Country[] = []
 
  constructor() {
  }

  private fetchCountries() :Observable<Country[]> {
    return new Observable((observer) => {
      if(this.allCountries.length === 0) {
        getAllCountries()
        .then((countries: Country[]) => this.allCountries = countries  )
        .then(() => observer.next(this.allCountries))
        .then(() => observer.complete())
      } else {
        observer.next(this.allCountries)
        observer.complete()
      }
   })
  }

  getCountries(queryParamMap: Observable<ParamMap>): Observable<Country[]> {
    return queryParamMap.pipe(concatMap((queryParamMap: ParamMap) => this.fetchCountries().pipe(map((countries: Country[]) => filterCountries(queryParamMap, countries)))))
  }

  getRegions(): Promise<string[]> {
    return getAllRegions()
  }

  getSubregions(): Promise<string[]> {
    return getAllSubRegions()
  }

  getCurrencies(): Promise<[key: string, value: number][]> {
    return getAllCountries()
      .then((countries: Country[]) => {
        return countries.reduce((sum: {[key: string]: number}, country: Country) => {
          country.currencies.forEach((currency) => sum[currency] ? sum[currency]++ : sum[currency] = 1)
          return sum
        },{})
      })
      .then((currencies) => Object.entries(currencies).sort(([keyA, valueA],[keyB, valueB]) => valueB - valueA))
  }
}


function filterCountries(queryParamMap: ParamMap, countries: Country[]) {
  if(queryParamMap.keys.length === 0) return countries // there are no filters active so country can be returned without
  const regionFilter = queryParamMap.has('region') ? countries.filter((country: Country) => queryParamMap.getAll('region').includes(country.region)) : countries
  const subregionFilter = queryParamMap.has('subregion') ? regionFilter.filter((country: Country) => queryParamMap.getAll('subregion').includes(country.subregion)) : regionFilter
  const currencyFilter = queryParamMap.has('currency') ? regionFilter.filter((country: Country) => country.currencies.some((currency) => queryParamMap.getAll('currency').includes(currency))) : subregionFilter
  const search = queryParamMap.has('q') ? currencyFilter.filter((country: Country) => queryParamMap.get('q') === country.commonName) : currencyFilter
    // todo
    // check if 'q' has a value!
    // also search native name
    // use partial match with a regex

  // maybe refactor this

  return search
}