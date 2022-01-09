import { Router } from 'express';
import UsersValidator from '../validators/users.validator';
import MiddlewareValidatorError from '../middlewares/handle-validator-error.middleware';
import UsersController from '../controllers/users.controller';

const userBaseUrl = '/users';

export default (router: Router): void => {
	router.post(
		`${userBaseUrl}/create`,
		UsersValidator.checkCreateUsers(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.create
	);
	
	router.get(
		`${userBaseUrl}/read`,
		UsersValidator.checkReadUsers(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.readPagination
	);
	
	router.get(
		`${userBaseUrl}/read/:id`,
		UsersValidator.checkIdParam(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.readByID
	);
	
	router.put(
		`${userBaseUrl}/update/:id`,
		UsersValidator.checkIdParam(),
		UsersValidator.checkUpdateUser(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.update
	);
	
	router.delete(
		`${userBaseUrl}/delete/:id`,
		UsersValidator.checkIdParam(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.delete
	);
}
