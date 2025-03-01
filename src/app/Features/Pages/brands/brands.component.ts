import { Data } from '../../../Shared/Interface/brands/brand';
import { BrandsService } from './../../../Core/Services/brands/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports:[],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  BrandItem:Data[]=[];

  constructor(private brand:BrandsService){ }

  ngOnInit(): void {
    this.getBRAND()
  }

  getBRAND(){
    this.brand.getBrands().subscribe({
      next:(res)=>{
        this.BrandItem = res.data;
      }
    })
  }
}
