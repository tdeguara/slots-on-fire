import { Game } from './game.model';

export class GameCategory {
	name: string;
	order: number;
	slug: string;
	games: Game[];
}
