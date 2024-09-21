import express from "express";
import validateSchema from "../utils/validateSchema";
import {CreateUser} from "./adapters/createUser.adapter";
import Controller from "./controller";

const router = express.Router()

router.post("/user/register", validateSchema(CreateUser), Controller.PostCreateUser)
router.post("/user/login", validateSchema(CreateUser), Controller.PostLoginUser)


export default router
