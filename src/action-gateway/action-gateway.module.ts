import { Module } from '@nestjs/common';
import { ActionsGateway } from './actions.gateway';

@Module({
  providers: [ActionsGateway],
})
export class ActionGatewayModule {}
