import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(private orderService: OrderService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  
  refreshList() {
    this.orderService.getOrderList().then(resp => this.orderList = resp);
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/' + orderID]);
  }

  onOrderDelete(id: number) {
    if (confirm('Esta seguro que desea eliminar la orden')) {
      this.orderService.deleteOrder(id).then(resp => {
        this.refreshList();
        this.toastr.warning("Deleted Sucessfuly", "Restaurant App");
      });
    }
  }

}
