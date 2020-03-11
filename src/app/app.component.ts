import { Component, OnInit, HostBinding } from '@angular/core';
import { AppLoaderService } from './shared/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@HostBinding('class.no-touch') noTouchClass = false;
	isLoading = false;

	constructor(private appLoaderService: AppLoaderService) { }

	ngOnInit() {
		this.checkIfDeviceHasTouchEvents();
		this.appLoaderService.loadChange.subscribe(ret => {
			this.isLoading = ret;
		});
	}

	private checkIfDeviceHasTouchEvents() {
		// well... what the name says ^^
		// basically to stop hovers if it is a touch device, to not make the user tap twice
		if (!('ontouchstart' in document.documentElement)) {
			this.noTouchClass = true;
		}
	}
}
