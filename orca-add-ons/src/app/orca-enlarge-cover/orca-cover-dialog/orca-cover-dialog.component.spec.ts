import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaCoverDialogComponent } from './orca-cover-dialog.component';

describe('OrcaCoverDialogComponent', () => {
  let component: OrcaCoverDialogComponent;
  let fixture: ComponentFixture<OrcaCoverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaCoverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcaCoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
