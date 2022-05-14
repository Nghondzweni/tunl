import { createUser } from "../service/user.service";
import { Request, Response } from "express";
import { omit } from 'lodash'
import log from "../logger";

export async function createUserHandler(req: Request, res: Response){
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e) {
        log.error(e);
        res.status(409).send(e as string);
    }
}

export async function createUserSessionHandler(req: Request, res: Response){
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e) {
        log.error(e);
        res.status(409).send(e as string);
    }
}