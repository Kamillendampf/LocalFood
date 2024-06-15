import { TestBed } from '@angular/core/testing';
import { UserprofileService } from './userprofile.service';

describe('UserprofileService', () => {
  let service: UserprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user name correctly', () => {
    service.setUserName = 'John Doe';
    expect(service.getUserName).toBe('John Doe');
  });

  it('should set and get user email correctly', () => {
    service.setUserEmail = 'john.doe@example.com';
    expect(service.getUserEmail).toBe('john.doe@example.com');
  });

  it('should set and get user ident key correctly', () => {
    service.setIdentKey = 'uniqueKey123';
    expect(service.getIdentKey).toBe('uniqueKey123');
  });

  it('should set user ident key using setUserIdentKey and call setRememberMe', () => {
    spyOn(service, 'setRememberMe');
    service.setUserIdentKey = 'uniqueKey123';
    expect(service.getIdentKey).toBe('uniqueKey123');
    expect(service.setRememberMe).toHaveBeenCalled();
  });

  it('should store and retrieve the ident key from session storage', () => {
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      sessionStorage[key] = value;
    });
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return sessionStorage[key] || null;
    });

    service.setIdentKey = 'uniqueKey123';
    service.setRememberMe();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('key', 'uniqueKey123');
    service.getRememberMe();
    expect(service.getIdentKey).toBe('uniqueKey123');
  });
});
