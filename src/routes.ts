import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createSessionHandler } from "./controller/session.controller";
import requiresUser from "./middleware/requiresUser";
import {
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createParcelHandler,
  getParcelHandler,
  getParcelsHandler,
} from "./controller/parcel.controller";
import { createParcelSchema } from "./schema/parcel.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createSessionSchema),
    createSessionHandler
  );

  // Get User's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Loggout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create New Parcel
  app.post(
    "/api/parcels",
    requiresUser,
    validateRequest(createParcelSchema),
    createParcelHandler
  );

  // Get Parcel By Id
  app.get("/api/parcel", requiresUser, getParcelHandler);

  // Get Parcel Ids belonging to user
  app.get("/api/parcels", requiresUser, getParcelsHandler);
}
