import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../country'
import { CountryService } from '../country.service'

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = []
  
  constructor(private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCountries(this.route.queryParamMap)
  }

  getCountries(queryParamMap: Observable<ParamMap>): void {
    this.countryService.getCountries(queryParamMap).subscribe((countries) =>  this.countries = countries)
  }

}
