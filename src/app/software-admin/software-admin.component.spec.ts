import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAdminComponent } from './software-admin.component';

describe('SoftwareAdminComponent', () => {
  let component: SoftwareAdminComponent;
  let fixture: ComponentFixture<SoftwareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
