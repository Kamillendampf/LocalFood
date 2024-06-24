import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EinloesenConefermationComponent } from './einloesen-conefermation.component';
import { By } from '@angular/platform-browser';

describe('EinloesenConefermationComponent', () => {
  let component: EinloesenConefermationComponent;
  let fixture: ComponentFixture<EinloesenConefermationComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EinloesenConefermationComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        EinloesenConefermationComponent,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EinloesenConefermationComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EinloesenConefermationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false when "Abbrechen" button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('#js-abbrechenButton'));
    cancelButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when "Bestätigen" button is clicked', () => {
    const confirmButton = fixture.debugElement.query(By.css('#js-bestaetigenButton'));
    confirmButton.nativeElement.click();
    fixture.detectChanges();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
