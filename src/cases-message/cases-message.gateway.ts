import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { OnModuleInit, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CasesEntity } from 'src/entities/cases.entity';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'cases-messages',
  cors: {
    origin: [
      'http://localhost:9090',
      'https://amritb.github.io',
      'http://amritb.github.io',
    ],
    credentials: true,
  },
})
export class CasesMessageGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit
{
  private logger: Logger = new Logger('CasesGateway');
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log('this module was uploaded first.');
  }

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client with id ${client.id} has connected.`);
  }

  afterInit(server: Server) {
    if (process.env.NODE_ENV !== 'prod') {
      this.logger.log(' websocket initialized');
    }
  }

  @RabbitSubscribe({
    exchange: 'cases.relation',
    routingKey: 'cases-relation-route',
    queue: 'cases-relation-queue',
  })
  async sendingCasesCreated(cases: CasesEntity): Promise<any> {
    this.server.emit('send-case', cases);
  }
}
