import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AllExceptionsFilter } from "./all-exceptions.filter";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  
  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(LoggerService);
  
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));
  
  app.enableCors({
    origin: configService.getOrThrow<string>("CORS_ORIGIN"),
    methods: "GET,HEAD,PUT,POST,DELETE",
  });
  
  app.useLogger(logger);
  app.setGlobalPrefix("api");
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
