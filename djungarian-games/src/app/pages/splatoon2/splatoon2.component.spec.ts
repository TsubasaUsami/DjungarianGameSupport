import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Splatoon2Component } from './splatoon2.component';

describe('Splatoon2Component', () => {
  let component: Splatoon2Component;
  let fixture: ComponentFixture<Splatoon2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Splatoon2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Splatoon2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
