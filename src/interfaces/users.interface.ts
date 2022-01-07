export interface UsersModel {
	id: string;
	name?: string;
	type: number;
	password: string;
	email: string;
}

export interface UserAddModel {
	name?: string;
	email: string;
	password: string;
	type: number;
}

export interface UserViewModel extends Omit<UserAddModel, "password"> {
	id: number;
}