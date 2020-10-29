import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { OrderItem } from '../../shared/order-item.model';
import { ItemService } from '../../shared/item.service';
import { Item } from '../../shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../shared/order.service';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<OrderItemsComponent>,
              public itemService: ItemService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.itemService.getItemList()
      .then(resp => this.itemList = resp as Item[])
      .catch(error => console.log(error));
    if (this.data.orderItemIndex === null) {
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      };
    }
    else {
      ///TODO Muestra los datos del array cuando editamos el item previamente ingresado
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.formData.Price = 12;
      this.formData.ItemName = '';
    }
    else {
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
    }
    ///TODO Actualizar el total al momento de cambiar el item
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex === null) {
        this.orderService.orderItems.push(form.value);
      }
      else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID === 0) {
      this.isValid = false;
    }
    else if (formData.Quantity === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

}
