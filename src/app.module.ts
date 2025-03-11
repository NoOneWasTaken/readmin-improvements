import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { ChatlogsModule } from './chatlogs/chatlogs.module';
import { PlayerModule } from './player/player.module';
import { ActionGatewayModule } from './action-gateway/action-gateway.module';
import { DataGatewayModule } from './data-gateway/data-gateway.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServerModule,
    ChatlogsModule,
    PlayerModule,
    ActionGatewayModule,
    DataGatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
