import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Unsubscribable } from 'rxjs';
import { Country } from '../country'
import { CountryService } from '../country.service'

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = []
  queryParamMap: Observable<ParamMap>
  
  constructor(private countryService: CountryService, private route: ActivatedRoute) {
    this.queryParamMap = this.route.queryParamMap
  }

  ngOnInit(): void {
    this.getCountries(this.queryParamMap)
  }
  
  getCountries(queryParamMap: Observable<ParamMap>): void {
    this.countryService.getCountries(queryParamMap).subscribe((countries) =>  this.countries = countries)
   
  }
}
