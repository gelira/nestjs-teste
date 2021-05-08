import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PessoasModule } from './pessoas/pessoas.module';
import { AuthModule } from './auth/auth.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION'),
        useCreateIndex: true,
      }),
    }),
    PessoasModule,
    AuthModule,
    TesteModule,
  ],
})
export class AppModule {}
