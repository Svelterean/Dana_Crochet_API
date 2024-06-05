import { Router } from "express";
import { getUsers, registerUser, logUser, getUsersCount, deleteUser } from "../controllers/users.controllers.js";

const api_url = process.env.api_url

const router = Router()

router.get(`${api_url}/users`, getUsers)
router.get(`${api_url}/users/count`, getUsersCount)

router.delete(`${api_url}/users/id::id`, deleteUser)

router.post(`${api_url}/users/register`, registerUser)
router.post(`${api_url}/users/login`, logUser)

export default router