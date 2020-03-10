import { NgModule } from '@angular/core';
import { LobbyViewComponent } from '../lobby-view/lobby-view.component';
import { GameViewComponent } from '../game-view/game-view.component';
import { Routes, RouterModule } from '@angular/router';
import { LobbyViewResolver } from '../lobby-view/lobby-view.resolver';
import { ErrorPageComponent } from '../error-page/error-page.component';

const lobbyRoutes: Routes = [
	{ path: 'lobby', component: LobbyViewComponent, resolve: { data: LobbyViewResolver } },
	{ path: 'category/:slug', component: LobbyViewComponent },
	{ path: 'game/:id', component: GameViewComponent },
	{ path: 'error', component: ErrorPageComponent }
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(lobbyRoutes)
	],
	exports: [RouterModule]
})
export class LobbyRoutingModule { }
