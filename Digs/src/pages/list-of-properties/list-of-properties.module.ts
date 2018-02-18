import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfPropertiesPage } from './list-of-properties';

@NgModule({
  declarations: [
    ListOfPropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfPropertiesPage),
  ],
})
export class ListOfPropertiesPageModule {}
