import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../../shared/services';
import { Injectable } from '@angular/core';

/**
 * Class to get the data before the URL is resolved
 */
@Injectable({ providedIn: 'root' })
export class LobbyViewResolver implements Resolve<any> {
	constructor(
		private gameService: GameService
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		return this.getAllCategories();
	}

	private getAllCategories(): Observable<any> {
		return this.gameService.getAllCategories();
	}
}
