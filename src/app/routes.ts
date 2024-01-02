import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DetailsComponent} from "./details/details.component";
import { FavoritedComponent } from './favorited/favorited.component';
const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'favorited',
    component: FavoritedComponent,
    title: 'Favorite movies'
  },



];

export default routeConfig;
