import { OnsalePipe } from './../../../Shared/pipe/onsale.pipe';
import { Component } from '@angular/core';
import { ProductsService } from '../../../Core/Services/product/products.service';
import { Products } from '../../../Shared/Interface/product/products';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FilterPipe } from '../../../Shared/pipe/filter.pipe';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,DatePipe,OnsalePipe,FilterPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  ProductList:Products[]=[];
  date = new Date();
  searchValue:string = " ";

  constructor(private product:ProductsService , private cart:CartService , private toastr:ToastrService){ }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.product.getProducts().subscribe({
      next:(res)=>{
        this.ProductList = res.data;
        console.log(res)
      }
    })
  }

  addProduct(productID:string){
    this.cart.addProductRoCart(productID).subscribe({
      next:(res)=>{
        console.log(res);
        this.cart.cardNumbers.next(res.numOfCartItems)
        this.toastr.success(res.message,'Success',{
          closeButton:true,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-left'
        })
      }
    })
  }
}
