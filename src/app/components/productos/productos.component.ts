import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Pedido,
  PedidosService,
  Producto,
} from '../../services/pedido.service';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.css'],
})
export class ProductosComponent {
  pedido: Pedido;
  productos: Producto[];
  panEutimio: Producto[] = [];
  panIryna: Producto[] = [];
  bolleriaEutimio: Producto[] = [];
  bolleriaIryna: Producto[] = [];
  otros: Producto[] = [];

  constructor(private _pedidosService: PedidosService, private router: Router) {
    this.Update();
    if (this.pedido == undefined) {
      this.router.navigate(['/home']);
    }
    if (this.pedido.nombre == undefined) {
      this.router.navigate(['/home']);
    }
  }
  NavigateToCHanges():void {
    this.router.navigate(['productviewport']);
  }
  navigateToPanEutimio(): void {
    this.router
      .navigate(['productos'], { fragment: 'panEutimio' })
      .then((res) => {
        let testElement = document.getElementById('panEutimio');
        if (testElement != undefined) testElement.scrollIntoView(true);
      });
  }
  navigateToPanIryna(): void {
    this.router
      .navigate(['productos'], { fragment: 'panIrina' })
      .then((res) => {
        let testElement = document.getElementById('panIrina');
        if (testElement != undefined) testElement.scrollIntoView();
      });
  }
  navigateTobolloEutimio(): void {
    this.router
      .navigate(['productos'], { fragment: 'bolloEutimio' })
      .then((res) => {
        let testElement = document.getElementById('bolloEutimio');
        if (testElement != undefined) testElement.scrollIntoView();
      });
  }
  navigateTobolloIryna(): void {
    this.router
      .navigate(['productos'], { fragment: 'bolloIryna' })
      .then((res) => {
        let testElement = document.getElementById('bolloIryna');
        if (testElement != undefined) testElement.scrollIntoView();
      });
  }
  navigateToOtros(): void {
    this.router
      .navigate(['productos'], { fragment: 'Otros' })
      .then((res) => {
        let testElement = document.getElementById('Otros');
        if (testElement != undefined) testElement.scrollIntoView();
      });
  }
  addPanToPedido(pan: Producto): void {
    if (this.pedido.productos == undefined) {
      this.pedido.productos = [];
    }
    if (this.pedido.productos.some((e) => e._id == pan._id)) {
      this.pedido.productos[
        this.pedido.productos.findIndex((e) => e._id == pan._id)
      ].cantidad = pan.cantidad;
    } else {
      this.pedido.productos.push({ ...pan });
    }
  }
  Update()
  {
    this.pedido = this._pedidosService.getPedidoActual();
    this._pedidosService.getProductos().subscribe((data) => {
      this.panEutimio = [];
      this.panIryna = [];
      this.bolleriaEutimio = [];
      this.bolleriaIryna = [];
      this.otros = [];
      this.productos = data.productos;
      this.productos.forEach((e) => {
        e.cantidad = 0;
        switch (e.distribuidor) {
          case 'Pan Eutimio':
            this.panEutimio.push({ ...e });
            break;
            case 'Pan Iryna':
              this.panIryna.push({ ...e });
              break;
              case 'Bolleria Eutimio':
                this.bolleriaEutimio.push({ ...e });
                break;
                case 'Bolleria Iryna':
                  this.bolleriaIryna.push({ ...e });
                  break;
                  case 'Otros':
                    this.otros.push({ ...e });
                    break;
        }
        const conjunto = {};
      });
    });
  }
}
