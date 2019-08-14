import "./common/env";
import Server from "./common/server";
import routes from "./routes";

import { createConnection } from "typeorm";

const port = parseInt(process.env.PORT);
async function startServer() {
  await createConnection();
  new Server().router(routes).listen(port);
}
export default startServer();
