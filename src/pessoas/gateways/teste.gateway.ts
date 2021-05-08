import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class TesteGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  handleConnection(conn: Socket) {
    console.log('New connection:', conn.id);
  }

  handleDisconnect(conn: Socket) {
    console.log('Disconnect:', conn.id);
  }
}
