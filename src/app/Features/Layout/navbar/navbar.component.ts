import { AuthService } from './../../../Core/Services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from './../../../Core/Services/flowbite/flowbite.service';
import { Component} from '@angular/core';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { MyTranslateService } from '../../../Core/Services/MyTranslate/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin!:boolean;
  cartNum!:number;

  constructor(private flowbiteService: FlowbiteService, public authService:AuthService, private cart:CartService, private mytranslate:MyTranslateService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });


    this.authService?.userData.subscribe(res=>{
        if(res !== null){
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      })

      this.cart.cardNumbers.subscribe({
        next:(res)=>{
          this.cartNum = res;
        }
      })

  }


  changeLang(lang:string){
    localStorage.setItem('Lang',lang)
    this.mytranslate.changedDirctory();
  }
}
