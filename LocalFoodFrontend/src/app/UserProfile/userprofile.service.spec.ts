// File path: src/app/userprofile/userprofile.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { UserprofileService } from './userprofile.service';

describe('UserprofileService', () => {
  let service: UserprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserprofileService);
    localStorage.clear(); // Clear localStorage before each test to ensure a clean state
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user name', () => {
    service.setUserName = 'Test User';
    expect(service.getUserName).toBe('Test User');
  });

  it('should set and get user email', () => {
    service.setUserEmail = 'test@example.com';
    expect(service.getUserEmail).toBe('test@example.com');
  });

  it('should set and get user identKey', () => {
    service.setIdentKey = '12345';
    expect(service.getIdentKey).toBe('12345');
  });

  it('should set and get profile type', () => {
    service.setProfileType = true;
    expect(service.getProfileType).toBe(true);
  });

  it('should set and get user identKey with setRememberMe and getRememberMe', () => {
    const identKey = '12345';
    service.setUserIdentKey = identKey;
    service.setRememberMe();
    expect(service.getIdentKey).toBe(identKey);
    expect(localStorage.getItem('key')).toBe(identKey);
  });

  it('should handle empty localStorage in getRememberMe', () => {
    service.getRememberMe();
    expect(service.getIdentKey).toBe(undefined);
  });

  it('should override previous identKey in localStorage', () => {
    const identKey1 = '12345';
    const identKey2 = '67890';

    service.setUserIdentKey = identKey1;
    expect(localStorage.getItem('key')).toBe(identKey1);

    service.setUserIdentKey = identKey2;
    expect(localStorage.getItem('key')).toBe(identKey2);
  });

  it('should update all user profile details', () => {
    service.setUserName = 'New User';
    service.setUserEmail = 'newuser@example.com';
    service.setIdentKey = 'newidentkey';
    service.setProfileType = false;

    expect(service.getUserName).toBe('New User');
    expect(service.getUserEmail).toBe('newuser@example.com');
    expect(service.getIdentKey).toBe('newidentkey');
    expect(service.getProfileType).toBe(false);
  });


});
