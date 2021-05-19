import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable,  } from 'rxjs';
import { tap, map, concatMap } from 'rxjs/operators'
import { Country } from './country'
import {getAllCountries} from './country-api'
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
      .pipe(concatMap((queryParamMap: ParamMap) => getAllCountries().pipe(map((countries: Country[]) => filterCountries(queryParamMap, countries)))))
  }
}


function filterCountries(queryParamMap: ParamMap, countries: Country[]) {
  if(queryParamMap.keys.length === 0) return countries // there are no filters so country can be returned without
  const regionFilter = queryParamMap.has('region') ? countries.filter((country: Country) => queryParamMap.getAll('region').includes(country.region)) : countries
  const subregionFilter = queryParamMap.has('subregion') ? regionFilter.filter((country: Country) => queryParamMap.getAll('subregion').includes(country.subregion)) : regionFilter

  return subregionFilter
}



