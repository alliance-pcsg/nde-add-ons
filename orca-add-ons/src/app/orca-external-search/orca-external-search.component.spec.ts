import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcaExternalSearchComponent } from './orca-external-search.component';

describe('OrcaExternalSearchComponent', () => {
  let component: OrcaExternalSearchComponent;
  let fixture: ComponentFixture<OrcaExternalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcaExternalSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrcaExternalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
