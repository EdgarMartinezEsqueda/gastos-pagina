import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService ) => ({
                type: "postgres",
                host: configService.getOrThrow<string>("DB_HOST"),
                port: Number(configService.getOrThrow<string>("DB_PORT") ?? "5432"),
                username: configService.getOrThrow<string>("DB_USERNAME"),
                password: configService.getOrThrow<string>("DB_PASSWORD"),
                database: configService.getOrThrow<string>("DB_NAME"),
                autoLoadEntities: true,
                synchronize: !!Boolean(configService.getOrThrow<string>("DB_SYNC")),
                ssl: Boolean(configService.getOrThrow<string>("DB_SSL_MODE"))
            })
        })
    ]
})
export class DatabaseModule {}
