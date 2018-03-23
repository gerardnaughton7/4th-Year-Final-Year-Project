import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SortPipe } from './sort/sort';
@NgModule({
	declarations: [SearchPipe,
    SortPipe],
	imports: [],
	exports: [SearchPipe,
    SortPipe]
})
export class PipesModule {}
