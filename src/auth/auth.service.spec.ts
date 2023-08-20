import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from '../entities/users.entity';
import { UsersService } from '../users/users.service';
import {
  generateAtuhData,
  generateTokenData,
} from '../../test/generate/utils/auth.generate';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authentication user', () => {
    test('should auth user', async () => {
      const payload = generateAtuhData();
      const tokenData = generateTokenData();
      const spy = jest
        .spyOn(service, 'signIn')
        .mockResolvedValueOnce(tokenData);
      const auth = await service.signIn(payload);
      expect(auth).toEqual(tokenData);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
