export class ServiceError {
	constructor(
		public status: number,
		public description: string,
		public errorNo: number,
		operators: any
	) { }
}
