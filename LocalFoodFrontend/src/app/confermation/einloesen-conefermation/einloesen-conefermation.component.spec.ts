import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinloesenConefermationComponent } from './einloesen-conefermation.component';

describe('EinloesenConefermationComponent', () => {
  let component: EinloesenConefermationComponent;
  let fixture: ComponentFixture<EinloesenConefermationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EinloesenConefermationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EinloesenConefermationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
