import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserLogged } from './decorators/user.auth.decorator';
import { CasesSubscriber } from './subscribers/cases-subscriber';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
