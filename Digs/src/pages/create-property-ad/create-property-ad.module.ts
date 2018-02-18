import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePropertyAdPage } from './create-property-ad';

@NgModule({
  declarations: [
    CreatePropertyAdPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePropertyAdPage),
  ],
})
export class CreatePropertyAdPageModule {}
