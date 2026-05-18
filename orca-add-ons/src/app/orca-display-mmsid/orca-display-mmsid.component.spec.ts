import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaDisplayMmsidComponent } from './orca-display-mmsid.component';

describe('OrcaDisplayMmsidComponent', () => {
  let component: OrcaDisplayMmsidComponent;
  let fixture: ComponentFixture<OrcaDisplayMmsidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaDisplayMmsidComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrcaDisplayMmsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
