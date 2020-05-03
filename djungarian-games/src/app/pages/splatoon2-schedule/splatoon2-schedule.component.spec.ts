import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Splatoon2ScheduleComponent } from './splatoon2-schedule.component';

describe('Splatoon2ScheduleComponent', () => {
  let component: Splatoon2ScheduleComponent;
  let fixture: ComponentFixture<Splatoon2ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Splatoon2ScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Splatoon2ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
