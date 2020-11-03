import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  isValid = true;

  constructor(public orderService: OrderService, private dialog: MatDialog, private customerService: CustomerService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.customerService.getCustomerList().then(resp => {
      this.customerList = resp as Customer[];
    }).catch(error => console.log(error));
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

  ///TODO se aagrego el updateGrandTotal para que al momento de editar se actualize el total 
  /// el afterClosed es propiedad de MatDialog
  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(resp => {
      this.updateGrandTotal();
    });
  }

  ///TODO Eliminar el item del arreglo
  onDeleteOrderItem(OrderItemID: number, i: number) {
    this.orderService.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  ///TODO Actualiza el Total Global por cada compra que ingresemos
  updateGrandTotal() {
    this.orderService.formData.GTotal = this.orderService.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.orderService.formData.GTotal = parseFloat(this.orderService.formData.GTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.orderService.formData.CustomerID === 0) {
      this.isValid = false;
    }
    else if (this.orderService.orderItems.length===0) {
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit(form?: NgForm){
    if (this.validateForm()) {
      this.orderService.saveOrUpdateOrder().subscribe(resp => {
        this.resetForm();
        this.toastr.success('Guardado', 'Toastr fun!');
        this.router.navigate(['/orders']);
      });
    }
    // this.orderService.getList(1).then(resp => console.log(resp, 'eliminado'));
  }
}
