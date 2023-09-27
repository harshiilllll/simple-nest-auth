import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class AuthService {


    signin() {
        return 'Hello signed in'
    }
}
