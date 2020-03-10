import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { ApiActions } from '../api-actions.urls';
import { BaseService } from './base.service';
import { GameCategory, Game } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class GameService extends BaseService {
	private categories: GameCategory[] = [];
	private games: Game[] = [];

	searchTermChange: Observable<string>;
	private searchTermChangeSubject: Subject<string> = new Subject<string>();
	private _searchTerm = '';

	constructor(protected http: HttpClient) {
		super(http, environment.apiUrl);
		this.searchTermChange = this.searchTermChangeSubject.asObservable();
	}

	set searchTerm(term: string) {
		this._searchTerm = term;
		this.searchTermChangeSubject.next(this._searchTerm);
	}

	getCategories(): Observable<GameCategory[]> {
		if (this.categories.length === 0) {
			return this.getCategoriesFromServer().pipe(
				map(res => {
					this.categories = res;
					this.setGames();
					return this.categories;
				}));
		} else {
			return of(this.categories);
		}
	}

	getCategory(slug: string): Observable<GameCategory> {
		const cachedCategory = this.categories.find(c => c.slug === slug);
		if (cachedCategory === undefined) {
			return this.getCategoryFromServer(slug).pipe(
				map(res => {
					// add to global array
					this.categories.push(res);
					// sort array again
					this.categories = this.categories.sort((a, b) => (a.order > b.order) ? 1 : -1);
					this.setGames();
					return res;
				}));
		} else {
			return of(cachedCategory);
		}
	}

	getGames(): Observable<Game[]> {
		if (this.games.length === 0) {
			this.getCategories().pipe(
				map(() => {
					return this.games;
				}));
		} else {
			return of(this.games);
		}
	}

	getGame(id: string): Observable<Game> {
		const cachedGame = this.games.find(c => c.id === id);
		if (cachedGame === undefined) {
			return this.getGameFromServer(id);
		} else {
			return of(cachedGame);
		}
	}

	searchGames(phrase: string) {
		return this.games.filter(g => g.name.toLowerCase().search(phrase.toLowerCase()) !== -1);
	}

	private getCategoriesFromServer(): Observable<GameCategory[]> {
		return this.get<GameCategory[]>(ApiActions.GET_GAME_CATEGORIES, undefined).pipe(
			map(res => {
				const serverCategories: GameCategory[] = [];
				for (const cat of res._embedded.game_categories) {
					const category: GameCategory = { ...cat };
					// filtering out disabled games
					category.games = [...cat._embedded.games.filter(g => g.enabled)];
					serverCategories.push(category);
				}
				// ordering by order just in case
				const sortedList = serverCategories.sort((a, b) => (a.order > b.order) ? 1 : -1);
				return sortedList;
			})
		);
	}

	private getCategoryFromServer(slug: string): Observable<GameCategory> {
		return this.get<GameCategory>(ApiActions.GET_GAME_CATEGORIES, [slug]).pipe(
			map(res => {
				const category: GameCategory = { ...res };
				// filtering out disabled games
				category.games = [...res._embedded.games.filter(g => g.enabled)];
				return category;
			})
		);
	}

	private getGameFromServer(id: string): Observable<Game> {
		return this.get<GameCategory>(ApiActions.GET_GAME, [id]).pipe(
			map(res => {
				if (res.status && res.status === 500) {
					// game was not found - internal server error
					return undefined;
				}
				const game: Game = { ...res };
				return game;
			})
		);
	}

	private setGames() {
		// this will always keep games sorted by their category
		this.games = [];
		for (const cat of this.categories) {
			this.games.push(...cat.games);
		}

		// remove duplicate games
		this.games = this.games.filter((item, index, self) =>
			self.findIndex(g => g.name === item.name) === index);
	}
}
