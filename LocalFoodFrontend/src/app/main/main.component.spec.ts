import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {ReversGeodecoderService} from "./reversGeodecoder/revers-geodecoder.service";
import {of} from "rxjs";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let reversGeodecoderServiceSpy: jasmine.SpyObj<ReversGeodecoderService>;

  beforeEach(async () => {
    const reversGeodecoderServiceSpy = jasmine.createSpyObj('ReversGeodecoderService', ['getAddress']);
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: ReversGeodecoderService, useValue: reversGeodecoderServiceSpy }, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle location status and update icon text', () => {
    expect(component.isLocationOn).toBe(true);

    let icon = fixture.nativeElement.querySelector('#js-locationButton');
    expect(icon.textContent.trim()).toBe('location_on');

    console.log('Initial isLocationOn:', component.isLocationOn);

    icon.click();
    fixture.detectChanges();

    console.log('After first click isLocationOn:', component.isLocationOn);
    expect(component.isLocationOn).toBe(false);
    expect(icon.textContent.trim()).toBe('location_off');

    icon.click();
    fixture.detectChanges();

    console.log('After second click isLocationOn:', component.isLocationOn);
    expect(component.isLocationOn).toBe(true);
    expect(icon.textContent.trim()).toBe('location_on');
  });

  it('should get current coordinates',
    async () => {
      const mockAddress = {
        address: {
          road: 'Test Road',
          city: 'Test City'
        }
      };

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success) => {
        success({coords: {latitude: 51.1, longitude: 45.3}} as GeolocationPosition);
      });



      component.getCurrentCoordinates();

      expect(component.latitude).toBe(51.1);
      expect(component.longitude).toBe(45.3);
    });

  it('should get current city and street', () => {

    component.getCurrentCityAndStreet(51.5072, 0.1276);

    component.getCurrentCityAndStreet(123, 456).then(() => {
      expect(component.currentStreet).toBe('Crossway');
      expect(component.currentCity).toBe('London');
    });
  });

});
