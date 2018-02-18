import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfRoomsPage } from './list-of-rooms';

@NgModule({
  declarations: [
    ListOfRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfRoomsPage),
  ],
})
export class ListOfRoomsPageModule {}
