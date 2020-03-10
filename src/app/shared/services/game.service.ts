import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiActions } from '../api-actions.urls';
import { BaseService } from './base.service';
import { GameCategory, Game } from '../models';

@Injectable()
export class GameService extends BaseService {
	private categories: GameCategory[] = [];
	private games: Game[] = [];

	constructor(protected http: HttpClient) {
		super(http, environment.apiUrl);
	}

	getAllCategories(): Observable<any> {
		return this.get<any>(ApiActions.GET_GAME_CATEGORIES);
	}
}
