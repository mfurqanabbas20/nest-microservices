import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {

  // when there is validate_user it will trigger

  @MessagePattern({ cmd: 'validate_user' })
  handleUserValidation(@Payload() data: any) {
    console.log("Auth Service received data", data);

    if(data.userId === 1) {
      return { staus: 'success', user: {
        id: 1,
        name: "Furqan",
      }}
    } 
    else {
      return { staus: 'error', message: "User Not Found" }
    }

  }
}

// Message Pattern = for listening request
// Payload = for retreiving data.
