import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { HomeSliderComponent } from "../home-slider/home-slider.component";
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, HomeSliderComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
