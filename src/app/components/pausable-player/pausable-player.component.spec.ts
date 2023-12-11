import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PausablePlayerComponent } from './pausable-player.component';

describe('PausablePlayerComponent', () => {
  let component: PausablePlayerComponent;
  let fixture: ComponentFixture<PausablePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PausablePlayerComponent]
    });
    fixture = TestBed.createComponent(PausablePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
