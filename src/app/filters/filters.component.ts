import { Component, OnInit } from '@angular/core';
import { Country } from '../country'
import { CountryService } from '../country.service'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getRegions().then(console.log)
    this.countryService.getSubregions().then(console.log)
    this.countryService.getCurrencies().then(console.log)
  }

}
