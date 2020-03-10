import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '', redirectTo: 'casino/lobby', pathMatch: 'full'
	},
	{
		path: 'casino',
		loadChildren: () => import('./lobby/lobby.module').then(m => m.LobbyModule)
	},
	{ path: '**', redirectTo: 'casino/lobby' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
