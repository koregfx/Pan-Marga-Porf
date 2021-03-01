import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import {
  Producto,
  Pedido,
  PedidosService,
} from '../../services/pedido.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  templateUrl: 'pedidos.component.html',
  styleUrls: ['pedidos.component.css'],
})
export class PedidosComponent {
  pedidos: Pedido[] = [];
  fecha: string;
  productos: Producto[];
  conjunto: Producto[];
  eutimioConjunto: Producto[];
  irynaConjunto: Producto[];
  sumaTotal = 0;
  sumaTotalEutimio = 0;
  sumaTotalIryna = 0;

  constructor(private _pedidosService: PedidosService) {
    this.getPedidos();
    this.fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    _pedidosService.getProductos().subscribe((data) => {
      this.productos = data.productos;
    });
  }
  getPedidos(): void {
    this._pedidosService.get('/pedido').subscribe((pedidos) => {
      this.pedidos = pedidos.pedidos;
    });
  }
  deletePedido(pedido: Pedido): void {
    Swal.fire({
      title: 'Estas Segura Margarita?',
      text: `Estas segura de borrar el pedido ${pedido.pedidoId} de ${pedido.nombre}`,
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      background:'#aeaeae',
    }
    ).then(resp=>{
      if(resp.isConfirmed)
      {
        this._pedidosService.delete('/pedido', pedido).subscribe((data) => {
          this._pedidosService.get('/pedido').subscribe((pedidos) => {
            this.pedidos = pedidos.pedidos;
          });
        })
      }
    });
  }
  buscarPorFecha(date: string): void {
    this._pedidosService.getByDate('/pedido', date).subscribe((pedidos) => {
      console.log(pedidos.pedidos);
      this.pedidos = pedidos.pedidos;
    });
  }
  getConjunto() {
    this.conjunto = [];
    this.eutimioConjunto = [];
    this.irynaConjunto = [];
    this.sumaTotal = 0;
    this.sumaTotalEutimio = 0;
    this.sumaTotalIryna = 0;
    this.pedidos.forEach((pedido) => {
      pedido.productos.forEach((producto) => {
        if (producto != undefined) {
          if (this.productById(producto._id) != undefined) {
            let product = this.productById(producto._id);
            product.cantidad = producto.cantidad;
            this.conjunto.push({ ...product });
            switch (product.distribuidor) {
              case 'Pan Eutimio':
                if (this.eutimioConjunto.some((e) => e._id === product._id)) {
                  const index = this.eutimioConjunto.findIndex(
                    (e) => e._id === product._id
                  );
                  this.eutimioConjunto[index].cantidad += product.cantidad;
                } else {
                  this.eutimioConjunto.push({ ...product });
                }
                break;
              case 'Pan Iryna':
                if (this.irynaConjunto.some((e) => e._id === product._id)) {
                  const index = this.irynaConjunto.findIndex(
                    (e) => e._id === product._id
                  );
                  this.irynaConjunto[index].cantidad += product.cantidad;
                } else {
                  this.irynaConjunto.push({ ...product });
                }
                break;
              case 'Bolleria Eutimio':
                if (this.eutimioConjunto.some((e) => e._id === product._id)) {
                  const index = this.eutimioConjunto.findIndex(
                    (e) => e._id === product._id
                  );
                  this.eutimioConjunto[index].cantidad += product.cantidad;
                } else {
                  this.eutimioConjunto.push({ ...product });
                }
                break;
              case 'Bolleria Iryna':
                if (this.irynaConjunto.some((e) => e._id === product._id)) {
                  const index = this.irynaConjunto.findIndex(
                    (e) => e._id === product._id
                  );
                  this.irynaConjunto[index].cantidad += product.cantidad;
                } else {
                  this.irynaConjunto.push({ ...product });
                }
                break;
            }
          }
        }
      });
    });
    this.eutimioConjunto.forEach(
      (pan) => (this.sumaTotalEutimio += pan.cantidad * pan.precio)
    );
    this.irynaConjunto.forEach(
      (pan) => (this.sumaTotalIryna += pan.cantidad * pan.precio)
    );
    this.conjunto.forEach(
      (pan) => (this.sumaTotal += pan.cantidad * pan.precio)
    );
  }
  productById(id: string): Producto {
    if (this.productos != undefined) {
      const index = this.productos.findIndex((e) => e._id == id);
      return this.productos[index];
    }
  }
}
