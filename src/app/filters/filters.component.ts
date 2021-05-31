import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CountryService } from '../country.service'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  form: FormGroup
  regions: string[] = []
  subregions: string[] = []
  currencies: string[] = []

  get regionsFormArray() {
    return this.form.controls.regions as FormArray
  }
  get subregionsFormArray() {
    return this.form.controls.subregions as FormArray
  }
  get currencyFormArray() {
    return this.form.controls.currencies as FormArray
  }

  constructor(private countryService: CountryService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({regions: new FormArray([]), subregions: new FormArray([]), currencies: new FormArray([])})
  }

  private addRegionCheckboxes(){
    let activeRegions: string[];
    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => activeRegions = queryParamMap.getAll('region')).unsubscribe()
    this.regions.forEach((region) => this.regionsFormArray.push(new FormControl(activeRegions.includes(region))))
  }

  private addSubregionsCheckboxes(){
    let activeSubregions: string[];
    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => activeSubregions = queryParamMap.getAll('subregion')).unsubscribe()
    this.subregions.forEach((region) => this.subregionsFormArray.push(new FormControl(activeSubregions.includes(region))))
  }

  private addCurrencyCheckboxes(){
    let activeCurrency: string[];
    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => activeCurrency = queryParamMap.getAll('currency')).unsubscribe()
    this.currencies.forEach((region) => this.currencyFormArray.push(new FormControl(activeCurrency.includes(region))))
  }

  ngOnInit(): void {
    this.countryService.getRegions().then((regions) => this.regions = regions).then(() => this.addRegionCheckboxes())
    this.countryService.getSubregions().then((subregions) => this.subregions = subregions).then(() => this.addSubregionsCheckboxes())
    // this.countryService.getCurrencies().then((currencies) => this.currencies = currencies).then(() => this.addCurrencyCheckboxes())


    // this.currencyFormArray.valueChanges
    //   .subscribe((value) => {
    //     const activeFilters = value.map((checked: unknown, i: number) => checked ? this.regions[i] : null).filter((v:unknown) => v !== null)
    //     this.router.navigate(['/list'], {queryParams: { currency: activeFilters }, queryParamsHandling: 'merge'})
    //   })

    this.regionsFormArray.valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe((value) => {
        const activeFilters = value.map((checked: unknown, i: number) => checked ? this.regions[i] : null).filter((v:unknown) => v !== null)
        this.router.navigate(['/list'], {queryParams: { region: activeFilters }, queryParamsHandling: 'merge'})
      })

      this.subregionsFormArray.valueChanges
      .subscribe((value) => {
        const activeFilters = value.map((checked: unknown, i: number) => checked ? this.subregions[i] : null).filter((v:unknown) => v !== null)
        this.router.navigate(['/list'], {queryParams: { subregion: activeFilters }, queryParamsHandling: 'merge'})
      })

  }

}
