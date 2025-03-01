import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {

  let toast = inject(ToastrService)

  return next(req).pipe(catchError((err)=>{
    toast.error(err.error.message,'Error',{
          closeButton:true,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-left'
        })
    return throwError(()=>err)
  }));
};
