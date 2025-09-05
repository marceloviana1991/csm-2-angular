import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDeConfirmarPedido } from './tela-de-confirmar-pedido';

describe('TelaDeConfirmarPedido', () => {
  let component: TelaDeConfirmarPedido;
  let fixture: ComponentFixture<TelaDeConfirmarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDeConfirmarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDeConfirmarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
