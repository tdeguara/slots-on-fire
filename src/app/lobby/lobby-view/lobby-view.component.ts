import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-lobby-view',
	templateUrl: './lobby-view.component.html',
	styleUrls: ['./lobby-view.component.scss']
})
export class LobbyViewComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		// get data from resolver
		const resolvedData = this.route.snapshot.data['data'];

		// check if call was unsuccessful
		if (resolvedData && resolvedData.error) {
			this.router.navigate(['casino/error']);
		}
	}
}
