import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems : this.orderItems
    }
    console.log(body);
    return this.http.post(environment.apiURL + '/Order', body);
  }

  getList(id: number) {
    return this.http.delete(environment.apiURL + '/Order/' + id).toPromise();
  }
}
