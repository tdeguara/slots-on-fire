import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from './shared/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoading = false;

	constructor(private appLoaderService: AppLoaderService) { }

	ngOnInit() {
		this.appLoaderService.loadChange.subscribe(ret => {
			this.isLoading = ret;
		});
	}
}
