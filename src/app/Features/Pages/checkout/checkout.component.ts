import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../Core/Services/Cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  card_id!:string

  constructor(private activatedRoute:ActivatedRoute , private cart:CartService){ 
    activatedRoute.params.subscribe({
      next:(res)=>{
        this.card_id = res[`id`];
      }
    })
  }

  CheckOutForm:FormGroup = new FormGroup({
    detail: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })

  submitForm(){
    this.cart.checkOut(this.card_id,this.CheckOutForm.value).subscribe({
      next:(res)=>{
        window.location.href = res.session.url;
      }
    })
  }
}
