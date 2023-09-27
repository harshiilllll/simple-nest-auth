import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
