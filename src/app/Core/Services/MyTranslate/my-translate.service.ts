import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private translate:TranslateService) { 
    translate.setDefaultLang('en')
    this.changedDirctory();
  }

  changedDirctory(){
    let savedLang = localStorage.getItem('Lang') || '';
    this.translate.use(savedLang);
    if(savedLang == 'en'){
      document.documentElement.dir='ltr';
    }else{
      document.documentElement.dir='rtl';
    }
  }
}
