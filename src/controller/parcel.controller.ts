import { Request, Response } from "express";
import Parcel from "../model/parcel.model";
import { createParcel, getParcel, getParcels } from "../service/parcel.service";
import { get } from "lodash";

export async function createParcelHandler(req: Request, res: Response) {
  res.send(await createParcel(req.body, get(req, "user._id")));
}

export async function getParcelHandler(req: Request, res: Response) {
  res.send(await getParcel(get(req, "query.id")));
}

export async function getParcelsHandler(req: Request, res: Response) {
  res.send(await getParcels(get(req, "user._id")));
}
