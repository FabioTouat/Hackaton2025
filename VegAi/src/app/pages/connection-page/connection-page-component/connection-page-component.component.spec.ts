import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPageComponentComponent } from './connection-page-component.component';

describe('ConnectionPageComponentComponent', () => {
  let component: ConnectionPageComponentComponent;
  let fixture: ComponentFixture<ConnectionPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectionPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
