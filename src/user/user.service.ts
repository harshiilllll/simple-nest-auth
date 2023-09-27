import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    users(){
        return 'list of users'
    }
}
