import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListCardComponent } from './country-list-card.component';

describe('CountryListCardComponent', () => {
  let component: CountryListCardComponent;
  let fixture: ComponentFixture<CountryListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
