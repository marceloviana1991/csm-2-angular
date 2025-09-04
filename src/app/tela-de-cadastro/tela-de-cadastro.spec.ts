import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDeCadastro } from './tela-de-cadastro';

describe('TelaDeCadastro', () => {
  let component: TelaDeCadastro;
  let fixture: ComponentFixture<TelaDeCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDeCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDeCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
