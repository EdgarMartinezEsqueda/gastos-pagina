import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow<string>("CORS_ORIGIN"),
    methods: "GET,HEAD,PUT,POST,DELETE",
  });
  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
