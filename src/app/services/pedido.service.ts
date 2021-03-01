import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PedidosService {
  private productos: Producto[] = [];
  private url = 'https://peaceful-garden-78030.herokuapp.com';
  private pedidoActual: Pedido = {};
  private respuesta: any = {};
  constructor(private http: HttpClient) {
    console.log('servicio de Pedidos listo para usar');
  }
  get(url: string): any {
    return this.http.get(`${this.url}${url}`);
  }
  getByDate(url: string, date: string): any {
    return this.http.get(`${this.url}${url}/${date}`);
  }
  post(url: string, data: any): any {
    return this.http.post(`${this.url}${url}`, data);
  }
  delete(url: string, data: Pedido): any {
    return this.http.delete(`${this.url}${url}/${data._id}`);
  }
  getProductos(): any {
    return this.http.get(`${this.url}/producto`);
  }
  postProducto(data:any): any {
    return this.http.post(`${this.url}/producto`, data);
  }
  changeProducto(id:string,data:any): any {
    return this.http.put(`${this.url}/producto/${id}`, data);
  }
  deleteProducto(id:string): any {
    return this.http.delete(`${this.url}/producto/${id}`);
  }
  getPedidoActual(): Pedido {
    return this.pedidoActual;
  }
  resetPedidoActual(): void {
    this.pedidoActual = {};
  }
  setpedidoName(name: string): void {
    this.pedidoActual.nombre = name;
  }
  setPedidoDate(date: string): void {
    this.pedidoActual.fecha = date;
  }
}

export interface Pedido {
  nombre?: string;
  fecha?: string;
  productos?: Producto[];
  precioTotal?: number;
  pedidoId?: number;
  _id?: number;
}

export interface Producto {
  nombre: string;
  precio: number;
  cantidad?: number;
  distribuidor: string;
  _id: string;
}
