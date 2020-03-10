import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GameService, GameCategory } from 'src/app/shared';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	gameCategories: GameCategory[] = [];
	currentSlug: string;

	faSearch = faSearch;
	faTimes = faTimes;
	showSearch = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private gameService: GameService
	) { }

	ngOnInit(): void {
		// get cached categories
		this.gameService.getCategories().subscribe(
			res => {
				this.gameCategories = [...res];
			}
		);

		// check if loading specific category
		this.route.paramMap.subscribe((params: ParamMap) => {
			if (params.has('slug')) {
				this.currentSlug = params.get('slug');
			}
		});
	}

	categoryClick(slug?: string) {
		if (slug) {
			this.router.navigate([`casino/category/${slug}`]);
		} else {
			this.router.navigate([`casin/lobby`]);
		}
	}

	toggleSearch() {
		this.showSearch = !this.showSearch;
	}

	closeSearch() {
		this.toggleSearch();
		this.gameService.searchTerm = '';
	}

	searchKeyUp(event) {
		const searchValue = event.target.value;
		if (searchValue !== undefined && searchValue !== '') {
			this.gameService.searchTerm = searchValue;
		}
	}
}
