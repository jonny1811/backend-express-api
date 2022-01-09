import * as bcrypt from 'bcrypt';

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../models";


class UsersController {

	async create(req: Request, res: Response) {
		const id = uuidv4();
		const { name, email, password, type } = req.body;
		const hash = await bcrypt.hash(password, 12);
		
		try {
			const data = await Users.create({ name, email, password: hash, id, type });
			return res.status(200).json({ data, ok: true });
		} catch (e) {
			return res.status(500).json({ msg: "fail to create a User profile", status: 500, route: "/create" });
		}
	}

	async readPagination(req: Request, res: Response) {
		try {
			const limit = Number(req.query.limit) || 10;
			const offset = Number(req.query.offset) || 0;

			const users = await Users.findAll({
				attributes: { exclude: ['password'] },
				where: {},
				limit,
				offset
			});
			return res.status(200).json({ users: users, ok: true });
		} catch (e) {
			return res.status(500).json({ msg: "fail to read all users data", status: 500, route: "/read" });
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await Users.findOne({
				attributes: { exclude: ['password'] },
				where: { id }
			});

			if (!user) {
				return res.status(404).json({ msg: "Can not find existing User", ok: false });
			}

			return res.status(200).json({ user: user, ok: true });
		} catch (e) {
			return res.status(500).json({ msg: "fail to read by id", status: 500, route: "/read/:id" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { password } = req.body;
			const user = await Users.findOne({
				attributes: { exclude: ['password'] },
				where: { id }
			});
			
			if (!user) {
				return res.status(404).json({ msg: "Can not find existing User", ok: false });
			}
			
			if (password) {
				const hash = await bcrypt.hash(password, 12);
				req.body.password = hash;
			}

			await user.update({ ...req.body });
			return res.status(200).json({ msg: 'Updated User data', ok: true });
		} catch (e) {
			return res.status(500).json({
				msg: "fail to update",
				status: 500,
				route: "/update/:id",
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await Users.findOne({ where: { id } });

			if (!user) {
				return res.json({ msg: "Can't find existing User", ok: false });
			}

			const deletedUser = await user.destroy();
			return res.status(200).json({ msg: 'Deleted User profile', ok: true });
		} catch (e) {
			return res.status(500).json({
				msg: "fail to delete",
				status: 500,
				route: "/delete/:id",
			});
		}
	}
}

export default new UsersController();
