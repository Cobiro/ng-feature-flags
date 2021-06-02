import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeatureFlagGuard} from '../../projects/feature-flags/src/lib/guards/feature-flag.guard';
import {BuyComponentComponent} from './buy-component/buy-component.component';
import {ProductListComponent} from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'buy',
    data: {
      featureFlags: ['CAN_BUY_PRODUCT'],
    },
    canActivate: [FeatureFlagGuard],
    component: BuyComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
