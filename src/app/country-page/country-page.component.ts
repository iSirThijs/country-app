import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  country: Country | null = null
  countryCode: string | null = null

  constructor(private route: ActivatedRoute, private countryService: CountryService) {
    this.route.paramMap.subscribe((paramMap) => this.countryCode = paramMap.get('countryCode'))
  }

  ngOnInit(): void {
    if(this.countryCode) {
      this.countryService
        .getCountry(this.countryCode)
        .subscribe((country) => this.country = country)
    }
  }

}
