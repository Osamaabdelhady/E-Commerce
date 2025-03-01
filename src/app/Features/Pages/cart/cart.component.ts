import { Products } from './../../../Shared/Interface/product/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Data, ProductElement } from '../../../Shared/Interface/Cart/products';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  totalprice:number=0;
  cartItem!:Data;
  productList:ProductElement[]=[];
  card_id!:string
  cardNumbers:BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private cart:CartService){ }

  ngOnInit(): void {
    this.getCartProduct()
  }

  getCartProduct(){
    this.cart.getProductRoCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.totalprice = res.data.totalCartPrice;
        this.cartItem = res.data;
        this.productList = res.data.products;
        this.card_id = res.cartId;
        this.cart.cardNumbers.next(res.numOfCartItems)
      }
    })
  }

  updateCart(productID:string,Count:number){
    this.cart.updateProductRoCart(productID,Count).subscribe({
      next:(res)=>{
        this.cartItem = res.data;
        this.productList = res.data.products;
        this.cart.cardNumbers.next(res.numOfCartItems)
      }
    })
  }

  deleteCart(productID:string){
    this.cart.removeProductRoCart(productID).subscribe({
      next:(res)=>{
        this.cartItem = res.data;
        this.productList = res.data.products;
        this.cart.cardNumbers.next(res.numOfCartItems)
      }
    })
  }

  clearAllCart(){
    this.cart.clearCart().subscribe({
      next:(res)=>{
        this.getCartProduct();
      }
    })
  }
}
