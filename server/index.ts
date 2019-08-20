import "./common/env";
import Server from "./common/server";
import { createConnection } from "typeorm";

const port = parseInt(process.env.PORT);
async function startServer() {
  await createConnection();
  const routes =  require('./routes')
  new Server().router(routes.default).listen(port);
}
export default startServer();
