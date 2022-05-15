import { NextFunction, Request, Response } from "express";
import { decode } from "../utils/jwt.utils";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import Session from "../model/session.model";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  console.log(accessToken)

  const { decoded, expired, valid } = await decode(accessToken);
  const refreshToken = get(req, "headers.x-refresh");
  
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = await decode(newAccessToken);

      //@ts-ignore
      req.user = decoded;
    }

    return next();
  }

  if (!accessToken) return next();

  
  if(!valid) return(res.send("Error: Invalid Token"))
  
  const session = await Session.findById(get(decoded, 'session'));
  
  const validSession = get(session, 'valid');

  if (!validSession) return(res.send("Error: Session has been destroyed"));

  if (decoded && validSession) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }



};
