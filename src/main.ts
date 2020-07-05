import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as config from "config";
import { join } from "path";

async function bootstrap() {
  //const serverConfig = config.get("server");
  //console.log(serverConfig);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // app.useStaticAssets(join(__dirname, "..", "uploads/images"));
  await app.listen(4000);
}
bootstrap();
