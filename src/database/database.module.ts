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
                host: configService.get<string>("DB_HOST"),
                port: Number(configService.get<string>("DB_PORT") ?? "5432"),
                username: configService.get<string>("DB_USERNAME"),
                password: configService.get<string>("DB_PASSWORD"),
                database: configService.get<string>("DB_NAME"),
                autoLoadEntities: true,
                synchronize: !!Boolean(configService.get<string>("DB_SYNC")),
                ssl: Boolean(configService.get<string>("DB_SSL_MODE"))
            })
        })
    ]
})
export class DatabaseModule {}
