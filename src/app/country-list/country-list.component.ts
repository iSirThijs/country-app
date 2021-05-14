import { Component, OnInit } from '@angular/core';
import {getAllCountries} from '../country-api'

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: any[] = []

  constructor() { 
    getAllCountries()
    .then((response) => {
      this.countries = response
    })
  }

  ngOnInit(): void {

  }

}
