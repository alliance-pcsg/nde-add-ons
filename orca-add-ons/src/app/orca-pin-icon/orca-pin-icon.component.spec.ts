import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaPinIconComponent } from './orca-pin-icon.component';

describe('OrcaPinIconComponent', () => {
  let component: OrcaPinIconComponent;
  let fixture: ComponentFixture<OrcaPinIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaPinIconComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrcaPinIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
