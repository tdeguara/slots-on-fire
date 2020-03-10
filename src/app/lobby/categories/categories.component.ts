import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		const objToAccess = 'data';
		console.log(this.route.snapshot.data[objToAccess]);
	}
}
