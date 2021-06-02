import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FeatureFlagsModule} from '../../projects/feature-flags/src/lib/feature-flags.module';
import {BuyComponentComponent} from './buy-component/buy-component.component';
import {MatCardModule} from '@angular/material/card';
import {ProductListComponent} from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponentComponent,
    ProductListComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatListModule,
      MatButtonModule,
      MatCardModule,
      FeatureFlagsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
