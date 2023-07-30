import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthTokenDto } from './dto/auth.token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService,
    ){}

    @Post()
    async signIn(@Body() authDto: AuthDto): Promise<AuthTokenDto>{
        return await this.authService.signIn(authDto);
    }
}
