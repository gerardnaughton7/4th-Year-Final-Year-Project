import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageboardPage } from './messageboard';

@NgModule({
  declarations: [
    MessageboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageboardPage),
  ],
})
export class MessageboardPageModule {}
