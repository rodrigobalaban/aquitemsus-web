import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenWithToolbarComponent } from './screen-with-toolbar.component';

describe('ScreenWithToolbarComponent', () => {
  let component: ScreenWithToolbarComponent;
  let fixture: ComponentFixture<ScreenWithToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenWithToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenWithToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
