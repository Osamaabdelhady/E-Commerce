import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../Interface/product/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product:Products[],searchValue:string): Products[] {
    return product.filter((product)=>{
      return product.title.toUpperCase().includes(searchValue.toUpperCase());
    })
  }

}
