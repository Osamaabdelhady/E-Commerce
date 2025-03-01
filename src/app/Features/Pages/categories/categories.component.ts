import { Component } from '@angular/core';
import { CategorySliderComponent } from "../category-slider/category-slider.component";

@Component({
  selector: 'app-categories',
  imports: [CategorySliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
