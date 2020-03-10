import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiActions } from '../api-actions.urls';
import { ResponseBodyType } from '../response-body-type.enum';
import { Observable, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceError } from '../models';
import { Router } from '@angular/router';

export abstract class BaseService {
	/**
	 * @param http Used to pass the Angular Http client which is responsible to making HTTP requests
	 * @param baseApiURL Used to pass the base URL as this may differentiate depending on the service
	 */
	constructor(
		protected http: HttpClient,
		protected baseApiURL: string
	) { }

	/**
	 * Function to make an HTTP GET request
	 * @param action Contains the 'action' part of the request URL
	 * @param value Array containing the value/s to be appended to the request URL
	 * @param searchParams Values to be passed as the query string of the request URL
	 * @param responseBodyType The type of response the request is expected to return
	 * @returns An Observable of the data returned from the server
	 */
	public get<T>(action?: ApiActions, value?: any[], searchParams?: HttpParams,
		responseBodyType: ResponseBodyType = ResponseBodyType.JSON): Observable<any> {

		// append action with url
		let url = this.baseApiURL + action;

		// if defined, append value
		if (value !== undefined) {
			// checking if there's a trailing slash before adding "/[value]"
			// so that we avoid having a URL with "//[value]"
			// Reference: http://stackoverflow.com/a/3884711/2312637
			url += (url.slice(-1) === '/') ? '' : '/';

			for (const tempVal of value) {
				url += tempVal + '/';
			}
		}

		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json');

		const options: any = {
			headers
		};

		if (searchParams !== undefined) {
			options.params = searchParams;
		} else {
			// ideally there is some kind of paging parameters as well
			options.params = new HttpParams()
				.set('brand', 'cherrycasino.desktop')
				.set('locale', 'en');
		}

		options.responseType = this.setResponseType(responseBodyType);

		return this.http.get<T>(url, options)
			.pipe(
				catchError(this.handleError)
			);
	}

	/**
	 * Here should be functions for each HTTP verb, but in this case we only need GET
	 */

	/**
	 * Function called to handle unexpected errors
	 */
	protected handleError(serviceErrors: HttpErrorResponse) {
		return _throw(serviceErrors);
	}

	/**
	 * Function to set responseType
	 */
	private setResponseType(responseBodyType: ResponseBodyType): string {
		switch (responseBodyType) {
			case ResponseBodyType.Text:
				return 'text';
			case ResponseBodyType.Blob:
				return 'blob';
			case ResponseBodyType.JSON:
			default:
				return 'json';
		}
	}
}
