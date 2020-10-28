import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'order'},
  { path: 'orders', component: OrdersComponent },
  {
    path: 'order', component: OrderComponent, children: [
      { path: '', component: OrderComponent },
      { path: 'edit/:id', component: OrderComponent }
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
