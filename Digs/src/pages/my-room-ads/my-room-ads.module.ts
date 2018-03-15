import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRoomAdsPage } from './my-room-ads';

@NgModule({
  declarations: [
    MyRoomAdsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRoomAdsPage),
  ],
})
export class MyRoomAdsPageModule {}
