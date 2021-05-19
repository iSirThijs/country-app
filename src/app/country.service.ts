import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable,  } from 'rxjs';
import { tap, map, withLatestFrom, filter, concatMap } from 'rxjs/operators'
import { Country } from './country'
import * as countryAPI from './country-api'


@Injectable({
  providedIn: 'root'
})
export class CountryService {
 private allCountries: Country[] = [];
 private queryMap: ParamMap | null = null 

  constructor() {
  }

  getCountries(queryParamMap: Observable<ParamMap>): Observable<Country[]> {
    return queryParamMap
      .pipe(concatMap((queryParamMap) => {
        return countryAPI
          .getAllCountries().pipe(map((countries) => countries.filter((country) => country.region === queryParamMap.get('region'))))}))
  }
}


// countries.filter((country: Country) => queryParamMap.get('region') === country.region)


