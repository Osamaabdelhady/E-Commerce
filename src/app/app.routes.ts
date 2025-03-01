import { checktokenGuard } from './Core/Guard/CheckToken/checktoken.guard';
import { authGuard } from './Core/Guard/Auth/auth.guard';
import { MainLayoutComponent } from './Features/Layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './Features/Layout/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';


export const routes: Routes = [

    {path:"",component:AuthLayoutComponent,children:[
        {path:"login",loadComponent:()=>import('./Features/Auth/login/login.component').then((c)=>c.LoginComponent)},
        {path:"sginup",loadComponent:()=>import('./Features/Auth/register/register.component').then((c)=>c.RegisterComponent)},
        {path:"resetPassword",loadComponent:()=>import('./Features/Auth/resetpassword/resetpassword.component').then((c)=>c.ResetpasswordComponent)}
    ]},
    {path:"",component:MainLayoutComponent,children:[
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",loadComponent:()=>import('./Features/Pages/home/home.component').then((c)=>c.HomeComponent)},
        {path:"cart",loadComponent:()=>import('./Features/Pages/cart/cart.component').then((c)=>c.CartComponent)},
        {path:"allorders",loadComponent:()=>import('./Features/Pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent)},
        {path:"checkout/:id",loadComponent:()=>import('./Features/Pages/checkout/checkout.component').then((c)=>c.CheckoutComponent)},
        {path:"products",loadComponent:()=>import('./Features/Pages/products/products.component').then((c)=>c.ProductsComponent)},
        {path:"productDetails/:id",loadComponent:()=>import('./Features/Pages/product-details/product-details.component').then((c)=>c.ProductDetailsComponent)},
        {path:"brands",loadComponent:()=>import('./Features/Pages/brands/brands.component').then((c)=>c.BrandsComponent)},
        {path:"categories",loadComponent:()=>import('./Features/Pages/categories/categories.component').then((c)=>c.CategoriesComponent)}
    ]}

];
