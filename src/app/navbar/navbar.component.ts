import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/models/game.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		const game = new Game();
	}

}
