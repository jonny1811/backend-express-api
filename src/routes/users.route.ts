import { Router } from 'express';
import UsersValidator from '../validators/users.validator';
import MiddlewareValidatorError from '../middlewares/handle-validator-error.middleware';
import UsersController from '../controllers/users.controller';

const userBaseUrl = '/users';

export default (router: Router): void => {
	router.post(
		`${userBaseUrl}`,
		UsersValidator.checkCreateUsers(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.create
	);
	
	router.get(
		`${userBaseUrl}`,
		UsersValidator.checkReadUsers(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.readPagination
	);
	
	router.get(
		`${userBaseUrl}/:id`,
		UsersValidator.checkIdParam(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.readByID
	);
	
	router.put(
		`${userBaseUrl}/:id`,
		UsersValidator.checkIdParam(),
		UsersValidator.checkUpdateUser(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.update
	);
	
	router.delete(
		`${userBaseUrl}/:id`,
		UsersValidator.checkIdParam(),
		MiddlewareValidatorError.handleValidationError,
		UsersController.delete
	);
}
