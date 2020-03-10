import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { GamesComponent } from './games/games.component';
import { LobbyViewComponent } from './lobby-view/lobby-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { LobbyRoutingModule } from './lobby-routing/lobby-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
	declarations: [CategoriesComponent, GamesComponent, LobbyViewComponent, GameViewComponent, SearchComponent, ErrorPageComponent],
	imports: [
		CommonModule,
		LobbyRoutingModule,
		SharedModule,
		FontAwesomeModule
	]
})
export class LobbyModule { }
