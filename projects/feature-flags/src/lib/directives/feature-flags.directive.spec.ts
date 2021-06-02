import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CoreFeatureFlagsModule} from '@app.cobiro.com/core/feature-flags';
import {FeatureFlagsState} from '../application/feature-flags.state';
import {GetsFeatureFlagsStub} from '../domain/gets-feature-flags.stub';

describe('FeatureFlagDirective', () => {
  let fixture: ComponentFixture<TestAppComponent>;
  let component: TestAppComponent;
  let state: FeatureFlagsState;
  const getElements = () => ({
    element: fixture.debugElement.query(By.css('.element')),
    elseElement: fixture.debugElement.query(By.css('.else-element')),
  });

  const expectIfCase = () => {
    const { element, elseElement } = getElements();
    expect(element).toBeTruthy();
    expect(elseElement).toBeNull();
  };

  const expectElseCase = () => {
    const { element, elseElement } = getElements();
    expect(elseElement).toBeTruthy();
    expect(element).toBeNull();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreFeatureFlagsModule.forRoot(() => new GetsFeatureFlagsStub())],
      declarations: [TestAppComponent],
    }).compileComponents();
    state = TestBed.inject(FeatureFlagsState);
    fixture = TestBed.createComponent(TestAppComponent);
    component = fixture.componentInstance;
  });

  it('should be created and rendered when the flag is on', () => {
    component.featureFlag = ['feature-a'];
    fixture.detectChanges();
    expectIfCase();
  });

  it('should render else element if the flag does not exist', () => {
    component.featureFlag = ['invalid-flag'];
    fixture.detectChanges();
    expectElseCase();
    const element = fixture.debugElement.query(By.css('.element'));
    expect(element).toBeNull();
  });

  it('should render element if flag is not defined', () => {
    component.featureFlag = [undefined];
    fixture.detectChanges();

    expectIfCase();
  });
});

@Component({
  selector: 'lib-test-app',
  template: `
    <div *libFeatureFlags="featureFlag; else elseTemplate">
      <p class="element">awesome element</p>
    </div>
    <ng-template #elseTemplate>
      <p class="else-element">awesome else element</p>
    </ng-template>
  `,
})
class TestAppComponent {
  public featureFlag = ['feature-a'];
}
