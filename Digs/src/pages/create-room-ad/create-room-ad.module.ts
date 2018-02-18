import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRoomAdPage } from './create-room-ad';

@NgModule({
  declarations: [
    CreateRoomAdPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRoomAdPage),
  ],
})
export class CreateRoomAdPageModule {}
