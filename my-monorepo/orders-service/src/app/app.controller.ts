import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// help us in talking with other microservices
import { firstValueFrom } from 'rxjs';
// to convert observable into promise. jab tk auth service message na bheje us ka wait
@Controller('orders')
export class AppController {
  constructor(@Inject('auth_service') private readonly authClient: ClientProxy) {}

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const pattern = { cmd: 'validate_user' };

    const payload = {
      userId: Number(userId),
    };

    const authRespose = await firstValueFrom(this.authClient.send(pattern, payload));

    if(authRespose.status === 'success') {
      return {
        message: 'order created successfully!',
        user: authRespose.user,
      }
    }

    return { message: 'Failed to create order', reason: authRespose.message };

  }
}
