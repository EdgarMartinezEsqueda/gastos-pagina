import { ValidationPipe } from "@nestjs/common";
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

  // Configurar Exception Filter global
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  // Configurar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: configService.getOrThrow<string>("CORS_ORIGIN"),
    methods: "GET,HEAD,PUT,POST,DELETE",
  });

  // Usar logger global
  app.useLogger(logger);

  // Establecer prefijo global
  app.setGlobalPrefix("api");

  const port = configService.getOrThrow<string>("PORT") ?? 3000;
  await app.listen(port);

  logger.log(`Servidor iniciado en puerto ${port}`,"Bootstrap" );
}
bootstrap();