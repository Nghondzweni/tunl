import {
  createAccessToken,
  createSession,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { UserDocument } from "../model/user.model";
import { SessionDocument } from "../model/session.model";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";
import { findSessions } from "../service/session.service";

export async function createSessionHandler(req: Request, res: Response) {
  // Validate email and password
  const user = (await validatePassword(req.body)) as UserDocument;

  if (!user) {
    return res.status(401).send("Invalid Username or Password");
  }

  // Create a session
  const session = (await createSession(
    user._id,
    req.get("user-agent") || ""
  )) as SessionDocument;

  // Create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESHTOKENTTL as string, // 10 Days
  });

  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
