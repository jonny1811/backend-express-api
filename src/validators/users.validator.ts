import { body, param, query } from 'express-validator';

class UsersValidator {
	checkCreateUsers() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The value should be UUID v4'),
			body('name')
				.notEmpty()
				.withMessage('The name value should not be empty'),
			body('email')
				.isEmail()
				.withMessage('The value should be email')
				.notEmpty()
				.withMessage('The email value should not be empty'),
			body('password')
				.isStrongPassword()
				.withMessage('The value should be strong')
				.notEmpty()
				.withMessage('The password value should not be empty'),
			body('type')
				.isNumeric()
				.withMessage('The value should be number')
				.notEmpty()
				.withMessage('The type value should not be empty'),
		];
	}

	checkUpdateUser() {
		return [
			body('name')
				.optional()
				.notEmpty()
				.withMessage('The name value should not be empty'),
			body('email')
				.optional()
				.isEmail()
				.withMessage('The value should be email')
				.notEmpty()
				.withMessage('The email value should not be empty'),
			body('password')
				.optional()
				.isStrongPassword()
				.withMessage('The value should be strong')
				.notEmpty()
				.withMessage('The password value should not be empty'),
			body('type')
				.optional()
				.isNumeric()
				.withMessage('The value should be number')
				.notEmpty()
				.withMessage('The type value should not be empty'),
		];
	}
	
	checkReadUsers() {
		return [
			query('limit')
				.optional()
				.isInt({ min: 1, max: 10 })
				.withMessage('The limit value should be number and between 1-10'),
			query('offset')
				.optional()
				.isNumeric()
				.withMessage('The value should be number'),
		];
	}

	checkIdParam() {
		return [
			param('id')
				.notEmpty()
				.withMessage('The value should be not empty')
				.isUUID(4)
				.withMessage('The value should be uuid v4'),
		];
	}
}

export default new UsersValidator();