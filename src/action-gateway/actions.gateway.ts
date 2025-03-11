import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GATEWAY_GUARD } from '../auth.middleware';

@WebSocketGateway({
  namespace: 'actions',
  transports: ['websocket'],
  allowEIO3: true,
  cors: { origin: '*' },
})
export class ActionsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    try {
      GATEWAY_GUARD(client);
      return {
        event: 'connected',
        message: 'Successfully connected to the server!',
      };
    } catch (e) {
      console.error('Error in handleConnection from ActionGateway:', e);
      throw new WsException('500: Internal Server Error');
    }
  }

  @SubscribeMessage('health-check')
  healthCheck(client: Socket) {
    return client.emit('health-check', 'Server is healthy!');
  }
}
