import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyComponentComponent} from './buy-component.component';

describe('BuyComponentComponent', () => {
  let component: BuyComponentComponent;
  let fixture: ComponentFixture<BuyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
