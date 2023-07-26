import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindVolunteerComponent } from './find-volunteer.component';

describe('FindVolunteerComponent', () => {
  let component: FindVolunteerComponent;
  let fixture: ComponentFixture<FindVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
