import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		trigger('animateLogo', [
			state('false', style({ opacity: 0, visibility: 'hidden', top: -50 })),
			state('true', style({ opacity: 1, top: 0 })),
			transition('0 <=> 1', [
				animate('500ms 1000ms cubic-bezier(0.18, 0.89, 0.58, 1.42)')
			])
		]),
		trigger('animateLink1', [
			state('false', style({ opacity: 0, visibility: 'hidden', top: -50 })),
			state('true', style({ opacity: 1, top: 0 })),
			transition('0 <=> 1', [
				animate('500ms 1200ms cubic-bezier(0.18, 0.89, 0.58, 1.42)')
			])
		]),
		trigger('animateLink2', [
			state('false', style({ opacity: 0, visibility: 'hidden', top: -50 })),
			state('true', style({ opacity: 1, top: 0 })),
			transition('0 <=> 1', [
				animate('500ms 1300ms cubic-bezier(0.18, 0.89, 0.58, 1.42)')
			])
		])
	]
})

export class NavbarComponent implements OnInit, AfterViewInit {
	animateElements = false;

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		// trigger animations
		this.loadGameElements();
	}

	goHome() {
		this.router.navigate(['casino/lobby']);
	}

	private loadGameElements() {
		setTimeout(() => {
			this.animateElements = true;
		});
	}
}
