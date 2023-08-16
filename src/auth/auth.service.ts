import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto } from './dto/auth.token.dto';

@Injectable()
export class AuthService extends Repository<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    private authRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {
    super(
      authRepository.target,
      authRepository.manager,
      authRepository.queryRunner,
    );
  }

  async signIn(authDto: AuthDto): Promise<AuthTokenDto> {
    const userData = await this.authRepository.findOne({
      where: {
        identification_id: authDto.identificationId,
      },
    });

    if (!userData)
      throw new NotFoundException(
        'This identification does not exsti or password is wrong.',
      );
    const comparePass = await bcrypt.compare(
      authDto.password,
      userData.password,
    );

    if (!comparePass)
      throw new NotFoundException(
        'This identification does not exsti or password is wrong.',
      );
    return {
      access_token: await this.jwtService.signAsync({
        id: userData.id,
      }),
    };
  }
}
