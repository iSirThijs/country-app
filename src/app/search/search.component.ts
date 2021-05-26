import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery = new FormControl('')

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.updateSearch(this.route.queryParamMap)

    this.searchQuery.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400)
      ).subscribe((value) => {
        console.log(value, typeof value)
        this.router.navigate(['/list'], { queryParams: { q: value }})
    })

    
    
  }

  updateSearch(queryParamMap: Observable<ParamMap>) :void {
    queryParamMap.subscribe((queryParamMap) => {
      let searchValue: string | null = queryParamMap.get('q')
      if(typeof searchValue === 'string') this.searchQuery.setValue(searchValue)
    })  
  }
}
