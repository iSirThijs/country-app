import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Country } from '../country'
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

  get regionsFormArray() {
    return this.form.controls.regions as FormArray
  }
  get subregionsFormArray() {
    return this.form.controls.subregions as FormArray
  }

  constructor(private countryService: CountryService, private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({regions: new FormArray([]), subregions: new FormArray([])})
  }

  private addRegionCheckboxes(){
    this.regions.forEach(() => this.regionsFormArray.push(new FormControl(true)))
  }

  private addSubregionsCheckboxes(){
    this.subregions.forEach(() => this.subregionsFormArray.push(new FormControl(true)))
  }

  ngOnInit(): void {
    this.countryService.getRegions().then((regions) => this.regions = regions).then(() => this.addRegionCheckboxes())
    this.countryService.getSubregions().then((subregions) => this.subregions = subregions).then(() => this.addSubregionsCheckboxes())

    this.regionsFormArray.valueChanges
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
