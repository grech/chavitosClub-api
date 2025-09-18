import { envs } from "./config/envs";
import { AppRouter } from "./presentation/router";
import { Server } from "./presentation/server";
(async () => {
     main();
} )();



async function main() {
     console.log('holaaa')
     const server = new Server({
          port: envs.PORT,
          routes: AppRouter.routes
     })
     
     server.start();
}