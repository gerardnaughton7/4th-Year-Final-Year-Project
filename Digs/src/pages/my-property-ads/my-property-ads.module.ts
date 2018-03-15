import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPropertyAdsPage } from './my-property-ads';

@NgModule({
  declarations: [
    MyPropertyAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPropertyAdsPage),
  ],
})
export class MyPropertyAdsPageModule {}
