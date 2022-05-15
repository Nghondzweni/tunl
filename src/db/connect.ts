import mongoose from "mongoose";
import log from "../logger";

function connect() {
  const dbUri = process.env.DBURI as string;

  return mongoose.connect(dbUri, {
  }).then(() => {
      log.info("Database Connected");
  }).catch((error) => {
    console.log(error)
      log.error("db error", error);
  });
}

export default connect;
