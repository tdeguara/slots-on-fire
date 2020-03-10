import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AppLoaderService {
	loadChange: Observable<boolean>;
	private loadChangeSubject: Subject<boolean> = new Subject<boolean>();
	private _isLoading = false;

	constructor() {
		this.loadChange = this.loadChangeSubject.asObservable();
	}

	get isLoading() {
		return this._isLoading;
	}

	set isLoading(setting: boolean) {
		this._isLoading = setting;
		this.loadChangeSubject.next(this._isLoading);
	}
}
