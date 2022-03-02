import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Schedule } from '@prisma/client';

@WebSocketGateway({
    cors: true,
})
export class ScheduleGateway {
    @WebSocketServer()
    server: any;

    @SubscribeMessage('schedule')
    created(@MessageBody() data: Schedule) {
        this.server.emit('schedule', data);
    }
}
