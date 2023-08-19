import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthTokenDto } from './dto/auth.token.dto';
import { ResponseLogin } from './dto/response.auth.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: ResponseLogin })
  @ApiBadRequestResponse({
    description: 'This identification does not exsti or password is wrong',
    status: '4XX',
  })
  async signIn(@Body() authDto: AuthDto): Promise<AuthTokenDto> {
    return await this.authService.signIn(authDto);
  }
}
