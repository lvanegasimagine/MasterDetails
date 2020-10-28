import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form === null) {
      form.resetForm();
    }
    this.orderService.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    };
    this.orderService.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    
  }

}
