import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch(e) {
        log.error(e);
        if (e instanceof Error) return res.status(400).send(e.message);
        else return res.status(400).send(e)
    }
  };

  export default validate;
