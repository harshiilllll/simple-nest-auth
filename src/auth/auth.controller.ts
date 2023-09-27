import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body('email') email: string, @Body('password') password: string) {
    console.log({
      email,
      typeofEmail: typeof email,
      password,
      typeofPassword: password,
    });

    return this.authService.signup();
  }
}
