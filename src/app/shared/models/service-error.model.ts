export class ServiceError {
	constructor(
		public type: string,
		public title: string,
		public status: number,
		public detail: string
	) { }
}
