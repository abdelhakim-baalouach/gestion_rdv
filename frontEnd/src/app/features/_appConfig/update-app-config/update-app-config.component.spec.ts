import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppConfigComponent } from './update-app-config.component';

describe('UpdateAppConfigComponent', () => {
  let component: UpdateAppConfigComponent;
  let fixture: ComponentFixture<UpdateAppConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
