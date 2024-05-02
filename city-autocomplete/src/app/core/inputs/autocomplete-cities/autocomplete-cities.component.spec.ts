import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteCitiesComponent } from '@core/inputs/autocomplete-cities/autocomplete-cities.component';
import { AutocompleteCitiesService } from '@core/inputs/autocomplete-cities/autocomplete-cities.service';
import { LoadingSpinnerComponent } from '@core/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AutocompleteCitiesComponent', () => {
  let component: AutocompleteCitiesComponent;
  let fixture: ComponentFixture<AutocompleteCitiesComponent>;
  let mockAutocompleteCitiesService: jasmine.SpyObj<AutocompleteCitiesService>;

  beforeEach(async () => {
    mockAutocompleteCitiesService = jasmine.createSpyObj(
      'AutocompleteCitiesService',
      ['getAllCities']
    );

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        AutocompleteCitiesComponent,
        LoadingSpinnerComponent,
      ],
      providers: [
        {
          provide: AutocompleteCitiesService,
          useValue: mockAutocompleteCitiesService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all cities on initialization', () => {
    const mockCities = [{ name: 'City 1' }, { name: 'City 2' }];
    mockAutocompleteCitiesService.getAllCities.and.returnValue(of(mockCities));

    component.ngOnInit();

    expect(mockAutocompleteCitiesService.getAllCities).toHaveBeenCalled();
    expect(component.cities).toEqual(mockCities);
    expect(component.showSpinner()).toBeFalsy();
  });

  it('should update input value on handleInput', () => {
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    const inputValue = 'City 1';

    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.input().valueOf()).toEqual(inputValue);
  });
});
