import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverDialogComponent } from './cover-dialog.component';

describe('CoverDialogComponent', () => {
  let component: CoverDialogComponent;
  let fixture: ComponentFixture<CoverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
