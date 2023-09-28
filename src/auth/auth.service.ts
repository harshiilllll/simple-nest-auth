import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate hash password
    const hash = await argon.hash(dto.password);

    try {
      //save user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Cradentials Taken');
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    //find user by emmail
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //throw exception if user does not exist
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    //validate if the password matches
    const pwMatches = await argon.verify(user.hash, dto.password);
    //throw exception if does not matches
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    delete user.hash;
    return user;
  }
}
