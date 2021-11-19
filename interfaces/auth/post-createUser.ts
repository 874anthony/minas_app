export default interface DtoCreateUser {
	name: string;
	surname?: number;
	role: string;
	email: string;
	password: string;
	passwordConfirm: string;
}
