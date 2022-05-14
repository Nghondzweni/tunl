import jwt from "jsonwebtoken";
import log from "../logger";
require("dotenv").config();

const privateKey = process.env.PRIVATEKEY as string;
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export async function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    
    return { valid: true, expired: false, decoded };
  } catch (error) {
    log.error(error);
    if (error instanceof Error) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    } else {
        return {
            valid: false,
            expired: false,
            decoded: null
        }
    }
  }
}
