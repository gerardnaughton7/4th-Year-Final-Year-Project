import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPopoverPage } from './about-popover';

@NgModule({
  declarations: [
    AboutPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPopoverPage),
  ],
})
export class AboutPopoverPageModule {}
