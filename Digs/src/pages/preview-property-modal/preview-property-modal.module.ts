import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewPropertyModalPage } from './preview-property-modal';

@NgModule({
  declarations: [
    PreviewPropertyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewPropertyModalPage),
  ],
})
export class PreviewPropertyModalPageModule {}
