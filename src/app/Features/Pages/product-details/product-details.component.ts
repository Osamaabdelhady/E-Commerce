import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Core/Services/product/products.service';
import { Products } from '../../../Shared/Interface/product/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Core/Services/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  id:any;
  productDetails!:Products;

  constructor(private activatedRoute:ActivatedRoute,private product:ProductsService , private cart:CartService , private toastr:ToastrService){
    activatedRoute.params.subscribe(res=>{
      this.id = res['id'];
    })
   }

   ngOnInit(): void {
    this.getSpacificProduct()
   }

   getSpacificProduct(){
    this.product.getSpasificProducts(this.id).subscribe({
      next:(res)=>{
        this.productDetails = res.data
      }
    })
   }
  
   addProduct(productID:string){
    this.cart.addProductRoCart(productID).subscribe({
      next:(res)=>{
        console.log(res);
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
