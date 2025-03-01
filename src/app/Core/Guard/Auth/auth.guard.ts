import { CanActivateFn , Router} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth:AuthService = inject(AuthService);
  let router = inject(Router)
  if(_Auth.userData.getValue() !== null){
    return true;
  }
  router.navigate(['/login'])
  return false;
};
