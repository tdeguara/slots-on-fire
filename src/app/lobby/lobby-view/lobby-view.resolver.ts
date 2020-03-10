import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameService, AppLoaderService } from '../../shared/services';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

/**
 * Class to get the data before the URL is resolved
 */
@Injectable({ providedIn: 'root' })
export class LobbyViewResolver implements Resolve<any> {
	constructor(
		private gameService: GameService,
		private appLoaderService: AppLoaderService
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		this.appLoaderService.isLoading = true;
		return this.gameService.getCategories().pipe(
			map(res => {
				this.appLoaderService.isLoading = false;
				return of({ categories: res });
			}),
			catchError(error => {
				this.appLoaderService.isLoading = false;
				return of({ categories: undefined, error });
			})
		);
	}
}
