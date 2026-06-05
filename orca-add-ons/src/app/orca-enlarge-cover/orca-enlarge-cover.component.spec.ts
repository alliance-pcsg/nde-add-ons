import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaEnlargeCoverComponent } from './orca-enlarge-cover.component';

describe('EnlargeCoverComponent', () => {
  let component: OrcaEnlargeCoverComponent;
  let fixture: ComponentFixture<OrcaEnlargeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaEnlargeCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcaEnlargeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
