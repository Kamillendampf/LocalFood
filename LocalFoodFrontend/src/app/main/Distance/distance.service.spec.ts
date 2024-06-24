// File path: src/app/services/distance.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { DistanceService } from './distance.service';
import { CouponIf } from '../CouponInterface';

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistanceService]
    });
    service = TestBed.inject(DistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the correct distance', () => {
    const destinationPos: CouponIf = {
      id: 1,
      identKey: 'testKey',
      username: 'testUser',
      latitude: 10,
      longitude: 10,
      kategorie: 'testCategory',
      artikelart: 'testType',
      name: 'testName',
      beschreibung: 'testDescription',
      abholzeit: '10:00',
      preis: '10.00',
      distance: 0
    };
    const currentPos = { latitude: 5, longitude: 5 };
    const expectedDistance = Math.sqrt(Math.pow(10 - 5, 2) + Math.pow(10 - 5, 2));

    const result = service.getDistance(destinationPos, currentPos);

    expect(result.distance).toBeCloseTo(expectedDistance, 5);
  });

  it('should return the destination object with calculated distance', () => {
    const destinationPos: CouponIf = {
      id: 2,
      identKey: 'testKey2',
      username: 'testUser2',
      latitude: 20,
      longitude: 15,
      kategorie: 'testCategory2',
      artikelart: 'testType2',
      name: 'testName2',
      beschreibung: 'testDescription2',
      abholzeit: '11:00',
      preis: '20.00',
      distance: 0
    };
    const currentPos = { latitude: 10, longitude: 5 };

    const result = service.getDistance(destinationPos, currentPos);

    expect(result).toEqual(jasmine.objectContaining({
      id: 2,
      identKey: 'testKey2',
      username: 'testUser2',
      latitude: 20,
      longitude: 15,
      kategorie: 'testCategory2',
      artikelart: 'testType2',
      name: 'testName2',
      beschreibung: 'testDescription2',
      abholzeit: '11:00',
      preis: '20.00',
      distance: Math.sqrt(Math.pow(20 - 10, 2) + Math.pow(15 - 5, 2))
    }));
  });

});
