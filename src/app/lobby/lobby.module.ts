import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { GamesComponent } from './games/games.component';
import { LobbyViewComponent } from './lobby-view/lobby-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { LobbyRoutingModule } from './lobby-routing/lobby-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
	declarations: [CategoriesComponent, GamesComponent, LobbyViewComponent, GameViewComponent],
	imports: [
		CommonModule,
		LobbyRoutingModule,
		SharedModule
	]
})
export class LobbyModule { }
