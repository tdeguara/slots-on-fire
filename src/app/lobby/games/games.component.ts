import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game, GameService } from '../../shared';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
	games: Game[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private gameService: GameService
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			if (params.has('slug')) {
				// category is chosen
				const slug = params.get('slug');

				this.gameService.getCategory(slug).subscribe(
					res => {
						this.games = [...res.games];
					});
			} else {
				// no category - load all games
				this.gameService.getGames().subscribe(
					res => {
						this.games = res;
					}
				);
			}
		});

		this.gameService.searchTermChange.subscribe(term => {
			if (term !== '') {
				this.games = this.gameService.searchGames(term);
			} else {
				this.gameService.getGames().subscribe(
					res => {
						this.games = res;
					}
				);
			}
		});
	}

	gameClick(id: string) {
		this.router.navigate([`casino/game/${id}`]);
	}
}
