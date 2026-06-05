import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrcaTopBannerComponent } from './orca-top-banner.component';

describe('OrcaTopBannerComponent', () => {
  const compile = async (params: object = {}) => {
    await TestBed.configureTestingModule({
      imports: [OrcaTopBannerComponent],
      providers: [{ provide: 'MODULE_PARAMETERS', useValue: params }]
    }).compileComponents();
    const fixture: ComponentFixture<OrcaTopBannerComponent> = TestBed.createComponent(OrcaTopBannerComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('should create', async () => {
    const c = await compile({ message: 'Test alert' });
    expect(c).toBeTruthy();
  });

  it('is visible when message is set and no date window is configured', async () => {
    const c = await compile({ message: 'Test alert' });
    expect(c.isVisible).toBeTrue();
  });

  it('is not visible when message is absent', async () => {
    const c = await compile({});
    expect(c.isVisible).toBeFalse();
  });

  it('is visible when current time is within the configured date window', async () => {
    const c = await compile({
      message: 'Test alert',
      startDateTime: new Date(Date.now() - 3600000).toISOString(),
      endDateTime: new Date(Date.now() + 3600000).toISOString()
    });
    expect(c.isVisible).toBeTrue();
  });

  it('is not visible when start date is in the future', async () => {
    const c = await compile({
      message: 'Test alert',
      startDateTime: new Date(Date.now() + 3600000).toISOString()
    });
    expect(c.isVisible).toBeFalse();
  });

  it('is not visible when end date has already passed', async () => {
    const c = await compile({
      message: 'Test alert',
      endDateTime: new Date(Date.now() - 3600000).toISOString()
    });
    expect(c.isVisible).toBeFalse();
  });

  it('applies configured background and foreground colors to bannerStyles', async () => {
    const c = await compile({
      message: 'Test alert',
      backgroundColor: '#003366',
      foregroundColor: '#ffcc00'
    });
    expect(c.bannerStyles['background-color']).toBe('#003366');
    expect(c.bannerStyles['color']).toBe('#ffcc00');
  });
});
