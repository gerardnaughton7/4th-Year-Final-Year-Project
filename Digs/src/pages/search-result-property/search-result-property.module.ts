import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPropertyPage } from './search-result-property';

@NgModule({
  declarations: [
    SearchResultPropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultPropertyPage),
  ],
})
export class SearchResultPropertyPageModule {}
