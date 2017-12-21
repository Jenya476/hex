import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexDrawComponent } from './hex-draw.component';

describe('HexDrawComponent', () => {
  let component: HexDrawComponent;
  let fixture: ComponentFixture<HexDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
