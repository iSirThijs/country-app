import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country'

@Component({
  selector: 'app-country-list-card',
  templateUrl: './country-list-card.component.html',
  styleUrls: ['./country-list-card.component.css']
})
export class CountryListCardComponent implements OnInit {
  @Input() country?: Country;

  constructor() {
   }

  ngOnInit(): void {
  }

}
